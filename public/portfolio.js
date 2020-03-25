//Global Variables
var db = firebase.firestore();
var totalProfits = 0;
var url = "";
var iterator = 3;
var currentQuantity = 0;
var currentPrice = 0;
var balance;
var stocks;

//Checks if it is an authorized users
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User logged in already or has just logged in.
      var docRef = db.collection("users").doc(user.uid);
      docRef.get().then(function(doc) {
          if (doc.exists) {
            document.getElementById("currentBalance").innerText = "Balance: " + String(doc.data().balance);
            stocks = doc.data().stocks;
            var stockSymbol = [];
            var stockQuantity = [];
            balance = doc.data().balance;

            for(const [key, value] of Object.entries(stocks)){
                stockSymbol.push(key);
                stockQuantity.push(value);
            }
            fetchAsync(getURL(stockSymbol.join(',')),stockSymbol,stockQuantity);
          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
          }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });
    } else {
      // User not logged in or has just logged out.
    }
});

function createPortfolioTable(symbols,quantities,jsonObj){
      //Key Represents Ticker Symbol && Value represents Quantity
      for(var i = 0 ; i < symbols.length ; i++){
        var table = document.getElementById("myTable");

        //Instantiates Row
        var row = table.insertRow(document.getElementById("myTable").rows.length);

        //Creates first column
        var cell1 = row.insertCell(0);
        cell1.innerHTML = symbols[i];

        //Creates second column
        var cell2 = row.insertCell(1);
        cell2.innerHTML = quantities[i];
        currentQuantity = quantities[i];

        //Creates third column
        var cell3 = row.insertCell(2);
        var price = jsonObj[symbols[i]]["quote"]["latestPrice"];
        cell3.setAttribute("id","cell"+String(iterator));
        cell3.innerHTML = "$"+price;
        totalProfits += (price).toFixed(2) * (quantities[i]).toFixed(2);
        var openPrice = jsonObj[symbols[i]]["quote"]["previousClose"];
        // console.log(typeof openPrice);
        //Compare for current price and open price for color coding
        if(parseFloat(price) < parseFloat(openPrice)){
          document.getElementById("cell"+String(iterator)).style.color = "red";
        }
        else if(parseInt(price) == parseInt(openPrice)){
          document.getElementById("cell"+String(iterator)).style.color  = "grey";
        }
        else{
          document.getElementById("cell"+String(iterator)).style.color  = "green";
        }
        iterator++;
      }
  //Modifies Portfolio
  document.getElementById("totalPortfolio").innerText = "Portfolio($"+ String(totalProfits.toFixed(2)) +")";
}




