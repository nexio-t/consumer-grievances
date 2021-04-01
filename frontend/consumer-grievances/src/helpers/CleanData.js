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
    if (num < 0.6) return (color = colorKey["low"]);
    if (num < 1.4) return (color = colorKey["moderate"]);
    else return (color = colorKey["high"]);
  } else if (type === "robocalls") {
    num = parseFloat(data);
    if (num < 10) return (color = colorKey["low"]);
    if (num < 14) return (color = colorKey["moderate"]);
    if (num >= 14) return (color = colorKey["high"]);
  } else if (type === "totalRobocalls") {
    console.log("in totalRobocalls is: "); 
    num = parseInt(data);
    if (num < 20000) return (color = colorKey["low"]);
    if (num < 100000) return (color = colorKey["moderate"]);
    if (num >= 100000) return (color = colorKey["high"]);
  }

  console.log("color right before return is: ", color);
  return color;
};
