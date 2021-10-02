const fs = require('fs');

var readerStream = fs.createReadStream('input.txt');

var writerStream = fs.createWriteStream('pipeOutput.txt');

readerStream.pipe(writerStream);

writerStream.on('finish', () => {
    console.log('write finish!')
})