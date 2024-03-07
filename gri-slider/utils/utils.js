export var toggleClass = function (list) {
    list.forEach(function (el) {
        return document.querySelector(el).classList.toggle("active");
    });
};
export var iterator = function (list, cb, method) {
    if (method === "map")
        return list[method](cb).join("");
    return list[method](cb);
};
export var checkCount = function (count, list) {
    if (count < 0)
        count = list.length - 1;
    if (count >= list.length)
        count = 0;
    return count;
};
export function nested(arr, cnt) {
    var list = [];
    for (var i = 0; i < arr.length; i += cnt) {
        list.push(arr.slice(i, i + cnt));
    }
    return list;
}
