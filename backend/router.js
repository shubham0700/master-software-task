const express = require("express");
const router = express.Router();
const userapi = require("./payslipapi.js");
router.get("/getallusers", async function(req, res) {
  console.log("gtecall");
  try {
    let firstimeupload = await userapi.getall();
    res.status(200).send(firstimeupload);
  } catch (e) {
    res.status(404).send(e);
  }
});
router.post("/makepay", async function(req, res) {
  let income = Math.round(req.body.salary / 12);
  let userdetails = {
    name: req.body.firstname + " " + req.body.lastname,
    payperiod: req.body.paymentday,
    grossincome: income,
    netincome: income,
    superamount: Math.round(req.body.rate * income / 100),
    incometax: 0
  };

  let user = check();

  function check() {
    if (req.body.salary < 18201) {
      return userdetails;
    } else if ((req.body.salary > 18200 && req.body.salary <= 37, 000)) {
      userdetails.netincome = Math.round(income - 0.19 * (18200 - income) / 12);
      userdetails.incometax = 0.19 * (req.body.salary - 18200) / 12;
      return userdetails;
    } else if (req.body.salary > 37000 && req.body.salary <= 87000) {
      userdetails.netincome = Math.round(
        income - (3572 + 0.325 * (req.body.salary - 37000)) / 12
      );
      userdetails.incometax = Math.round(
        (3572 + 0.325 * (req.body.salary - 37000)) / 12
      );
      return userdetails;
    } else if (req.body.salary > 87000 && req.body.salary <= 180000) {
      userdetails.netincome = Math.round(
        income - (19822 + 0.37 * (req.body.salary - 87000)) / 12
      );
      userdetails.incometax = Math.round(
        (19822 + 0.37 * (req.body.salary - 87000)) / 12
      );

      return userdetails;
    } else {
      userdetails.netincome = Math.round(
        income - (54232 + 0.45 * (req.body.salary - 180000)) / 12
      );
      userdetails.incometax = Math.round(
        (54232 + 0.45 * (req.body.salary - 180000)) / 12
      );

      return userdetails;
    }
  }
  try {
    let insertdetails = await userapi.createDetails(userdetails);
    res.status(200).send(insertdetails);
  } catch (e) {
    res.status(404).send(e);
  }
});
module.exports = router;
