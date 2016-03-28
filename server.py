from flask import Flask, render_template, json, request
import requests

app = Flask(__name__)

@app.route('/')
def main():
    return render_template('index.html')

@app.route('/getRecipes', methods=['POST'])
def getRecipes():
    try:
        _food = request.form.to_dict().values()
        if _food:
            food = str(_food[0])
            for item in _food[1:]:
                food+=','+item
            r = requests.get('http://www.recipepuppy.com/api/?i='+food)
            return (json.dumps(r.json()), 200)
    except Exception as e:
        return (json.dumps({'error': str(e)}), 400)

if __name__ == '__main__':
    #app.run(host='0.0.0.0', port=5000, debug=False)
    app.run(port=5000, debug=True)
