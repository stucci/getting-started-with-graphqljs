// ref::
// [How to Setup Graphql and Mongodb server in Node JS with Apollo Server ［BASIC］ | by Murat turan | Medium](https://medium.com/@snowronark/how-to-setup-graphql-and-mongodb-server-in-node-js-with-apollo-server-basic-321f06ee985f)
// [graphql_apollo_mongodb_server/graphql_mongodb.js at master · snowron/graphql_apollo_mongodb_server](https://github.com/snowron/graphql_apollo_mongodb_server/blob/master/graphql_mongodb.js)

const { ApolloServer, gql } = require("apollo-server");
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(function (err) {
  console.log("mongodb connected");
  db = client.db("test"); //mongodb database name
});

const typeDefs = gql`
type Query {
  hello: String
  kittens: [Kittens]
}
type Kittens {
  _id: ID
  name: String
}
`

const resolvers = {
  Query: {
    hello: () => {
      return `hey sup ?`;
    },
    kittens: async () => {
      values = await db.collection('kittens').find().toArray().then(res => { return res });
      return values
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => console.log(`Server running at ${ url }`));
