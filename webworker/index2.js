self.addEventListener('message',(e=>{
    console.log('e',e.data);
    self.postMessage('122434')
}))