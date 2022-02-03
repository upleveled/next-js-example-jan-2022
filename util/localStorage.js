export function getLocalStorage(key) {
  try {
    // Abstracting the necessity of parse the value
    return JSON.parse(window.localStorage[key]);
  } catch (err) {
    return undefined;
  }
}

export function setLocalStorage(key, newValue) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(key, JSON.stringify(newValue));
  }
}

// 1. Local storage is going to exist only on the browser
// 2. Local storage need to be a string and this is why we need to JSON.parse and JSON.stringify
// 3. we can create functions that allow us to simplify this process
