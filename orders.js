module.exports = function(){

    var express = require('express');
    var router = express.Router();

    // get Orders data 
    function getOrders(res, mysql, context, complete)
    {
        mysql.pool.query("SELECT orderID, customerID, orderStatus, orderDate, shippedDate, storeID, payment FROM Orders", function(error, results, fields) 
        {
            if (error)
            {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.orders = results;
            complete();
        });
    }

    // Display Orders 
    router.get('/', function(req, res)
    {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = [""];
        var mysql = req.app.get('mysql');
        getOrders(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('orders', context);
            }
        }
    });


    // Add new orders
    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Orders (orderID, customerID, orderStatus, orderDate, shippedDate, storeID, payment) VALUES (?,?,?,?,?,?,?)";
        var inserts = [req.body.orderID, req.body.customerID, req.body.orderStatus, req.body.orderDate, req.body.shippedDate, req.body.storeID, req.body.payment];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error));
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/orders');
            }
        });
    });

    return router;
}();