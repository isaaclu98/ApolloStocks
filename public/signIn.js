//Global Variables
var ui = new firebaseui.auth.AuthUI(firebase.auth());
const auth = firebase.auth();
var db = firebase.firestore();
var name;
var email;
var userId;

//Checks if the user is authorized
    var uiConfig = {
        callbacks: {
          signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            auth.onAuthStateChanged(function (user) {
              if (user) {
                  var user = firebase.auth().currentUser;
          
                  if (user != null) {
                      name = user.displayName;
                      email = user.email
                      userId = user.uid;
                      var docRef = db.collection("users").doc(userId);
                        docRef.get().then(function(doc) {
                          //If user has data in the database proceed to next page
                            if (doc.exists) {
                                console.log("Document data:", userId);
                                window.location = "portfolio.html";
                            } 
                            //If user has no data; insert user into database 
                            else {
                                // doc.data() will be undefined in this case
                                db.collection("users").doc(userId).set({
                                  name:name,
                                  email:email,
                                  balance:5000,
                                  stocks:{},
                                  transactions:{}
                                }).then(() => {
                                  window.location = "index.html";
                                });
                            }
                        }).catch(function(error) {
                            console.log("Error getting document:", error);
                        });
                      
                  }
                  // console.log(name);
                  // User is signed in.
              } else {
                  // No user is signed in.
              }
          });
            return false;
          },
        },
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        credentialHelper: firebaseui.auth.CredentialHelper.NONE,
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
    };
  //Fires up the FireBaseUI
  ui.start('#firebaseui-auth-container', uiConfig);
  