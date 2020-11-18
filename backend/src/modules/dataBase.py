import sqlite3
from sqlite3 import Error
import uuid
from werkzeug.security import generate_password_hash
from modules.definitions.User import User
from datetime import datetime

class DataBase:
    def __init__(self, dbFile):
        try:
            self.conn = sqlite3.connect(dbFile, detect_types=sqlite3.PARSE_DECLTYPES | sqlite3.PARSE_COLNAMES)
            self.conn.row_factory = DataBase.dictFactory
            self.cursor = self.conn.cursor()
        except Error as e:
            print(e)

    @staticmethod
    def dictFactory(cursor, row):
        dict = {}
        for i, col in enumerate(cursor.description):
            dict[col[0]] = row[i]
        return dict

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
            date datetime,
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
        return User(user['username'], user['password'], user['id'])

    def insertTransaction(self, name, client, paid, ammount, user):
        command = '''
        INSERT INTO Transactions
        (name, client, paid, ammount, id, date, user)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        '''
        self.cursor.execute(command, (name, client, paid, ammount, str(uuid.uuid4()), datetime.now(), user))
        self.conn.commit()

    def getTransactions(self, ammount, orderBy, offset, user):
        order = 'date '
        order += 'DESC' if orderBy == 'newest' else 'ASC'
        command =  f'''
        SELECT name, client, paid, ammount, id, date
        FROM Transactions
        WHERE user = ?
        ORDER BY {order}
        LIMIT ? OFFSET ?;
        '''
        self.cursor.execute(command, (user, ammount, offset))
        transactions = self.cursor.fetchall()
        return transactions
