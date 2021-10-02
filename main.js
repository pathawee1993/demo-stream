const fs = require("fs");

var readerStream = fs.createReadStream("input.txt");

readerStream.setEncoding('UTF8');

var data = '';

readerStream.on('data', chunk =>{
    data += chunk;
})

readerStream.on('error', error =>{
    console.log(error);
})

readerStream.on('end', () => {
    console.log(data);
})