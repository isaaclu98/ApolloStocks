
function getURL(symbol){
  return "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="+symbol+"&apikey=SFKFZS7WC5EHFFE8"
}

function Get(yourUrl){
  var Httpreq = new XMLHttpRequest();
  Httpreq.open("GET",yourUrl,false);
  Httpreq.send(null);
  return Httpreq.responseText;          
}



