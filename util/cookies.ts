import Cookies from 'js-cookie';

export function getParsedCookie(key: string) {
  const cookieValue = Cookies.get(key); // Type is string | undefined

  // Narrowing
  if (!cookieValue) {
    return undefined;
  }

  try {
    return JSON.parse(cookieValue); // Type is string
  } catch (err) {
    return undefined;
  }
}

type LikedAnimal = { id: string; stars: number };
type LikedAnimals = LikedAnimal[];

export function setParsedCookie(key: string, value: LikedAnimals) {
  Cookies.set(key, JSON.stringify(value));
}

export function deleteCookie(key: string) {
  Cookies.remove(key);
}

export function stringifyCookieValue(value: LikedAnimals) {
  return JSON.stringify(value);
}
