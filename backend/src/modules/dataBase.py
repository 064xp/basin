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
        );

        CREATE TABLE IF NOT EXISTS Transactions(
            name text NOT NULL,
            client text,
            paid boolean,
            ammount real,
            id text NOT NULL PRIMARY KEY,
            user text NOT NULL,
            FOREIGN KEY (user)
                REFERENCES Users (id)
        );
        '''

        self.cursor.executescript(command)
        self.conn.commit()

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

    def getUser(self, username=None, id=None):
        if id is not None:
            self.cursor.execute('SELECT username, password, id FROM Users WHERE id = ?', (id,))
        elif username is not None:
            self.cursor.execute('SELECT username, password, id FROM Users WHERE username = ?', (username,))
        else:
            return False
        user = self.cursor.fetchone()
        if user is None:
            return False
        return User(user[0], user[1], user[2])

    def insertTransaction(self, name, client, paid, ammount, user):
        command = '''
        INSERT INTO Transactions
        (name, client, paid, ammount, id, user)
        VALUES (?, ?, ?, ?, ?, ?)
        '''

        self.cursor.execute(command, (name, client, paid, ammount, str(uuid.uuid4()), user))
        self.conn.commit()
