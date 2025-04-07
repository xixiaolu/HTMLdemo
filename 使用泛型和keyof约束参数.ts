const users = {
    name : '张三',
    age : '12',
    hobby : 'eat drink play',
}
function handler<T>(obj : T,propeName : keyof T){

}
handler(users,'age')
handler(users,'aaaa')
const colors = ['红','黑','蓝','黄'] as const;
const values = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'] as const;
type Values = typeof values[number];
type Colors = typeof colors[number];
function createCard(value : Values,colors : Colors){

}
createCard('3','蓝')
createCard('2','蓝');


let s : string = '123';
let n : number = 123;
let b : boolean = true;
function add(a : number,b : number) : number{
    return a + b;
}

interface Animal {
    name : string;
    eat(foot : string) : void;
}
class Dog implements Animal {
    name : string;
    constructor(name : string){
        this.name = name;
    }
    eat(foot : string) {
        console.log('this.name',this.name);
    }
}

interface Window {
    myCustomProp : string;
}

interface Shape {
    color : string;
}
interface Circle extends Shape {
    radius : number;
}

class Cir implements Circle {
    radius : number;
    color : string;
    constructor(radius : number,color : string){
        this.radius = radius;
        this.color = color;
    }
}


type ID = string | number;
type Coordinates  = [number,number];
type StringOrNumberArray = Array<string|number>

const str : StringOrNumberArray = [123,'34335',true]