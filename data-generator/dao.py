import mysql.connector
from RandomDealData import RandomDealData
import json


def get_connection():
    connection = mysql.connector.connect(host='127.0.0.1',
                                database='db_grad_cs_1917',
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


insert_data(generate_random_deal())
select_all_deals_data()

