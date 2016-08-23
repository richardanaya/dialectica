import sys
import uuid
import os
from flask import Flask, request, jsonify
from os.path import join, dirname
from dotenv import load_dotenv
dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

SECRET_KEY = os.environ.get("SECRET_KEY")

app = Flask(__name__)


thesises = {
}

@app.route('/thesis/', methods=['POST'])
@app.route('/thesis/<uuid:id>', methods=['GET','PUT'])
def thesis(id=None):
    try:
        if request.method == 'GET':
            if id not in thesises:
                return jsonify({'message':"Thesis does not exists"}), 500
            return jsonify(thesises[id])
        elif request.method == 'POST':
            data = request.json
            new_id = uuid.uuid4()
            thesises[new_id] = {id:new_id,'text':data['text'],'author':data['author'],'questions':[]}
            return jsonify(thesises[new_id])
        elif request.method == 'PUT':
            if id not in thesises:
                return jsonify({'message':"Thesis does not exists"}), 500
            data = request.json
            if 'text' in data:
                thesises[id]['text'] = data['text']
            if 'questions_add' in data:
                for new_question in data['questions_add']:
                    thesises[id]['questions'].append({
                        'id':uuid.uuid4(),
                        'parent_question':new_question['parent_question'],
                        'type':new_question['type'],
                        'message':new_question['message'],
                        'references':new_question['references'],
                        'author':new_question['author']
                        })
            if 'questions_remove' in data:
                return "removing"
            return jsonify(thesises[id])
    except:
        return jsonify({'message':"Unknown error occurred"}), 500

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
	return app.send_static_file('index.html')

if __name__ == "__main__":
    app.run()
