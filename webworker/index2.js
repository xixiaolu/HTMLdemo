self.addEventListener('message',(data=>{
    console.log('data',data);
    self.postMessage('122434')
}))