import { describe, test, expect } from 'vitest';

function checkEmailFormat(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function checkNameFormat(name) {
  return /^[a-zA-Z\s]+$/.test(name);
}

const PFC_CALORIES = { protein: 4, carbs: 4, fat: 9 };

function calculateCalories(protein, carbs, fat) {
  return (
    (protein || 0) * PFC_CALORIES.protein +
    (carbs || 0) * PFC_CALORIES.carbs +
    (fat || 0) * PFC_CALORIES.fat
  );
}

describe('calculateCalories', () => {
  test('calculates calories correctly', () => {
    expect(calculateCalories(50, 100, 30)).toBe(870);
  });

  test('returns 0 when all values are 0', () => {
    expect(calculateCalories(0, 0, 0)).toBe(0);
  });

  test('handles null values by treating them as 0', () => {
    expect(calculateCalories(null, null, null)).toBe(0);
  });

  test('handles missing values by treating them as 0', () => {
    expect(calculateCalories(50, null, null)).toBe(200);
  });
});

describe('checkEmailFormat', () => {
  test('valid email should pass', () => {
    expect(checkEmailFormat('joy@email.com')).toBe(true);
  });

  test('invalid email should fail', () => {
    expect(checkEmailFormat('invalid-email')).toBe(false);
  });

  test('missing @ should fail', () => {
    expect(checkEmailFormat('joyemail.com')).toBe(false);
  });
});

describe('checkNameFormat', () => {
  test('valid name should pass', () => {
    expect(checkNameFormat('Hannah')).toBe(true);
  });

  test('name with numbers should fail', () => {
    expect(checkNameFormat('Hannah123')).toBe(false);
  });

  test('empty name should fail', () => {
    expect(checkNameFormat('')).toBe(false);
  });
});
