const axios = require('axios');

const URL = "https://mean-api-test-301.herokuapp.com/articles";

module.exports = {
    upVote: function(){
        const payload = {
            "kb_index": 0,
            "_id": "5f35876815ce47094c380082",
            "vote": 1
        }
        return new Promise( resolve => {
            axios.post( `${URL}/rate_article`, payload )
            .then( res => {
                resolve(res.data);
            })
            .catch( () => {
                resolve("Request Failed");
            })
        })
    },
    downVote: function(){
        const payload = {
            "kb_index": 0,
            "_id": "5f35876815ce47094c380082",
            "vote": -1
        }
        return new Promise( resolve => {
            axios.post( `${URL}/rate_article`, payload )
            .then( res => {
                resolve(res.data);
            })
            .catch( () => {
                resolve("Request Failed");
            })
        })
    },
    
    addSuggestion: function(){
        const payload = {
            "kb_index": 0,
            "link": "https://stackoverflow.com/questions/17449390/working-functionality-of-user-authentication-in-ldap",
            "description": "Working functionality of user authentication in LDAP"
        }
        return new Promise( resolve => {
            axios.post( `${URL}/suggestion`, payload )
            .then( res => {
                resolve(res.data);
            })
            .catch( () => {
                resolve("Request Failed");
            })
        })
    },

    getHistory: function(){
        return new Promise( resolve => {
            axios.get( `${URL}/history` )
            .then( res => {
                resolve(res.data);
            })
            .catch( () => {
                resolve("Request Failed");
            })
        })
    }
}