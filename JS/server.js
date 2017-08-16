var express = require('express');
var app = express();
var fs = require('fs');

//跨域配置
app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

app.get('/getData',function(req,res){
    var path = './src/' + req.query.name;
    fs.exists(path,function(exist){
        if(exist){
            fs.readFile(path,'utf-8',function(err,data){
                if(err){
                    console.log(err)
                } else {
                    res.send(JSON.parse(data));
                    res.end();
                }
            })
        } else {
            res.writeHead(404, {
                'Content-Type': 'text/plain'
            });
            res.write("This request URL " + path + " was not found on this server.");
            res.end();
        }
    })
})

app.listen(3000); 