// reports
/*
We need here to get the data from database 
and also we need calculation 
and the recommendation from Ai 

=====================================
       🍎 DAILY NUTRITION REPORT
=====================================
Date: Friday 11 April 2026
User: Hannah

📊 MACROS vs GOALS
-------------------------------------
Calories:      2153 / 2000  ⚠️  slightly above
Protein:   130g  / 130g  ✅ perfect
Fat:       74g   / 70g   ⚠️  slightly above
Carbs:     227g  / 250g  ✅ perfect
Water:     1650ml/ 2000ml ⚠️  drink more
Alcohol:   0               ✅ perfect

🏆 SCORE: 9/10

💡 RECOMMENDATIONS:
1. Reduce cheese portion slightly to lower fat
2. Drink 2 more glasses of water tomorrow
3. Great job on protein — keep it 
*/
import chalk from 'chalk';


export async function reportCli(subcommand, args) {
    if (subcommand === 'SHOW') {
        await dailyReports(...args);
    } else if(!subcommand === 'SHOW') {
        console.log(chalk.red('Invalid Report Command. Try: REPORT SHOW'));
    }
}

export async function fetchDate(params) {
const date = new Date();
//en-GB is Birtish format to show the date : Day 00-MM-yyyy
const weekday = date.toLocaleDateString('en-GB', { weekday: 'long' }); // long shows the fullName of the day not Fri but Friday.
const day = date.getDate();
const month = date.toLocaleDateString('en-GB', { month: 'long' });
const year = date.getFullYear();

const formatted = `${weekday} ${day} ${month} ${year}`; // "Friday 11 April 2026"
console.log('Date:', formatted);
}

export async function dailyReports() {
    console.log('=====================================');
    console.log("       🍎 DAILY NUTRITION REPORT");
    console.log('=====================================');
    const date = fetchDate();
    //console.log(date); // ISO timestamp (UTC)
    // Need to bring user from DB
    console.log(user);
    console.log('📊 MACROS vs GOALS');
    console.log('-------------------------------------');
    /*const result = {
        calories:      2153 / 2000  ⚠️  slightly above
        Protein:   130g  / 130g  ✅ perfect
        Fat:       74g   / 70g   ⚠️  slightly above
        Carbs:     227g  / 250g  ✅ perfect
        Water:     1650ml/ 2000ml ⚠️  drink more
        Alcohol:   0               ✅ perfect
    }*/
    //console.log('Kcal:')
    console.log('🏆 SCORE:');
    console.log('💡 RECOMMENDATIONS:');
}
