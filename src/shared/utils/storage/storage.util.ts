function setStorageItem(key: string, value: string) {
  localStorage.setItem(key, value);
}

function getStorageItem(key: string, defaultValue: string) {
  const storedValue = localStorage.getItem(key);
  return storedValue !== null ? storedValue : defaultValue;
}

function clearStorageItem(key: string) {
  localStorage.removeItem(key);
}

export { setStorageItem, getStorageItem, clearStorageItem };
