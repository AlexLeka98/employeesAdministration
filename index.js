const express = require('express');
const app = express();
const path = require('path');
const easyinvoice = require('easyinvoice');
const fs = require('fs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static('public'));

const date = new Date();

const data = {
    //"documentTitle": "RECEIPT", //Defaults to INVOICE
    "currency": "EUR",
    "taxNotation": "vat", //or gst  
    "marginTop": 25,
    "marginRight": 25,
    "marginLeft": 25,
    "marginBottom": 25,
    "logo": "", //or base64
    //"logoExtension": "png", //only when logo is base64
    "sender": {
        "company": "Almanvi",
        "address": "Walchersestraat 77",
        "zip": "3083 NH",
        "city": "Den Haag",
        "country": "Netherlands"
        //"custom1": "custom value 1",
        //"custom2": "custom value 2",
        //"custom3": "custom value 3"
    },
    "client": {
        "company": "Kathodon",
        "address": "Klaverstraat 74 A",
        "zip": "4567 CD",
        "city": "Clientcity",
        "country": "Clientcountry"
        //"custom1": "custom value 1",
        //"custom2": "custom value 2",
        //"custom3": "custom value 3"
    },
    "invoiceNumber": "2021.0003",
    "invoiceDate": `${date.toLocaleDateString("en-US")}`,
    "services": [
        {
            "quantity": "1",
            "description": "Driving, 13:00-16:00, 13€ per hour",
            "tax": 21,
            "price": 33.87
        },
        {
            "quantity": "1",
            "description": "Driving, 13:00-19:20, 17€ per hour",
            "tax": 21,
            "price": 10.45
        }
    ],
    // "bottomNotice": "Kindly pay your invoice within 15 days."
};

//Create your invoice! Easy!
easyinvoice.createInvoice(data, async (result) => {
    await fs.writeFileSync("Invoice.pdf", result.pdf, 'base64');
});


const drivers = [
    { name: 'Alex', surname: 'Leka', age: '23', nationality: 'Albanian', euro: '15', receive: '17' },
    { name: 'Mario', surname: 'Leka', age: '24', nationality: 'Albanian', euro: '13', receive: '15' },
    { name: 'Alex', surname: 'Tsara', age: '24', nationality: 'Albanian', euro: '16', receive: '18' },
    { name: 'Usni', surname: 'Nojokepls', age: '38', nationality: 'Morocco', euro: '17', receive: '19' },
    { name: 'Mark', surname: 'Jokes', age: '38', nationality: 'Morocco', euro: '17', receive: '19' },
    { name: 'Jack', surname: 'Yotobalo', age: '29', nationality: 'Albania', euro: '6', receive: '20' },
];


app.get('/', (req, res) => {
    res.render('home.ejs',{drivers:drivers});
})

app.get('/invoice',(req,res) => { 
    res.render('invoice.ejs');
})


app.listen(3000, () => {
    console.log("Listening on port 3000");
})