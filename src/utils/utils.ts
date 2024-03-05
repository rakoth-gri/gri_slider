import { T_SELECTORS, T_ARRAY_METHODS } from "../types/types";

export const toggleClass = (list: T_SELECTORS[]) => {
  list.forEach((el) =>
    (document.querySelector(el) as HTMLElement).classList.toggle("active")
  );
};

export const iterator = <T, K extends T_ARRAY_METHODS, R>(
  list: T[],
  cb: (item: T, i: number) => R,
  method: K
) => {
  if (method === "map") return list[method](cb).join("");
  return list[method](cb);
};

export const checkCount = <T>(count: number, list: T[]) => {
  if (count < 0) count = list.length - 1;
  if (count >= list.length) count = 0;

  return count;
};


export function nested<T>(arr: T[], cnt: number) {
  let list = [];

  for (let i = 0; i < arr.length; i += cnt) {
    list.push(arr.slice(i,i + cnt));
  }
  return list;  
}

