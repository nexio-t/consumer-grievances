const colorKey = {
  low: "#ffea98",
  moderate: "#ffb199",
  high: "#ff8a80",
};

export const colorDataRange = (type, data) => {
  let color;
  let num;
  if (type === "finance") {
    num = parseFloat(data);
    if (num < 0.8) return (color = colorKey["low"]);
    if (num < 1.4) return (color = colorKey["moderate"]);
    else return (color = colorKey["high"]);
  } else if (type === "robocalls") {
    num = parseFloat(data);
    if (num < 11) return (color = colorKey["low"]);
    if (num < 14) return (color = colorKey["moderate"]);
    if (num >= 14) return (color = colorKey["high"]);
  } else if (type === "totalRobocalls") {
    console.log("in totalRobocalls is: "); 
    num = parseInt(data);
    if (num < 20000) return (color = colorKey["low"]);
    if (num < 100000) return (color = colorKey["moderate"]);
    if (num >= 100000) return (color = colorKey["high"]);
  }
};

export const convertToThousands = (total, statePopulation) => {
  const dataPerThousand = (total / (statePopulation / 1000)).toFixed(1);
  return dataPerThousand;
};

export const findStatePopulation = async (data, inputValue) => {
  let statePopulation = null;
  await data.map((stateData) => {
    for (const x in stateData) {
      if (x === "State") {
        if (stateData[x].toLowerCase() === inputValue.toLowerCase()) {
          return (statePopulation = stateData["Population"]);
        }
      }
    }
  });
  return statePopulation;
};
