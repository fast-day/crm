export const getProgressMessage = (percent: number) => {
  if (percent === 0)  return { title: "Давайте начнём", text: "Первый шаг займёт пару минут" };
  if (percent < 40)   return { title: "Хорошее начало", text: "Самое сложное позади, продолжайте" };
  if (percent < 70)   return { title: "Вы на полпути", text: "Ещё немного, и сервис будет готов к работе" };
  if (percent < 100)  return { title: "Почти готово", text: "Осталось совсем чуть-чуть" };
  return { title: "Всё готово", text: "Сервис полностью настроен" };
}
