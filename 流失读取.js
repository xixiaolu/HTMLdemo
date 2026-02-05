const url = "http://localhost:8080/flow/lose/read";
async function getResponce() {
    const resp = fetch(url,{
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            "id" : "1"
        })
    })
    // const text = await resp.text();
    // console.log(text);
    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    while(1) {
        const {done, value} = await reader.read();  // done-是否读取结束，value-读取到内容
        if(done) break;
        const text = decoder.decode(value);
        console.log(text);
    }
}