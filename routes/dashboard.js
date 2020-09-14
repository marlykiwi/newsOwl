const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res, next) => {
  // call the star wars api and get a list of people
  axios
    .get("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")
    .then(async (response) => {
      // console.log(response.data);
      let articles = [];
      for (let article of response.data) {
        let { data } = await axios.get(
          `https://hacker-news.firebaseio.com/v0/item/${article}.json?print=pretty`
        );
        console.log(data);
        // articles.push(data);
      }
      // console.log(articles);
      /* axios
        .get(
          `https://hacker-news.firebaseio.com/v0/item/${response.data[0]}.json?print=pretty`
        )
        .then((res) => console.log(res)); */
      // res.render("dashboard/dashboard");
    })
    .catch((error) => {
      console.log(error);
    });
});
module.exports = router;
