import time
from flask import Flask, Response
from flask_cors import CORS
import numpy, random
from datetime import datetime, timedelta
import json
from RandomDealData import *
import mysql.connector
import mysql.connector
import dao

app = Flask(__name__)
CORS(app)

def index():
    return "Data Generator is running..."

def testservice():
    rdd = RandomDealData()
    deal = rdd.createRandomData( rdd.createInstrumentList() )
    return Response( deal, status=200, mimetype='application/json')

def stream():
    rdd = RandomDealData()
    instrList = rdd.createInstrumentList()
    def eventStream():
        while True:
            #nonlocal instrList
            yield rdd.createRandomData(instrList) + "\n"
    return Response(eventStream(), status=200, mimetype="text/event-stream")

def stream_db():
    #rdd = RandomDealData()
    #instrList = rdd.createInstrumentList()
    def eventStream():
        while True:
            #nonlocal instrList
            yield dao.insert_data(dao.generate_random_deal()) + "\n"
    return Response(eventStream(), status=200, mimetype="text/event-stream")

def sse_stream():
    theHeaders = {"X-Accel-Buffering": "False"}
    rdd = RandomDealData()
    instrList = rdd.createInstrumentList()
    def eventStream():
        while True:
            #nonlocal instrList
            yield 'data:{}\n\n'.format(rdd.createRandomData(instrList))
    resp = Response(eventStream(), status=200, mimetype="text/event-stream")
    resp.headers["X-Accel-Buffering"] = "False"
    return resp


def get_top_deals(amount=10):
    return json.dumps(dao.select_top_deals_data(amount))


def get_time():
    """this could be any function that blocks until data is ready"""
    time.sleep(1.0)
    s = time.ctime(time.time())
    return s

def generate_data():
    rdd = RandomDealData()
    instrList = rdd.createInstrumentList()
    dataList = []
    for i in range(10):
        data = rdd.createRandomData(instrList)



def get_data():
    """this could be any function that blocks until data is ready"""

    isSuccessfull = True

    try:
        connection = mysql.connector.connect(host='127.0.0.1', database='db_grad_cs_1917', user='root', password='ppp')
        # Creating a cursor object using the cursor() method
        cursor = connection.cursor()
    except Exception as e:
        print(e)
        isSuccessfull = False
    finally:
        resp = {
            'isSuccessfull': isSuccessfull
        }
        return Response(json.dumps(resp), status=200, mimetype='application/json')


def is_user_in_db(user_id, user_pwd):
    users = dao.get_credentials(user_id, user_pwd)
    res = len(users) > 0
    resp = {
        'isPresented': res
    }
    return Response(json.dumps(resp), status=200, mimetype='application/json')


def get_realized_profit_loss():
    realized_profit_loss = dao.get_realized_profit_loss()
    print(json.dumps(realized_profit_loss))
    return Response(json.dumps(realized_profit_loss), status=200, mimetype='application/json')

