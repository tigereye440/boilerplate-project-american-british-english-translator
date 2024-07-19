const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator();
const spanRegex = /<\/?span[^>]*>/g;

suite('Unit Tests', () => {
    suite('American To British Translation Tests', () => {
        test('#1 Translate Mangoes are my favorite fruit. to British English', (done) => {
            assert.equal(translator.americanToBritish('Mangoes are my favorite fruit.').replace(spanRegex, ''), 'Mangoes are my favourite fruit.');
            done();
        }),

        test('#2 Translate I ate yogurt for breakfast. to British English', (done) => {
            assert.equal(translator.americanToBritish('I ate yogurt for breakfast.').replace(spanRegex, ''), 'I ate yoghurt for breakfast.');
            done();
        });

        test('#3 Translate We had a party at my friend\'s condo. to British English', (done) => {
            assert.equal(translator.americanToBritish('We had a party at my friend\'s condo.').replace(spanRegex, ''), 'We had a party at my friend\'s flat.');
            done();
        });

        test('#4 Translate Can you toss this in the trashcan for me? to British English', (done) => {
            assert.equal(translator.americanToBritish('Can you toss this in the trashcan for me?').replace(spanRegex, ''), 'Can you toss this in the bin for me?');
            done();
        });

        test('#5 Translate The parking lot was full. to British English', (done) => {
            assert.equal(translator.americanToBritish('The parking lot was full.').replace(spanRegex, ''), 'The car park was full.');
            done();
        });

        test('#6 Translate Like a high tech Rube Goldberg machine. to British English', (done) => {
            assert.equal(translator.americanToBritish('Like a high tech Rube Goldberg machine.').replace(spanRegex, ''), 'Like a high tech Heath Robinson device.');
            done();
        });

        test('#7 Translate To play hooky means to skip class or work. to British English', (done) => {
            assert.equal(translator.americanToBritish('To play hooky means to skip class or work.').replace(spanRegex, ''), 'To bunk off means to skip class or work.');
            done();
        });

        test('#8 Translate "No Mr. Bond, I expect you to die." to British English', (done) => {
            assert.equal(translator.americanToBritish('No Mr. Bond, I expect you to die.').replace(spanRegex, ''), 'No Mr Bond, I expect you to die.');
            done();
        });

        test('#9 Translate Dr. Grosh will see you now. to British English', (done) => {
            assert.equal(translator.americanToBritish('Dr. Grosh will see you now.').replace(spanRegex, ''), 'Dr Grosh will see you now.');
            done();
        });

        test('#10 Translate "Lunch is at 12:15 today." to British English', (done) => {
            assert.equal(translator.americanToBritish('Lunch is at 12:15 today.').replace(spanRegex, ''), 'Lunch is at 12.15 today.');
            done();
        });
    })

    suite('British To American Translation Tests', () => {
        test('#11 "We watched the footie match for a while." to American English', (done) => {
            assert.equal(translator.britishToAmerican('We watched the footie match for a while.').replace(spanRegex, ''), 'We watched the soccer match for a while.');
            done();
        });

        test('#12 "Paracetamol takes up to an hour to work." to American English', (done) => {
            assert.equal(translator.britishToAmerican('Paracetamol takes up to an hour to work.').replace(spanRegex, ''), 'Tylenol takes up to an hour to work.');
            done();
        });

        test('#13 "First, caramelise the onions." to American English', (done) => {
            assert.equal(translator.britishToAmerican('First, caramelise the onions.').replace(spanRegex, ''), 'First, caramelize the onions.');
            done();
        });

        test('#14 "I spent the bank holiday at the funfair." to American English', (done) => {
            assert.equal(translator.britishToAmerican('I spent the bank holiday at the funfair.').replace(spanRegex, ''), 'I spent the public holiday at the carnival.');
            done();
        });

        test('#15 "I had a bicky then went to the chippy." to American English', (done) => {
            assert.equal(translator.britishToAmerican('I had a bicky then went to the chippy.').replace(spanRegex, ''), 'I had a cookie then went to the fish-and-fish-and-chip shop.');
            done();
        });

        test('#16 "I\'ve just got bits and bobs in my bum bag." to American English', (done) => {
            assert.equal(translator.britishToAmerican('I\'ve just got bits and bobs in my bum bag.').replace(spanRegex, ''), 'I\'ve just got odds and ends in my fanny pack.');
            done();
        });

        test('#17 "The car boot sale at Boxted Airfield was called off." to American English', (done) => {
            assert.equal(translator.britishToAmerican('The car boot sale at Boxted Airfield was called off.').replace(spanRegex, ''), 'The swap meet at Boxted Airfield was called off.');
            done();
        });
        
        test('#18 "Have you met Mrs Kalyani?" to American English', (done) => {
            assert.equal(translator.britishToAmerican('Have you met Mrs Kalyani?').replace(spanRegex, ''), 'Have you met Mrs. Kalyani?');
            done();
        });

        test('#19 "Prof Joyner of King\'s College, London." to American English', (done) => {
            assert.equal(translator.britishToAmerican('Prof Joyner of King\'s College, London.').replace(spanRegex, ''), 'Prof. Joyner of King\'s College, London.');
            done();
        });

        test('#20 "Tea time is usually around 4 or 4.30." to American English', (done) => {
            assert.equal(translator.britishToAmerican('Tea time is usually around 4 or 4.30.').replace(spanRegex, ''), 'Tea time is usually around 4 or 4:30.');
            done();
        });
    })

    suite('Higlight Tranlated Text Tests', () => {
        test('#21 Highlight translation in Mangoes are my favorite fruit.', (done) => {
            const tranlation = translator.americanToBritish('Mangoes are my favorite fruit.');
            assert.equal(tranlation, 'Mangoes are my <span class="highlight">favourite</span> fruit.');
            done();
        });

        test('#22 Highlight translation in I ate yogurt for breakfast.', (done) => {
            const tranlation = translator.americanToBritish('I ate yogurt for breakfast.');
            assert.equal(tranlation, 'I ate <span class="highlight">yoghurt</span> for breakfast.');
            done();
        });

        test('#23 Highlight translation in We watched the footie match for a while.', (done) => {
            const tranlation = translator.britishToAmerican('We watched the footie match for a while.');
            assert.equal(tranlation, 'We watched the <span class="highlight">soccer</span> match for a while.');
            done();
        });

        test('#24 Highlight translation in Paracetamol takes up to an hour to work.', (done) => {
            const tranlation = translator.britishToAmerican('Paracetamol takes up to an hour to work.');
            assert.equal(tranlation, '<span class="highlight">Tylenol</span> takes up to an hour to work.');
            done();
        });

    })
});
