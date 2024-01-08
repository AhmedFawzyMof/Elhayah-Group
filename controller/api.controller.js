const pool = require("../db/index");
const db = pool.promise();
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

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

function changeDateFormat(cdate) {
  let timestamp = Date.parse(cdate);
  let date = new Date(timestamp);
  let output = date.toISOString().slice(0, 10).replace(/-/g, "/");
  return output;
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
    const [services, _] = await db.query("SELECT * FROM services");

    res.render("admin/services", { services: services });
  },
  GetBooking: async (req, res, next) => {
    middleware(req, res, next);
    const [booking, _] = await db.query(`SELECT * FROM booking`);

    booking.forEach((book) => {
      const newDate = changeDateFormat(book.date);
      book.date = newDate;
    });

    res.render("admin/booking", { data: booking });
  },
  GetContacts: async (req, res, next) => {
    middleware(req, res, next);
    const [contacts, _] = await db.query(`SELECT * FROM contacts`);
    res.render("admin/contact", { data: contacts });
  },
  GetNurses: async (req, res, next) => {
    middleware(req, res, next);
    const [jobs, _] = await db.query("SELECT * FROM `Nurse-job`");

    jobs.forEach((job) => {
      const newDate = changeDateFormat(job["birth-date"]);
      job["birth-date"] = newDate;
    });
    res.render("admin/nurse", { data: jobs });
  },
  GetDoctor: async (req, res, next) => {
    middleware(req, res, next);
    const [jobs, _] = await db.query("SELECT * FROM `Doctor-job`");
    jobs.forEach((job) => {
      const newDate = changeDateFormat(job["birth-date"]);
      job["birth-date"] = newDate;
      const newDate2 = changeDateFormat(job["graduation-year"]);
      job["graduation-year"] = newDate2;
    });
    res.render("admin/doctor", { data: jobs });
  },
  GetPosts: async (req, res, next) => {
    middleware(req, res, next);
    const [posts, _] = await db.query(`SELECT * FROM posts`);

    posts.forEach((post) => {
      let blob = post.image;
      let buffer = Buffer.from(blob);
      let base64String = buffer.toString("base64");
      post.image = base64String;
    });

    res.render("admin/posts", { data: posts });
  },
  AddPost: async (req, res, next) => {
    middleware(req, res, next);
    const body = req.body;
    const title = body.title;
    const paragraph = body.article;
    let base64String = body.image;
    let buffer = Buffer.from(base64String, "base64");

    const [add, _] = await db.query(
      "INSERT INTO `posts`(`title`,`paragraph`,`image`) VALUES  (?,?,?)",
      [title, paragraph, buffer]
    );
    res.json({
      done: true,
    });
  },
  GetLogin: (req, res) => {
    res.render("admin/login");
  },
  Login: async (req, res, next) => {
    const body = req.body;
    const password = crypto.createHmac("sha256", body.password).digest("hex");

    const [data, _] = await db.query(
      "SELECT * FROM users WHERE (username, password) = (?, ?)",
      [body.username, password]
    );

    if (data.length > 0) {
      const token = jwt.sign(body, process.env.SECRET_KEY);

      res.cookie("authtoken", token, {
        maxAge: 900000,
        httpOnly: true,
      });
      res.send(`  
      <script>
        location.href = "/api/admin"
      </script>`);
      return; // Add this line
    }
    res.redirect("/api/admin/login");
  },
};

module.exports = controller;
