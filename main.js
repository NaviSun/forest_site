import express from "express";
import { engine } from "express-handlebars";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { getFortune } from "./lib/fortune.js";


const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = process.env.port || 3000;

// Настройка механизма view handlebars
app.engine(
  "handlebars",
  engine({
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => res.render("home"));

app.get("/about", (req, res) => {
  
  res.render("about", { fortune: getFortune() });
});

// Пользовательская страница 404
app.use((req, res) => {
  res.status(404);
  res.render("404");
});

app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(500);
  res.render("500");
});

// Запуск сервера
app.listen(port, () => {
  console.log(
    `Сервер запущен по адресу http://localhost:${port}  Нажмите Cntl + C для завершения работы`
  );
});
