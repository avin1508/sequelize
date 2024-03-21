const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./config');
const { Employee } = require('./models')

const app = express();
const PORT = 3000;

app.use(bodyParser.json());


app.post('/employees',async(req,res) => {
    try{
        const{ employeeName , employeeId} = req.body;
        const employee = await Employee.create({employeeName,employeeId});
        res.status(201).json(employee);
    }catch(error)
    {
        console.error('Error while creating employee',error);
        res.status(500).json({error:'failed to create employee'})
    }
})


sequelize.sync()
.then(() =>{
    console.log("Models synchoronized with database");
    app.listen(PORT,()=>{
        console.log(`server listening on port ${PORT}`)
    });
})
.catch(err => {
    console.log('unable to synchronize model with database:',err)
});