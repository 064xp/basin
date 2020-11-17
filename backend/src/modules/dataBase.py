import sqlite3
from sqlite3 import Error
import uuid

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
            userId text NOT NULL PRIMARY KEY
        )
        '''

        self.cursor.executescript(command)

    def insertUser(self, username, password):
        command = '''
        INSERT INTO Users
        (username, password, userId)
        VALUES (?, ?, ?)
        '''
        id = str(uuid.uuid4())
        self.cursor.execute(command, (username, password, id))
        self.conn.commit()
