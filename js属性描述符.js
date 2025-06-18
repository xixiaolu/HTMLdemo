var obj = {
    a : 1,
    b : 2,
}
Object.getOwnPropertyDescriptor(obj, 'a'); 
/**
 * value: 1,  属性值
 * writable: true,  可遍历
 * enumerable: true,  可被更改
 * configurable: true  是否可再配置
 * */




Object.defineProperty(obj,'a', {
    value : 10,
    writable : false, // 不可更改
    enumerable : false, // 不可遍历
    configurable : false // 不可修改描述符本身
})

for(var key in obj){
    //console.log(key);  // 输出: 'b'，因为 'a' 不可遍历
}
let keys = Object.keys(obj);
//console.log(keys); // ['b']

//console.log(obj); // { b : 2}

class UIGoods{
    constructor(g){
        // Object.freeze(g);  // 冻结对象，防止修改   原始数据也会被冻结  不建议使用
        g = {...g};  // 浅拷贝，防止修改原始数据
        Object.defineProperty(this,'data', {
            get : function(){
                return g;  // 获取属性值
            },
            set : function(val){
                throw new Error('data属性不可修改');  // 设置属性值
            },
            // value : g,
            // writable : false, // 不可更改
            // enumerable : false, // 不可遍历
            // configurable : false // 不可修改描述符本身
        })
        var internalChoose = 0;
        Object.defineProperty(this,'choose', {
            get : function(){
                return internalChoose;  // 获取属性值
            },
            set : function(val){
                if(typeof val !== 'number'){
                    throw new Error('choose属性必须是数字');
                }
                let temp = parseInt(val);
                if(temp !== val) {
                    throw new Error('choose属性必须是整数');
                }
                if(val < 0){
                    throw new Error('choose属性不能小于0');
                }
                internalChoose = val;
            },
            configurable : false, // 不可更改
        })
        // Object.defineProperty(this,'totalPrice', {
        //     get : function(){
        //         return this.data.price * this.choose;  // 获取属性值
        //     }
        // })

        Object.freeze(this);  // 冻结this，防止new出来的对象新增属性
        Object.seal(this);  // 密封this，防止修改属性描述符
    }
    get totalPrice() {  // 方法同  Object.defineProperty(this,'totalPrice'  一样
        return this.data.price * this.choose;  // 获取属性值
    }
}


Object.freeze(UIGoods);  // 冻结类，防止修改类本身   防止UIGoods类通过prototype新增属性或方法
Object.seal(UIGoods);  // 密封类，防止修改类的属性描述符
var g = new UIGoods({name : '张三', price : 100});
// g.data = "李四";  // 为了让new这个类的时候错误信息更明显，选用set，get方法
g.choose = '123';
console.log(g.choose);

// var internalValue = undefined;
// Object.defineProperties(obj,'a', {
//     get : function(){
//         return internalValue;  // 获取属性值
//     },  // 获取属性值    obj.a的值为get方法返回的值
//     set : function(val){
//         internalValue = val;  // 设置属性值
//     },  // 新增属性值    设置obj.a时会调用set方法
// })