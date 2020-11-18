import sqlite3
from sqlite3 import Error
import uuid
from werkzeug.security import generate_password_hash
from modules.definitions.User import User

class DataBase:
    def __init__(self, dbFile):
        try:
            self.conn = sqlite3.connect(dbFile)
            self.cursor = self.conn.cursor()
        except Error as e:
            print(e)

    def createTables(self):
        command = '''
        CREATE TABLE IF NOT EXISTS Users(
            username text  NOT NULL,
            password text NOT NULL,
            id text NOT NULL PRIMARY KEY
        )
        '''

        self.cursor.executescript(command)

    def insertUser(self, username, password):
        command = '''
        INSERT INTO Users
        (username, password, id)
        VALUES (?, ?, ?)
        '''
        if self.getUser(username):
            raise ValueError
        id = str(uuid.uuid4())
        self.cursor.execute(command, (username, generate_password_hash(password), id))
        self.conn.commit()

    def getUser(self, username):
        self.cursor.execute('SELECT username, password, id FROM Users WHERE username = ?', (username,))
        user = self.cursor.fetchone()
        if user is None:
            return False
        return User(user[0], user[1], user[2])
