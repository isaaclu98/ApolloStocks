# ApolloStocks
https://apollostocks-fd74f.firebaseapp.com/<br>
Apollo Stocks is a stock trading web application that allows users to buy and sell stocks. A user will first create an account and login with the registered credentials. Afterward, the user can start buying and selling any U.S stocks by inputting a ticker symbol and the quantity. There is a table that shows the user's stock portfolio displaying all the stock names, the stock quantity, and the stock's current price. A transaction table tab is also an option for the user to monitor their recent tradings for auditing purposes. 

<img src = "/images/LoginScreen.png"> <br>
<img src = "/images/PortfolioScreen.png"> <br>
<img src = "/images/TransactionScreen.png"><br>

### Prerequisites

Developed with Node.js -v 12.16.1<br><br>
Run command npm -v to see your node version<br>
### Installing

Run command <b>npm install -g firebase-tools</b> to install firebase<br><br>
Create a firebase account https://firebase.google.com/ and Run command <b>firebase login</b><br><br>
Run command <b>firebase init</b> to initialize a new firebase project<br><br>
Finally run <b>firebase serve </b><br><br>
http://localhost:5000/ should allow you to run it locally now <br><br>
Can also run this command to specify a host <b>Example : firebase serve --host 0.0.0.0</b>

## Deployment

Run command <b>firebase deploy</b> and it will display your project's URL

## Built With
* [Bootstrap](https://getbootstrap.com/docs/4.1/getting-started/introduction/) - Front-end 
* [Firebase Authentication](https://firebase.google.com/docs/auth) - Login Feature
* [Firebase Firestore](https://firebase.google.com/docs/firestore) - Database

## Needed Improvements
* Incorporated a separate backend and frontend rather than combining. Would have been easier to debug the project.
* Have a faster loading application. I feel when there are multiple users on the website performing transactions it takes a while to update the portfolio table
* Implement an option to add more money to the balance to increase the scalability of the application.







