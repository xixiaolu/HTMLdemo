const users = {
    name : '张三',
    age : '12',
    hobby : 'eat drink play',
}
function handler<T>(obj : T,propeName : keyof T){

}
handler(users,'age')
const colors = ['红','黑','蓝','黄'] as const;
const values = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'] as const;
type Values = typeof values[number];
type Colors = typeof colors[number];
function createCard(value : Values,colors : Colors){

}
createCard('3','蓝')
