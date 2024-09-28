const setData = require("../data/setData");
const themeData = require("../data/themeData");


//empty array sets.
let sets = [];

// initialize() this function will be used to fill sets array (declared above), by adding copies of all the setData object.
function initialize() {
    return new Promise((resolve, reject) => {
        try {
            setData.forEach(element => {
                // Assigning
                let matchedTheme = themeData.filter(themeElement => themeElement.id === element.theme_id);
                if (matchedTheme.length > 0) {
                    element.theme = matchedTheme[0].name;  // Assign the theme 
                    // Pushing the modified element into the sets array
                    sets.push(element);
                } else {
                    reject(new Error("No matching theme found for element: " + (element)));
                }
            });
            resolve(); // Resolve with no data after filling the sets array
        } catch (error) {
            reject(error);
        }
    });
}

function getAllSets() {
    return new Promise((resolve, reject) => {
        try {
            resolve(sets); // Resolve with the completed "sets" array
        } catch (error) {
            reject(new Error("Unable to fetch sets: " + error.message));
        }
    });
}

function getSetByNum(setNum) {
    return new Promise((resolve, reject) => {
        try {
            const set = sets.find((element) => element.set_num === setNum);
            if (set) {
                resolve(set); // Resolve with the found "set" object
            } else {
                reject(new Error("Unable to find requested set with number: " + setNum)); // Reject if not found
            }
        } catch (error) {
            reject(new Error("Error fetching set by number: " + error.message));
        }
    });
}

function getSetsByTheme(theme) {
    return new Promise((resolve, reject) => {
        try {
            const tSet = sets.filter((el) => el.theme.toLowerCase().includes(theme.toLowerCase()));
            if (tSet.length > 0) {
                resolve(tSet); // Resolve with the found "set" objects
            } else {
                reject(new Error("Unable to find requested sets for theme: " + theme)); // Reject if not found
            }
        } catch (error) {
            reject(new Error("Error fetching sets by theme: " + error.message));
        }
    });
}

module.exports = {
    initialize,
    getAllSets,
    getSetByNum,
    getSetsByTheme
}
