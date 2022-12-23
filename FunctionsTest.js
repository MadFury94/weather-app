// const year_of_birth = 2000;
// const current_year = 2022;

function calculate_users_current_age(users_year_of_birth, current_year) {
  console.log(users_year_of_birth, current_year);

  const age_in_five_years = "undefined";

  if (typeof current_year === "undefined") {
    current_year = new Date().getFullYear();
    console.log("Current year is undefined", current_year);
  } else {
    console.log(
      `The current year ${current_year} is defined which means the person's age is ${
        current_year - users_year_of_birth
      } and the person's age in five years would be ${age_in_five_years}
      `
    );
  }
  console.log(current_year);
  let javascript_current_date = new Date().getFullYear();
  console.log(javascript_current_date);
  const user_current_age = current_year - users_year_of_birth;
  console.log(`Messi's age is ${user_current_age}`);
}
calculate_users_current_age(1987, 2029);

// function age_in_five_years() {
//   const new_year = 2023;
//   const current_age = new_year - year_of_birth;
//   const age_in_five_years = current_age + 5;
//   console.log(age_in_five_years);
// }
// age_in_five_years();
