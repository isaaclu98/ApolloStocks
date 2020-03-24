
var db = firebase.firestore();
var totalProfits = 0;
var url = "";
var iterator = 3;
var currentQuantity = 0;
var currentPrice = 0;

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User logged in already or has just logged in.
      var docRef = db.collection("users").doc(user.uid);
      docRef.get().then(function(doc) {
          if (doc.exists) {
            document.getElementById("currentBalance").innerText = "Balance: " + String(doc.data().balance);
            var stocks = doc.data().stocks;

            var table = document.getElementById("myTable");
            for(var i = 0 ; i < stocks.length ; i++){

                if(i % 3 == 0){
                    var row = table.insertRow(document.getElementById("myTable").rows.length);
                    var cell1 = row.insertCell(0);
                    cell1.innerHTML = stocks[i];
                    url = getURL(stocks[i]);
                }
                else if(i % 3 == 1){
                    var cell2 = row.insertCell(1);
                    cell2.innerHTML = stocks[i];
                    currentQuantity = stocks[i];
                }
                else{
                    var cell3 = row.insertCell(2);
                    cell3.setAttribute("id","cell"+String(iterator));
                    currentPrice = stocks[i];
                    cell3.innerHTML = currentPrice;
                    totalProfits += currentPrice * currentQuantity;
                    
                    var price = JSON.parse(Get(url))["Global Quote"]["05. price"];
                    console.log(price);
                    if(currentPrice < price){
                      document.getElementById("cell"+String(iterator)).style.color = "red";
                    }
                    else if(currentPrice == price){
                      document.getElementById("cell3"+String(iterator)).style.color  = "grey";
                    }
                    else{
                      document.getElementById("cell3"+String(iterator)).style.color  = "green";
                    }
                    iterator++;
                }
            }
            console.log(totalProfits);
            document.getElementById("totalPortfolio").innerText = "Portfolio($"+ String(totalProfits) +")";
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

function onClickSubmit(){
  console.log("hi");

}






