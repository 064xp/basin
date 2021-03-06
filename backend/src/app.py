from flask import Flask, request, jsonify, send_from_directory
import os
from datetime import timedelta, datetime
from sqlite3 import Error
from flask_jwt import JWT, jwt_required, current_identity
from modules.jwt import JWTFunctions
from modules.dataBase import DataBase
from modules.helperFunctions import HelperFunctions as hf
import settings

app = Flask(__name__, static_folder='static/build')
jwt = JWT(app, JWTFunctions.authenticate, JWTFunctions.identity)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


@app.route('/earnings/<timeframe>')
@jwt_required()
def earnings(timeframe):
    try:
        db = DataBase(settings.dbFile)
        total = db.getEarnings(timeframe, str(current_identity))
        return jsonify(total)
    except:
        return 'Unsuccessful', 500

@app.route('/transactions/<id>', methods=['DELETE'])
@jwt_required()
def deleter(id):
    try:
        db = DataBase(settings.dbFile)
        db.deleteTransactions(id, str(current_identity))
        return 'Successful', 200
    except:
        return 'Unsuccessful', 500

@app.route('/transactions/pending', methods = ['POST'])
@jwt_required()
def pending():
    try:
        json = request.get_json()
        id = json['id']
        pending = json['pending']
        userId = str(current_identity)
    except:
        return 'Bad request', 400

    try:
        db = DataBase(settings.dbFile)
        db.updatePendingStatus(id, pending, userId)
        return 'Succesful', 200
    except:
        return 'Unsuccessful', 500

@app.route('/transactions/paid', methods = ['POST'])
@jwt_required()
def paid():
    try:
        json = request.get_json()
        id = json['id']
        paid = json['paid']
        userId = str(current_identity)
    except:
        return 'Bad request', 400

    try:
        db = DataBase(settings.dbFile)
        db.updatePaidStatus(id, paid, userId)
        return 'Succesful', 200
    except:
        return 'Unsuccessful', 500

@app.route('/sign-up', methods=['POST'])
def signUp():
    db = DataBase(settings.dbFile)
    try:
        json = request.get_json()
        username = json['username']
        password = json['password']
    except:
        return jsonify({'status': 'error', 'error': 'Invalid JSON'}), 400

    if not username or not password:
        return jsonify({'status': 'error', 'error': 'Username or password cannot be empty'}), 400

    try:
        db.insertUser(username, password)
    except Error as e:
        return jsonify({'status': 'error', 'error': 'Internal datbase error'}), 500
    except ValueError:
        return jsonify({'status':'error','error': 'Username already in use'}), 409
    return jsonify({'status': 'success'}), 200

@app.route('/transactions', methods=['POST'])
@jwt_required()
def addTransaction():
    db = DataBase(settings.dbFile)
    try:
        json = request.get_json()
        name = json['name']
        client = json['client']
        paid = json['paid']
        pending = json['pending']
        ammount = json['ammount']
        cost = json['cost']
        individualPrice = json['individualPrice']
    except:
        return jsonify({'status': 'error', 'error': request}), 400

    try:
        newId = db.insertTransaction(name, client, paid, ammount, cost, pending, individualPrice, str(current_identity))
    except Error as e:
        print(e)
        return jsonify({'status': 'error', 'error': 'Internal datbase error'}), 500

    return jsonify({'id': newId}), 200

@app.route('/transactions')
@jwt_required()
def getTransactions():
    db = DataBase(settings.dbFile)
    orderByValues = ('newest', 'oldest')
    ammount = request.args.get('ammount', default=50, type=int)
    orderBy = request.args.get('orderBy', default='newest', type=str)
    orderBy = orderBy if orderBy in orderByValues else 'newest'
    offset = request.args.get('offset', default=0, type=int)
    date = request.args.get('date', default=datetime.now(), type=hf.JSONtoDate)

    transactions = db.getTransactions(ammount, orderBy, offset, str(current_identity))
    return jsonify({'transactions': transactions}), 200

if __name__ == "__main__":
    app.secret_key = os.urandom(15)
    app.config['JWT_SECRET_KEY'] = os.urandom(15)
    app.config['JWT_EXPIRATION_DELTA'] = timedelta(weeks=4)
    db = DataBase(settings.dbFile).createTables()
    app.run(port='3001', debug=True)
