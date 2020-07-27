# Dependencies
from flask import Flask, request, jsonify
import pandas as pd
import numpy as pd
import pickle
from sklearn.feature_extraction.text import CountVectorizer
import re
import nltk
from nltk.stem.porter import PorterStemmer
import db

# load model
model = pickle.load(open('model.pkl', 'rb'))
vectorizer = pickle.load(open('vectorizer.pkl', 'rb'))

# API definition
app = Flask(__name__)

# Middleware
def predict():
    # get data
    data = request.get_json(force=True)
    log_entry = data['entry']
   
    # convert data to 2d matrix
    corpus = []
    log_entry = re.sub(r"\[[(\w+\d+\s+:\.)]+|\]|/(\w+/)+|(http(://(\w+\.)+))+|(https(://(\w+\.)+))+|(\([\w+\.|\w+,|\w+\)|\w+\\|\.]+)|line(\s+\d+)|referer(:\w+)+|[^a-zA-Z\s+]|\d+|\w+(\-|_|\w+)*\.php|AH|referer|COS|za", " ", log_entry)
    log_entry = log_entry.split()
    ps = PorterStemmer()
    log_entry = [ps.stem(word) for word in log_entry]
    log_entry = ' '.join(log_entry)

    corpus.append(log_entry)
  
  	# initate Bag of Words word embedding
    X = vectorizer.transform(corpus).toarray()
    
    # make prediction
    y_pred = model.predict(X)
    
    # prediction corresponds to a kb index
    kb_index = y_pred[0]
    
    # return index value
    return int(kb_index)

def fetch_data(index):
	# create query object
    queryObject = {'kb_index': index}

    # search query to NoSQL database
    res = db.db.kb_articles.find_one(queryObject) 

    # remove id and index number as they are not needed for display
    res.pop('_id')
    res.pop('kb_index')

    # return results
    return jsonify(res)

# routes
@app.route("/")
def home():
	msg = {"message": "API is running"}
	return jsonify(msg)

@app.route("/analyse", methods=['POST'])
def analyse():
    index = predict()
    result = fetch_data(index)
    return result

if __name__ == '__main__':
    app.run()