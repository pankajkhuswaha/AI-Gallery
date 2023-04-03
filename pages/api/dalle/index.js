const axios = require("axios");


export default async function handler(req, res) {
    if (req.method === "POST") {
        const prompt = req.body.prompt;
        const datas = {
            prompt,
            n: 2,
            size: "1024x1024"
        }
        const options = {
            method: 'POST',
            url: 'https://openai80.p.rapidapi.com/images/generations',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': 'a4f0c55a35mshd7e44f58190e64dp1a783fjsn71dcee25a976',
                'X-RapidAPI-Host': 'openai80.p.rapidapi.com'
            },
            data: JSON.stringify(datas)
        };

        axios.request(options).then(function (response) {
            res.status(200).json(response.data.data);
            console.log(response.data)
        }).catch(function (error) {
            res.status(200).json(error);
        });

    } else {
        res.status(200).json("This is not allowed");
    }
}