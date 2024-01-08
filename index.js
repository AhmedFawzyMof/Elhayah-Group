const express = require("express");
const router = require("./routes/router");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
//express use
app.use(cors(corsOptions));
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use("/", router);
app.use(express.static("static"));

// Api for admin
const ApiRouter = require("./routes/api.router");

app.use("/api/admin", ApiRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
