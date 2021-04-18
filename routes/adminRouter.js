const express = require('express')
const router = express.Router()
const passport = require('passport')
const Employee = require('../models/employee')
const Owner = require('../models/owner')
const Repair = require('../models/repair')

router.use(isLoggedIn)

// employees
router.get('/employees', async (req, res) => {
    const data = await Employee.find()

    res.render('admin/employees', {
        data
    })
})

router.get('/employees-add', async (req, res) => {
    res.render('admin/addEmployee')
})

router.post('/employees-add', async (req, res) => {
    const employee = new Employee({
        name: req.body.name,
        personal_number: req.body.personal_number
    })
    await employee.save()
    res.redirect('/admin/employees')
})

router.get('/employees-remove/:id', async (req, res) => {
    await Employee.deleteOne({ _id: req.params.id })
    res.redirect('/admin/employees')
})

router.get('/employees-edit/:id', async (req, res) => {
    const employee = await Employee.findOne({ _id: req.params.id })

    res.render('admin/editEmployee', { data: employee })
})

router.post('/employees-edit/:id', async (req, res) => {
    const employee = await Employee.findOne({ _id: req.params.id })

    const newValues = {
        $set: {
            name: req.body.name,
            personal_number: req.body.personal_number
        }
    };

    await Employee.updateOne(employee, newValues)

    res.redirect(`/admin/employees`)
})



// customers
router.get('/customers', async (req, res) => {
    const data = await Owner.find()

    res.render('admin/customers', {
        data
    })
})
router.get('/customers-add', async (req, res) => {
    res.render('admin/addCustomer')
})
router.post('/customers-add', async (req, res) => {
    const customer = new Owner({
        name: req.body.name,
        email: req.body.email,
        adress: req.body.adress,
        phone: req.body.phone
    })
    await customer.save()
    res.redirect('/admin/customers')
})
router.get('/customers-remove/:id', async (req, res) => {
    await Owner.deleteOne({ _id: req.params.id })
    res.redirect('/admin/customers')
})
router.get('/customers-edit/:id', async (req, res) => {
    const customer = await Owner.findOne({ _id: req.params.id })

    res.render('admin/editCustomer', { data: customer })
})

router.post('/customers-edit/:id', async (req, res) => {
    const customer = await Owner.findOne({ _id: req.params.id })

    const newValues = {
        $set: {
            name: req.body.name,
            adress: req.body.adress,
            phone: req.body.phone,
            email: req.body.email,
        }
    };

    await Owner.updateOne(customer, newValues)

    res.redirect(`/admin/customers`)
})



// repairs
router.get('/repairs', async (req, res) => {
    const data = await Repair.find()

    res.render('admin/repairs', {
        data
    })
})
router.get('/repairs-add', async (req, res) => {
    res.render('admin/addRepair')
})
router.post('/repairs-add', async (req, res) => {
    const repair = new Repair({
        date: req.body.date,
        employees: req.body.employees,
        problem_description: req.body.problem_description,
        replaced_parts: req.body.replaced_parts,
        time: req.body.time,
        costs: req.body.costs
    })
    await repair.save()
    res.redirect('/admin/repairs')
})
router.get('/repairs-remove/:id', async (req, res) => {
    await Repair.deleteOne({ _id: req.params.id })
    res.redirect('/admin/repairs')
})

router.get('/repairs-edit/:id', async (req, res) => {
    const repair = await Repair.findOne({ _id: req.params.id })

    res.render('admin/editRepair', { data: repair})
})

router.post('/repairs-edit/:id', async (req, res) => {
    const repair = await Repair.findOne({ _id: req.params.id })

    const newValues = {
        $set: {
            date: req.body.date,
            employees: req.body.employees,
            problem_description: req.body.problem_description,
            replaced_parts: req.body.replaced_parts,
            time: req.body.time,
            costs: req.body.costs
        }
    };

    await Repair.updateOne(repair, newValues)

    res.redirect(`/admin/repairs`)
})



// PROTECT ROUTES
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next()
    res.redirect('/auth')
}

function isLoggedOut(req, res, next) {
    if (req.isAuthenticated()) return res.redirect('/auth/profile')
    next()
}


module.exports = router