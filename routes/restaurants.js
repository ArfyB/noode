const express = require("express");

const uuid = require("uuid");

const resData = require("../util/restaurant-data");
// 같은 폴더내에 있다면 ./파일명
// 다른 폴더의 메소드를 사용하기 위해 구현

const router = express.Router();

router.get("/restaurants", function (req, res) {
  let order = req.query.order;
  let nextOrder = 'desc';

  if (order !== "asc" && order !== "desc") {
    order = "asc";
  }

  if (order === 'desc') {
    nextOrder = 'asc';
  }

  // const filePath = path.join(__dirname, "data", "restaurant.json");

  // const fileData = fs.readFileSync(filePath);
  // const storedRestaurants = JSON.parse(fileData);
  const storedRestaurants = resData.getStoredRestaurants();

  //A~Z 순서 정렬
  storedRestaurants.sort(function (resA, resB) {
    if (
      (order === "asc" && resA.name > resB.name) ||
      (order === "desc" && resB.name > resA.name)
    ) {
      return 1;
    }
    return -1;
  });

  res.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
    nextOrder : nextOrder
  });
});

//  경로에 :를 이용하여 동적 경로를 생성할 수 있다.
router.get("/restaurants/:id", function (req, res) {
  const restaurantId = req.params.id; //url에서 :id 이기때문에 req.params.id로 설정해준 모습.

  const storedRestaurants = resData.getStoredRestaurants();

  for (const restaurant of storedRestaurants) {
    if (restaurant.id === restaurantId) {
      return res.render("restaurants-detail", { restaurant: restaurant });
    }
  }

  res.status(404).render("404");
});

router.get("/recommend", function (req, res) {
  res.render("recommend");
});

router.post("/recommend", function (req, res) {
  const restaurant = req.body;

  // 이렇게도 사용가능.
  // const { v4: restaurant.id } = require('uuid');
  restaurant.id = uuid.v4();
  //객체에 속성 추가
  //v4 = 무작위 생성이지만 고유함을 보장.

  const restaurants = resData.getStoredRestaurants();

  restaurants.push(restaurant);

  resData.storeRestaurants(restaurants);

  res.redirect("/confirm");
});

router.get("/confirm", function (req, res) {
  res.render("confirm");
});

module.exports = router;
