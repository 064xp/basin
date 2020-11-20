from datetime import datetime

class HelperFunctions:
    @staticmethod
    def JSONtoDate(dateStr):
        return datetime.strptime(dateStr, '%Y-%m-%dT%H:%M:%S.%fZ')
