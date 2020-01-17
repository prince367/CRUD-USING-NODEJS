
const person = require('../model/model');

// console.log(typeof sUuid);

//console.log(suuid);
let user = {
     addNewEntry : ((request, response) => {
        const newMember = {
            userName: request.body.userName,
            userPhoneNumber: request.body.phoneNumber,
            userAge: request.body.userAge
        }
        console.log(newMember);
        if(!newMember.userName || !newMember.userPhoneNumber)
        {
            return response.status(400).json({ msg: 'Please enter your all details!'});
        }
        const person1 = new person();
        //console.log(request);
        const data = person1.create(newMember)
        .then(() => {
            return response.status(200).json(data);
        })
        .catch(error => response.status(400).json({msg: error}))
        
    }),
    getByUserId: ( async (request, response) => {
        //console.log("getByUser is called");
        const phoneNumber  = request.query.phoneNumber
        //console.log(request.query);
        const params = {
            "phoneNumber": Number(phoneNumber)
        };
        if(!phoneNumber) {
            return response.status(400).json({ msg : 'Please enter your phone number!'});
        }
        const person1 = new person();

        const data = await person1.getByUserId(params).catch((err) => {
            return response.status(400).send(err);
        }).catch(err => console.log(err));
        return response.status(200).send(data);
    }),
    updateData: (async (request, response) => {
        console.log("updateData is called");
        let params = request.body;
        if(!params.phoneNumber) {
            return response.status(400).json({msg: 'Please enter your phone number to update your details!'});
        }
        const person1 = new person();
        const data = await person1.updateData(params).catch((error) => {
            return response.status(400).send(error);
        });
        return response.status(200).send(data);
    }),
    deleteUser: (async (request, response) => {
        console.log("deleteUser is called");
        let phoneNumber = request.query.phoneNumber;
        let params = {
            "phoneNumber" : Number(phoneNumber)
        }
        const person1 = new person();
        if(!params.phoneNumber) {
            return response.status(400).json({msg : 'Please enter your phone number to Delete yuor details!'});
        } 
        const data = await person1.deleteUser(params).catch((error) => {
            return response.status(400).send(error);
        });
        return response.status(200).send(data);
    }) 
}
module.exports = user;


