var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/issues_list', function(req, res, next) {
  global.connection.query('Select Issue.idIssue,Issue.Site,Issue.Panel,Issue.Comment,Panel.Brand, Panel.Model,Site.SiteName from Issue,Panel,Site where Issue.Panel=Panel.idPanel and Issue.Site=Site.idSite',
function(error,results,fields){
      if(error)throw error;
      res.send(JSON.stringify({"status":200,"error":null,"response":results}));
  });
});
router.get('/sites_list', function(req, res, next) {
  global.connection.query('Select * from Site',
function(error,results,fields){
      if(error)throw error;
      res.send(JSON.stringify({"status":200,"error":null,"response":results}));
  });
});router.get('/panels_list', function(req, res, next) {
  global.connection.query('Select * from Panel',
function(error,results,fields){
      if(error)throw error;
      res.send(JSON.stringify({"status":200,"error":null,"response":results}));
  });
});
router.post('/add_issue', function(req, res) {
  let issue=req.body.issue;
  if(!issue){
    return res.status(400).send({error:true,message:'Please provide a new issue'});
  }
  global.connection.query('INSERT INTO Issue SET ? ',{Site:parseInt(issue.site),Panel:parseInt(issue.panel),Comment:issue.comment},function(error,results,fields){
      if(error)throw error;
      res.send(JSON.stringify({"status":200,"error":null,"response":results}));
  });
});


module.exports = router;
