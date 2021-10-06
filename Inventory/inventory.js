window.client.emit('getItem', 'request data')
window.client.on('item', (data)=>{
    console.log(data);
})