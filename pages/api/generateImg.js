import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);
  
  const response = await openai.createImage({
    prompt:req.body,
    n:1,
    size:"512x512"
  })

  res.json({url:`${response.data.data[0].url}`})

}
