export const toggleClass = (list) => {
    list.forEach((el) => document.querySelector(el).classList.toggle("active"));
};
export const iterator = (list, cb, method) => {
    if (method === "map")
        return list[method](cb).join("");
    return list[method](cb);
};
export const checkCount = (count, list) => {
    if (count < 0)
        count = list.length - 1;
    if (count >= list.length)
        count = 0;
    return count;
};
export function nested(arr, cnt) {
    let list = [];
    for (let i = 0; i < arr.length; i += cnt) {
        list.push(arr.slice(i, i + cnt));
    }
    return list;
}
