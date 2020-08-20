const assert = require('chai').assert;
const upVote = require('../app').upVote;
const downVote = require('../app').downVote;
const addSuggestion = require('../app').addSuggestion;
const getHistory = require('../app').getHistory;

describe('App', function(){
    // upvoting the suggested solution
    it("Should return the string: Update Succesful", async function(){
        this.timeout(0);
        const result = await upVote();
        assert.typeOf(result.message, 'string');
        assert.equal(result.message, 'Update Successful!');
    });
    it("Should return the string: Update Succesful", async function(){
        this.timeout(0);
        const result = await downVote();
        assert.typeOf(result.message, 'string');
        assert.equal(result.message, 'Update Successful!');
    });

    it("Should return the string: Update Succesful", async function(){
        this.timeout(0);
        const result = await addSuggestion();
        assert.typeOf(result.message, 'string');
        assert.equal(result.message, 'Update Successful!');
    })

    it("Should return an array of analysis results objects, the size of the array should be greater than zero", async function(){
        this.timeout(0);
        const result = await getHistory();
        assert.typeOf(result, 'array');
        assert.isAbove(result.length, 0);
    })
});