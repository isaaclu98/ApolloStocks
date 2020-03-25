var db = firebase.firestore();
var table = document.getElementById("transactionTable");

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
    // User logged in already or has just logged in.
        userId = user.uid;
        var docRef = db.collection("users").doc(userId);
        docRef.get().then(function(doc) {
            if (doc.exists) {
                var transactionsHistory= doc.data().transactions
                var transactions = "";
                for(var i = 0 ; i < transactionsHistory.length ; i++){
                    if(i % 5 == 0){
                        var upperCase = transactionsHistory[i].toUpperCase();
                        transactions += upperCase;
                    }
                    else if(i % 5 == 1){
                        transactions += " (" + String(transactionsHistory[i]) +") "
                    }
                    else if(i % 5 == 2){
                        transactions += "- " + String(transactionsHistory[i]) +" Shares"
                    }
                    else if(i % 5 == 3){
                        transactions += " @ $"+String(transactionsHistory[i]);
                    }
                    else{
                        transactions += " on " + transactionsHistory[i];
                        var row = table.insertRow(0);
                        var cell1 = row.insertCell(0);
                        cell1.innerHTML = transactions;
                        transactions = "";
                    }
                }
            }
                
            else {
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