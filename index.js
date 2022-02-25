const webpush = require("web-push");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

//console.log(webpush.generateVAPIDKeys());

const publicKey =
  "BGBAi_YVJceSt_YP1zupzpVSixB96kVthVFXMujq63VaZUNZfFtVobYkez-2jgfWH_9Nf4HvucNNqBmPsMfmfnw";

const privateKey = "zTRYjRgHxnZxfuI5LuPa7x686CpY6RGBlvL3h597WP0";

const app = express();

//

app.use(bodyParser.json());
//webpush.setVapidDetails("mailto:test@test.com", publicKey, privateKey);
// Subscribe Route

app.post("/subscribe", (req, res) => {
  //Get pushSubscriotion object
  const subscription  = req.body;
  //Send 201 resource create
  res.status(201).json({});
  // Create payload
  const payload = {
    notification: {
        title: 'Title',
        body: 'This is my body',
        icon: 'assets/icons/icon-384x384.png',
        actions: [
            { action: 'bar', title: 'Focus last' },
            { action: 'baz', title: 'Navigate last' },
        ],
        data: {
            onActionClick: {
                default: { operation: 'openWindow' },
                bar: {
                    operation: 'focusLastFocusedOrOpen',
                    url: '/signin',
                },
                baz: {
                    operation: 'navigateLastFocusedOrOpen',
                    url: '/signin',
                },
            },
        },
    },
};

const options = {
  vapidDetails: {
      subject: 'mailto:example_email@example.com',
      publicKey: publicKey,
      privateKey: privateKey,
  },
  TTL: 60,
};

  //pass object into sendNotification
  webpush.sendNotification(subscription , JSON.stringify(payload), options)
  .then((_) => {
      console.log('SENT!!!');
      console.log(_);
  })
  .catch((_) => {
      console.log(_);
  });

});

const port = 5000;
app.listen(port,()=>console.log(`Server started on port ${port}`))
