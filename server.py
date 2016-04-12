from flask import Flask, render_template, json, request
import requests

app = Flask(__name__)

keys = ['373a612eeeae2813e001680f04b585db',
        '5dbe8dc691de2b3d8db331019416a9e5']

currentKeyId = 0
loop = False

def checkKey(query):
    global currentKeyId
    global loop
    r = requests.get(query+'&key='+keys[currentKeyId])
    if 'error' in r.json():
        if currentKeyId >= len(keys)-1:
            currentKeyId = 0
            loop = True
        elif loop == False:
            currentKeyId += 1
        else:
            return {'error':'no calls left'}
        checkKey(query)
    else:
        return r

@app.route('/')
def landing():
    return render_template('landing.html')

@app.route('/main')
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
            r = checkKey('http://food2fork.com/api/search?q='+food)
            return (json.dumps(r.json()), 200)
    except Exception as e:
        return (json.dumps(str(e)), 400)

@app.route('/getIngredients', methods=['POST'])
def getIngredients():
    try:
        _rid = request.form['rId']
        r = checkKey('http://food2fork.com/api/get?rId='+_rid)
        print r.url
        return (json.dumps(r.json()), 200)
    except Exception as e:
        return (json.dumps(str(e)), 400)

if __name__ == '__main__':
    #app.run(host='0.0.0.0', port=5000, debug=False)
    app.run(port=5000, debug=True)
