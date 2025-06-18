function arrange(name) {
    const task = [];
    task.push(()=>{
        console.log(`>${name} is notified`);
    })
    function wait(seconds){
        task.push(()=> new Promise(resolve =>{
            setTimeout(() => {
                console.log(`等待${seconds}秒`);
                resolve();
            }, timeout = seconds * 1000);
        }))
        return this;
    }
    function doAction(action) {
        task.push(()=>{
            console.log(`>${name} Start to ${action}`);
        })
        return this;
    }
    function waitFirst(seconds) {
        task.unshift(()=> new Promise(resolve=>{
            setTimeout(() => {
                console.log(`等待${seconds}秒`);
                resolve();
            }, timeout = seconds * 1000);
        }))
        return this;
    }
    function excute() {
        (async ()=>{
            for(const fn of task){
                await fn();
            }
        })()
        return this;
    }
    return {
        wait,
        do : doAction,
        waitFirst,
        excute,
    }    
}
arrange('William')
    .wait(5)
    .do('commit')
    .waitFirst(3)
    .excute();

// 等待3秒
// > Willan is notified
// 等待5秒
// > Start to commit