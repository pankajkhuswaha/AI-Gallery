const axios = require("axios");


export default async function handler(req, res) {
    if (req.method === "POST") {
        const prompt = req.body.prompt;
        const options = {
            method: 'GET',
            url: 'https://bing-image-search1.p.rapidapi.com/images/search',
            params: {q: prompt},
            headers: {
              'X-RapidAPI-Key': '50ea576785msh730d92cfe67ca17p1f0b50jsndf96c973e710',
              'X-RapidAPI-Host': 'bing-image-search1.p.rapidapi.com'
            }
          };
          

        axios.request(options).then(function (response) {
            res.status(200).json(response.data.value);
        }).catch(function (error) {
            res.status(500).json(error.response.data.message);
        });

    } else {
        res.status(200).json("This is not allowed");
    }
}