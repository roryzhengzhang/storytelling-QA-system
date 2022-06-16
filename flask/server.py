import os
import logging
from google.cloud import dialogflow
from google.api_core.exceptions import InvalidArgument
from flask_cors import CORS
from pprint import pprint
from flask import Flask, json, request, jsonify, session, redirect, url_for

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = './credential.json'

DIALOGFLOW_PROJECT_ID = 'angelic-gift-320720'
DIALOGFLOW_LANGUAGE_CODE = 'en-US'
SESSION_ID = 'answer_validation'

app = Flask(__name__)

CORS(app)

@app.route('/text-input', methods=["POST", "GET"])
def check_answer():
    question = request.args.get('question')
    answer = request.args.get('answer')
    print("question: ", question)
    # activagte the question outputContext
    session_client = dialogflow.SessionsClient()
    session = session_client.session_path(DIALOGFLOW_PROJECT_ID, SESSION_ID)
    text_input = dialogflow.TextInput(text=question, language_code=DIALOGFLOW_LANGUAGE_CODE)
    query_input = dialogflow.QueryInput(text=text_input)
    response = None
    try:
        response = session_client.detect_intent(session=session, query_input=query_input)
    except InvalidArgument:
        raise
    
    print("response 1")
    pprint(response.query_result)
    
    
    # get Dialogflow's judgement of the correctness of the user answer
    text_input_2 = dialogflow.TextInput(text=answer, language_code=DIALOGFLOW_LANGUAGE_CODE)
    query_input_2 = dialogflow.QueryInput(text=text_input_2)
    response_2 = None
    try:
        response_2 = session_client.detect_intent(session=session, query_input=query_input_2)
    except InvalidArgument:
        raise
    
    print("response 2")
    pprint(response_2)
    
    if (response_2.query_result.fulfillment_text):
        return jsonify({"correctness": True})
    else:
        return jsonify({"correctness": False})
    
if __name__ == "__main__":
    logging.basicConfig(level=logging.DEBUG)
    app.debug = True
    app.run(host="0.0.0.0", port=2053, ssl_context='adhoc')

