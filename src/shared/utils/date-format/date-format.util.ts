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
function formatDate(date: string) {
  const [day, month, year] = date.split('-');
  const months = [
    "Января", "Февраля", "Марта", 
    "Апреля", "Мая", "Июня", 
    "Июля", "Августа", "Сентября", 
    "Октября", "Ноября", "Декабря",
  ];

  return `${parseInt(day, 10)} ${months[parseInt(month, 10) -1]}, ${year}`;
}

export { formatDateTime, formatDate };
