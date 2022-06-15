const fs = require('fs')
const { parse } = require('csv-parse')
const csvPath = 'testTransactions.csv'

/*
    Returns total amount of tokens.
    date parameter is optional.
    If no date is specified, latest date is calculated.
*/
const calculateTokenAmount = (date) => {
  return new Promise((resolve) => {
    const transactionType = {
      DEPOSIT: 1,
      WITHDRAWAL: -1
    }

    const tokenAmount = {
      BTC: 0,
      ETH: 0,
      XRP: 0
    }

    const readerStream = fs.createReadStream(`${csvPath}`)

    readerStream.pipe(parse({ delimiter: ',', from_line: 2 }))
      .on('data', function (row) {
        const timeStamp = row[0]
        const transaction = transactionType[row[1]]
        const token = row[2]
        const amount = row[3]

        let transactionDate

        // If a date parameter is given, we select rows with a similar date
        if (date) {
          const d = new Date(timeStamp * 1000)
          transactionDate = d.getMonth() + 1 + '/' + (d.getDate()) + '/' + d.getFullYear()
        } else {
          transactionDate = date
        }

        if (transactionDate === date) {
          tokenAmount[token] = tokenAmount[token] + (transaction * amount)
        }
      })

    readerStream.on('end', () => {
      resolve(tokenAmount)
    })
  })
}

module.exports = {
  calculateTokenAmount
}
