export const getLocalStorageData = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const setLocalStorageData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};