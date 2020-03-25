
//Function called when user tries to buy stocks
function validateForm(){
    //instantiate ticker and quantity
    var ticker = document.getElementById("tickers").value;
    var quantity = document.getElementById("quantity").value;
    var temp = getURL(ticker);

    //Checks if it is a valid ticker symbol. If 404 error is found; invalid ticker
    UrlExists(temp, function(status){
        if(status == 200){
           //URL was found perform database reads/writes and api calls
           fetchTickerInfo(temp,quantity,ticker);
        }
        else if(status == 404){
           // 404 not found and outputs an error message
            console.log("doggys");
            var y = document.getElementById("snackbar");
            y.innerHTML = "Please input a Valid Ticker Symbol";
            // Add the "show" class to DIV
            y.className = "show";

            // After 3 seconds, remove the show class from DIV
            setTimeout(function(){ y.className = y.className.replace("show", ""); }, 3000);
        }
    });

    return false;
}

function enoughBalance(jsonObj, quantityParam, balanceParam,tickerParam){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
        // User logged in already or has just logged in.
            userId = user.uid;
            var docRef = db.collection("users").doc(userId);
            docRef.get().then(function(doc) {
                if (doc.exists) {
                    var totalCost = ((jsonObj[tickerParam]["quote"]["latestPrice"]) * parseInt(quantityParam));
                    
                    if(balanceParam < totalCost){
                        //Output a toast message to the user for insufficient balance
                        var x = document.getElementById("snackbar");
                        x.innerHTML = "Unable to complete transaction for insufficient balance";
                        // Add the "show" class to DIV
                        x.className = "show";

                        // After 3 seconds, remove the show class from DIV
                        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
                    }
                    else{
                        //Checks if stock exists, update with the new quantity for ticker
                        if(stocks[tickerParam] != undefined){
                            stocks[tickerParam] += parseInt(quantityParam);
                        }
                        //Adds the ticker to my portfolio with the quantity bought
                        else{
                            stocks[tickerParam] = parseInt(quantityParam);
                        }
                        
                        //Modifies the users' account balance
                        balanceParam -= totalCost;
                        document.getElementById("currentBalance").innerHTML = "Balance: $"+balanceParam.toFixed(2);
                        
                        //Updates the database with new information
                        docRef.update({
                            balance: balanceParam.toFixed(2),
                            stocks : stocks
                        })
                        .then(function() {
                            console.log("Document successfully updated!");
                            window.location.reload(false)
                        })
                        .catch(function(error) {
                        // The document probably doesn't exist.
                            console.error("Error updating document: ", error);
                        });

                    }
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
}
