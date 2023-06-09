let getAndReturnPeople = async () => {
    let response = await fetch('https://swapi.dev/api/people');
    let parsedResponse = await response.json();
    let peopleArray = parsedResponse.results;
    return peopleArray;
}
// Take the code above and take a look at the people array that we get from this API.

// "Easy" - Loop through this array of objects and and log the name of each person

let arrayOfNamesShorterThan = [];

const getNamesOfPeopleFromApi = async () => {
    let peopleArray = await getAndReturnPeople();

    peopleArray.forEach(people => console.log(people.name));

    peopleArray.forEach(names => {
        if (names.height <= 165) {
            arrayOfNamesShorterThan.push(names);
            console.log("Medium", arrayOfNamesShorterThan);
        }
    });


    let genderHiegths = {
        talestFemales: undefined,
        shortestFemales: undefined,
        talestMale: undefined,
        shortestMale: undefined,
    };

    peopleArray.forEach(person => {
        if(person.gender === "male") {
            if(genderHiegths.talestMale === undefined) {
                genderHiegths.talestMale = +person.height
                genderHiegths.shortestMale = +person.height
            } else {
                if(person.height > genderHiegths.talestMale ) {
                    genderHiegths.talestMale = +person.height
                }
                if(person.height < genderHiegths.shortestMale) {
                    genderHiegths.shortestMale = +person.height
                }
            }
    
        } else if (person.gender === "female") {  
            if(genderHiegths.talestFemales === undefined) {
                genderHiegths.talestFemales = +person.height
                genderHiegths.shortestFemales = +person.height
            } else {
                if(person.height > genderHiegths.talestFemales) {
                    genderHiegths.talestFemales = +person.height;
                } 
                if(person.height < genderHiegths.shortestFemales) {
                    genderHiegths.shortestFemales = +person.height;
                }
            }      
        } 

    });
    // console.table(genderHiegths);
    // console.log(peopleArray);

    peopleArray.forEach(person => {

      if(person.starships.length === 0) {
          console.log(`This persin is ${person.name} and they have no ship.`);
      } else {

        
        const gettingShipsFromPersonArry = async () => {
          let promisesArray = [];


          for(let i=0; i<person.starships; i++) {
            promisesArray.push((await fetch(person.starships[i])).json());

          }
          console.log(promisesArray)
          Promise.all(promisesArray).then(arrayOfShipResponses => {
              console.log(person.name, arrayOfShipResponses);
      
  
          })
        }
        gettingShipsFromPersonArry();
          // fetch(ship).then(res => res.json()).then( data => {
          //     console.log(`This person ${person.name} and their ships is ${data.name}`);
  
          //   })
          

      }
       
    })
    
}

getNamesOfPeopleFromApi();
// Medium - Loop through this array and make a new array that only contains people that are shorter than 165cm

// Hard - loop thorugh and find the tallest and shortest males and females.

// Very Hard - loop through and for each person write a string that says "This person is <name> and their ship is <name of ship if any>"
// if no ship, say "and they have no ship."