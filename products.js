
module.exports = function(){

    var express = require('express');
    var router = express.Router();

    // Get data for products
    function getProducts(res, mysql, context, complete)
    {
        // SELECT storeID, productID, productName, price, brand, category FROM Products INNER JOIN Locations ON Products.storeID = Locations.storeID
        mysql.pool.query("SELECT storeID, productID, productName, price, brand, category FROM Products", function(error, results, fields) 
        {
            if (error)
            {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.products = results;
            complete();

        });
    }

    // Display products
    router.get('/', function(req, res)
    {
        var callbackCount = 0;
        var context = {};
        
        var mysql = req.app.get('mysql');
        getProducts(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('products', context);
            }
        }
    });

    // Add a new product
    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Products (productName, price, brand, category, storeID) VALUES (?,?,?,?,?)";
        var inserts = [req.body.productName, req.body.price, req.body.brand, req.body.category, req.body.storeID];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if (error)
            {
                res.write(JSON.stringify(error));
                res.end();
            }
            else{
                res.redirect('/products');
            }

        });
    });

    return router;



}();