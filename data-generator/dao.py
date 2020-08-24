import mysql.connector
from RandomDealData import RandomDealData
import json


def get_connection():
    connection = mysql.connector.connect(host='127.0.0.1',
                                database='db_grad_cs_1917_no_deal_data',
                                user='root', password='ppp')
    return connection


def close_connection(connection):
    connection.close()


def select_counterparty_id(counterparty_name):
    connection = get_connection()
    cursor = connection.cursor()
    try:
        select_counterparty_id_sql = "SELECT counterparty_id FROM counterparty " \
                                 "WHERE counterparty_name = %s"
        cursor.execute(select_counterparty_id_sql, (counterparty_name,))

        return cursor.fetchone()

    finally:
        cursor.close()
        close_connection(connection)


def select_instrument_id(instrument_name):
    connection = get_connection()
    cursor = connection.cursor()
    try:
        select_instrument_id_sql = "SELECT instrument_id FROM instrument " \
                                 "WHERE instrument_name = %s"
        cursor.execute(select_instrument_id_sql, (instrument_name,))

        return cursor.fetchone()

    finally:
        cursor.close()
        close_connection(connection)


def generate_random_deal():
    rdd = RandomDealData()
    instrList = rdd.createInstrumentList()
    rdd_json = json.loads(rdd.createRandomData(instrList))

    return rdd_json


def insert_data(rdd_json):
    connection = get_connection()
    cursor = connection.cursor()
    try:
        cpty_id, = select_counterparty_id(rdd_json['cpty'])
        instrument_id, = select_instrument_id(rdd_json['instrumentName'])

        insert_deal_sql = "INSERT INTO deal(deal_time, " \
                          "deal_counterparty_id, " \
                          "deal_instrument_id," \
                          "deal_type," \
                          "deal_amount," \
                          "deal_quantity) VALUES (%s, %s, %s, %s, %s, %s)"
        cursor.execute(insert_deal_sql, (rdd_json['time'],
                                         cpty_id,
                                         instrument_id,
                                         rdd_json['type'],
                                         rdd_json['price'],
                                         rdd_json['quantity']))
        connection.commit()
    finally:
        cursor.close()
        close_connection(connection)
        return json.dumps(rdd_json)


def select_all_deals_data():
    connection = get_connection()
    cursor = connection.cursor()
    try:
        select_deal_sql = "SELECT * FROM deal"
        cursor.execute(select_deal_sql)
        result = cursor.fetchall()

        return result
    finally:
        cursor.close()
        close_connection(connection)


def select_top_deals_data(amount=10):
    connection = get_connection()
    cursor = connection.cursor()
    try:
        select_deal_sql = '''SELECT d.deal_id, i.instrument_name, c.counterparty_name, 
                                    d.deal_amount, d.deal_type, d.deal_quantity, 
                                    d.deal_time FROM deal as d 
                                    INNER JOIN instrument as i 
                                    ON d.deal_instrument_id = i.instrument_id 
                                    INNER JOIN counterparty as c 
                                    ON d.deal_counterparty_id = c.counterparty_id 
                                    ORDER BY deal_id DESC LIMIT %s'''
        cursor.execute(select_deal_sql, (amount,))
        result = cursor.fetchall()

        res = [convert_tuple_to_json(line) for line in result]
        return res

    finally:
        cursor.close()
        close_connection(connection)


def convert_tuple_to_json(data):
    json_data = {'id': data[0],
                 'instrumentName': data[1],
                 'cpty': data[2],
                 'price': float(data[3]),
                 'type': data[4],
                 'quantity': data[5],
                 'time': data[6]}

    return json_data


def get_credentials(user, password):
    connection = get_connection()
    cursor = connection.cursor()
    try:
        select_counterparty_id = "SELECT * FROM users " \
                                 "WHERE user_id = %s and user_pwd = %s"
        cursor.execute(select_counterparty_id, (user,password))
        res = cursor.fetchall()
        return res

    finally:
        cursor.close()
        close_connection(connection)