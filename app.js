const fs = require("fs");
const path = require("path");

const express = require("express");

const defaultRoutes = require('./routes/default');
const restaurantRoutes = require('./routes/restaurants');

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
//css, js, 이미지 파일등을 로드할때의 요청을 public폴더를 통한 경로로 보낸다.
//( link href="styles/abc" => public/styles/abc)

app.use(express.urlencoded({ extended: false }));
// body데이터의 해석을 위해 필요.

app.use('/', defaultRoutes);
//url이 /로 시작하는 모든 수신 요청은 defaultRoutes에 의해 처리
// '/'는 들어오는 경로의 시작을 확인하는 필터 역할

app.use('/', restaurantRoutes);

// 홈페이지 url오류 = 없는페이지로 이동할때
app.use(function(req, res) {
  res.status(404).render('404')
});

// 서버측에서의 오류 발생시 = 해당 프로젝트 에서는 restaurant.json이 없다던지?
app.use(function(error, req, res, next) {
  res.status(500).render('500');
})

app.listen(3000);
