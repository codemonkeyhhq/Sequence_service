const proxy=require('http-proxy-middleware');
module.exports=function(app){
    app.use(proxy('/add_sequence',{target:'http://localhost:5000'}));
}
