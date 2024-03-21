const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./config');
const { Employee } = require('./models')

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/employees', async (req, res) => {
    try {
        const { employeeName, employeeId } = req.body;
        const employee = await Employee.create({ employeeName, employeeId });
        res.status(201).json(employee);
    } catch (error) {
        console.error('Error while creating employee', error);
        res.status(500).json({ error: 'Failed to create employee' });
    }
});

app.put('/employees/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { employeeName, employeeId } = req.body;
        const employee = await Employee.findByPk(id);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        await employee.update({ employeeName, employeeId });
        res.json({ message: 'Employee updated successfully', employee });
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).json({ error: 'Failed to update employee' });
    }
});


app.get('/employees/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const employee = await Employee.findByPk(id);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.json(employee);
    } catch (error) {
        console.error('Error fetching employee:', error);
        res.status(500).json({ error: 'Failed to fetch employee' });
    }
});

app.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.findAll();
        res.json(employees);
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ error: 'Failed to fetch employees' });
    }
});


app.delete('/employees/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const employee = await Employee.findByPk(id);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        await employee.destroy();
        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).json({ error: 'Failed to delete employee' });
    }
});

sequelize.sync()
    .then(() => {
        console.log("Models synchronized with database");
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    })
    .catch(err => {
        console.log('Unable to synchronize model with database:', err);
    });
