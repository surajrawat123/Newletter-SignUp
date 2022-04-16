const express = require('express');
const app = express();
const https = require('https');

const PORT = process.env.PORT || 4000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
})

app.post('/', (req, res) => {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [{
            email_address: email,
            status: 'subscribed',
            merge_field: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    };
    const jsonData = JSON.stringify(data);
    const url = `https://us14.api.mailchimp.com/3.0/lists/d3512d6c21`;
    const option = {
        method: "POST",
        auth: "suraj:491979c4013bb1d44e39fa9b24657835-us14"
    }
    const request = https.request(url, option, (response) => {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + '/success.html');
        } else {
            res.sendFile(__dirname + '/failure.html');
        }

        response.on('data', function(data) {
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})



// 491979c4013bb1d44e39fa9b24657835-us14
// d3512d6c21