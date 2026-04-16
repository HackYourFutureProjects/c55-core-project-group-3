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

  function normalizeTo100(value, servingSize) {
    if (!servingSize || servingSize <= 0) {
      return value;
    }

    return (value / servingSize) * 100;
  }

  const rawNutrition = {
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

  const servingSize = Number(data.servingSize);
  const servingSizeUnit = data.servingSizeUnit?.toLowerCase();

  const canNormalize =
    data.dataType === 'Branded' &&
    servingSize > 0 &&
    (servingSizeUnit === 'g' || servingSizeUnit === 'ml');

  if (canNormalize) {
    return {
      kcal: normalizeTo100(rawNutrition.kcal, servingSize),
      protein: normalizeTo100(rawNutrition.protein, servingSize),
      fat: normalizeTo100(rawNutrition.fat, servingSize),
      carbs: normalizeTo100(rawNutrition.carbs, servingSize),
      water: normalizeTo100(rawNutrition.water, servingSize),
      caffeine: normalizeTo100(rawNutrition.caffeine, servingSize),
      alcohol: normalizeTo100(rawNutrition.alcohol, servingSize),
    };
  }

  return {
    kcal: rawNutrition.kcal,
    protein: rawNutrition.protein,
    fat: rawNutrition.fat,
    carbs: rawNutrition.carbs,
    water: rawNutrition.water,
    caffeine: rawNutrition.caffeine,
    alcohol: rawNutrition.alcohol,
  };
}
