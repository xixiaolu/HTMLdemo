const obj = {
    arr : [],
    a : 4,
}
obj.sub = obj;
obj.arr.push(obj);
/**
 * 实现对象或数组的深拷贝，解决循环引用问题。
 * @param {any} value - 需要进行深拷贝的值。
 * @returns {any} - 深拷贝后的新值。
 */
function deepClone(value){
    // 注释掉的代码为其他深拷贝方法，structuredClone 是浏览器原生方法，JSON 方法无法处理函数等特殊值
    // structuredClone(value);
    // return JSON.parse(JSON.stringify(value));
    // 创建一个 Map 用于缓存已经拷贝过的对象，解决循环引用问题
    const cache = new Map();
    /**
     * 内部递归函数，用于实际的深拷贝操作。
     * @param {any} value - 需要进行深拷贝的值。
     * @returns {any} - 深拷贝后的新值。
     */
    function _deepClone(value){
        // 如果 value 不是对象类型或者为 null，则直接返回该值
        if(typeof value !== 'object' || value === null){
            return value;
        }
        // 检查 cache 中是否已经存在该对象，如果存在则直接返回缓存中的拷贝结果
        if(cache.has(value)){
            return cache.get(value);
        }
        // 根据 value 是数组还是普通对象，创建对应的新对象
        const result = Array.isArray(value) ? [] : {};
        // 将当前对象和对应的拷贝结果存入 cache 中
        cache.set(value,result);
        // 遍历对象的所有可枚举属性
        for(const key in value){
            // 递归调用 _deepClone 函数，对属性值进行深拷贝
            result[key] = _deepClone(value[key]);
        }
        
        return result;
    }
    // 调用内部递归函数开始深拷贝
    return _deepClone(value);
}
// 调用 deepClone 函数对 obj 进行深拷贝，并将结果赋值给 clone
// const clone = deepClone(obj);
const clone = deepClone(obj);
console.log('clone',clone);