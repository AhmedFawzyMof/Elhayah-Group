const express = require("express");
const router = express.Router();
const controller = require("../controller/admin.controller");

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
router.post("/services", controller.AddNewService);
router.post("/add/post", controller.AddPost);

// Delete Record
router.post("/delete/posts/:id", controller.DeletePost);
router.post("/delete/services/:id", controller.DeleteService);
router.post("/delete/booking/:id", controller.DeleteBooking);
router.post("/delete/contacts/:id", controller.DeleteContacts);
router.post("/delete/nurse/:id", controller.DeleteNurse);
router.post("/delete/doctor/:id", controller.DeleteDoctor);

module.exports = router;
