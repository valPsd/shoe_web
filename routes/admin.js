const express = require('express');
const router = express.Router();
let userID = '';
const firebase = require("firebase");
const firebaseAdmin = require('firebase-admin');
const db = firebase.firestore();
let orderList, orderIDList;
const listStatus = ["รับยอดแล้ว", "กำลังจัดส่ง", "จัดส่งเรียบร้อย"]

// require("firebase/storage");
// global.XMLHttpRequest = require("xhr2");
// const storage = firebase.storage().ref();
const storage = firebaseAdmin.storage();
const bucket = storage.bucket();

const multer = require("multer");
const upload = multer({
   storage: multer.memoryStorage(),
   limits: {
      fileSize: 5 * 1024 * 1024,
   }
});

router.get('/status', function (req, res, next) {
   userID = req.session.admin;
   orderList = [];
   orderIDList = [];
   db.collection("Orders")
      .get()
      .then((querySnapshot) => {
         querySnapshot.forEach((doc) => {
            orderList.push(doc.data());
            orderIDList.push(doc.id);
         });
         res.render('admin/statusDelivery', { title: 'Delivery Status', adminID: userID, orderList: orderList, orderIDList: orderIDList });
      })
      .catch((error) => {
         console.log("Error getting documents: ", error);
         msg = 'มีข้อผิดพลาดเกิดขึ้น กรุณาลองอีกครั้ง';
         path = 'login';
         res.redirect('/success/' + msg + '/' + path);
      });
});

router.get('/status/detail/:orderID', function (req, res, next) {
   const { orderID } = req.params;
   const index = orderIDList.indexOf(orderID);
   const order = orderList[index];
   res.render('admin/detailDelivery', { title: 'Delivery Status', adminID: userID, order: order, orderID: orderID, listStatus: listStatus });
});

router.get('/shoes', function (req, res, next) {
   let shoeList = [];
   db.collection("Products")
      .get()
      .then((querySnapshot) => {
         querySnapshot.forEach((doc) => {
            shoeList.push(doc.data());
         });
         res.render('admin/allShoes', { title: 'Products', adminID: userID, shoeList: shoeList });
      })
      .catch((error) => {
         console.log("Error getting documents: ", error);
         msg = 'มีข้อผิดพลาดเกิดขึ้น กรุณาลองอีกครั้ง';
         path = 'login';
         res.redirect('/success/' + msg + '/' + path);
      });
});

router.get('/addProduct', function (req, res, next) {
   res.render('admin/addProduct', { title: 'Add Product', adminID: userID });
});

router.post('/saveProduct', upload.single("shoeImg"), async function (req, res, next) {
   const { name, price, detail, shoeType, modify, size, stock } = req.body;

   const folder = 'Products';
   const fileName = `${folder}/${Date.now()}`;
   const fileUpload = bucket.file(fileName);
   const newName = fileUpload.name.replace('/', '%2F');
   const blobStream = fileUpload.createWriteStream({
      metadata: {
         contentType: req.file.mimetype
      }
   });
   blobStream.on('error', (err) => {
      console.log(err);
   })
   blobStream.on('finish', async () => {
      const downloadURL = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${newName}?alt=media&token=d49cf551-0f17-4907-b91b-9586dd47638e`;
      const usersDb = db.collection('Products');
      await usersDb.add({
         Image: downloadURL,
         Name: name,
         Price: price,
         Detail: detail,
         Type: shoeType,
         Modify: modify,
         Size: size,
         Stock: stock
      }).then(function () {
         msg = 'เพิ่มสินค้าสำเร็จ';
         path = 'admin shoes';
         res.redirect('/success/' + msg + '/' + path);
      }).catch(function (error) {
         console.log('Error creating new doc:', error);
         msg = 'มีข้อผิดพลาดเกิดขึ้น กรุณาลองอีกครั้ง';
         path = 'admin shoes';
         res.redirect('/success/' + msg + '/' + path);
      });
   })
   blobStream.end(req.file.buffer);

   // try {
   //    const file = req.file;
   //    const timestamp = Date.now();
   //    const tempName = file.originalname.split(".")[0];
   //    const type = file.originalname.split(".")[1];
   //    const fileName = `${tempName}_${timestamp}.${type}`;
   //    const imageRef = storage.child(fileName);
   //    const metadata = {
   //       contentType: req.file.mimetype
   //    };
   //    const snapshot = await imageRef.put(file.buffer, metadata);
   //    const downloadURL = await snapshot.ref.getDownloadURL();

   //    const usersDb = db.collection('Products');
   //    await usersDb.add({
   //       Image: downloadURL,
   //       Name: name,
   //       Price: price,
   //       Detail: detail,
   //       Type: shoeType,
   //       Modify: modify,
   //       Size: size,
   //       Stock: stock
   //    }).then(function () {
   //       msg = 'เพิ่มสินค้าสำเร็จ';
   //       path = 'admin shoes';
   //       res.redirect('/success/' + msg + '/' + path);
   //    }).catch(function (error) {
   //       console.log('Error creating new doc:', error);
   //       msg = 'มีข้อผิดพลาดเกิดขึ้น กรุณาลองอีกครั้ง';
   //       path = 'admin shoes';
   //       res.redirect('/success/' + msg + '/' + path);
   //    });
   // } catch (error) {
   //    console.log(error)
   //    msg = 'มีข้อผิดพลาดเกิดขึ้น กรุณาลองอีกครั้ง';
   //    path = 'admin shoes';
   //    res.redirect('/success/' + msg + '/' + path);
   //    //res.status(400).send(error.message);
   // }
});

router.post('/editOrder/:doc', async function (req, res, next) {
   const { status, tracking } = req.body;
   const doc = req.params.doc;
   const usersDb = db.collection('Orders');
   await usersDb.doc(doc).update({
      Status: status,
      TrackingNumber: tracking
   }).then(function () {
      msg = 'อัพเดทข้อมูลสำเร็จ';
      path = 'admin status';
      res.redirect('/success/' + msg + '/' + path);
   }).catch(function (error) {
      console.log('Error creating new user:', error);
      msg = 'มีข้อผิดพลาดเกิดขึ้น กรุณาลองอีกครั้ง';
      path = 'admin status';
      res.redirect('/success/' + msg + '/' + path);
   });
})

module.exports = router;