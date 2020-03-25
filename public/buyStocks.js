
//Function called when user tries to buy stocks
function validateForm(buyOrSell){
    //instantiate ticker and quantity
    var ticker = document.getElementById("tickers").value;
    var quantity = document.getElementById("quantity").value;
    var temp = getURL(ticker);
    var userSelection = document.getElementById("buyOrSell").value;
    console.log(userSelection);

    //Checks if it is a valid ticker symbol. If 404 error is found; invalid ticker
    UrlExists(temp, function(status){
        if(status == 200){
           //URL was found perform database reads/writes and api calls
           if(parseInt(quantity) == 0){
            let y = document.getElementById("snackbar");
            y.innerHTML = "Please enter a quantity greater than 0";
            // Add the "show" class to DIV
            y.className = "show";
            document.getElementById("buttonSub").disabled = false;
           }
           else{
            fetchTickerInfo(temp,quantity,ticker,userSelection);
           }
        }
        else if(status == 404){
           // 404 not found and outputs an error message
            document.getElementById("buttonSub").disabled = false;
            let y = document.getElementById("snackbar");
            y.innerHTML = "Please Input A Valid Ticker Symbol";
            // Add the "show" class to DIV
            y.className = "show";

            // After 3 seconds, remove the show class from DIV
            setTimeout(function(){ y.className = y.className.replace("show", ""); }, 3000);
        }
    });

    return false;
}

function buyingStocks(jsonObj, quantityParam, balanceParam,tickerParam,buyOrSell){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
        // User logged in already or has just logged in.
            userId = user.uid;
            var docRef = db.collection("users").doc(userId);
            docRef.get().then(function(doc) {
                if (doc.exists) {
                    var latestPrice = (jsonObj[tickerParam]["quote"]["latestPrice"]);
                    var totalCost = latestPrice * parseInt(quantityParam);
                    var transactions = doc.data().transactions;
                    var date = new Date();
                    
                    //Checks if the user is buying stock shares
                    if(buyOrSell == "buy"){
                        if(balanceParam < totalCost){
                            //Output a toast message to the user for insufficient balance
                            var x = document.getElementById("snackbar");
                            x.innerHTML = "Unable to complete transaction for insufficient balance";
                            // Add the "show" class to DIV
                            x.className = "show";
                            document.getElementById("buttonSub").disabled = false;

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
                            //Updating transaction array
                            transactions.push(buyOrSell); 
                            transactions.push(tickerParam);
                            transactions.push(quantityParam);
                            transactions.push(latestPrice);
                            transactions.push(date.toLocaleString());
                    
                            //Modifies the users' account balance
                            balanceParam -= totalCost;
                            console.log(typeof balanceParam);
                            console.log(balanceParam);
                            document.getElementById("currentBalance").innerHTML = "Balance: $"+balanceParam.toFixed(2);
                                            
                            //Updates the database with new information
                            docRef.update({
                            balance : balanceParam.toFixed(2),
                            stocks : stocks,
                            transactions : transactions
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
                    }
                    //Checks if user is selling stock shares
                    else{
                        //If User does not own the number of stock shares output a message
                        if(stocks[tickerParam] == undefined || stocks[tickerParam] < quantityParam){
                            var x = document.getElementById("snackbar");
                            x.innerHTML = "Portfolio Does Not Contain The Number Of Stock Shares";
                            // Add the "show" class to DIV
                            x.className = "show";
                            document.getElementById("buttonSub").disabled = false;

                            // After 3 seconds, remove the show class from DIV
                            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
                        }
                        else{
                            stocks[tickerParam] -= parseInt(quantityParam);
                            if(stocks[tickerParam] == 0){
                                delete stocks[tickerParam];
                            }
                            //Updating transaction array
                            transactions.push(buyOrSell); 
                            transactions.push(tickerParam);
                            transactions.push(quantityParam);
                            transactions.push(latestPrice);
                            transactions.push(date.toLocaleString());

                            //Modifies the users' account balance
                            balanceParam = parseInt(balanceParam) + totalCost;
                            console.log(typeof balanceParam);
                            console.log(balanceParam);
                            document.getElementById("currentBalance").innerHTML = "Balance: $"+balanceParam.toFixed(2);
                                            
                            //Updates the database with new information
                            docRef.update({
                            balance : balanceParam.toFixed(2),
                            stocks : stocks,
                            transactions : transactions
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
