from modules.dataBase import DataBase
from werkzeug.security import check_password_hash
import settings

class JWTFunctions:
    @staticmethod
    def authenticate(username, password):
        db = DataBase(settings.dbFile)
        user = db.getUser(username)
        if user and check_password_hash(user.password, password):
            return user

    @staticmethod
    def identity(payload):
        userId = payload['identity']
        db = DataBase(settings.dbFile)
        user = db.getUser(username)
        return user.id
