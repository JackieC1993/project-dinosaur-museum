/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleDinosaurData` variable below to gain access to tickets data. This data is pulled from the `data/dinosaurs.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all dinosaurs.
*/
const exampleDinosaurData = require("../data/dinosaurs");
// Do not change the line above.

/**
 * getLongestDinosaur()
 * ---------------------
 * Returns an object with the longest dinosaur from the list. Converts from meters to feet.
 *
 * NOTE: To convert from meters to feet, multiply the meters by `3.281`.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @returns {Object} An object where the key is the name of the dinosaur and the value is the height of the dinosaur in feet.
 *
 * EXAMPLE:
 *  getLongestDinosaur(dinosaurs);
 *  //> { Brachiosaurus: 98.43 }
 */
function getLongestDinosaur(dinosaurs) {
  let maxDinoHeight = 0; // is set to 0
  let maxDinoName = "";// is set to an empty string
  let result = {}; // is set to an empty object 
  if (!dinosaurs.length) return {}; // check if the input dinosaurs array is empty. If it is, the function immediatley returns an emoty objecct.
  for (let i = 0; i < dinosaurs.length; i++) { // for loop iterates over each dinosaurs in the dinosaurs array. For each dinosaurs,it extracts the lengthinmeters property and stores it in the dinoHeight variable. It then checks if the dinoHeight is greater than the current maxDinoHeight. If it is update the maxDinoHeight variable to dinoHeight and the maxDinoName variable to the current dinosaur name.
    const dinoHeight = dinosaurs[i].lengthInMeters;
    if (dinoHeight > maxDinoHeight) {
      maxDinoHeight = dinoHeight;
      maxDinoName = dinosaurs[i].name;
    }
  }
  const heightInFeet = maxDinoHeight * 3.281; //line calculate the height of the tallest dinosuar in feet by multiplying the maxDinoHeight variabe by 3.281 feet, store the results in the heightinFeet varibake

  return { [maxDinoName]: heightInFeet }; //returns the maxDinoName to indicate that it should be computed dynamically based on the vakue of the macDInoName varibale
}
/**
 * getDinosaurDescription()
 * ---------------------
 * Returns a formatted description of a dinosaur. If the dinosaur cannot be found, returns an error message.
 *
 * NOTE: Carefully view the test output and example below to see how the returned string should be formatted.
 *
 * NOTE: The `\n` represents a new line in text.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {string} id - The unique identifier for the dinosaur.
 * @returns {string} A detailed description of the dinosaur.
 *
 * EXAMPLE:
 *  getDinosaurDescription(dinosaurs, "U9vuZmgKwUr");
 *  //> "Xenoceratops (ZEE-no-SEH-ruh-tops)\nXenoceratops had horns and a bony frill with elaborate ornamentation of projections, knobs, and spikes. It lived in the Early Cretaceous period, over 77.5 million years ago."
 *
 *  getDinosaurDescription(dinosaurs, "incorrect-id");
 *  //> "A dinosaur with an ID of 'incorrect-id' cannot be found."
 */
function getDinosaurDescription(dinosaurs, id) {
  for (let i = 0; i < dinosaurs.length; i++) { // for loop iterates over each dinosaurs in the dinosaurs array. For each dinosaurs, it checks if its dinosaursID property matches the input id 
    const dinosaur = dinosaurs[i];
    if (dinosaur.dinosaurId === id) { // if block creates a description of the dinosaurs.
      return `${dinosaur.name} (${dinosaur.pronunciation})\n${ 
        dinosaur.info // describe the dinosaur with the given id. Using string interpoliation to include the dinosaurs name,ponunication and dinosuar.info, period and the number of million years ago it livved based on the last element in the mya array property.
      } It lived in the ${dinosaur.period} period, over ${
        dinosaur.mya[dinosaur.mya.length - 1]
      } million years ago.`;
    }
  }
  return `A dinosaur with an ID of '${id}' cannot be found.`;// for loop completes without natcching a dinosaur , this code executes to return an error messahe indicating no dinosuar with the id was found in the dinsoaurs array.
}

/**
 * getDinosaursAliveMya()
 * ---------------------
 * Returns an array of dinosaurs who were alive at the given `mya` (i.e. "millions of years ago") value. If a `key` is provided, returns the value of that key for each dinosaur alive at that time. Otherwise, returns the ID.
 *
 * If the dinosaur only has a single value for `mya`, allows for the `mya` value to be equal to the given value or one less. For example, if a dinosaur has a `mya` value of `[29]`, the dinosaur's information will be returned if `29` is entered or `28` is entered.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {number} mya - "Millions of years ago."
 * @param {string} key - An optional parameter. If included, for dinosaurs that lived during the `mya` value given, will return the value of the supplied key. Otherwise, returns the ID.
 * @returns {*[]} An array of values, which depend on the key given. The array should only include data of dinosaurs who lived during the given time period.
 *
 * EXAMPLE:
 *  getDinosaursAliveMya(dinosaurs, 150);
 *  //> ["YLtkN9R37", "GGvO1X9Zeh", "BFjjLjea-O", "V53DvdhV2A"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65);
 *  //> ["WHQcpcOj0G"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65, "name");
 *  //> ["Dracorex"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65, "unknown-key");
 *  //> ["WHQcpcOj0G"]
 */
function getDinosaursAliveMya(dinosaurs, mya, key) {
  const result = []; // result is an empty array
  let dinoKey = key; // dinokey is the key value for the undefined which is to return
  for (let dino of dinosaurs) {
    // dino is the iterable and dinosaurs is the variable that goes through each object in the array.
    if (dino[dinoKey] === undefined) {
      dinoKey = "dinosaurId"; // dinokey = dinosaurID if the orignal dinokey passed throught the function but doesnt exsit, the dinosaur object default using the dinosaur key.
    }
    if (
      dino.mya.length === 1 &&
      (mya === dino.mya[0] || mya === dino.mya[0] - 1)
    ) {//if statements determine whether the current dinosaur was alive mya. It value should match the only element in the mya.
      result.push(dino[dinoKey]); //is one millions year ago less then it pushed the value of dino(dinokey), then it pushes  the dinoo[dino key] to the result array. If the mya value is between the first and second element of the mya array, then it pushes the value to the result array.
    } else if (mya <= dino.mya[0] && mya >= dino.mya[1]) {
      result.push(dino[dinoKey]);
    }
  }
  return result; 
}

module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
