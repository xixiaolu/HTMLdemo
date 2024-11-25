class Singleton {
    private static instance : Singleton;
    private constructor(){
        console.log('hello word');
    }
    public static getInstance(): Singleton {
        if(!Singleton.instance){
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }
    public showMessage() : void {
        console.log('hello,word');
    }
}
const singleton1 = Singleton.getInstance();
const singleton2 = Singleton.getInstance();
console.log('11111111111',singleton1 === singleton2)