const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const http = require('http');
const port = 3000;
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/signup.html');    
})
app.post('/', (req, res) => {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    const data = {
        members: [
            {
                email_address: email,
                status: "subsribed",
                merged_field: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    const jsonData=JSON.stringify(data)
    const url="http://us7.api.mailchimp.com/3.0/lists/d29ecad329/members?skip_merge_validation=true"
    const options = {
        method: "POST",
        auth:"bayu1:c8f0a1b0bc5736d260e7f12ea3c89b89-us7"
    }
    const request=http.request(url, options, response => {
        if (response.statusCode === 200) {
            res.sendFile(__dirname+'/success.html')
        } else {
            res.sendFile(__dirname+'/failure.html')
            console.log(response.statusCode)
        }
        response.on("data", data => {
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end()
   
})

app.listen(port, () => console.log(`this app is running at http://localhost:${port}`));

// c8f0a1b0bc5736d260e7f12ea3c89b89-us7
// d29ecad329