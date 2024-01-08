const express = require("express");
const router = express.Router();
const controller = require("../controller/api.controller");

router.get("/", controller.GetAllTables);
router.get("/login", controller.GetLogin);
router.post("/login", controller.Login);
router.get("/contacts", controller.GetContacts);
router.get("/jobs/nurse", controller.GetNurses);
router.get("/jobs/doctor", controller.GetDoctor);
router.get("/booking", controller.GetBooking);
router.get("/posts", controller.GetPosts);
router.get("/services", controller.GetService);
router.post("/add/post", controller.AddPost);

module.exports = router;
