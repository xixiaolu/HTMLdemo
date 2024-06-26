const users = {
    name : '张三',
    age : '12',
    hobby : 'eat drink play',
}
function handler<T>(obj : T,propeName : keyof T){

}
handler(users,'age')