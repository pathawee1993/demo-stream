const express = require('express');
const fs = require('fs');

const app = express();

app.get('/video', (req, res) =>{
    var path = 'Awesome_Funny_Pet_Animals_Videos.mp4';
    var fileStat = fs.statSync(path);
    var fileSize = fileStat.size;
    var range = req.headers.range;
    // console.log('get video')
    if (range){
        var parts = range.replace(/bytes=/,'').split('-');
        // console.log(parts)
        var start = parseInt(parts[0], 10);
        var end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        var chunk = fs.createReadStream(path, {start, end});
        var head = {
            'Content-Type': 'video/mp4',
            'Content-Length': end - start,
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Range': 'bytes'
        }

        res.writeHead(206, head);
        chunk.pipe(res);
    }else{
        var head = {
            'Content-Type': 'video/mp4',
            'Content-Length': fileSize
        }

        res.writeHead(200, head);
        fs.createReadStream(path).pipe(res);
    }
})

app.listen(3000, () =>{
    console.log('Start server on port 3000')
})