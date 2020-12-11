import sqlite3
from sqlite3 import Error
import uuid
from werkzeug.security import generate_password_hash
from modules.definitions.User import User
from datetime import datetime, date, timedelta

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
            pending boolean,
            ammount int,
            cost real,
            individualPrice real,
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

    def insertTransaction(self, name, client, paid, ammount, cost, pending,individualPrice, user):
        command = '''
        INSERT INTO Transactions
        (name, client, paid, ammount, date, pending, cost, individualPrice, id, user)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        '''
        id = str(uuid.uuid4())
        self.cursor.execute(command, (name, client, paid, ammount, datetime.now(), pending, cost, individualPrice, id, user))
        self.conn.commit()
        return id

    def getTransactions(self, ammount, orderBy, offset, user):
        order = 'date '
        order += 'DESC' if orderBy == 'newest' else 'ASC'
        command =  f'''
        SELECT *
        FROM Transactions
        WHERE user = ?
        ORDER BY {order}
        LIMIT ? OFFSET ?;
        '''
        self.cursor.execute(command, (user, ammount, offset))
        transactions = self.cursor.fetchall()
        return transactions

    def getEarnings(self, timeframe, user):
        monthCommand = '''
        select sum(cost) as earnings from transactions
        where strftime('%m',date) = strftime('%m',date('now'))
        and paid = true and user = ?
        '''
        dayCommand = '''
        select sum(cost) as earnings from transactions
        where strftime('%d',date) = strftime('%d',date('now'))
        and paid = true and user = ?
        '''

        today = date.today()
        dayWeek = int(today.strftime('%w'))
        monday = today - timedelta(days=dayWeek-1)

        weekCommand = '''
        select sum(cost) as earnings from transactions
        where date >= ? and paid= true and user = ?
        '''

        if timeframe == 'day':
            self.cursor.execute(dayCommand, (user,))
        elif timeframe == 'week':
            self.cursor.execute(weekCommand, (monday, user,))
        elif timeframe == 'month':
            self.cursor.execute(monthCommand, (user,))

        result = self.cursor.fetchall()
        if not result[0]['earnings']:
            result = {'earnings': 0}
        return result

    def deleteTransactions(self, id, userId):
        deleteCommand = '''
        delete from transactions
        where id = ? and user = ?

        '''
        self.cursor.execute(deleteCommand, (id, userId))
        self.conn.commit()

    def updatePendingStatus(self, id, pending, userId):
        CommandPending = '''
        update transactions set pending = ?
        where id = ? and user = ?
        '''
        self.cursor.execute(CommandPending, (pending, id, userId))
        self.conn.commit()

    def updatePaidStatus(self, id, paid, userId):
        CommandPaid = '''
        update transactions set paid = ?
        where id = ? and user = ?
        '''
        self.cursor.execute(CommandPaid, (paid, id, userId))
        self.conn.commit()
