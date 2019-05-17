var express   =    require("express");
var mysql     =    require('mysql');
var app       =    express();

var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'scannearn.cxkddesjk9g8.us-east-2.rds.amazonaws.com',
    user     : 'root',
    password : 'password',
    database : 'scannearn',
    debug    :  false
});

function handle_database(req,res) {
       // connection will be acquired automatically
       pool.query("select * from user",function(err,rows){
        if(err) {
            return res.json({'error': true, 'message': 'Error occurred'+err});
        }
                //connection will be released as well.
                res.json(rows);
       });
}

app.get("/",function(req,res){-
        handle_database(req,res);
});

app.listen(3000);
