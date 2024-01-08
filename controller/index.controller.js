const pool = require("../db/index");
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
    const [service, _] = await db.query(
      "SELECT * FROM `services`;SELECT * FROM sliders"
    );
    const eng = EngOrAr(req);

    res.render("index", {
      service: service[0],
      slider: service[1],
      eng: eng,
    });
  },
  GetDetailsPage: async function (req, res) {
    const slug = req.params.slug;
    const [services, _] = await db.query(
      "SELECT * FROM `services` where slug = ?;",
      slug
    );
    const eng = EngOrAr(req);

    res.render("service-details", { service: services[0], eng: eng });
  },
  BookFromService: async function (req, res) {
    const body = req.body;

    for (let key in body) {
      if (body[key] === "" || body[key] === undefined) {
        return res.json({
          success: false,
        });
      }
    }
    const [book, _] = await db.query(
      "INSERT INTO booking (name, email, phone, gender, religion, service, date) VALUES(?,?,?,?,?,?,?)",
      [
        body.name,
        body.email,
        body.phone,
        body.gender,
        body.religion,
        body.service,
        body.date,
      ]
    );
    res.json({
      success: true,
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
    const [services, _] = await db.query("SELECT * FROM `services`");
    const eng = EngOrAr(req);

    res.render("services", { services: services, eng: eng });
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
    const [services, _] = await db.query("SELECT * FROM `services`");
    const eng = EngOrAr(req);

    res.render("booking", { services: services, eng: eng });
  },
  GetBlogPage: async function (req, res) {
    const [posts, _] = await db.query("SELECT * FROM `posts`");

    posts.forEach((post) => {
      let blob = post.image;
      let buffer = Buffer.from(blob);
      let base64String = buffer.toString("base64");
      post.image = base64String;
    });
    const eng = EngOrAr(req);

    res.render("blog.ejs", { posts: posts, eng: eng });
  },
  GetBlogPost: async function (req, res) {
    const id = req.params.id;
    const [posts, _] = await db.query("SELECT * FROM `posts` WHERE id = ?", [
      id,
    ]);
    posts.forEach((post) => {
      let blob = post.image;
      let buffer = Buffer.from(blob);
      let base64String = buffer.toString("base64");
      post.image = base64String;
    });
    const eng = EngOrAr(req);

    res.render("post.ejs", { post: posts[0], eng: eng });
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
    const body = req.body;

    for (let key in body) {
      if (body[key] === "" || body[key] === undefined) {
        return res.json({
          success: false,
        });
      }
    }
    const [add, _] = await db.query(
      "INSERT INTO `contacts` (`name`,`email`,`phone`,`comment`) VALUES(?,?,?,?)",
      [body.name, body.email, body.phone, body.message]
    );
    res.json({
      success: true,
    });
  },
  AddDoctorJob: async (req, res) => {
    const body = req.body;
    console.log(body);

    for (let key in body) {
      if (body[key] === "" || body[key] === undefined) {
        return res.json({
          success: false,
        });
      }
    }
    const [add, _] = await db.query(
      "INSERT INTO `al-haiahdb`.`Doctor-job`(`fullname`,`birth-date`,`national-id`,`birth-place`,`current-residence-address`,`specialization`,`qualification`,`other-studies`,`graduation-year`,`university`,`previous-workplaces`,`email`,`phone`,`gender`,`religion`,`patient-religion`,`patient-gender`,`preferred-worktime`) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);",
      [
        body.fullName,
        body.birthDate,
        body.nationalId,
        body.birthPlace,
        body.currentResidenceAddress,
        body.specialization,
        body.qualification,
        body.otherStudies,
        body.graduationYear,
        body.university,
        body.previousWorkplaces,
        body.email,
        body.phone,
        body.gender,
        body.religion,
        body.patientReligion,
        body.patientGender,
        body.workingHour,
      ]
    );
    res.json({
      success: true,
    });
  },
  AddNurseJob: async (req, res) => {
    const body = req.body;
    console.log(body);

    for (let key in body) {
      if (body[key] === "" || body[key] === undefined) {
        return res.json({
          success: false,
        });
      }
    }

    const [add, _] = await db.query(
      "INSERT INTO `al-haiahdb`.`Nurse-job`(`fullname`,`job`,`birth-date`,`birth-place`,`religion`,`national-id`,`current-residence-address`,`phone`,`social-situation`,`previous-workplaces`,`patient-religion`,`patient-gender`,`preferred-worktime`,`email`, `gender`) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);",
      [
        body.fullName,
        body.job,
        body.birthDate,
        body.birthPlace,
        body.religion,
        body.nationalId,
        body.currentResidenceAddress,
        body.phone,
        body.socialSituation,
        body.previousWorkplaces,
        body.patientReligion,
        body.patientGender,
        body.workingHour,
        body.email,
        body.gender,
      ]
    );
    res.json({
      success: true,
    });
  },
};

module.exports = controller;
