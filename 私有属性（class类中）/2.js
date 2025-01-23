const fieldMap = new WeakMap();
export class A {
    constructor(){
        fieldMap.set(this,{
            key : 123,
        })
    }
    print(){
        console.log('111',fieldMap.get(this).key);
    }
}