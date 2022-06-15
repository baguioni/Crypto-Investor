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
The project has 2 optional parameters.
date - format is M/D/Y
token - currently limited to BTC, ETH, XRP

**Examples**
1. Given a date and a token, return the portfolio value of that token in USD on that date
```node .\index.js --date=5/5/2018 --token=BTC```

2. Given a date, return the portfolio value per token in USD on that date
```node .\index.js --date=5/5/2018```

3. Given a token, return the latest portfolio value for that token in USD
```node .\index.js --token=BTC```

4. Given no parameters, return the latest portfolio value per token in USD
```node .\index.js```
