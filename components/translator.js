const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

    americanToBritish (text = '') {
        const britishTimeRegex = /\b\d{1,2}:\d{1,2}\b/;
        let translated = text;
        
         // Handle time translation
        let time = text.match(britishTimeRegex) !== null ? text.match(britishTimeRegex)[0] : null;
        if (time !== null) {
            let britishTime = time.replace(':', '.');
            translated = translated.replace(britishTimeRegex, `<span class="highlight">${britishTime}</span>`);
        }

        const titles = Object.keys(americanToBritishTitles);
        
        for (const title of titles) {
            const regex = new RegExp(`\\b${title}.\\b`, 'gi');
            if (regex.test(translated)) {
                translated = translated.replace(regex, `<span class="highlight">${americanToBritishTitles[title].charAt(0).toUpperCase() + americanToBritishTitles[title].slice(1)}</span> `);
            }
            
        }

        const americanOnlyPhrases = Object.keys(americanOnly).sort((a, b) => b.length - a.length);

        for (const americanPhrase of americanOnlyPhrases) {
            const regex = new RegExp(`\\b${americanPhrase}\\b`, 'gi');
            if (regex.test(translated)) {
                translated = translated.replace(regex, `<span class="highlight">${americanOnly[americanPhrase]}</span>`)
            }
        }

        const americanBritishSpellings = Object.keys(americanToBritishSpelling);

        for (const americanBritishSpelling of americanBritishSpellings) {
            const regex = new RegExp(`\\b${americanBritishSpelling}\\b`, 'gi');
            if (regex.test(translated)) {
                translated = translated.replace(regex, `<span class="highlight">${americanToBritishSpelling[americanBritishSpelling]}</span>`);
            }
        }       
        
        return translated;
    }

    britishToAmerican (text) {
        let translated = text;
        const americanTimeRegex = /\b\d{1,2}.\d{1,2}\b/;
        let time = text.match(americanTimeRegex) !== null ? text.match(americanTimeRegex)[0] : null;

        if (time !== null) {
            time = time.replace('.', ':');
            translated = text.replace(americanTimeRegex, `<span class="highlight">${time}</span>`);
        }

        const titles = Object.values(americanToBritishTitles);
        
        for (const title of titles) {
            const regex = new RegExp(`\\b${title}\\b`, 'gi');
            if (regex.test(translated)) {
                const newTitle = () => {
                    return Object.keys(americanToBritishTitles).find(key => americanToBritishTitles[key] == title)
                }
                
                translated = translated.replace(regex, `<span class="highlight">${newTitle().charAt(0).toUpperCase() + newTitle().slice(1)}</span>`);
            }
        }
    
        const britishOnlyPhrases = Object.keys(britishOnly);
        
        for (const britishPhrase of britishOnlyPhrases) {
            const regex = new RegExp(`\\b${britishPhrase}\\b`, 'gi');
            if (regex.test(translated)) {
                translated = translated.replace(regex, `<span class="highlight">${britishOnly[britishPhrase]}</span>`);
            }
        }
        
        const bristishAmericanSpellings = Object.values(americanToBritishSpelling);
   
        for (const bristishAmericanSpelling of bristishAmericanSpellings) {
            const regex = new RegExp(`\\b${bristishAmericanSpelling}\\b`, 'gi');
            if (regex.test(bristishAmericanSpelling)) {
                const newSpelling = () => {
                    return Object.keys(americanToBritishSpelling).find(key => americanToBritishSpelling[key] == bristishAmericanSpelling)
                }
                translated = translated.replace(regex, `<span class="highlight">${newSpelling()}</span>`);
            }
        }

        return translated;
    }
}

module.exports = Translator;