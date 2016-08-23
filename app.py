from flask import Flask
app = Flask(__name__)

@app.route('/test')
def get_data():
	return "test"

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
	return app.send_static_file('index.html')

if __name__ == "__main__":
    app.run()
