from flask import Flask

app = Flask(__name__)

@app.route('/')
def main():
    print("Hello I m flask")