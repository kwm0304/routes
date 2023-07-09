const db = require('./connection')
const { Location, Product } = require('../models')

const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')

db.once('open', async () => {
  await Location.deleteMany();
//scraper
const url = 'https://www.officialusa.com/stateguides/health/hospitals/northcarolina.html'

axios(url, { headers : {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'}}
).then(response => {
  const html = response.data;
  const $ = cheerio.load(html);
  const hospitalInfo = [];

  $('tr').each((index, element) => {
    const $row = $(element)

    const $firstCell = $row.find('td:first-child') 
    const $secondCell = $row.find('td:nth-child(2)') 
    const $fourthCell = $row.find('td:nth-child(4)') 

    const city = $firstCell.text();
    const title = $secondCell.text();
    const address = $fourthCell.text();
    
    hospitalInfo.push({
      title,
      address,
      city
    })
  });
  //logging in json folder for reference
  const filePath = path.join(__dirname, 'locations.json')

  fs.writeFileSync(filePath, JSON.stringify(hospitalInfo, null, 2))

  console.log('Data has been saved')

    console.log(hospitalInfo)
  }).catch(error => {
    console.log('Error:', error)
})
//TODO might be faster to just export created json file so it doesn't have to scrape everytime
//logging to db
const locations = await Location.insertMany(hospitalInfo)
  .then(() => {
    console.log('Locations collection saved.')
  })
  .catch(error => {
    console.log("error", error)
  })

  await Product.deleteMany();

  const products = await Product.insertMany(
    [
      {
        name: "Hospital Bed Sheets",
        price: 19.99,
        quantity: 100
      },
      {
        name: "Pillowcases",
        price: 7.99,
        quantity: 150
      },
      {
        name: "Patient Gowns",
        price: 24.99,
        quantity: 75
      },
      {
        name: "Bath Towels",
        price: 12.99,
        quantity: 200
      },
      {
        name: "Hand Towels",
        price: 6.99,
        quantity: 250
      },
      {
        name: "Washcloths",
        price: 4.99,
        quantity: 300
      },
      {
        name: "Mattress Protectors",
        price: 29.99,
        quantity: 50
      },
      {
        name: "Pillow Protectors",
        price: 9.99,
        quantity: 100
      },
      {
        name: "Blankets",
        price: 39.99,
        quantity: 80
      },
      {
        name: "Bedspreads",
        price: 49.99,
        quantity: 60
      },
      {
        name: "Pillows",
        price: 14.99,
        quantity: 120
      },
      {
        name: "Draw Sheets",
        price: 17.99,
        quantity: 90
      },
      {
        name: "Underpads",
        price: 11.99,
        quantity: 100
      },
      {
        name: "Gauze Rolls",
        price: 8.99,
        quantity: 200
      },
      {
        name: "Surgical Drapes",
        price: 29.99,
        quantity: 80
      },
      {
        name: "Pillow Covers",
        price: 6.99,
        quantity: 150
      }
    ])
    console.log('Products seeded')

  process.exit()
})