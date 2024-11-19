from flask import Flask, request, jsonify
import flask_cors
from flask_cors import CORS
import joblib
import numpy as np

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Load your trained RandomForest model
model = joblib.load('model_joblib_heart')

@app.route('/predict', methods=['POST'])
def predict():
    # Get the form data
    data = request.json
    try:
        input_features = [data['age'], data['gender'], data['chestPain'], data['restingBP'], data['cholesterol'], 
                      data['fastingBS'], data['restECG'], data['maxHeartRate'], data['exerciseInduced'], 
                      data['stDepression'], data['slopeOfST'], data['majorVessels'], data['thalassemia']]

        # Convert inputs to a NumPy array and reshape it
        # input_array = np.array([input_features])

        # Use the model to make a prediction
        prediction = model.predict([input_features])[0]

        # Return prediction as JSON
        return jsonify({'prediction': int(prediction)})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
