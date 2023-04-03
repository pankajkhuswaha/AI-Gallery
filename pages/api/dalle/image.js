const axios = require("axios");


export default async function handler(req, res) {
    if (req.method === "POST") {
        const prompt = req.body.prompt;
        const params = {
            q:prompt, pageNumber: '1', pageSize: '10', autoCorrect: 'true'
        }
        const options = {
            method: 'GET',
            url: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI',
            params,
            headers: {
              'X-RapidAPI-Key': '764f38a5a2mshfa0ae8eeb2d21c7p14d197jsnf53744f7d0c4',
              'X-RapidAPI-Host': 'contextualwebsearch-websearch-v1.p.rapidapi.com'
            }
          };
          

        axios.request(options).then(function (response) {
            console.log("i")
            res.status(200).json(response.data.value);
        }).catch(function (error) {
            res.status(500).json(error.response.data.message);
        });

    } else {
        res.status(200).json("This is not allowed");
    }
}