import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function checkAi(req, res) {
  const chatData = req.body;
  const users = chatData.users;
  const messages = chatData.messages;

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",

    messages: [
      { role: "system", content: "You are a helpful assistant." },
      ...messages,
    ],

    temperature: 0.9,
    max_tokens: 100,
  });

  res.status(200).json({ result: completion.data.choices[0].message });
}
