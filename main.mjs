import express from "express";
import { engine } from "express-handlebars";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { about, home, notFound, serverError } from "./lib/handlers.mjs";
import * as url from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const app = express();
const port = process.env.port || 3000;

// Настройка механизма view handlebars
app.engine(
  "handlebars",
  ".hbs",
  engine({
    defaultLayout: "main",
  })
);

app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.static(__dirname + "/public"));

app.get("/", home);

app.get("/about", about);

// Пользовательская страница 404
app.use(notFound);

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
