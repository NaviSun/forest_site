import portfinder from "portfinder";
import puppeteer from "puppeteer";
import { expect, jest, test } from "@jest/globals";
import { app } from "../../main.mjs";

let server = null;
let port = null;

describe("Инициализация сервера", () => {
  beforeEach(async () => {
    port = await portfinder.getPortPromise();
    server = app.listen(port);
  });
});

describe("Выключение сервера", () => {
    afterEach(() => {
  server.close();
});
})

describe("Домашняя страница ссылается на страницу Описание", () => {
    test("домашняя страница ссылается на страницу Описание", async () => {
        expect.assertions(0);
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(`http://localhost:${port}`);
        await Promise.all([
          page.waitForNavigation(),
          page.click('[data-test-id="about"]'),
        ]);
        expect(page.url()).toBe(`http://localhost:${port}/about`);
        await browser.close();
      });  
})


