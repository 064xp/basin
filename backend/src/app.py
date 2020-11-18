from flask import Flask, request, jsonify
import os
from datetime import timedelta
from sqlite3 import Error
from flask_jwt import JWT, jwt_required, current_identity
from modules.jwt import JWTFunctions
from modules.dataBase import DataBase
import settings

app = Flask(__name__)
jwt = JWT(app, JWTFunctions.authenticate, JWTFunctions.identity)

@app.route('/')
def root():
    return 'you made it!'

@app.route('/sign-up', methods=['POST'])
def signUp():
    db = DataBase(settings.dbFile)
    try:
        json = request.get_json()
        username = json['username']
        password = json['password']
    except:
        return jsonify({'satus': 'error', 'error': 'Invalid JSON'}), 400

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
        ammount = json['ammount']
    except:
        return jsonify({'satus': 'error', 'error': 'Invalid JSON'}), 400

    try:
        db.insertTransaction(name, client, paid, ammount, str(current_identity))
    except Error as e:
        print(e)
        return jsonify({'status': 'error', 'error': 'Internal datbase error'}), 500

    return jsonify({'status': 'success'}), 200

@app.route('/transactions')
@jwt_required()
def getTransactions():
    db = DataBase(settings.dbFile)
    orderByValues = ('newest', 'oldest')
    ammount = request.args.get('ammount', default=10, type=int)
    orderBy = request.args.get('orderBy', default='newest', type=str)
    orderBy = orderBy if orderBy in orderByValues else 'newest'
    offset = request.args.get('offset', default=0, type=int)

    transactions = db.getTransactions(ammount, orderBy, offset, str(current_identity))
    return jsonify({'transactions': transactions}), 200


if __name__ == "__main__":
    app.secret_key = os.urandom(15)
    app.config['JWT_SECRET_KEY'] = os.urandom(15)
    app.config['JWT_EXPIRATION_DELTA'] = timedelta(seconds=11000)
    db = DataBase(settings.dbFile).createTables()
    app.run()
