const path = window.location.href;
const predictions = document.getElementById("predictions").children;
const img = document.getElementById("image");

const results = "http://127.0.0.1:5000/static/result/result.json";
const EMOTIONS = [
  "angry",
  "confident",
  "confused",
  "contempt",
  "crying",
  "disgust",
  "fear",
  "happy",
  "neutral",
  "sad",
  "shy",
  "sleepy",
  "surprised",
];
async function GetData() {
  fetch(results)
    .then(async (response) => {
      await HandleResponse(response);
    })
    .catch((data) => console.error(data));
}

async function HandleResponse(response) {
  const data = await response.json();
  if (data["detected"] === true) {
    img.style.borderColor = "green";
    displayData(data["pred"]);
  } else {
    img.style.borderColor = "red";
  }
}
function displayData(pred) {
  for (let i = 0; i < predictions.length; i++) {
    const percentage = Math.floor(pred[EMOTIONS[i]] * 100);
    predictions[i].children[0].style.width =
      (percentage * 0.8).toString() + "%";
    predictions[i].children[0].style.backgroundColor = getcolor(percentage);
  }
}

function getcolor(value) {
  if (value > 75) {
    return "red";
  } else if (value > 50) {
    return "orange";
  } else if (value > 25) {
    return "yellow";
  } else {
    return "black";
  }
}
setInterval(GetData, 200);
