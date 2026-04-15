# Core Program Final Project

A starter project for the Core program final project:
  
https://hub.hackyourfuture.nl/core-program-week-14

A nutrition tracking app focused on **behavior change**, not just calorie counting.

The system helps users:
- understand their eating patterns  
- receive structured feedback  
- improve habits through measurable adjustments  

Core principle:  
**log → see → understand → adjust**

---

## 🎯 Project Goals

### 1. Motivation for Behavior Change
Help users improve eating habits through clear feedback  

### 2. Motivation for Behavior Maintenance
Support consistency via simple daily evaluation  

---

## 🧠 Motivation Tools

### Awareness through Data
- Users see actual intake vs goals  

### Scoring System
- Daily score: **1–10**  
- Based on deviation from goals  
- Simplifies complex nutrition data  

---

## ⚙️ Usage Configuration

The system allows users to:
- Select which parameters to track  
- Define their own target values  

---

## 🧭 Recommended Tracking Approaches

### Beginner Approach
- Calories  
- Protein  
- Fat  
- Carbohydrates  

### Full Tracking Approach
- Calories  
- Protein  
- Fat  
- Carbohydrates  
- Water  
- Caffeine  
- Alcohol  

### Goal-Oriented Tracking

Examples:
- Alcohol reduction → track alcohol only  
- Hydration improvement → track water  

If unsure, start with the Beginner Approach and expand later.

---

## 🎯 Goal Setting

Users define their own targets for each parameter.

---

## 🔄 User Flow

1. Registration  
2. Profile setup  
3. Meal logging  
4. Aggregation  
5. AI evaluation  
6. Daily report  

---

## 🧠 Core Logic

**Log → Aggregate → Evaluate → Recommend → Adjust**

---

## 🧩 Features

- Food logging  
- Macro & extended tracking  
- Daily scoring  
- AI-generated feedback  
- Personalized recommendations  

---

## 📊 Outputs

### Daily Summary (AI-generated)

```
SUMMARY: ...
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
- ...
- ...
```

---

### Daily Meals (CLI format)

```
DAILY MEALS

Date: YYYY-MM-DD

------------------------------------------------------------
Meal       | Product           | Kcal | Prot | Fat | Carbs
------------------------------------------------------------
Breakfast  | Oatmeal 100g      | 120  | 4g   | 2g  | 21g
Breakfast  | Banana 120g       | 105  | 1g   | 0g  | 27g

Lunch      | Chicken 200g      | 330  | 62g  | 7g  | 0g

Dinner     | Rice 150g         | 180  | 4g   | 1g  | 40g
------------------------------------------------------------

TOTALS
Kcal: X
Protein: Xg
Fat: Xg
Carbs: Xg
Water: X ml
Caffeine: X mg
Alcohol: X ml
```

---

## 🤖 AI Evaluation System

The system uses an LLM to analyze daily totals and generate structured feedback.

### AI Responsibilities

1. Parameter Evaluation  
2. Daily Score (1–10)  
3. Recommendations  

---

## Input

```
GOALS:
kcal: X, protein: Xg, fat: Xg, carbs: Xg, water: Xml, caffeine: Xmg, alcohol: Xml

MEALS:
- MealType: Product amount (kcal, protein, fat, carbs)
```

## Setup

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm start` to run the application

## Code quality
- Run `npm run lint` to check for linting errors
- Run `npm run format` to format the code with Prettier

## Tests
Run `npm test` to run the tests

