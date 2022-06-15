const fs = require("fs");
const { parse } = require("csv-parse");

// date parameter is optional
const calculateTokenAmount = (date) => {
    return new Promise((resolve) => {
        const transactionType = {
            'DEPOSIT': 1,
            'WITHDRAWAL': -1
        }
        
        var btcAmount = 0
        var ethAmount = 0
        var xrpAmount = 0

        var readerStream = fs.createReadStream("./testTransactions.csv")

        readerStream.pipe(parse({ delimiter: ",", from_line: 2 }))
        .on("data", function (row) {
            var transactionDate;

            // If a date parameter is given, we select rows with a similar value
            if (date){
                var d = new Date(row[0] * 1000);
                transactionDate = d.getMonth()+1 + '/' + (d.getDate()) + '/' + d.getFullYear();
            } else {
                transactionDate = date
            }
            
            if (transactionDate === date){
                if(row[2] === 'BTC'){
                    btcAmount = btcAmount + (transactionType[row[1]] * row[3])
                }
                if(row[2] === 'XRP'){
                    xrpAmount = xrpAmount + (transactionType[row[1]] * row[3])
                }
                if(row[2] === 'ETH'){
                    ethAmount = ethAmount + (transactionType[row[1]] * row[3])
                }
            }
        });

        readerStream.on('end', () => {
            var output = {
                'BTC': btcAmount,
                'ETH': ethAmount,
                'XRP': xrpAmount
            }
            resolve(output);
        })
    })
}

module.exports = {
    calculateTokenAmount,
}
