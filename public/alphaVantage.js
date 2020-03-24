
function getURL(symbol){
  // https://sandbox.iexapis.com/stable/stock/market/batch?symbols=aapl,fb&types=quote&token=Tpk_25c2d508abf344e88c4cad95e16d76d9
  return "https://sandbox.iexapis.com/stable/stock/market/batch?symbols="+symbol+"&types=quote&token=Tpk_25c2d508abf344e88c4cad95e16d76d9";
}

async function fetchAsync (url,key,value) {
  let response = await fetch(url);
  let data = await response.json()
  .then(data =>{
      createPortfolioTable(key,value,data);
  })
}



