const fortuneCookies = [
  "Победи свои страхи или они победят тебя",
  "рекам нуны истоки",
  "Не бойся неведомого",
  "Тебя ждет приятный сюрприз",
  "буд проще везде где только можно",
];

const getFortune = () => {
  const idx = Math.floor(Math.random() * fortuneCookies.length);
  return fortuneCookies[idx];
};


export { getFortune }