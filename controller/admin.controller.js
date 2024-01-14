const pool = require("../db/index");
const db = pool.promise();
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const users = require("../models/users.model");
const services = require("../models/services.model");
const posts = require("../models/posts.model");
const booking = require("../models/booking.model");
const contacts = require("../models/contacts.model");
const nurses = require("../models/nurse.model");
const doctors = require("../models/doctor.model");

function middleware(req, res, next) {
  const token = req.cookies.authtoken;
  try {
    jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    console.log(err);
    res.clearCookie("authtoken");
    res.redirect("/api/admin/login");
  }
}

const controller = {
  GetAllTables: async (req, res, next) => {
    middleware(req, res, next);
    const [data, _] = await db.query(
      "SELECT * FROM booking LIMIT 0,5;SELECT * FROM contacts LIMIT 0,5;SELECT * FROM posts LIMIT 0,5;SELECT * FROM `Nurse-job` LIMIT 0,5;SELECT * FROM `Doctor-job` LIMIT 0,5;"
    );

    const booking = data[0];
    const contacts = data[1];
    const posts = data[2];
    const nurse = data[3];
    const doctor = data[4];

    const Data = {
      booking: booking,
      contacts: contacts,
      posts: posts,
      nurse: nurse,
      doctor: doctor,
    };

    Data.posts.forEach((post) => {
      let blob = post.image;
      let buffer = Buffer.from(blob);
      let base64String = buffer.toString("base64");
      post.image = base64String;
    });

    res.render("admin/index", { data: Data });
  },
  GetService: async (req, res, next) => {
    middleware(req, res, next);
    const Services = await services.GetAllServices(db);
    res.render("admin/services", {
      services: Services,
    });
  },
  GetBooking: async (req, res, next) => {
    middleware(req, res, next);
    const Booking = await booking.GetAllBooking(db);
    res.render("admin/booking", { data: Booking });
  },
  DeleteBooking: async (req, res, next) => {
    middleware(req, res, next);
    const id = req.params.id;
    const success = await booking.DeleteBooking(db, id);
    if (success) {
      res.json({
        done: true,
      });
      return;
    }
    res.json({
      done: false,
    });
  },
  GetContacts: async (req, res, next) => {
    middleware(req, res, next);
    const Contacts = await contacts.GetAllContacts(db);
    res.render("admin/contact", { data: Contacts });
  },
  DeleteContacts: async (req, res, next) => {
    middleware(req, res, next);

    const id = req.params.id;

    const success = await contacts.DeleteContacts(db, id);

    if (success) {
      res.json({
        done: true,
      });
      return;
    }
    res.json({
      done: false,
    });
  },
  GetNurses: async (req, res, next) => {
    middleware(req, res, next);

    const jobs = await nurses.GetAllNursesJobApp(db);

    res.render("admin/nurse", { data: jobs });
  },
  DeleteNurse: async (req, res, next) => {
    middleware(req, res, next);
    const id = req.params.id;

    const success = await nurses.DeleteNurseJobApp(db, id);
    if (success) {
      res.json({
        done: true,
      });
      return;
    }
    res.json({
      done: false,
    });
  },
  GetDoctor: async (req, res, next) => {
    middleware(req, res, next);
    const jobs = await doctors.GetAllDoctorsJobApp(db);

    res.render("admin/doctor", { data: jobs });
  },
  DeleteDoctor: async (req, res, next) => {
    middleware(req, res, next);
    const id = req.params.id;

    const success = await doctors.DeleteDoctorsJobApp(db, id);
    if (success) {
      res.json({
        done: true,
      });
      return;
    }
    res.json({
      done: false,
    });
  },
  GetPosts: async (req, res, next) => {
    middleware(req, res, next);

    const Posts = await posts.GetAllPosts(db);
    res.render("admin/posts", { data: Posts });
  },
  AddPost: async (req, res, next) => {
    middleware(req, res, next);
    const post = req.body;

    const success = await posts.AddNewPosts(db, post);
    if (success) {
      res.json({
        done: true,
      });
      return;
    }
    res.json({
      done: false,
    });
  },
  EditPost: async (req, res, next) => {
    middleware(req, res, next);

    const post = req.body;

    const success = await posts.EditPost(db, post);
    if (success) {
      res.json({
        done: true,
      });
      return;
    }
    res.json({
      done: false,
    });
  },
  DeletePost: async (req, res, next) => {
    middleware(req, res, next);

    const id = req.params.id;

    const success = await posts.DeletePost(db, id);

    if (success) {
      res.json({
        done: true,
      });
      return;
    }
    res.json({
      done: false,
    });
  },
  AddNewService: async (req, res, next) => {
    middleware(req, res, next);
    const service = req.body;

    const done = await services.AddService(db, service);
    if (done) {
      return res.json({
        success: true,
      });
    }
    res.json({
      success: false,
      err: "Error Has Occurred Please Contact Me:",
    });
  },
  DeleteService: async (req, res, next) => {
    middleware(req, res, next);

    const id = req.params.id;

    const success = await services.DeletePost(db, id);

    if (success) {
      res.json({
        done: true,
      });
      return;
    }
    res.json({
      done: false,
    });
  },
  GetLogin: (req, res) => {
    res.render("admin/login");
  },
  Login: async (req, res) => {
    const user = req.body;

    const success = await users.LoginUser(db, user, res);

    if (success) {
      res.send(`  
      <script>
        location.href = "/api/admin"
      </script>`);
      return;
    }

    res.redirect("/api/admin/login");
  },
  CheckForNotifcation: async (req, res) => {
    const day = new Date().getDate();
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const date = `${year}-${month + 1}-${day}`;
    const [newNotifcation, _] = await db.query(
      "SELECT id FROM booking WHERE CAST(`created-at` AS DATE) = ?;SELECT id FROM contacts WHERE CAST(`created-at` AS DATE) = ?;SELECT id FROM `Doctor-job` WHERE CAST(`created-at` AS DATE) = ?;SELECT id FROM `Nurse-job` WHERE CAST(`created-at` AS DATE) = ?;",
      [date, date, date, date]
    );
    const NotifcationData = {
      Booking: newNotifcation[0],
      Contacts: newNotifcation[1],
      DoctorJob: newNotifcation[2],
      NurseJob: newNotifcation[3],
    };

    res.json({
      NotifcationData,
    });
  },
};

module.exports = controller;
