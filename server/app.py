from flask import Flask, request, jsonify
import pickle
import re
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer
from nltk.corpus import stopwords

app = Flask(__name__)

with open('sms_spam_model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

with open('preprocessing_objects.pkl', 'rb') as preprocessing_file:
    preprocessing_objects = pickle.load(preprocessing_file)
    le = preprocessing_objects['label_encoder']
    stem = preprocessing_objects['stemmer']
    cv = preprocessing_objects['count_vectorizer']

def classify_sms(sms_message):
    senti = re.sub('[^A-Za-z]', ' ', sms_message)
    senti = senti.lower()
    words = word_tokenize(senti)
    word = [stem.stem(i) for i in words if i not in stopwords.words('english')]
    senti = ' '.join(word)
    sms_vector = cv.transform([senti]).toarray()
    prediction = model.predict(sms_vector)
    return le.inverse_transform(prediction)[0]

@app.route('/api', methods=['POST'])
def classify_sms_api():
    try:
        data = request.get_json()
        if 'message' in data:
            sms_message = data['message']
            prediction = classify_sms(sms_message)
            response = {
                'message': sms_message,
                'classification': prediction
            }
            return jsonify(response)
        else:
            return jsonify({'error': 'Invalid input format'})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    print("Starting Python Flask Server For Sports Celebrity Image Classification")
    app.run(port=5000)
