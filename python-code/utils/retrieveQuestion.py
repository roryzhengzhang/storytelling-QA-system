import requests
import json
import time
import re

url = 'http://1afc-35-199-191-185.ngrok.io/generate_qa'

storyBook = "story/three bears.txt"

qa_list = []

with open(storyBook, "r") as f:
    paragraphs = f.read().split("\n\n")

    for p in paragraphs:
        request_id = 11111
        timestamp = time.time()
        request_data = {
            "input_content": p,
            "input_category": 'all',
            "timestamp": timestamp,
            "request_id": request_id
        }
        data = requests.post(url, data = json.dumps(request_data))
        print(data)
        print(data.json())
        
        data = data.json()
        for d in data['qa_pair_list']:
            d['answer_in_text'] = d['start_idx'] != "-1"
            d['question'] = re.sub(" \?", "?", d['question'])
            d['question'] = re.sub(" \.", ".", d['question'])
            d['question'] = re.sub(" +", " ", d['question'])
            d['question'] = d['question'].capitalize()
            d['answer'] = re.sub(" \.", ".", d['answer']).capitalize()
        data['qa_pair_list'] = sorted(data['qa_pair_list'], reverse=True, key=lambda x: float(x['score']))
        data['qa_pair_list'] = sorted(data['qa_pair_list'], reverse=True, key=lambda x: x['answer_in_text'])
        qa_list.append({"text": p, "qa_pair_list": data['qa_pair_list'] })


with open('story/questions/three_bears.json', 'w') as f:
    json.dump(qa_list, f)
        