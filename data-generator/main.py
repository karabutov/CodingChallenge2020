from flask import Flask, Response
from flask_cors import CORS
from flask import request
import webServiceStream
from RandomDealData import *

app = Flask(__name__)
CORS(app)


@app.route('/')
def index():
    return webServiceStream.index()

@app.route('/testservice')
def testservice():
    return webServiceStream.testservice()

@app.route('/streamTest')
def stream():
    return webServiceStream.stream()

@app.route('/streamDB')
def stream_db():
    return webServiceStream.stream_db()

@app.route('/streamTest/sse')
def sse_stream():
     return webServiceStream.sse_stream()

@app.route('/getData')
def get_data():
     return webServiceStream.get_data()

@app.route('/generateData')
def generate_data():
     return webServiceStream.generate_data()

@app.route('/login', methods=['POST'])
def login():
     user_id = request.form["username"]
     user_pwd = request.form["password"]
     return webServiceStream.is_user_in_db(user_id, user_pwd)


@app.route('/getTopDeals')
def get_top_deals():
    return webServiceStream.get_top_deals()




def bootapp():
    #global rdd 
    #rdd = RandomDealData()
    #webServiceStream.bootServices()
    app.run(debug=True, port=8080, threaded=True, host=('0.0.0.0'))


if __name__ == "__main__":
      bootapp()
