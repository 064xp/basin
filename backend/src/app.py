from flask import Flask, request, jsonify
import os
from datetime import timedelta, datetime
from sqlite3 import Error
from flask_jwt import JWT, jwt_required, current_identity
from modules.jwt import JWTFunctions
from modules.dataBase import DataBase
from modules.helperFunctions import HelperFunctions as hf
import settings

app = Flask(__name__)
jwt = JWT(app, JWTFunctions.authenticate, JWTFunctions.identity)

@app.route('/')
def root():
    return 'you made it!'

@app.route('/earnings/<timeframe>')
@jwt_required()
def earnings(timeframe):
    try:
        db=DataBase(settings.dbFile)
        total=db.getEarnings(timeframe, str(current_identity))
        return jsonify(total)
    except:
        return 'Unsuccessful', 500

@app.route('/transactions/<id>', methods=['DELETE'])
@jwt_required()
def deleter(id):
    try:
        db=DataBase(settings.dbFile)
        db.deleteTransactions(id, str(current_identity))
        return 'Successful', 200
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
        return jsonify({'satus': 'error', 'error': 'Invalid JSON'}), 400

    if not username or not password:
        return jsonify({'satus': 'error', 'error': 'Username or password cannot be empty'}), 400

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
        print(json)
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
    ammount = request.args.get('ammount', default=10, type=int)
    orderBy = request.args.get('orderBy', default='newest', type=str)
    orderBy = orderBy if orderBy in orderByValues else 'newest'
    offset = request.args.get('offset', default=0, type=int)
    date = request.args.get('date', default=datetime.now(), type=hf.JSONtoDate)

    transactions = db.getTransactions(ammount, orderBy, offset, str(current_identity))
    return jsonify({'transactions': transactions}), 200


@app.errorhandler(404)
def notFound(e):
    return app.send_static_file('../public/index.html')

if __name__ == "__main__":
    app.secret_key = os.urandom(15)
    app.config['JWT_SECRET_KEY'] = os.urandom(15)
    app.config['JWT_EXPIRATION_DELTA'] = timedelta(weeks=4)
    db = DataBase(settings.dbFile).createTables()
    app.run(port='3001', debug=True)
