const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const db = require('./connection');
const { Location, Product } = require('../models');

const scrapeAndSaveData = async () => {
  try {
    await Location.deleteMany();

    const url = 'https://www.officialusa.com/stateguides/health/hospitals/northcarolina.html';

    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
      },
    });

    const html = response.data;
    const $ = cheerio.load(html);
    const hospitalInfo = [{}];

    $('tr').each((index, element) => {
      const $row = $(element);
      const $firstCell = $row.find('td:first-child');
      const $secondCell = $row.find('td:nth-child(2)');
      const $fourthCell = $row.find('td:nth-child(4)');

      const city = $firstCell.text().trim();
      const title = $secondCell.text().trim();
      const address = $fourthCell.text().trim();

      const locationEntry = {
        title: title,
        address: address,
        city: city,
        state: "NC",
      };
      hospitalInfo.push(locationEntry)
      console.log(hospitalInfo)
    });

    const filePath = path.join(__dirname, 'locations.json');
    fs.writeFileSync(filePath, JSON.stringify(hospitalInfo, null, 2));
    console.log('Data has been saved:', hospitalInfo);

    await Location.insertMany(hospitalInfo);
    console.log('Locations collection saved.');

    await Product.deleteMany();

    const products = await Product.insertMany([
      // Product data array goes here
    ]);
    console.log('Products seeded');
  } catch (error) {
    console.log('Error:', error);
  } finally {
    db.close();
    process.exit();
  }
};

db.once('open', scrapeAndSaveData);
