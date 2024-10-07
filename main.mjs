import express from "express";
import { create } from "express-handlebars";
import { dirname } from "path";
import { fileURLToPath } from "url";
import {
  about,
  home,
  notFound,
  uniq,
  sectionTest,
  serverError,
  newsletterSignupProcess,
  newsLetterSignupThankYou,
  newsletter,
  api,
  vacationPhotoContestProcess,
  vacationPhoto,
  vacationPhotoThankYou,
  newsLetterSignup,
} from "./lib/handlers.mjs";
import * as url from "node:url";
import bodyParser from "body-parser";
import multyparty from "multiparty";
import cookieParser from "cookie-parser";
import { credentials } from "./lib/config.mjs";
import session from "express-session";
import { flashForestTourist } from "./lib/flash.mjs";


const __dirname = dirname(fileURLToPath(import.meta.url));

export const app = express();
const port = process.env.port || 3000;

const hbs = create({
  // Specify helpers which are only registered on this instance.
  defaultLayout: "main",
  extname: "hbs",
  helpers: {
    section: function (name, options) {
      if (!this._sections) this._sections = {};
      this._sections[name] = options.fn(this);
      return null;
    },
  },
});

// Настройка механизма view handlebars
app.engine(".hbs", hbs.engine);

app.set("view engine", ".hbs");
app.set("views", "./views");
app.use(express.static(__dirname + "/public"));
app.use(
  "/assets/vendor/bootstrap/css",
  express.static(__dirname + "/node_modules/bootstrap/dist/css")
);
app.use(
  "/assets/vendor/bootstrap/js",
  express.static(__dirname + "/node_modules/bootstrap/dist/js")
);
app.use(
  "/assets/vendor/bootstrap/icons",
  express.static(__dirname + "/node_modules/bootstrap/dist/icons")
);

// app.use(express.static(__dirname + "/views/contest"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser(credentials.cookieSecret))
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: credentials.cookieSecret,
}))
app.use(flashForestTourist)
app.get("/", home);
app.get("/about", about);
app.get("/uniq", uniq);
app.get("/section-test", sectionTest);
app.get("/newsletter-signup", newsLetterSignup);
app.post("/newsletter-signup/process", newsletterSignupProcess);
app.get("/newsletter-signup-thank-you", newsLetterSignupThankYou);
app.get("/newsletter-archive", newsLetterSignupThankYou);
app.get("/newsletter", newsletter);
app.get("/contest/vacation-photo", vacationPhoto);
app.post("/contest/vacation-photo/:year/:month", (req, res) => {
  console.log("");
  const form = new multyparty.Form();
  form.parse(req, (err, fields, files) => {
    if (err) return res.status(500).send({ error: err.message });
    vacationPhotoContestProcess(req, res, fields, files);
  });
});


// Пользовательская страница 404
app.use(notFound);
// Пользовательская страница 404
app.use(serverError);

// Запуск сервера

if (import.meta.url.startsWith("file:")) {
  const modulePath = url.fileURLToPath(import.meta.url);
  if (process.argv[1] === modulePath) {
    app.listen(port, () => {
      console.log(
        `Сервер запущен по адресу http://localhost:${port}  Нажмите Cntl + C для завершения работы`
      );
    });
  }
}
