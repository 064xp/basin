from flask import Flask, request, jsonify
import os
from werkzeug.security import generate_password_hash
from sqlite3 import Error

from modules.dataBase import DataBase

app = Flask(__name__)
dbFile = './dev.db'

@app.route('/')
def root():
    return 'you made it!'

@app.route('/sign-up', methods=['POST'])
def signUp():
    db = DataBase(dbFile)
    try:
        json = request.get_json()
        username = json['username']
        password = json['password']
    except:
        return jsonify({'error': 'Invalid JSON'}), 400

    try:
        db.insertUser(username, generate_password_hash(password))
    except Error as e:
        return 'DB Error', 500
    return username, 200

if __name__ == "__main__":
    app.secret_key = os.urandom(15)
    db = DataBase(dbFile).createTables()
    app.run()
