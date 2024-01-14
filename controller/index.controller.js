const pool = require("../db/index");
const services = require("../models/services.model");
const posts = require("../models/posts.model");
const booking = require("../models/booking.model");
const contacts = require("../models/contacts.model");
const nurses = require("../models/nurse.model");
const doctors = require("../models/doctor.model");
const db = pool.promise();

function EngOrAr(req) {
  let eng = req.cookies.eng;
  if (eng) {
    return JSON.parse(eng);
  } else {
    return false;
  }
}

const controller = {
  GetHomePage: async function (req, res) {
    const service = await services.GetAllServices(db);
    const eng = EngOrAr(req);

    res.render("index", {
      service: service,
      eng: eng,
    });
  },
  GetDetailsPage: async function (req, res) {
    const slug = req.params.slug;

    const service = await services.GetServiceBySlug(db, slug);

    const eng = EngOrAr(req);

    res.render("service-details", { service: service, eng: eng });
  },
  BookFromService: async function (req, res) {
    const book = req.body;

    const success = await booking.AddBooking(db, book);

    if (success) {
      res.json({
        success: true,
      });
      return;
    }
    res.json({
      success: false,
    });
  },
  FaqPage: function (req, res) {
    const eng = EngOrAr(req);

    res.render("faq", { eng: eng });
  },
  ContactPage: function (req, res) {
    const eng = EngOrAr(req);

    res.render("contact-us", { eng: eng });
  },
  AboutPage: function (req, res) {
    const eng = EngOrAr(req);

    res.render("about-us", { eng: eng });
  },
  GetServices: async function (req, res) {
    const Services = await services.GetAllServices(db);
    const eng = EngOrAr(req);

    res.render("services", { services: Services, eng: eng });
  },
  JobPage: function (req, res) {
    const career = req.params.career;
    const eng = EngOrAr(req);

    if (career == "doc") {
      return res.render("job-doctor.ejs", { eng: eng });
    }
    res.render("job-nurs.ejs", { eng: eng });
  },
  GetBookingPage: async function (req, res) {
    const Services = await services.GetAllServices(db);
    const eng = EngOrAr(req);

    res.render("booking", { services: Services, eng: eng });
  },
  GetBlogPage: async function (req, res) {
    const Posts = await posts.GetAllPosts(db);

    const eng = EngOrAr(req);

    res.render("blog.ejs", { posts: Posts, eng: eng });
  },
  GetBlogPost: async function (req, res) {
    const id = req.params.id;

    const post = await posts.GetBlogPost(db, id);

    const eng = EngOrAr(req);

    res.render("post.ejs", { post: post, eng: eng });
  },
  SetLang: (req, res) => {
    const lang = req.params.lang;
    if (lang == "en") {
      res.cookie("eng", "true");
    } else {
      res.cookie("eng", "false");
    }
    res.redirect("/");
  },
  ContactUs: async (req, res) => {
    const contact = req.body;

    const success = await contacts.AddContacts(db, contact);

    if (success) {
      res.json({
        success: true,
      });
      return;
    }
    res.json({
      success: false,
    });
  },
  AddDoctorJob: async (req, res) => {
    const jobapp = req.body;

    const success = await doctors.AddDoctorJobApp(db, jobapp);

    if (success) {
      res.json({
        success: true,
      });
      return;
    }

    res.json({
      success: false,
    });
  },
  AddNurseJob: async (req, res) => {
    const jobapp = req.body;

    const success = await nurses.AddNurseJobApp(db, jobapp);
    if (success) {
      res.json({
        success: true,
      });
    }
    res.json({
      success: false,
    });
  },
};

module.exports = controller;
