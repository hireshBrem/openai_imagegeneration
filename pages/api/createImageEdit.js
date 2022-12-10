import { Configuration, OpenAIApi } from "openai";
const fs = require("fs")

export default async function handler(req, res) {
    const configuration = new Configuration({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);
    
    const response1 = await openai.createImageEdit(
        fs.createReadStream("otter.png"),
        fs.createReadStream("mask.png"),
        req.body,
        2,
        "1024x1024"
    ).then(r=>console.log(r.data.data[0].url));
    console.log(response1)
    res.json({url:`ok`})

}
