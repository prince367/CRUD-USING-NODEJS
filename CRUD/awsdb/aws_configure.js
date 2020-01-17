const AWS = require('aws-sdk');
let awsConfig = {
    "region": "ap-south-1",
    "endpoint": "http://dynamodb.ap-south-1.amazonaws.com"
}

console.log("Aws if configure!");
AWS.config.update(awsConfig);
const ddb = new AWS.DynamoDB.DocumentClient();
module.exports = ddb;