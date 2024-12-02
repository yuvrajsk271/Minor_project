import joblib  # Or the library you used to save/load your model
import cv2
import numpy as np

# Load your trained model
model = joblib.load('path/to/your/model.pkl')  # Update path

def preprocess_image(image_path):
    """
    Preprocess the image as required by the model.
    """
    # Example: Read image, resize, normalize
    img = cv2.imread(image_path, cv2.IMREAD_COLOR)
    img = cv2.resize(img, (224, 224))  # Update dimensions based on your model
    img = img / 255.0  # Normalize if required
    return np.expand_dims(img, axis=0)  # Add batch dimension if needed

def process_image(image_path):
    """
    Use the model to predict the result for the given image.
    """
    image = preprocess_image(image_path)
    prediction = model.predict(image)
    
    # Example output: 'Matched' or 'Not Matched'
    return 'Matched' if prediction[0] == 1 else 'Not Matched'
