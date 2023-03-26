import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function checkAi(req, res) {
  const {
    goal,
    currentWeight,
    targetWeight,
    daysPerWeek,
    timePerSession,
    units,
  } = req.body;

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: generatePrompt(
      goal,
      currentWeight,
      targetWeight,
      daysPerWeek,
      timePerSession,
      units
    ),
    temperature: 0.9,
    max_tokens: 500,
    n: 5,
  });

  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(
  goal,
  currentWeight,
  targetWeight,
  daysPerWeek,
  timePerSession,
  units
) {
  let prompt = `what would be a good workout plan if ${goal}. My current weight is ${currentWeight} ${units} and my target weight is ${targetWeight} ${units}. I can workout ${daysPerWeek} days per week for ${timePerSession} minutes per session. I cant afford a personal trainer and dont have access to other apps. I am intermidiate.`;
  return prompt;
}
