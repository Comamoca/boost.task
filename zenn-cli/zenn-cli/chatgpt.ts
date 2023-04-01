import { Configuration, OpenAIApi } from "https://esm.sh/openai@3.2.1";
import "https://deno.land/std@0.182.0/dotenv/load.ts";

export async function ai_slug_emoji(
  title: string,
): Promise<Record<string, string>> {
  const config = new Configuration({
    apiKey: Deno.env.get("OPENAI_APIKEY"),
  });

  // {{{
  const prompt = `You are an excellent namer and an expert in pictograms.

The output should be a markdown code snippet formatted with the following schema

\}JSON
[
  {
   slug: string, // The slug of the article.
   emoji: string // An emoji that will be the article's eye-catcher.
  },.
  {
   slug: string, // The slug of the article.
   emoji: string // The emoji that will be the article's eye-catcher.
  }, }
]
\}

NOTES:
* slug must be a single-byte lowercase letter, a single-byte numeric hyphen, or underscore.
* The slug must be a combination of 12 to 50 characters.
* Please do not include anything other than JSON in your answer.
* Please specify one emoji that symbolizes the article for the emoji. 
* If your article title contains the name of a programming language, choose an emoji that represents that language.

${title} Please give me 5 SLUGs you would recommend.`; //}}}

  const openai = new OpenAIApi(config);

  const model = "gpt-3.5-turbo";
  const response = await openai.createChatCompletion({
    model: model,
    messages: [{ role: "user", content: prompt }],
  });

  const chatgpt_content = response.data.choices[0].message?.content;

  const pattern = /```JSON([\s\S]+?)```/i;

  const match = chatgpt_content.match(pattern);

  if (match && match.length > 1) {
    const jsonString = match[1].trim();
    const data = JSON.parse(jsonString);

    return data;
  }
}
