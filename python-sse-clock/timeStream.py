import time
from flask import Flask, Response
from flask_cors import CORS
from datetime import datetime, timedelta
import json


app = Flask(__name__)
CORS(app)


@app.route('/')
def index():
    return "Time Generator is running..."

@app.route('/testservice')
def testservice():
    time = get_message()
    return Response( time, status=200, mimetype='application/json')

@app.route('/streamTime')
def stream():
    def eventStream():
        while True:
            #nonlocal instrList
            yield get_time() + "\n"
    return Response(eventStream(), mimetype="text/event-stream")

@app.route('/streamTime/sse')
def sse_stream():
    def eventStream():
        while True:
            #nonlocal instrList
            yield 'data:{}\n\n'.format(get_time())
    return Response(eventStream(), mimetype="text/event-stream")


def get_time():
    """this could be any function that blocks until data is ready"""
    time.sleep(1.0)
    s = time.ctime(time.time())
    return s

def bootapp():
    app.run(port=8080, threaded=True, host=('0.0.0.0'))

if __name__ == '__main__':
     bootapp()

