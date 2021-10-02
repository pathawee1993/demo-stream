const fs = require('fs');

var writeStream = fs.createWriteStream("output.txt");

var data = "Ich bin programmierer";

writeStream.write(data, "UTF8");

writeStream.end();

writeStream.on('finish', () =>{
    console.log('write finish');
})

writeStream.on('error', (error) => {
    console.log(error.stack);
})