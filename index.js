const express = require('express');
const { Configuration, OpenAIApi } = require("openai");
const fs = require('fs');

const app = express();
const port = 3000;

const apiKey = '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';
const prompt = `Write a motivational text about technology that I can use on LinkedIn with hashtags #motivation #technology #linkedin.`;

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
};

const configuration = new Configuration({
    apiKey: apiKey,
});


const inputFile = fs.readFileSync('./input.txt');
const file = Buffer.from(inputFile).toString('base64');

const model = 'text-davinci-002';
const responseFormat = 'text';
const temperature = 0.7;

const openai = new OpenAIApi(configuration);
const response = openai.createTranslation(file, model, prompt, responseFormat, temperature)
    .then((response) => {
        console.log(response.data.choices[0].text);
    })
    .catch((error) => {
        console.log(error);
    });

console.log(response)

app.get('/teste', (req, res) => {
    const prompt = 'Olá, como você está?';
    const parameters = {
        engine: 'text-davinci-002',
        prompt,
        temperature: 0.5,
        maxTokens: 16,
        stop: '\n'
    };

    openai.createCompletion(parameters)
        .then(response => {
            const text = response.data.choices[0].text.trim();
            console.log(`Resposta gerada: ${text}`);
        })
        .catch(error => {
            console.log(`Erro na geração de resposta: ${error}`);
        });
    1
});

app.get('/generate-motivation', (req, res) => {
    response
        .then((result) => {
            res.status(200).send(`Motivational text generated: ${result.data.data}`);
        })
        .catch((err) => {
            console.log(`Error generating motivational text: ${err}`);
            res.status(500).send(`Error generating motivational text: ${err}`);
        });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
