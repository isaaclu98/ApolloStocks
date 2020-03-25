
function getURL(symbol){
  return "https://sandbox.iexapis.com/stable/stock/market/batch?symbols="+symbol+"&types=quote&token=Tpk_25c2d508abf344e88c4cad95e16d76d9";
}

async function fetchAsync (url,key,value) {
  let response = await fetch(url);
  let data = await response.json()
  .then(data =>{
      createPortfolioTable(key,value,data);
  })
}

async function fetchTickerInfo (url,quantity,ticker,buyOrSell) {
  let response = await fetch(url);
  let data = await response.json()
  .then(data =>{
      buyingStocks(JSON.parse(JSON.stringify(data)),quantity,balance,ticker,buyOrSell)
  })
}

function UrlExists(url, cb){
  jQuery.ajax({
      url:      url,
      dataType: 'text',
      type:     'GET',
      complete:  function(xhr){
          if(typeof cb === 'function')
             cb.apply(this, [xhr.status]);
      }
  });
}


