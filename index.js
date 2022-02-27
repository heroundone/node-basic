import http from 'http';
import url from 'url';
import fs from 'fs';

http.createServer(function(req, res) {
    
    if(req.url == '/favicon.ico') {
        return;
    };

    if(req.url == '/') {
        fs.readFile('./index.html', (err, data) => {
            if(err) {
                console.error(err);
            }
            res.writeHead('200', {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        })
        return;
    }

    fs.readFile(('.' + req.url + '.html'), (err, data) => {
        if(err) {
            fs.readFile(('./404.html'), (err, data) => {
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.write(data);
                return res.end();
            });
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(data);
            return res.end();
        };
    })
}).listen(8080);