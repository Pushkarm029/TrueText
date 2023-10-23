from flask import Flask, request, jsonify
import pickle
import re
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer
from nltk.corpus import stopwords
from flask_cors import CORS
import nltk

# Download the 'punkt' and 'stopwords' resources
nltk.download('punkt')
nltk.download('stopwords')

application = Flask(__name__)
CORS(application)

# Load the Multinomial Naive Bayes model and preprocessing objects
with open('sms_spam_model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

with open('preprocessing_objects.pkl', 'rb') as preprocessing_file:
    preprocessing_objects = pickle.load(preprocessing_file)
    le = preprocessing_objects['label_encoder']
    stem = preprocessing_objects['stemmer']
    cv = preprocessing_objects['count_vectorizer']

# Define a function to preprocess and classify SMS messages
def classify_sms(sms_message):
    senti = re.sub('[^A-Za-z]', ' ', sms_message)
    senti = senti.lower()
    words = word_tokenize(senti)
    word = [stem.stem(i) for i in words if i not in stopwords.words('english')]
    senti = ' '.join(word)
    sms_vector = cv.transform([senti]).toarray()
    prediction = model.predict(sms_vector)
    hamOrSpam = le.inverse_transform(prediction)[0]

    if hamOrSpam == 'spam':
        return True  # It's spam
    else:
        return False  # It's not spam

# API endpoint to receive SMS messages
@application.route('/api', methods=['POST'])
def classify_sms_api():
    try:
        data = request.get_json()
        if 'message' in data:
            sms_message = data['message']
            prediction = classify_sms(sms_message)
            response = {
                'result': prediction
            }
            return jsonify(response)
        else:
            return jsonify({'error': 'Invalid input format'})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    print("Starting Python Flask Server For Sports Celebrity Image Classification")
    application.run()
