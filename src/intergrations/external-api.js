import 'dotenv/config';

const API_BASE_URL = 'https://api.nal.usda.gov/fdc/v1';
const API_KEY = process.env.FDC_API_KEY;

export async function getFirstFdcId(query) {
  if (!API_KEY) {
    throw new Error('Missing FDC_API_KEY in .env file');
  }
  

  const params = new URLSearchParams({
    api_key: API_KEY,
    query,
    pageSize: 1,
  });

  const response = await fetch(`${API_BASE_URL}/foods/search?${params}`);

  if (!response.ok) {
    throw new Error(`FDC API error: ${response.status}`);
  }

  const data = await response.json();

  if (!data.foods || data.foods.length === 0) {
    return null;
  }

  return data.foods[0].fdcId;
}

export async function getNutrition(fdcId) {
  if (!API_KEY) {
    throw new Error('Missing FDC_API_KEY in .env file');
  }

  const response = await fetch(
    `${API_BASE_URL}/food/${fdcId}?api_key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error(`FDC API error: ${response.status}`);
  }

  const data = await response.json();
  const nutrients = data.foodNutrients || [];

  function getNutrientAmount(possibleNames) {
    const nutrient = nutrients.find((item) => {
      const name = item.nutrient?.name;
      return possibleNames.includes(name);
    });

    return nutrient?.amount ?? 0;
  }

  return {
    kcal: getNutrientAmount([
      'Energy',
      'Energy (Atwater General Factors)',
      'Energy (Atwater Specific Factors)',
    ]),
    protein: getNutrientAmount(['Protein']),
    fat: getNutrientAmount(['Total lipid (fat)', 'Fat']),
    carbs: getNutrientAmount(['Carbohydrate, by difference', 'Carbohydrate']),
    water: getNutrientAmount(['Water']),
    caffeine: getNutrientAmount(['Caffeine']),
    alcohol: getNutrientAmount(['Alcohol, ethyl']),
  };
}
