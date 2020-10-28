const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(function (err) {
  console.log("mongodb connected!");
  db = client.db("test"); //mongodb database name
  db.collection('kittens').find().toArray(function(err, res){
    if(err) throw err
    console.log(res)
    client.close()
  })
});
