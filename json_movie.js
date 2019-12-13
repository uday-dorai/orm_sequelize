const fs = require('fs');
const data = fs.readFileSync('movies.json');
const movies = JSON.parse(data);

const director = [];
for (const i of movies) {
 
    director.push({
      Director: i.Director,
    });
  }


const movie = [];
function NA(obj) {
  for (const i of Object.keys(obj)) {
    if (obj[i] === 'NA') {
      obj[i] = 0;
    }
  }
  return obj;
}

for (let i of movies) {
  console.log(Object.values(i));
  if (Object.values(i).includes('NA')) {
    i = NA(i);
    movie.push({
      Title: i.Title,
      Description: i.Description,
      Runtime: i.Runtime,
      Genre: i.Genre,
      Rating: i.Rating,
      Metascore: i.Metascore,
      Votes: i.Votes,
      Gross_Earning_in_Mil: i.Gross_Earning_in_Mil,
      Director: i.Director,
      Actor: i.Actor,
      Year: i.Year,
    });
  } else {
    movie.push({
      Title: i.Title,
      Description: i.Description,
      Runtime: i.Runtime,
      Genre: i.Genre,
      Rating: i.Rating,
      Metascore: i.Metascore,
      Votes: i.Votes,
      Gross_Earning_in_Mil: i.Gross_Earning_in_Mil,
      Director: i.Director,
      Actor: i.Actor,
      Year: i.Year,
    });
  }
}

// console.log(movie);
// console.log(director);
module.exports={director,movie}