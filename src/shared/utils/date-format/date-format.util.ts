function formatDateTime (dateTime: string): string {
  try {
    const date = new Date(dateTime);
    
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  } catch (err) {
    console.error("неверный формат даты", err);
    return "неверный формат даты";
  }
};

/**
  ===== ПРЕОБРАЗОВАНИЕ ДАТЫ 31-03-2026 В ЧИСЛО МЕСЯЦ, ГОД =====
**/
function formatDate(date: string): string {
  const [year, month, day] = date.split('-');
  const months = [
    "Января", "Февраля", "Марта", 
    "Апреля", "Мая", "Июня", 
    "Июля", "Августа", "Сентября", 
    "Октября", "Ноября", "Декабря",
  ] as const;

  return `${parseInt(day, 10)} ${months[parseInt(month, 10) -1]}, ${year}`;
}

/*
  !!!!! ==  ОПТИМИЗИРОВАТЬ ПОД РАЗНЫЕ ФОРМАТЫ ДАТЫ  == !!!!!
*/
function formatDateToRus(date: string): string {
  const [year, month, day] = date.split('-');
  return `${day}.${month}.${year}`;
}

function formatTimeRange(start: string, end: string, timezone: string) {
  const formatter = new Intl.DateTimeFormat("ru-RU", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${formatter.format(new Date(start))}-${formatter.format(new Date(end))}`;
}

function formatDateToString(date: Date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}-${month}-${year}`;
}

function formatDateWeek(date?: Date | string): string {
  const months = [
    "Января", "Февраля", "Марта", 
    "Апреля", "Мая", "Июня", 
    "Июля", "Августа", "Сентября", 
    "Октября", "Ноября", "Декабря",
  ] as const;

  const weeks = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"] as const;

  let current_date: Date;

  if (!date) {
    current_date = new Date();
  } else {
    current_date = new Date(date);
  }

  if (isNaN(current_date.getTime())) return "- - - - -";

  const dayOfWeek = weeks[current_date.getDay()];
  const dayNum = current_date.getDate();
  const monthName = months[current_date.getMonth()];
  const year = current_date.getFullYear();

  return `${dayOfWeek}, ${dayNum} ${monthName}, ${year}г.`;
}

export {
  formatDateTime,
  formatDate,
  formatDateToRus,
  formatTimeRange,
  formatDateWeek,
  formatDateToString
};
