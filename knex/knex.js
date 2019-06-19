const environment = process.env.ENVIRONMENT || 'development'
const config = require('../knexfile.js')[environment];
const knex = require('knex')(config);



const queryType = process.argv.slice(2)[0];

switch (queryType) {

  case "find":
    const queryName = process.argv.slice(2)[1];
    let counter = 1;
    console.log(`Searching...`)
    knex.select('*')
      .from('famous_people')
      .where({
        first_name: queryName
      })
      .orWhere({
        last_name: queryName
      })
      .then((rows) => {
        for (row of rows) {
          const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
          let newDate = row.birthdate.toLocaleDateString("default", dateOptions);
          console.log(`- ${counter}: ${row['first_name']} ${row['last_name']}, born ${newDate}`);
          counter = counter + 1;
        }
      })
      .asCallback(function (err) {
        if (err) return console.error(err);
      });
    break;

  case "insert":
    const newFirstName = process.argv.slice(2)[1];
    const newLastName = process.argv.slice(2)[2];
    const newBirthDate = process.argv.slice(2)[3];

    knex.insert({ first_name: newFirstName, last_name: newLastName, birthdate: newBirthDate })
      .into("famous_people")
      .then((rows) => {
        console.log("Famouse person added");
      })
      .asCallback(function (err) {
        if (err) return console.error(err);
      });
    break;
};
