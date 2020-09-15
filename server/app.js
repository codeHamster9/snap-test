const express = require("express");
const { join } = require("path");
const CacheService = require("./services/cache-service");
const fs = require("fs");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 4000;
const appName = "Snappy Gifts";

const cache = new CacheService(1);

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

function filterProductsByQuery(query, products) {
  return products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );
}

app.get("/api/products", async function (req, res, next) {
  const { q } = req.query;

  try {
    const db = await dbSession();
    let products = db.products;

    if (q) {
      const cached = cache.get(q);
      if (cached) {
        products = cached;
        console.log(`"from cache - q:${q} results:${products.length}`);
      } else {
        products = filterProductsByQuery(q, products);
        cache.set(q, products);
      }
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
