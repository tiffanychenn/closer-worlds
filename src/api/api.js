const uuid = require("uuid")
const express = require("express");
const fs = require('fs');
const bodyParser = require('body-parser');
require('dotenv').config();

// Initialize the express engine
const app = express();
app.use(bodyParser.json());
 
// Take a port 5000 for running server.
const PORT = 5000;

app.get('/',(req,res) => {
    res.status(200).json({
        'message': 'Running Node with Express and Typescript'
    });
});

app.post('/image-gen', async (req,res) => {
    try {
        const prompt = req.body.prompt;
        const image = await getDALLEImage(prompt);
        const experimentId = req.body.id;
        fs.writeFile("../../data/" + experimentId + "-" + prompt, image, (err) => {
            // In case of a error throw err.
            if (err) res.status(400).send("unable to save image");
        });

        const experimentData = {
            id: experimentId,
            firstPlayerId: req.body.firstPlayerId,
            secondPlayerId: req.body.secondPlayerId,
            loggingData: req.body.loggingData,
            images: req.body.images.concat([experimentId + "-" + prompt])
        }
    
        fs.writeFile("../../data/" + req.body.id + '.json', JSON.stringify(experimentData), (err) => {
            // In case of a error throw err.
            if (err) res.status(400).send("unable to save to file");
        })

        res.status(200).json(
            {image: image}
        );
    }
    catch {
        res.status(200).json(
            {error: "could not get image"}
        );
    }
});

app.post('/experiment', (req, res, next) => {
    const experimentId = uuid.v4()
    const experimentData = {
        id: experimentId,
        firstPlayerId: experimentId + "-0",
        secondPlayerId: experimentId + "-1",
        loggingData: [],
        images: []
    }

    fs.writeFile("../../data/" + experimentId + '.json', JSON.stringify(experimentData), (err) => {
        // In case of a error throw err.
        if (err) res.status(400).send("unable to save to file");
    })
    res.status(200).send(experimentData);
});

app.put('/experiment', (req, res, next) => {
    const experimentData = {
        id: req.body.id,
        firstPlayerId: req.body.firstPlayerId,
        secondPlayerId: req.body.secondPlayerId,
        loggingData: req.body.loggingData,
        images: req.body.images
    }

    fs.writeFile("../../data/" + req.body.id + '.json', JSON.stringify(experimentData), (err) => {
        // In case of a error throw err.
        if (err) res.status(400).send("unable to save to file");
    })
    res.status(200).send(experimentData);
});

app.listen(PORT, () => {
    console.log(
        `Server running on ${PORT}.`
    )
});

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

async function getDALLEImage(prompt) {
	const response = await openai.createImage({
        prompt: prompt,
        n: 1,
        size: "1024x1024",
        response_format: "b64_json"
    });
    const b64_json = response.data.data[0].b64_json;
    return b64_json;
}
