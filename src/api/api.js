const express = require('express');

const app = express();
app.use(express.json());

const PORT = 5000;

app.get('/',(req,res,next) => {
    res.status(200).json({
        'message': 'Running Node with Express and Typescript'
    });
});

app.post('/image-gen', async (req,res,next) => {
    try {
        const url = await getDALLEImage(req.body.prompt);

        res.status(200).json(
            {url: url}
        );
    }
    catch {
        res.status(200).json(
            {error: "so true"}
        );
    }
});

app.listen(PORT, () => {
    console.log(
        `Server running on ${PORT}.`
    )
});

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "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"
});
const openai = new OpenAIApi(configuration);

async function getDALLEImage(prompt) {
	const response = await openai.createImage({
        prompt: prompt,
        n: 1,
        size: "1024x1024",
    });
    const image_url = response.data.data[0].url;
    return image_url;
}
