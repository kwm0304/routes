const fs = require("fs");
const path = require("path");
const axios = require("axios");
const cheerio = require("cheerio");
const { v4: uuidv4 } = require('uuid')

const db = require("./connection");
const { Location, Product, Order } = require("../models");

const scrapeAndSaveData = async () => {
  try {
    await Location.deleteMany();

    const url =
      "https://www.officialusa.com/stateguides/health/hospitals/northcarolina.html";

    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
      },
    });

    const html = response.data;
    const $ = cheerio.load(html);
    const hospitalInfo = [{}];

    $("tr").each((index, element) => {
      const $row = $(element);
      const $firstCell = $row.find("td:first-child");
      const $secondCell = $row.find("td:nth-child(2)");
      const $fourthCell = $row.find("td:nth-child(4)");

      const city = $firstCell.text().trim();
      const title = $secondCell.text().trim();
      const address = $fourthCell.text().trim();

      const locationEntry = {
        title: title,
        address: address,
        city: city,
        state: "NC",
      };
      hospitalInfo.push(locationEntry);
      
    });

    const filePath = path.join(__dirname, "locations.json");
    fs.writeFileSync(filePath, JSON.stringify(hospitalInfo, null, 2));
    console.log("Data has been saved:", hospitalInfo);

    await Location.insertMany(hospitalInfo);
    console.log("Locations collection saved.");

    await Product.deleteMany();

    const products = await Product.insertMany([
      {
        productName: "Hospital Bed Sheets",
        price: 19.99,
        productQuantity: 100,
      },
      {
        productName: "Pillowcases",
        price: 7.99,
        productQuantity: 150,
      },
      {
        productName: "Patient Gowns",
        price: 24.99,
        productQuantity: 75,
      },
      {
        productName: "Bath Towels",
        price: 12.99,
        productQuantity: 200,
      },
      {
        productName: "Hand Towels",
        price: 6.99,
        productQuantity: 250,
      },
      {
        productName: "Washcloths",
        price: 4.99,
        productQuantity: 300,
      },
      {
        productName: "Mattress Protectors",
        price: 29.99,
        productQuantity: 50,
      },
      {
        productName: "Pillow Protectors",
        price: 9.99,
        productQuantity: 100,
      },
      {
        productName: "Blankets",
        price: 39.99,
        productQuantity: 80,
      },
      {
        productName: "Bedspreads",
        price: 49.99,
        productQuantity: 60,
      },
      {
        productName: "Pillows",
        price: 14.99,
        productQuantity: 120,
      },
      {
        productName: "Draw Sheets",
        price: 17.99,
        productQuantity: 90,
      },
      {
        productName: "Underpads",
        price: 11.99,
        productQuantity: 100,
      },
      {
        productName: "Gauze Rolls",
        price: 8.99,
        productQuantity: 200,
      },
      {
        productName: "Surgical Drapes",
        price: 29.99,
        productQuantity: 80,
      },
      {
        productName: "Pillow Covers",
        price: 6.99,
        productQuantity: 150,
      }
    ]);
    console.log("Products seeded");

    const mockOrders = [];
    //160 is location length
    for (let i =0; 160; i++) {
      const order = {
        products: [],
        orderId: uuidv4()
      };

      //random number of products for each order between 2-10
      const productAmount = Math.floor(Math.random() * 9) + 2;
      console.log('productAmt', productAmount)

      //random products for order
      const uniqueProducts = new Set();
      while (uniqueProducts.size < numProducts) {
        const randomProducts = products[Math.floor(Math.random() * products.length)]
        uniqueProducts.add(randomProducts)
      }

      //add the unique products to the order
      order.products = [...uniqueProducts]
      mockOrders.push(order)
      
    }
  } catch (error) {
    console.log("Error:", error);
  } finally {
    db.close();
    process.exit();
  }
};

db.once("open", scrapeAndSaveData);
