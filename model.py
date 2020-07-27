
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import warnings
warnings.filterwarnings("ignore")
import re
import nltk
from nltk.stem.porter import PorterStemmer
import pickle
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import GaussianNB
from sklearn.metrics import confusion_matrix, accuracy_score
from sklearn.feature_extraction.text import CountVectorizer

dataset = pd.read_csv('alfa_dataset.csv - Sheet1.csv', delimiter = ',')

corpus = []
for i in range(0, 60):
  log_entry = re.sub(r"\[[(\w+\d+\s+:\.)]+|\]|/(\w+/)+|(http(://(\w+\.)+))+|(https(://(\w+\.)+))+|(\([\w+\.|\w+,|\w+\)|\w+\\|\.]+)|line(\s+\d+)|referer(:\w+)+|[^a-zA-Z\s+]|\d+|\w+(\-|_|\w+)*\.php|AH|referer|COS|za", " ", dataset['Log_file_entry'][i])
  log_entry = log_entry.split()
  ps = PorterStemmer()
  log_entry = [ps.stem(word) for word in log_entry]
  log_entry = ' '.join(log_entry)
  corpus.append(log_entry)

cv = CountVectorizer(max_features = 1500)
cv.fit(corpus) 
X = cv.transform(corpus).toarray()
y = dataset.iloc[ :, -1].values

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.25, random_state = 0)

nb_clf = GaussianNB()
nb_clf.fit(X_train, y_train)

y_pred = nb_clf.predict(X_test)

cm = confusion_matrix(y_test, y_pred)

pickle.dump(nb_clf, open("model.pkl", 'wb'))

pickle.dump(cv, open("vectorizer.pkl", 'wb'))


