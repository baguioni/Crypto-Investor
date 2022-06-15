# Problem

Let us assume you are a crypto investor. You have made transactions over a period of time which is logged in a [CSV file](https://s3-ap-southeast-1.amazonaws.com/static.propine.com/transactions.csv.zip). Write a command line program that does the following

 - Given no parameters, return the latest portfolio value per token in USD
 - Given a token, return the latest portfolio value for that token in USD
 - Given a date, return the portfolio value per token in USD on that date
 - Given a date and a token, return the portfolio value of that token in USD on that date

The CSV file has the following columns
 - timestamp: Integer number of seconds since the Epoch
 - transaction_type: Either a DEPOSIT or a WITHDRAWAL
 - token: The token symbol
 - amount: The amount transacted

# Set-up
1. Get an API key from https://min-api.cryptocompare.com/ and add it into the .env.
2. Install the dependecies from package.json

# Usage
The solution has 2 optional parameters. <br />
date - format is M/D/Y <br />
token - currently limited to BTC, ETH, XRP

**Examples**
1. Given a date and a token, return the portfolio value of that token in USD on that date. <br />
```
node .\index.js --date=10/25/2019 --token=BTC
$ BTC: 75891.28896539999 USD
```

2. Given a date, return the portfolio value per token in USD on that date. <br />
```
node .\index.js --date=10/25/2019
$ BTC: 75891.28896539999 USD
$ ETH: 759.48126278 USD
$ XRP: 0.21888446579999993 USD
```

3. Given a token, return the latest portfolio value for that token in USD. <br />
```
node .\index.js --token=BTC
$ BTC: 216848.94434585996 USD
```

4. Given no parameters, return the latest portfolio value per token in USD. <br />
```
node .\index.js
$ BTC: 216239.81179760996 USD
$ ETH: 5253.684042649999 USD
$ XRP: 0.24512846819999992 USD
```

# Design Decisions
The solution was could have been made in a single file. However, for maintainability, it was spread accross multiple files and functions. Each file/functions aims to solve a specific sub-problem.

The problem requires 2 specific tasks to be solved. Reading data from the csv file and pulling crypto prices from an api provider. 

1. Reading data from the csv file. Considering the size of the file, simply loading and processing it in memory would fail. Instead, Node.js streams was utilized to incrementally process the large csv. While processing the csv, the solution keeps track of the total amount of each token. A "WITHDRAWAL" transaction is subtracting from the amount and "DEPOSIT" is adding to the amount.

2. Pulling crypto prices. After the total amount of the token/s is determined, the solution pulls price data from https://min-api.cryptocompare.com/. Axios was used to make this request. Prices are then multiplied with the amount to determine the total value of a token.
