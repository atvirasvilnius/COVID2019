function getURLParameter(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results || !results[2]) return null;
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// set defaults
let s = [];
let m = '';
let y = 2016;
let t = '';


// Get URL arguments if passed
//     m   metric number
//     y   year
//     s   selected
//     t   map title
m = '1';
if (getURLParameter("m")) {
  let passedMetric = getURLParameter("m");
  m = passedMetric;
}
if (getURLParameter('y') !== null) {
  y = getURLParameter('y');
}
if (getURLParameter('s') !== null) {
  s = getURLParameter('s').split(",");
}
if (getURLParameter('t') !== null) {
  t = getURLParameter('t');
}

// set iframe src
document.querySelector('.embed iframe').src = setURL(m, y, s, t);


// URL for the iframe
function setURL(m, y, s, t) {
  let url =
    `${window.location.href.substring(0, window.location.href.lastIndexOf("/")) + '/embed.html'}?m=${m}&y=${y}&s=${s}&t=${encodeURI(t)}&tocp=true&pitch=false`;
  return url;
}

// parent/iframe communications
window.titleChange = function (title) {
  document.querySelector("iframe").contentWindow.postMessage({
    "title": title
  }, '*');
};
window.onmessage = function (e) {
  let data = e.data;
  if (data.maptitle) {
    t = data.maptitle;
    document.querySelector("#maptitle").value = t;
  }
};