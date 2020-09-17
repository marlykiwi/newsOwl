const express = require("express");
const router = express.Router();
const axios = require("axios");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const loginCheck = require("./middleware");
const flags = require("../flags.json");

// router.get("/", async (req, res, next) => {
//   // below is array
//   const ids = await axios.get(
//     "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
//   );
//   const tenArticlesId = ids.data.slice(0, 10);
//   const tenArticlesList = {};
//   // console.log(tenArticlesList);
//   for (let id of tenArticlesId) {
//     const article = await axios.get(
//       `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
//     );
//     // console.log(articleId.data, `this is it`);
//     // tenArticlesList.push(article.data);
//     tenArticlesList[id] = article.data;
//   }
//   // console.log(ids);
//   res.render("dashboard/dashboard", {
//     tenArticlesList: tenArticlesList,
//   });
// });

router.get("/", loginCheck(), async (req, res, next) => {
  try {
    console.log("entering the get");
    // console.log(flags);
    // -------------------------------
    // const init = "us";
    const key =
      "http://newsapi.org/v2/top-headlines?country=us" +
      // init +
      "&apiKey=182c2112a69541b2835808c0ce666cb9";
    let articleList = await axios.get(key);
    console.log("hello"), articleList;
    const user = await User.findById(req.session.user._id);
    const keyword = user.keyword;
    // calling Ke
    res.render("dashboard/dashboard", {
      articlesList: articleList.data.articles,
      user: req.session.user,
      keyword: keyword,
      flags: flags,
    });
  } catch (err) {
    console.log("it tried and failed", err);
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  let { keyword, flag } = req.body;
  const user = await User.findById(req.session.user._id);
  let url = "";
  if (flag) {
    url =
      "http://newsapi.org/v2/top-headlines?country=" +
      flag +
      "&apiKey=182c2112a69541b2835808c0ce666cb9";
  } else if (keyword) {
    url = `https://newsapi.org/v2/top-headlines?q=${keyword}&apiKey=182c2112a69541b2835808c0ce666cb9`;
  } else {
    keyword = user.keyword;
    url = `https://newsapi.org/v2/top-headlines?q=${keyword}&apiKey=182c2112a69541b2835808c0ce666cb9`;
  }
  // -------------------------------
  console.log(keyword, flag);
  // const filteredArticles = await axios.get(
  //   `https://newsapi.org/v2/top-headlines?q=${keyword}&apiKey=182c2112a69541b2835808c0ce666cb9`
  // );
  const filteredArticles = await axios.get(url);

  console.log("went crazy filtered");
  console.log(filteredArticles.data.articles);
  res.render("dashboard/dashboard", {
    articlesList: filteredArticles.data.articles,
    flags: flags,
  });
});

module.exports = router;
// let articles = [];
// axios.get('`https://hacker-news.firebaseio.com/v0/item/${article}.json?print=pretty`')
//   async (response) => {
//     // console.log(response.data);
//     let articles = [];
//     for (let article of response.data) {
//       while (articles.length < 10) {
//         let { data } = await axios.get(
//           `https://hacker-news.firebaseio.com/v0/item/${article}.json?print=pretty`
//         );
//         // console.log(data);
//         articles.push(data);
//       }
//       console.log(articles);
//       res.render("dashboard/dashboard");
//       /* axios
// .get(
//   `https://hacker-news.firebaseio.com/v0/item/${response.data[0]}.json?print=pretty`
//   )
//   .then((res) => console.log(res)); */
//       // res.render("dashboard/dashboard");
//     }
//   })
// .catch((error) => {
//   console.log(error);
// });
