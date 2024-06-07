from flask import Flask, render_template, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func
from dataclasses import dataclass
import datetime

app = Flask(__name__)
SECRET_KEY = '2dcb5fcef03f8814810fde079fda8bd5'

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///testingdb.sqlite"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

@dataclass
class Counter(db.Model):
    count: int = db.Column(db.Integer, primary_key=True)
    max_count: int = db.Column(db.Integer, nullable=False)
    updated_at: datetime.datetime = db.Column(db.DateTime(timezone=True), server_default=func.now())

    def __repr__(self):
        return f'<Counter {self.count}>'

@app.get("/")
def index():
    return render_template("index.html")

@app.get("/count")
def get_count():

    api_key = request.headers.get('API-Key')
    if api_key != SECRET_KEY:
        return jsonify({"error": "Unauthorized"}), 401        

    counter = Counter.query.all()
    return jsonify(counter)

@app.route("/count", methods=['PUT'])
def update_count():
    request_data = request.get_json()
    print(request_data)
    count = request_data['count']
    max_count = request_data['max_count']

    record_to_update = Counter.query.first()    
    record_to_update.count = count
    record_to_update.max_count = max_count
        
    db.session.add(record_to_update)
    db.session.commit()

    return jsonify({"message": "Record updated successfully"}), 200