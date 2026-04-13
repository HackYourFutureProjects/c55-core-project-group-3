/*
First showing list of Meals command:
ADD
LIST OF MEALS 
DELETE
*/
export async function meals() {
  if (subcommand === 'ADD') {
    await add_meals();
  } else if (subcommand === 'LIST') {
    await list_meals();
  } else if (subcommand === 'DELETE') {
    await delete_meals();
  }
}

export async function add_meals() {
  /*
Enter food name:
Enter amount:
Choose unit:
1. g
2. ml
*/
}
