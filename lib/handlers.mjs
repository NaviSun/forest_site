import { getFortune } from "./fortune.mjs";

const home = (req, res) => res.render("home");
const about = (req, res) => res.render("about", { fortune: getFortune() });
//Не использовать основной шаблон, или можно указать другой шаблон
const uniq = (req, res) => res.render("uniq", { layout: false });
const sectionTest = (req, res) => res.render("section-test");
const notFound = (req, res) => res.render("404");
const serverError = (err, req, res, next) => {
  console.log(err.message)
  res.render("500")
};

const newsLetterSignup = (req, res) => {
  res.render("newsletter-signup", { csrf: "Здесь находится токен CSRF" });
};

const newsletterSignupProcess = (req, res) => {
    console.log('Форма (из строки запроса): ' + req.query.form)
    console.log('Токен CSRF (из скрытого поля формы): ' + req.body._csrf)
    console.log('Имя (из видимого поля формы): ' + req.body.name)
    console.log('E-mail (из видимого поля формы): ' + req.body.email)
    res.redirect(303, '/newsletter-signup-thank-you')
}

const newsLetterSignupThankYou = (req, res) => {
    res.render('newsletter-signup-thank-you')
}

const newsletter = (req, res) => {
    res.render('newsletter', {csrf: 'Здесь находится токен CSRF'})
}

const api = {
  newsLetterSignup: (req, res) => {
    console.log('Токен CSRF (из скрытого поля формы): ' + req.body._csrf)
    console.log('Имя (из видимого поля формы): ' + req.body.name)
    console.log('E-mail (из видимого поля формы): ' + req.body.email)
    res.send({result: 'Success'})
    return res
  },
}
const vacationPhoto = (req, res) => {
  res.render("contest/vacation-photo");
}

const vacationPhotoContestProcess = (req, res, fields, files) => {
console.log('данные поля: ', fields)
console.log('Файлы: ', files)
res.redirect(303, 'contest/vacation-photo-thank-you')
}
const vacationPhotoThankYou = (req, res) => {
  res.render("contest/vacation-photo-thank-you");
}

export {
  home,
  about,
  notFound,
  uniq,
  sectionTest,
  serverError,
  newsLetterSignup,
  newsletterSignupProcess,
  newsLetterSignupThankYou,
  newsletter,
  api,
  vacationPhotoContestProcess,
  vacationPhoto,
  vacationPhotoThankYou
};
