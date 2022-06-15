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
The project has 2 optional parameters. <br />
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
