const express = require('express');
const user = require('../controller/controller');
const router = express.Router();

//Post operation
router.post('/user/newentry', user.addNewEntry);

//Get operation
router.get('/user/getdata', user.getByUserId);

//update operation
router.put('/user/updatedata', user.updateData);

//delete operation
router.delete('/user/deletedata', user.deleteUser);
module.exports = router;