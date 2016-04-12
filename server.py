from flask import Flask, render_template, json, request
import requests

app = Flask(__name__)

keys = ['373a612eeeae2813e001680f04b585db',
        '5dbe8dc691de2b3d8db331019416a9e5']

current_key_id = 1


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
            r = requests.get('http://food2fork.com/api/search'+'?key='+keys[current_key_id]+'&q='+food)
            return (json.dumps(r.json()), 200)
    # except Rate limit exceeded, change index and rerun
    except Exception as e:
        return (json.dumps(str(e)), 400)


@app.route('/getIngredients', methods=['POST'])
def getIngredients():
    try:
        _rid = request.form['rId']
        options = {'key': keys[current_key_id], 'rId': _rid}
        r = requests.get('http://food2fork.com/api/get', params=options)
        return (json.dumps(r.json()), 200)
    except Exception as e:
        return (json.dumps({'error': str(e)}), 400)

if __name__ == '__main__':
    #app.run(host='0.0.0.0', port=5000, debug=False)
    app.run(port=5000, debug=True)
