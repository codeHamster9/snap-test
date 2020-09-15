const express = require("express");
const { join } = require("path");
const fs = require("fs");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 4000;
const appName = "Snappy Gifts";

app.use(cors());

function dbSession() {
  return new Promise((resolve, reject) => {
    fs.readFile(join(__dirname, "./database.json"), "utf8", function (
      err,
      contents
    ) {
      if (err) reject(err);
      try {
        contents = JSON.parse(contents);
      } catch (error) {
        reject(err);
      }
      resolve(contents);
    });
  });
}

app.get("/api/products", async function (req, res, next) {
  const { q } = req.query;

  try {
    const db = await dbSession();
    let products = db.products;
    if (q) {
      products = db.products.filter((product) =>
        product.name.toLowerCase().includes(q.toLowerCase())
      );
    }
    res.json(products);
  } catch (error) {
    next(error);
  }
});

app.get("/api/product/:id?", async function (req, res, next) {
  try {
    const { id } = req.params;
    const db = await dbSession();
    const product = db.products.find((product) => product.id === id);
    if (!product) {
      res.status(404).send("Not found.");
    } else {
      res.json(product);
    }
  } catch (error) {
    next(error);
  }
});

app.get("/api/vendors", async function (req, res) {
  const db = await dbSession();
  const vendors = db.vendors;
  res.json(vendors);
});

app.use(express.static(join(__dirname, "../build/")));

app.get("*", function response(req, res) {
  res.sendFile(join(__dirname, "../build/index.html"));
});

app.listen(port, () => {
  console.log(`${appName} app listening at http://localhost:${port}`);
});
