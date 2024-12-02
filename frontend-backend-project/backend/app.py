from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return "Flask backend is running!"

@app.route('/process-image', methods=['POST'])
def process_image():
    # Placeholder: Process the image and connect to the database.
    return jsonify({"status": "success", "message": "Image processed"})

if __name__ == '__main__':
    app.run(debug=True)
