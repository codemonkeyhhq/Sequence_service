const proxy=require('http-proxy-middleware');
module.exports=function(app){
    app.use(proxy('/issues_list',{target:'http://localhost:5000'}));
    app.use(proxy('/sites_list',{target:'http://localhost:5000'}));
    app.use(proxy('/panels_list',{target:'http://localhost:5000'}));
    app.use(proxy('/add_issue',{target:'http://localhost:5000'}));
}
