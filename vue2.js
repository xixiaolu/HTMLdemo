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
function observe(obj){
    for(const k in obj){
        let val = obj[k]
        if(_isObject(val)){
            observe(val)
        }
        Object.defineProperty(obj, k, {
            get(){
                console.log('读取', k)
                return val
            },
            set(newVal){
                console.log('set', k, newVal)
                val = newVal
            }
        })

    }
}
observe(obj)
console.log(obj.a)