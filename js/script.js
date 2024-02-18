changeVerse = (verse, reference) => {
  document.getElementById("verse").innerHTML = verse;
  if (reference) {
    document.getElementById("reference").innerHTML = reference;
  } else {
    document.getElementById("reference").innerHTML = "";
  }
};

fallbackVerse = () => {
  fetch("https://beta.ourmanna.com/api/v1/get/?format=text")
    .then((response) => response.text())
    .then((text) => {
      changeVerse(text);
    })
    .catch((error) => {
      console.error("Error fetching Bible verse from Our Manna:", error);
      changeVerse("&#10084;");
    });
};

var defaultVersion = "BLPH";

configuration = { proxyUrl: "" };

// Load and parse the configuration file
async function loadConfig() {
  const response = await fetch(chrome.runtime.getURL("config.json"));
  const config = await response.json();
  configuration = config;
  fetchBibleVerse(configuration);
}

function fetchBibleVerse(configuration) {
  var version = localStorage.version || defaultVersion;

  var proxyUrl = configuration.proxyUrl;
  var apiUrl =
    "https://www.biblegateway.com/votd/get/?format=json&version=" + version;

  var url = proxyUrl + apiUrl;

  fetch(url, {
    headers: { "X-Requested-With": "XMLHttpRequest" },
  })
    .then((response) => response.json())
    .then((text) => {
      changeVerse(text.votd.text, text.votd.display_ref);
    })
    .catch((error) => {
      console.error("Error fetching Bible verse from Biblegateway:", error);
      fallbackVerse();
    });
}

function restoreVersion() {
  var version = localStorage.version || defaultVersion;

  var select = document.getElementById("version");
  for (var i = 0; i < select.children.length; i++) {
    var child = select.children[i];
    if (child.value == version) {
      child.selected = "true";
      break;
    }
  }
}

function setVersion() {
  var version = this.children[this.selectedIndex].value;
  localStorage.version = version;
  fetchBibleVerse(configuration);
}

var colors = [
  "#424851",
  "#733933",
  "#575a41",
  "#34584a",
  "#a75924",
  "#32575b",
  "#443146",
];

function getRandomColor() {
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function write(json) {
  var votd = json.votd;
  document.getElementById("verse").innerHTML = votd.text
    .replace("&ldquo;", "")
    .replace("&rdquo;", "");
  document.getElementById("ref").href = votd.permalink;
  document.getElementById("ref").innerHTML = votd.reference;
  document.body.setAttribute("class", "");
}

window.onload = function () {
  document.body.style.backgroundColor = getRandomColor();
  restoreVersion();
  loadConfig();
  document.getElementById("version").onchange = setVersion;
};
