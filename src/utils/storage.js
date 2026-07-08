export function getData(key, defaultValue) {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : defaultValue;
}

export function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}