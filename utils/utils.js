const fs = require("fs");
const storeFilePath = "./store.json";

exports={}

// Function to read data from store.json file
exports.readDataFromFile = async () => {
  try {
    const data = fs.readFileSync(storeFilePath);
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading from store.json:", error);
    return { posts: [], authors: [] };
  }
};

// Function to write data to store.json file
exports.writeDataToFile = async (data) => {
  try {
    fs.writeFileSync(storeFilePath, JSON.stringify(data, null, 4));
  } catch (error) {
    console.error("Error writing to store.json:", error);
  }
};



module.exports =exports;