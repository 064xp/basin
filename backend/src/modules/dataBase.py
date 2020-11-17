import sqlite3
from sqlite3 import Error

class DataBase:
    def __init__(self, dbFile):
        try:
            self.conn = sqlite3.connect(dbFile)
            self.cursor = self.conn.cursor()
            self._createTables()
        except Error as e:
            print(e)

    def _createTables(self):
        command = '''
        CREATE TABLE IF NOT EXISTS Users(
            name text NOT NULL,
            username text  NOT NULL PRIMARY KEY,
            password text NOT NULL
        )
        '''

        self.cursor.executescript(command)
