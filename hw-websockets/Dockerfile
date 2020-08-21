FROM gcr.io/google-appengine/python

MAINTAINER Selvyn Wright "swright@celestial.co.uk"
RUN virtualenv -p python3.7 /env 

# Setting these environment variables are the same as running
# source /env/bin/activate.
ENV VIRTUAL_ENV /env
ENV PATH /env/bin:$PATH

RUN apt-get update -y
RUN apt-get install -y python-pip python-dev build-essential
COPY . /app
WORKDIR /app
RUN pip install -r requirements.txt
ENTRYPOINT ["python"]
CMD [ "./main.py" ]