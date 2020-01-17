const ddb = require('../awsdb/aws_configure');
const redis = require('../db_redis/redis_configure');
const uuid = require('uuid');
let nDate = Number(Date.now());
let sUuid = String(uuid.v4());
console.log(typeof sUuid);
class Person {
    constructor(){
        this.params = {};
        console.log("object created");
     
    }
    //create method
    create(newMember)  {  
        console.log("create is called");
        return new Promise((resolve, reject) => {

            this.params = {
                TableName: "userAccount",
                Item: {
                    "userId": sUuid,
                    "timeStamp": nDate,
                    "userName": newMember.userName,
                    "phoneNumber": newMember.userPhoneNumber,
                    "userAge": newMember.userAge 
                }
            }
            console.log(this.params);
            ddb.put(this.params, (error, data) => {
                if(error) reject(error);
                resolve(data);
            });
        });
    }
    
    //getbyuser method
    getByUserId(params) {
        console.log("getByUser is called !");
        console.log(params);
        this.params = {
            TableName: "userAccount",
            Key: params
        }
        
        return new Promise(async (resolve, reject) => {
            const phoneNumber = Number(params.phoneNumber);
            console.log('In promise');
            let result;
            try {
                result = await redis.get(phoneNumber); //redis returns promise
                if (result) {
                    const resultJson = JSON.parse(result);
                    console.log('redis!');
                    console.log(resultJson);
                    return resolve(resultJson);
                }
            } catch (err) {
                result = null;
            }
            ddb.get(this.params, (error, data) => {
                if(error) {
                    console.log(error);
                    return reject(error);
                }
                console.log('dynamobd!');
                //console.log((data || {}).Item);
                //const resultJson = JSON.parse(data)
                if((data || {}).Item) {
                    redis.setex(phoneNumber, 20000, JSON.stringify(data.Item));
                    return resolve(data.Item);
                }
                return resolve({ msg : 'No data Exist for this user!'});
                //console.log(data.Item);
                
            });
        });
    }

    //updatedata method
    updateData(params) {

        const validKeys = [ 'userName', 'userAge', 'userId'];
        console.log("updateData is called");
        console.log(typeof params);
        const phoneNumber = Number(params.phoneNumber); 
        let uExpression = "set";
        let ExAtName = {};
        let ExAtValue = {};
        
        for (let key of Object.keys(params)) {
            if (validKeys.includes(key) && key != 'phoneNumber') {
                uExpression += ` #${key} = :${key},`
                ExAtName[`#${key}`] = key;
                ExAtValue[`:${key}`] = params[key]; 
            }
        }
        uExpression = uExpression.slice(0,-1);
        console.log(uExpression);
        this.params = {
            TableName: "userAccount",
            Key: {phoneNumber: Number(phoneNumber)},
            UpdateExpression: uExpression,
            ExpressionAttributeNames: ExAtName,
            ExpressionAttributeValues: ExAtValue
        }
        
        console.log(this.params);
        return new Promise((resolve, reject) => {
            redis.del(phoneNumber);
            ddb.update(this.params, (error, data) => {
                if(error) {
                    reject(error);
                }
                resolve({ msg: "Your Data is Updated!" });
            });
        });
    }

    //deleteuser method
    deleteUser(params) {
        console.log('deleteUser is Called !');
        this.params = {
            TableName: "userAccount",
            Key: { phoneNumber: params.phoneNumber}
        }
        console.log(this.params);
        return new Promise((resolve, reject) => {
            redis.del(Number(params.phoneNumber));
            ddb.delete(this.params, (error, data) => {
                if(error) {
                    reject(error);
                }
                resolve({ msg: "Your Detail is Deleted !"});
            });
        });
    }

};

module.exports = Person;