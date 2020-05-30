module.exports = function(){

    var express = require('express');
    var router = express.Router();

    // get Customers data 
    function getCustomers(res, mysql, context, complete)
    {
        mysql.pool.query("SELECT customerID, firstName, lastName, username, password, dateOfBirth, phoneNumber, email, street, city, state, zip, country FROM Customers", function(error, results, fields) 
        {
            if (error)
            {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.customers = results;
            complete();
        });
    }

    // Display Customers 
    router.get('/', function(req, res)
    {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = [""];
        var mysql = req.app.get('mysql');
        getCustomers(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('customers', context);
            }
        }
    });


    // Add new customers
    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Customers (firstName, lastName, username, password, dateOfBirth, phoneNumber, email, street, city, state, zip, country) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
        var inserts = [req.body.firstName, req.body.lastName, req.body.username, req.body.password, req.body.dateOfBirth, req.body.phoneNumber, req.body.email, req.body.street, req.body.city, req.body.state, req.body.zip, req.body.country];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error));
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/customers');
            }
        });
    });

    return router;
}();