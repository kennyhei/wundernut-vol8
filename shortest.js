const LineByLineReader = require('line-by-line'),
      fs = require('fs'),
      lr = new LineByLineReader('alastalon_salissa.txt')

const Shortest = () => {
    let wordsOfLength = {}

    // Return word of length 'ofLength'.
    // If not found, try to find shorter word
    findWord = (ofLength) => {
        
        for (let idx = ofLength; idx > 0; --idx) {
            let words = wordsOfLength[idx]
    
            if (words && words.length > 0) {
                let word = words.pop()
    
                if (words.length === 0) {
                    delete wordsOfLength[word.length]
                }
    
                return word
            }
        }
    
        return false
    }
    
    writeBook = () => {
        let book = ''
        let line = ''
        const max = 80
    
        // Inner helper function so that we are still
        // referring to same 'line' and 'book'
        addLine = () => {
            line = line.trim()
            book += line + '\n'
            line = ''
        }
    
        while (Object.keys(wordsOfLength).length > 0) {
    
            let charsLeft = max - line.length
            let word = findWord(charsLeft - 1)
    
            if (word !== false) {
                line += word + ' '
            } else {
                // Try one last time without taking
                // whitespace into account
                let lastWordInLine = findWord(charsLeft)
                if (lastWordInLine !== false) {
                    line += lastWordInLine
                }

                addLine()
            }
    
            if (line.length === max) {
                addLine()
            }
        }
    
        addLine()
        saveToFile(book)
    }
    
    saveToFile = (book) => {
        fs.writeFile('alastalon_shortest.txt', book, (err) => {
            if (err) {
                throw err
            }
        })
    }
    
    return {
        wordsOfLength,
        writeBook
    }
}

const shortest = Shortest()

lr.on('error', (err) => {
    // 'err' contains error object
    throw err
})

lr.on('line', (line) => {
    // 'line' contains the current line without the trailing newline character
    let words = line.split(' ')
    let wordsOfLength = shortest.wordsOfLength

    words.forEach(word => {

        let length = word.length
        if (length === 0) {
            return
        }

        if (!wordsOfLength[length]) {
            wordsOfLength[length] = []
        }

        wordsOfLength[length].push(word)
    })
})

lr.on('end', () => {
    // All lines are read, file is closed now
    console.log('Writing the shortest edition...')
    let startTime = new Date()
    shortest.writeBook()
    let endTime = new Date()

    console.log(`Done! Finished in ${endTime - startTime} ms.`)
})