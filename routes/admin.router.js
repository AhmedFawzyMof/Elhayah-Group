const express = require("express");
const router = express.Router();
const controller = require("../controller/admin.controller");
const multer = require("multer");

const services = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./static/img/services");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const post = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./static/img/posts");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadPost = multer({ storage: post });
const uploadService = multer({ storage: services });

// Get Views
router.get("/", controller.GetAllTables);
router.get("/login", controller.GetLogin);
router.get("/contacts", controller.GetContacts);
router.get("/jobs/nurse", controller.GetNurses);
router.get("/jobs/doctor", controller.GetDoctor);
router.get("/booking", controller.GetBooking);
router.get("/posts", controller.GetPosts);
router.get("/services", controller.GetService);
router.get("/notifications", controller.CheckForNotifcation);

// Login
router.post("/login", controller.Login);

// Add Or Edit New Record
router.post(
  "/services",
  uploadService.single("thumbnail"),
  controller.AddNewService
);
router.post("/add/post", uploadPost.single("image"), controller.AddPost);

// Delete Record
router.post("/delete/posts/:id", controller.DeletePost);
router.post("/delete/services/:id", controller.DeleteService);
router.post("/delete/booking/:id", controller.DeleteBooking);
router.post("/delete/contacts/:id", controller.DeleteContacts);
router.post("/delete/nurse/:id", controller.DeleteNurse);
router.post("/delete/doctor/:id", controller.DeleteDoctor);

module.exports = router;
