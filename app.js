const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const mailchimp = require('@mailchimp/mailchimp_marketing');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

mailchimp.setConfig({
  apiKey: 'c5ef4ac20f8484a54716a70328d62a29-us21',
  server: 'us21',
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/signup.html');
});

app.post('/', (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const listID = 'c57cf170d8';

  async function addMember() {
    const response = await mailchimp.lists.addListMember(listID, {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
      },
    });
    if (response.statusCode === 200) {
      res.sendFile(__dirname + '/success.html');
    }
  }
  addMember();
});

app.listen(5000);

//api key=c5ef4ac20f8484a54716a70328d62a29-us21
// audience id=  c57cf170d8
