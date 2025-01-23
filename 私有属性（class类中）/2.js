const privateData = new WeakMap();

class Counter {
    constructor() {
        privateData.set(this, { count: 0 }); // 私有属性
    }

    increment() {
        const data = privateData.get(this);
        data.count++;
    }

    decrement() {
        const data = privateData.get(this);
        data.count--;
    }

    getCount() {
        return privateData.get(this).count;
    }
}

const counter = new Counter();
counter.increment(); // 增加计数
counter.decrement(); // 减少计数
console.log(counter.getCount()); // 输出: 0