const express = require('express');
const router = express.Router();
let userID = '';

router.get('/history', function (req, res, next) {
    userID = req.session.user;
    res.render('history', { title: 'History', userID: userID });
 });

 router.get('/status', function (req, res, next) {
    userID = req.session.user;
    res.render('orderStatus', { title: 'Order Status', userID: userID });
 });

 router.get('/yourDesign', function (req, res, next) {
    userID = req.session.user;
    res.render('designed', { title: 'Your Design', userID: userID });
 });

 module.exports = router;