const channel = new BroadcastChannel('sync-msg');

/**
 * 
 * @param {"add" | "update"} type
 * @param {any} msg
 * **/
export function sendMsg(type,msg){
    channel.postMessage({
        type,
        msg
    })

}
export function listenMsg(callback){
    channel.addEventListener('message',(e)=>{
        callback && callback(e.data)
    })
}