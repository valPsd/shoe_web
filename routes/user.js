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

router.get('/shoes/:shoeType', function (req, res, next) {
   userID = req.session.user;
   const shoeType = req.params.shoeType;
   let type = "";
   if (shoeType == "men") {
      type = "รองเท้าผู้ชาย"
   }
   else if (shoeType == "women") {
      type = "รองเท้าผู้หญิง"
   }
   else {
      type = "รองเท้าเด็ก"
   }
   res.render('chooseShoe', { title: type, userID: userID });
});

router.get('/cart', function (req, res, next) {
   userID = req.session.user;
   res.render('cart', { title: 'Your Cart', userID: userID });
});

router.post('/cart', function (req, res, next) {
   const {size} = req.body;
   userID = req.session.user;
   res.render('cart', { title: 'Your Cart', userID: userID });
});

router.get('/checkout', function (req, res, next) {
   // const {size} = req.body;
   userID = req.session.user;
   res.render('checkout', { title: 'Checkout', userID: userID });
});

router.get('/payment', function (req, res, next) {
   // const {size} = req.body;
   const msg = 'ทำการสั่งซื้อสำเร็จ สามารถเช็คสถานะการจัดส่งได้ที่หน้าหลัก';
   const path = ' ';
   res.redirect('/success/' + msg + '/' + path);
});

module.exports = router;
