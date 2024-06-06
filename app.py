from flask import Flask, render_template, jsonify

app = Flask(__name__)

counter = {"count": 5, "max_count": 7}

@app.get("/")
def index():
    return render_template("index.html", counter=counter)

@app.get("/count")
def get_count():
    return jsonify(counter)

@app.route("/count", methods=['POST'])
def update_count():
    return "testing"

@app.route("/reset", methods=['POST'])
def reset_count():
    counter["count"] = 0
    return "testing"