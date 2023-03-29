const express = require('express');
const router = express.Router();
let userID = '';
const firebase = require("firebase");
const db = firebase.firestore();

router.get('/status', function (req, res, next) {
   userID = req.session.admin;
   db.collection("Orders")
      .get()
      .then((querySnapshot) => {
         querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
         });
      })
      .catch((error) => {
         console.log("Error getting documents: ", error);
      });
   res.render('admin/statusDelivery', { title: 'Delivery Status', adminID: userID });
});

router.get('/status/detail/:orderID', function (req, res, next) {
   const { orderID } = req.params;
   res.render('admin/detailDelivery', { title: 'Delivery Status', adminID: userID });
});

router.get('/shoes', function (req, res, next) {
   res.render('admin/allShoes', { title: 'Products', adminID: userID });
});

router.get('/addProduct', function (req, res, next) {
   res.render('admin/addProduct', { title: 'Add Product', adminID: userID });
});

module.exports = router;