const express = require('express');
const router = express.Router();
let userID = '';

router.get('/status', function (req, res, next) {
    userID = req.session.admin;
    res.render('admin/statusDelivery', { title: 'Delivery Status', adminID: userID });
 });

 router.get('/status/detail/:orderID', function (req, res, next) {
    const {orderID} = req.params;
    res.render('admin/detailDelivery', { title: 'Delivery Status', adminID: userID });
 });

 router.get('/shoes', function (req, res, next) {
    res.render('admin/allShoes', { title: 'Products', adminID: userID });
 });

 router.get('/addProduct', function (req, res, next) {
    res.render('admin/addProduct', { title: 'Add Product', adminID: userID });
 });

 module.exports = router;