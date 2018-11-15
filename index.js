const express = require('express'); 
const bodyParser = require('body-parser')
const app = express();
const stripe = require('stripe')('sk_test_ORsPZWQzwE4be3veguT28Cmj');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.post('/payment',(req, res) => {
  console.log('payment request..', req.body)
  const token = req.body.stripeToken; // Using Express
  const amount = req.body.amount; // Using Express
  //Charge the user's card:
  stripe.charges.create({
    amount: amount,
    currency: "usd",
    description: "test charge",
    source: token,
  },(err, charge) => {
    if(err) {
    console.log(err);
    res.send('Failed')
    } else {
      console.log('success payment', charge);
      res.send(charge)
    }
  });
});

app.listen(3000);