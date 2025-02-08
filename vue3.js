const obj = {
    a : 1,
    b : 2,
    c : {
        d : 3,
        e : 4
    }
}
function _isObject(v){
    return typeof v === 'object' && v !== null
}
function reactive(obj){
    const proxy = new Proxy(obj,{
        get(target, key){
            console.log('读取', key)
            if(_isObject(target[key])){
                return reactive(target[key])
            }
            return target[key]
        },
        set(target, key, value){
            if(target[key] === value){
                return
            }
            console.log('设置', key, value)
            target[key] = value
        }
    })
    return proxy;
}
const proxy = reactive(obj);
proxy.c;