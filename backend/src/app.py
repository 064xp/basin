from flask import Flask
import os

from modules.dataBase import DataBase

app = Flask(__name__)

@app.route('/')
def root():
    return 'you made it!'

if __name__ == "__main__":
    app.secret_key = os.urandom(15)
    db = DataBase('./dev.db')
    app.run()
