import { about, home, serverError, notFound } from "../handlers.mjs";
import { jest } from "@jest/globals";

describe("Home page renders", () => { 
  test("home page renders", () => {
    expect.assertions(1)
    const req = {};
    const res = { render: jest.fn() };
    home(req, res);
    expect(res.render.mock.calls[0][0]).toBe("home");
  });
})

describe("Cтраница о нас отобраается с предсказаниями", () => { 
test("cтраница о нас отобраается с предсказаниями", () => {
  expect.assertions(3)
  const req = {};
  const res = { render: jest.fn() };
  about(req, res);
  expect(res.render.mock.calls.length).toBe(1);
  expect(res.render.mock.calls[0][0]).toBe("about");
  expect(res.render.mock.calls[0][1]).toStrictEqual(
    expect.objectContaining({
      fortune: expect.stringMatching(/\W/),
    })
  );
})});

describe("Rendering обработчика ошибок 404", () => { 
test("rendering обработчика ошибок 404", () => {
  expect.assertions(2)
  const req = {};
  const res = { render: jest.fn() };
  notFound(req, res);
  expect(res.render.mock.calls.length).toBe(1);
  expect(res.render.mock.calls[0][0]).toBe("404");
})});

describe("Render ошибки сервера 500", () => { 
test("render ошибки сервера 500", () => {
  expect.assertions(2)
  const err = new Error("some error");

  const req = {};
  const res = { render: jest.fn() };
  const next = jest.fn();
  serverError(err, req, res, next);
  expect(res.render.mock.calls.length).toBe(1);
  expect(res.render.mock.calls[0][0]).toBe("500");
})});
