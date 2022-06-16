import spacy
import json
from itertools import combinations
import en_core_web_md

nlp = spacy.load('en_core_web_md')



def genSentenceTokenSet(sent):
    if sent is None:
        raise Exception("question is empty!!")
        return
    
    tokens = nlp(sent)
    token_set = set([token.lemma_ for token in tokens if not token.is_stop ])
    return token_set
    

def genEntityWiseSimilarity(q_file, outputfile):
    questions = []

    simialrities = []

    with open(q_file, "r") as f:
        text_qa_pairs = json.load(f)
        for p in text_qa_pairs:
            paragraph_q = []
            for pair in p['qa_pair_list']:
                paragraph_q.append(pair['question'])
            questions.append(paragraph_q)
        
        for i, paragraph_q in enumerate(questions):
            # questions for a paragraph
            pair_list = []
            question_pair = combinations(paragraph_q, 2)
            for pair in question_pair:
                tokenSet1, tokenSet2 = genSentenceTokenSet(pair[0]), genSentenceTokenSet(pair[1])
                score = len(tokenSet1.intersection(tokenSet2))
                pair_list.append((pair[0], pair[1], score))
            simialrities.append({"text": text_qa_pairs[i]['text'], "similarities": pair_list})
    
    with open(outputfile, "w") as f:
        json.dump(simialrities, f)


def genSimialrityFile():
    questions = []

    simialrities = []

    with open("story/questions/three_bears.json", "r") as f:
        text_qa_pairs = json.load(f)
        for p in text_qa_pairs:
            paragraph_q = []
            for pair in p['qa_pair_list']:
                paragraph_q.append(pair['question'])
            questions.append(paragraph_q)

        for i, paragraph_q in enumerate(questions):
            # questions for a paragraph
            pair_list = []
            question_pair = combinations(paragraph_q, 2)
            for pair in question_pair:
                doc1, doc2 = nlp(pair[0]), nlp(pair[1])
                score = doc1.similarity(doc2)
                pair_list.append((pair[0], pair[1], score))
            simialrities.append({"text": text_qa_pairs[i]['text'], "similarities": pair_list})

    with open("story/questions/token-similarities-story1.json", "w") as f:
        json.dump(simialrities, f)
        

def genFollowUpQuestions(q_filename, similarity_file, output_file):

    follow_ups = []
    similarities_dict = None

    with open(similarity_file, "r") as f:
        simialrities_dict = json.load(f)

    with open(q_filename, "r") as f:
        story_questions = json.load(f)
        for i, p in enumerate(story_questions):
            follow_up_p = []


            for q in p['qa_pair_list']:
                follow_up_spec_q = []

                question = q['question']
                pairs = filter(lambda pair: pair[0] == question, simialrities_dict[i]['similarities'])
                pairs = sorted(pairs, key=lambda pair: pair[2], reverse=True)
                for j, pair in enumerate(pairs):
                    # Only keep the question with the similarity less than 0.8
                    if pair[2] < 4:
                        match_q = next(filter(lambda x: x['question'] == pair[1], p['qa_pair_list']))
                        # filter out the follow-up whose answer is involved in the question
                        answer_tokens, main_question_tokens = genSentenceTokenSet(match_q['answer']), genSentenceTokenSet(question)
                        if len(answer_tokens.intersection(main_question_tokens)) == 0:
                            follow_up_spec_q.append(match_q)
                    # pair.append(match_q['category'])
                    # pair.append(match_q['answer'])
                    # pairs[j] = pair[1:]


                #follow_up_p.append({"question": question, "answer": q['answer'] , "start_idx": q['start_idx'],  "category": q['category'], "follow_ups": follow_up_spec_q})
                follow_up_p.append({**q, "follow_ups": follow_up_spec_q})
            follow_ups.append(follow_up_p)
    
    with open(output_file, "w") as f:
        json.dump(follow_ups, f)
    
    return

if __name__ == "__main__":
    # genFollowUpQuestions("story/questions/story1.json", "story/questions/q-similarities-story1.json", "story/questions/follow-up-questions-story.json")
    genEntityWiseSimilarity("story/questions/three_bears.json", "story/questions/token-similarities-story1.json")
    # genSimialrityFile()
    genFollowUpQuestions("story/questions/three_bears.json", "story/questions/token-similarities-story1.json", "story/questions/three-bears-follow-up-questions-story.json")



            




