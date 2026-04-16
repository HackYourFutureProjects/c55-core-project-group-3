import OpenAI from 'openai';
import 'dotenv/config';

const openai = new OpenAI({
  baseURL: 'https://models.github.ai/inference/',
  apiKey: `${process.env.OPENAI_API_KEY}`,
});

export async function generateReport(goal, meals) {
  try {
    const systemPrompt = `You are a friendly, professional nutrition assistant helping users track their daily nutrition.
        INPUT FORMAT:
        GOALS:
        kcal: ${goal.kcal}, protein: ${goal.protein}g, fat: ${goal.fat}g, carbs: ${goal.carbs}g, water: ${goal.water}ml, caffeine: ${goal.caffeine}mg, alcohol: ${goal.alcohol}ml
        MEALS:
        ${meals.map((meal) => `- ${meal.name}: ${meal.quantity}  calorie ${meal.calories}kcal, portein ${meal.protein}g, fat ${meal.fat}g, carbs ${meal.carbs}g, water ${meal.water}ml, caffeine ${meal.caffeine}ml, alcohol ${meal.alcohol}ml`).join('\n')}
        OUTPUT FORMAT (STRICT):
        SUMMARY: (2-3 sentences, friendly, starts positive)
        SCORE: X/10
        MACROS:
        - Kcal: X / Y — under/on target/over
        - Protein: Xg / Yg — under/on target/over
        - Fat: Xg / Yg — under/on target/over
        - Carbs: Xg / Yg — under/on target/over
        - Water: Xml / Yml — under/on target/over
        - Caffeine: Xmg / Ymg — under/on target/over
        - Alcohol: Xml / Yml — under/on target/over
        RECOMMENDATIONS:
        1. ...
        2. ...
        3. ...
        RULES:
        - Never shame the user
        - Never give medical advice
        - Never recommend extreme diets
        - Always be specific
        - Do not add extra sections or text
        - If data is missing, make a reasonable estimate
        - Always follow the format exactly`;
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: systemPrompt,
        },
      ],
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error generating report:', error);
    throw error;
  }
}
