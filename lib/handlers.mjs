import { getFortune } from "./fortune.mjs";

const VALID_EMAIL_REGEX = new RegExp('^[a-zA-Z0-9.!#$%&\'*+\/=?^_`{|}~-]+@' +
  '[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?' +
  '(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$')

const home = (req, res) => {
  res.cookie("monster", "test");
  res.cookie("signed_monster", "test", { signed: false });
  res.render("home");
};
const about = (req, res) => res.render("about", { fortune: getFortune() });
//Не использовать основной шаблон, или можно указать другой шаблон
const uniq = (req, res) => res.render("uniq", { layout: false });
const sectionTest = (req, res) => res.render("section-test");
const notFound = (req, res) => res.render("404");
const serverError = (err, req, res, next) => {
  console.log(err.message);
  res.render("500");
};
// fake "newsletter signup" interface
class NewsletterSignup {
  constructor({ name, email }) {
    this.name = name
    this.email = email
  }
  async save() {
    // here's where we would do the work of saving to a database
    // since this method is async, it will return a promise, and
    // since we're not throwing any errors, the promise will
    // resolve successfully
  }
}

const newsLetterSignup = (req, res) => {
  res.render("newsletter-signup", { csrf: "Здесь находится токен CSRF" });
};

/* const newsletterSignupProcess = (req, res) => {
  console.log("Форма (из строки запроса): " + req.query.form);
  console.log("Токен CSRF (из скрытого поля формы): " + req.body._csrf);
  console.log("Имя (из видимого поля формы): " + req.body.name);
  console.log("E-mail (из видимого поля формы): " + req.body.email);
  res.redirect(303, "/newsletter-signup-thank-you");
};
 */
const newsletterSignupProcess = (req, res) => {
  const name = req.body.name || '', email = req.body.email || ''
  // input validation
  if(!VALID_EMAIL_REGEX.test(email)) {
    req.session.flash = {
      type: 'danger',
      intro: 'Validation error!',
      message: 'The email address you entered was not valid.',
    }
    return res.redirect(303, '/newsletter-signup')
  }
  // NewsletterSignup is an example of an object you might create; since
  // every implementation will vary, it is up to you to write these
  // project-specific interfaces.  This simply shows how a typical
  // Express implementation might look in your project.
  new NewsletterSignup({ name, email }).save()
    .then(() => {
      req.session.flash = {
        type: 'success',
        intro: 'Thank you!',
        message: 'You have now been signed up for the newsletter.',
      }
      return res.redirect(303, '/newsletter-archive')
    })
    .catch(err => {
      req.session.flash = {
        type: 'danger',
        intro: 'Database error!',
        message: 'There was a database error; please try again later.',
      }
      return res.redirect(303, '/newsletter-archive')
    })
}

const newsLetterSignupThankYou = (req, res) => {
  res.render("newsletter-signup-thank-you");
};

const newsletter = (req, res) => {
  res.render("newsletter", { csrf: "Здесь находится токен CSRF" });
};

const api = {
  newsLetterSignup: (req, res) => {
    console.log("Токен CSRF (из скрытого поля формы): " + req.body._csrf);
    console.log("Имя (из видимого поля формы): " + req.body.name);
    console.log("E-mail (из видимого поля формы): " + req.body.email);
    res.send({ result: "Success" });
    return res;
  },
};
const vacationPhoto = (req, res) => {
  res.render("contest/vacation-photo");
};

const vacationPhotoContestProcess = (req, res, fields, files) => {
  console.log("данные поля: ", fields);
  console.log("Файлы: ", files);
  res.send({ result: "success" });
};
const vacationPhotoThankYou = (req, res) => {
  res.render("contest/vacation-photo-thank-you");
};

export {
  home,
  about,
  notFound,
  uniq,
  sectionTest,
  serverError,
  newsLetterSignup,
  NewsletterSignup,
  newsletterSignupProcess,
  newsLetterSignupThankYou,
  newsletter,
  api,
  vacationPhotoContestProcess,
  vacationPhoto,
  vacationPhotoThankYou,
};
