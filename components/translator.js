const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

  americanToBritish(sentence) {
    let originalSentence = sentence;
    let newSentence = [];
    let americanToBritishArr = [americanOnly, americanToBritishSpelling, americanToBritishTitles]


    americanToBritishArr.forEach((object) => {
      Object.keys(object).forEach((keys) => {
        //if more than one word/phrase need to translate
        if (newSentence.length > 0) {
          sentence = newSentence[newSentence.length - 1]
        }
        
        if (sentence.toLowerCase().match(keys) !== null) {
          let splitKeys = keys.split(" ");
          if (splitKeys.length === 1) {
            splitKeys = [];
            let splitSentence = sentence.split(" ");
            for (let i = 0; i <= splitSentence.length - 1; i++) {
              if (keys.indexOf(".") === -1) {
                splitSentence[i] = splitSentence[i].split(".").join("");
              }
              if (splitSentence[i].toLowerCase() === keys) {
                newSentence.push(sentence.replace(splitSentence[i], `<span class="highlight">${object[keys]}</span>`))
              } 
            }
          } else if (splitKeys.length === 2) {
            splitKeys = [];
            let splitSentence = sentence.split(" ");
            for (let i = 0; i <= splitSentence.length - 1; i++) {
              for (let j = 1; j <= splitSentence.length - 1; j++) {
                if (keys.indexOf(".") === -1) {
                  splitSentence[i] = splitSentence[i].split(".").join("");
                  splitSentence[j] = splitSentence[j].split(".").join("");
                }
                if (splitSentence[i].toLowerCase() + " " + splitSentence[j].toLowerCase() === keys) {
                  newSentence.push(sentence.replace(splitSentence[i] + " " + splitSentence[j], `<span class="highlight">${object[keys]}</span>`));
                }
              }
            }
          } else if (splitKeys.length === 3) {
            splitKeys = [];
            let splitSentence = sentence.split(" ");
            for (let i = 0; i <= splitSentence.length - 1; i++) {
              for (let j = 1; j <= splitSentence.length - 1; j++) {
                for (let k = 2; k <= splitSentence.length - 1; k++) {
                  if (keys.indexOf(".") === -1) {
                    splitSentence[i] = splitSentence[i].split(".").join("");
                    splitSentence[j] = splitSentence[j].split(".").join("");
                    splitSentence[k] = splitSentence[k].split(".").join("");
                  }
                  if (splitSentence[i].toLowerCase() + " " + splitSentence[j].toLowerCase() + " " + splitSentence[k].toLowerCase() === keys) {
                    newSentence.push(sentence.replace(splitSentence[i] + " " + splitSentence[j] + " " + splitSentence[k], `<span class="highlight">${object[keys]}</span>`));
                  }
                }
              }
            }
          }
        }
      })
    })

    newSentence = newSentence[newSentence.length - 1] || originalSentence
    
    if (newSentence.match(/\d+:\d{2}/) !== null) {
      let replacement = newSentence.match(/\d+:\d{2}/)[0].replace(":", ".");
      newSentence = newSentence.replace(newSentence.match(/\d+:\d{2}/)[0], `<span class="highlight">${replacement}</span>`)
    }

    if (originalSentence === newSentence) {
      return "Everything looks good to me!"
    }

    return newSentence;
  }

  britishToAmerian(sentence) {
    let originalSentence = sentence;
    //UNO reverse card the americanToBritishSpelling object
    let britishToAmericanSpelling = {}
    Object.keys(americanToBritishSpelling).forEach((key) => {
      britishToAmericanSpelling[americanToBritishSpelling[key]] = key
    })
    //UNO reverse card the americanToBritishTitles object
    let britishToAmerianTitles = {
      'mr': 'Mr.',
      'mrs': 'Mrs.',
      'ms': 'Ms.',
      'mx': 'Mx.',
      'dr': 'Dr.',
      'prof': 'Prof.'
    }

    let newSentence = [];
    let britishToAmerianArray = [britishOnly, britishToAmericanSpelling, britishToAmerianTitles]

    britishToAmerianArray.forEach((object) => {
      Object.keys(object).forEach((keys) => {
        //if more than one word/phrase need to translate
        if (newSentence.length > 0) {
          sentence = newSentence[newSentence.length - 1]
        }
        
        if (sentence.toLowerCase().match(keys) !== null) {
          let splitKeys = keys.split(" ");
          if (splitKeys.length === 1) {
            splitKeys = [];
            let splitSentence = sentence.split(" ");
            for (let i = 0; i <= splitSentence.length - 1; i++) {
              if (keys.indexOf(".") === -1) {
                splitSentence[i] = splitSentence[i].split(".").join("");
              }
              if (splitSentence[i].toLowerCase() === keys) {
                newSentence.push(sentence.replace(splitSentence[i], `<span class="highlight">${object[keys]}</span>`))
              } 
            }
          } else if (splitKeys.length === 2) {
            splitKeys = [];
            let splitSentence = sentence.split(" ");
            for (let i = 0; i <= splitSentence.length - 1; i++) {
              for (let j = 1; j <= splitSentence.length - 1; j++) {
                if (keys.indexOf(".") === -1) {
                  splitSentence[i] = splitSentence[i].split(".").join("");
                  splitSentence[j] = splitSentence[j].split(".").join("");
                }
                if (splitSentence[i].toLowerCase() + " " + splitSentence[j].toLowerCase() === keys) {
                  newSentence.push(sentence.replace(splitSentence[i] + " " + splitSentence[j], `<span class="highlight">${object[keys]}</span>`));
                }
              }
            }
          } else if (splitKeys.length === 3) {
            splitKeys = [];
            let splitSentence = sentence.split(" ");
            for (let i = 0; i <= splitSentence.length - 1; i++) {
              for (let j = 1; j <= splitSentence.length - 1; j++) {
                for (let k = 2; k <= splitSentence.length - 1; k++) {
                  if (keys.indexOf(".") === -1) {
                    splitSentence[i] = splitSentence[i].split(".").join("");
                    splitSentence[j] = splitSentence[j].split(".").join("");
                    splitSentence[k] = splitSentence[k].split(".").join("");
                  }
                  if (splitSentence[i].toLowerCase() + " " + splitSentence[j].toLowerCase() + " " + splitSentence[k].toLowerCase() === keys) {
                    newSentence.push(sentence.replace(splitSentence[i] + " " + splitSentence[j] + " " + splitSentence[k], `<span class="highlight">${object[keys]}</span>`));
                  }
                }
              }
            }
          }
        }
      })
    })
    
    newSentence = newSentence[newSentence.length - 1] || originalSentence
    
    if (newSentence.match(/\d+\.\d{2}/) !== null) {
      let replacement = newSentence.match(/\d+\.\d{2}/)[0].replace(".", ":");
      newSentence = newSentence.replace(newSentence.match(/\d+\.\d{2}/)[0], `<span class="highlight">${replacement}</span>`)
    }

    if (originalSentence === newSentence) {
      return "Everything looks good to me!"
    }

    return newSentence;
  }

}


module.exports = Translator;