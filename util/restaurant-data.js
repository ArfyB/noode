const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', "data", "restaurant.json");

function getStoredRestaurants() {

  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  return storedRestaurants;
}

function storeRestaurants(storableRestaurants) {
  fs.writeFileSync(filePath, JSON.stringify(storableRestaurants));
}

// 다른파일에서 해당 메소드를 사용하기 위해 구현
module.exports = {
  getStoredRestaurants: getStoredRestaurants,
  storeRestaurants: storeRestaurants
};