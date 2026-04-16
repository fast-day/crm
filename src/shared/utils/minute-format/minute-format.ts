export function minuteFormat(minute: number): string {
  if (minute <= 0) {
    return "0 мин";
  }
  
  const hours = Math.floor(minute / 60);
  const minutes = minute % 60;
  
  const parts: string[] = [];
  
  if (hours > 0) {
    const hourWord = getHourWord(hours);
    parts.push(`${hours} ${hourWord}`);
  }
  
  if (minutes > 0) {
    parts.push(`${minutes} мин.`);
  }
  
  return parts.join(" ");
}

function getHourWord(hours: number): string {
  const lastDigit = hours % 10;
  const lastTwoDigits = hours % 100;
  
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return "часов";
  }
  
  if (lastDigit === 1) {
    return "час";
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    return "часа";
  } else {
    return "часов";
  }
}
