from flask import Flask, render_template, json, request
import requests

app = Flask(__name__)


@app.route('/')
def main():
    return render_template('index.html')


@app.route('/getRecipes', methods=['POST'])
def getRecipes():
    try:
        #HACK: Adding an extra entry because the last one doesnt matter
        _food = json.dumps(request.form.to_dict().values())
        if _food:
            food = _food[:-1]+',\"\"]'
            options = {'key': '5dbe8dc691de2b3d8db331019416a9e5', 'q': food}
            print options
            r = requests.get('http://food2fork.com/api/search', params=options)
            return (json.dumps(r.json()), 200)
    except Exception as e:
        return (json.dumps({'error': str(e)}), 400)

if __name__ == '__main__':
    app.run(port=5002, debug=True)
    # app.run(host='0.0.0.0', port=5502, debug=False)
