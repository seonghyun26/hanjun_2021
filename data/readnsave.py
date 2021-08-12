import csv
import pymysql

db = pymysql.connect(
    user='root', 
    passwd='2021', 
    host='localhost', 
    db='eco-system', 
    charset='utf8'
)

cursor = db.cursor(pymysql.cursors.DictCursor)
sql = "SELECT * FROM `history_demand`;"
cursor.execute(sql)
result = cursor.fetchall()

file = open ('202107powerPrediction.csv', 'r')
lines = csv.reader(file)
for line in lines:
    print(line)
    # for column in line:
    #     print(column)

