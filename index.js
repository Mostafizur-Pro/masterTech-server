const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();

app.use(express.json());
app.use(cors());

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nuouh7o.mongodb.net/?retryWrites=true&w=majority`;
const uri =
  "mongodb+srv://master-tech:K4QhoBCbnA75AHu0@cluster0.5xecsyp.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    console.log(" successfully connected to MongoDB!");
    const productCollection = client.db("master-tech").collection("products");

    // ------------PRODUCT------------------------------
    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await productCollection.findOne(query);
      res.send(result);
    });
    app.get("/products", async (req, res) => {
      const result = await productCollection.find({}).toArray();
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send(" Computer builder Server is running");
});

app.listen(port, () => {
  console.log(`Computer builder server is running on port ${port}`);
});
