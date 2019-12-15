var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/add_sequence', function (req, res) {
//     var sequence=req.body.sequence;
//     if(sequence){
//     var http = require('http');
//     var fs = require('fs');
//     fs.writeFile(fileName, JSON.stringify(sequence), function (err) {
//         if (err) return console.log(err);
//         console.log('writing to ' + fileName);
//     });
//     const data = fs.createWriteStream("../output/sequence.json");
//     const request = http.get("../output/sequence.json", function(response) {
//         response.pipe(data);
//     });
//     res.send(req.body.sequence);
// }else{
//     res.status(500).send(err);
// }
    res.send("working!");
});
module.exports = router;
