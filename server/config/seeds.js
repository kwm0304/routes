const db = require('./connection')
const { Location } = require('../models')

const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')

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
  const directoryPath = path.join(__dirname, 'data');
  const filePath = path.join(directoryPath, 'test.json')

  fs.mkdirSync(directoryPath, { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(hospitalInfo, null, 2))

  console.log('Data has been saved')

    console.log(hospitalInfo)
  }).catch(error => {
    console.log('Error:', error)
})
