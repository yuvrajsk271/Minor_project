from flask import Flask, request, jsonify
from model_logic import process_image

app = Flask(__name__)

@app.route('/process', methods=['POST'])
def process():
    data = request.json
    image_path = data.get('imagePath')

    if not image_path:
        return jsonify({'result': 'Error', 'message': 'Image path missing'}), 400

    try:
        result = process_image(image_path)
        return jsonify({'result': result})
    except Exception as e:
        return jsonify({'result': 'Error', 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
