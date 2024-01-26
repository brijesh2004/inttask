const express = require('express');
const app = express();
const fs = require('fs');

app.get('/data', async (req, res) => {
    try {
        const name = req.query.n;
        const line = req.query.m;


        if (name) {
            const data = fs.readFileSync(`${name}.txt`, 'utf-8');
            
            if (!data) {
                return res.status(400).send({ error: "File not found or empty" });
            }

            if (line > 0) {
                const lines = data.split('\n');
                
                if (line > lines.length) {
                    return res.status(400).send({ error: `Line number ${line} is not present in the file` });
                }

                const sendLinesData = lines[line - 1];
                return res.status(200).send({data: sendLinesData });
            } else {
                // Send the whole file data if line is not specified
                return res.status(200).send({data: data });
            }
        } else {
            return res.status(400).send({ error: "Please specify a file name" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send({ error: "Please enter n between 1 to 20"});
    }
});

app.listen(8080, () => {
    console.log(`App is running on port 8080`);
});
