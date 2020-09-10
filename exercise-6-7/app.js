const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/time', async (req, res) => {
    try{
        const timeObject = await getExternalRequest('https://worldtimeapi.org/api/timezone/Etc/UTC');
        if(timeObject.status === 200){
            const dataParsed = JSON.parse(timeObject.data);
            res.json({ currentDateTime: dataParsed.datetime });
        }else{
            res.status(500).json({ message: 'an error occurred'});
        }
    }catch (e){
        console.log(e);
        res.status(500).json({ message: 'an error occurred'});
    }
});

app.use((_req, res) => {
    res.status(404).json({message: 'Route not found'});
}); 

app.listen(3000,() => console.log('app is listening to port 3000'));

function getExternalRequest(url) {
    return new Promise((resolve, reject) => {
    https.get(url, (resp) => {
        const bodyData = [];

        resp.on('data', (chunk) => bodyData.push(chunk));
        resp.on('end', () => {
            const resumedResponse = {
                status: resp.statusCode?resp.statusCode:500,
                data: bodyData.join('')
            }
            resolve(resumedResponse);
        });

    }).on("error", (err) => {
        reject(err);
    });
});
}