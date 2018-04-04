//懒加载函数
let lazy = function (fn, key) {
    let buffer = {}
    return function () {
        if (buffer[key]) {
            return buffer[key]
        } else {
            let r = fn.apply(this, Array.from(arguments))
            buffer[key] = r;
            return r;
        }
    }
}