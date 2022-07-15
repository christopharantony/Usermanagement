const jwt = require('jsonwebtoken');
const Admin = require("../Models/AdminModel");
const { adminRegister, adminLogin, editUserDetails, Edit, Delete } = require('../Controllers/AuthAdminController');
const { checkAdmin } = require('../Middlewares/AuthMiddleware');
const adminrouter = require('express').Router();

adminrouter.post('/adminLogin', adminLogin)
adminrouter.use((req, res, next) => {
    const token = req.cookies.adminjwt;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async(err, decodedToken) => {
            if (err) {
                res.redirect('/')
            } else {
                const admin = await Admin.findById(decodedToken.id);
                if (admin) {
                    next();
                } else {
                    res.redirect('/')
                }
            }
        });
    }else{
        res.redirect('/')
    }
})
adminrouter.post('/', checkAdmin )
adminrouter.get('/edit/:id', editUserDetails )
adminrouter.post('/edituser/:id', Edit )
adminrouter.post('/delete/:id', Delete )
adminrouter.post('/adminRegister', adminRegister)

module.exports = adminrouter;