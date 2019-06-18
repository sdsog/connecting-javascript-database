const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user: settings.user,
  password: settings.password,
  database: settings.database,
  host: settings.hostname,
  port: settings.port,
  ssl: settings.ssl,
});

const queryType = process.argv.slice(2)[0];
let id = null;

//console.log("query type:", queryType);

client.connect(err => {
  if (err) {
    console.error("errors have occured", err);
    return false;
  }
  console.log('connected to the pg server');

  switch (queryType) {
    case "browse":
      client.query('SELECT * FROM famous_people', (err, res) => {
        if (err) throw err;
        console.log(res.rows);
        client.end();
      });
      break;

    case "find":
      name = process.argv.slice(2)[1];
      client.query(
        'SELECT * FROM famous_people WHERE first_name = $1 OR last_name = $1',
        [name],
        (err, res) => {
          if (err) throw err;
          let counter = 1;
          console.log(`Searching ...`);
          console.log(`Found ${res.rows.length} person(s) by the name '${name}'`);
          res.rows.forEach(function (element) {
            const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
            let newdate = element.birthdate.toLocaleDateString("default", dateOptions);
            console.log(`- ${counter}: ${element.first_name} ${element.last_name}, born '${newdate}'`);
            counter = counter + 1;
          });
          client.end();
        }
      );
      break;
  }
});
