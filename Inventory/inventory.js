let client = io('localhost:3000', {'reconnection': true, 'reconnectionDelay': 1000, 'reconnectionDelayMax': 2000})

client.on('connect', () => {
    console.log("connected to server")
})

client.on('disconnect', () => {
    console.log('disconnected from server')
})

client.emit('getItem', 'request data')
client.on('item', (data)=>{
    console.log(data);
})