import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import base64 from "base-64";

const app = express();
const port = process.env.PORT || 4000;
const API_key = "YOUR_API_KEY";
const API_URL = "https://api.api-ninjas.com/v1";


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));



app.get("/", (req,res) => {
    res.render("index.ejs");
})

app.get("/home", (req,res) => {
    res.render("index.ejs");
})

app.get("/about", (req,res) => {
    res.render("about.ejs");
})

app.get("/contact", (req,res) => {
    res.render("contact.ejs");
})

app.get("/fact", async (req,res) => {
    // console.log("fact");
    try 
    {
        const url = API_URL + "/facts?limit=1"
        const request = await axios.get(url,
        {
            headers: 
            {
                'X-Api-Key': API_key,
            },
        });
        const result = request.data;
        const content = result[0].fact;
        // console.log(facts);
        res.render("index.ejs",{result: content, heading: "Fact",});
    }
    catch(e)
    {
        console.log(e.message);
        const result = e.message;
        res.render("index.ejs",result, {heading: "Error"});
    }
    
})

app.get("/joke", async (req,res) => {
    // console.log("joke");
    try 
    {
        const url = API_URL + "/dadjokes?limit=1"
        const request = await axios.get(url,
        {
            headers: 
            {
                'X-Api-Key': API_key,
            },
        });
        const result = request.data;
        const content = result[0].joke;
        // console.log(result);
        res.render("index.ejs",{result: content, heading: "Joke"});
    }
    catch(e)
    {
        console.log(e.message);
        const result = e.message;
        res.render("index.ejs",result, {heading: "Error"});
    }
    
})

app.get("/hobbie", (req,res) => {
    res.render("form.ejs", {formType: "hobbie"});
})

app.get("/exercise", (req,res) => {
    res.render("form.ejs", {formType: "exercise"});
})

app.get("/qr-code", (req,res) => {
    res.render("form.ejs", {formType: "qr-code"});
})

app.get("/weather", (req,res) => {
    res.render("form.ejs", {formType: "weather"});
})

app.post("/hobbieSubmit", async (req,res) => {
    const category = req.body["category"];
    console.log(category);
    try
    {
        const url = API_URL + "/hobbies?category=" + category;
        console.log(url);
        const request = await axios.get(url, 
            {
                headers: {'X-Api-Key': API_key},
            });
        const result = request.data;
        const hobbie = result;
        console.log(result);

        res.render("index.ejs", {result: hobbie, heading: "Hobbie"});
    }
    catch(e)
    {
        res.render("indexx.ejs", {result: e.message, heading: "Error"});
    }
});

app.post("/exerciseSubmit", async (req,res) => {
    let type = req.body["type"];
    let muscle = req.body["muscle"];
    let difficulty = req.body["difficulty"];
    // console.log(type);
    // console.log(muscle);
    // console.log(difficulty);

    let url = API_URL;
    if(muscle == "")
    {
        url = url + "/exercises?type=" + type;
        url = url + "&difficulty=" + difficulty
    }
    else
    {
        url = url + "/exercises?type=" + type;
        url = url + "&difficulty=" + difficulty;
        url = url + "&muscle=" + muscle;
    }

    try
    {
        const request = await axios.get(url, {
            headers: 
            {
                'X-Api-Key': API_key,
            },
        });

        console.log(url);
        const result = request.data;
        // console.log(result);
        res.render("index.ejs", {result: result, heading: "Exercise"});
    }
    catch(e)
    {
        res.render("index.ejs", {result: e.message, heading: "Error"});
    }
})

app.post("/qrCodeSubmit", async (req,res) => {
    const qr_url = req.body["url"];
    console.log(qr_url);

    try 
    {
        const url = API_URL + "/qrcode?format=png&data=" + qr_url;
        const request = await axios.get(url, {
            headers: {
                'X-Api-Key': API_key,
            },
        });

        const result = request.data;
        // console.log("request done");
        // console.log(result);
        res.render("index.ejs", {result: result, heading: "QR Code"});
    }
    catch(e)
    {
        res.render("index.ejs", {result: e.message, heading: "Error"});
    }
})

app.post("/weatherSubmit", async (req,res) => {
    const city = req.body["city"];

    try
    {
        const url = API_URL + "/weather?city=" + city;

        const request = await axios.get(url, {
            headers: {
                'X-Api-Key': API_key,
            },
        });

        const result = request.data;
        console.log(result);
        res.render("index.ejs", {result: result, heading: "Weather"});
    }
    catch(e)
    {
        res.render("index.ejs", {result: e.message, heading: "Error"});
    }
})

app.listen(port, ( )=> {
    console.log(`Server is running on port ${port}`);
});
