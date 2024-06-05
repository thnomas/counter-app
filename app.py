from flask import Flask, render_template

app = Flask(__name__)

counter = {"count": 0, "max_count": 0}

@app.get("/")
def index():
    return render_template("index.html", counter=counter)

@app.get("/count")
def get_count():
    return counter

@app.route("/count", methods=['POST'])
def update_count():
    return "testing"

@app.route("/reset", methods=['POST'])
def reset_count():
    counter["count"] = 0
    return "testing"