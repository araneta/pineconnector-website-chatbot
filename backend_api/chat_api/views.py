# todo/todo_api/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

import pandas as pd
import os
# moduld related with openai
import openai
from openai.embeddings_utils import distances_from_embeddings
import numpy as np
from openai.embeddings_utils import distances_from_embeddings, cosine_similarity

# read env file
from dotenv import load_dotenv
#get api key of openai from .env
load_dotenv()

openai_api_key = os.getenv("OPENAI_API_KEY")
print("openai_api_key_____",openai_api_key)
openai.api_key=openai_api_key

MODEL = 'text-embedding-ada-002'

#############################

df=pd.read_csv('processed/embeddings.csv', index_col=0)
print('end read')
df['embeddings'] = df['embeddings'].apply(eval).apply(np.array)

df.head()

print('start chatbot')
class Chatbot(APIView):
    # add permission to check if user is authenticated
    # permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        print('recieve request')
        chathistory =  request.data.get('chathistory'), 
        answer = answer_question(chatHistory=chathistory, debug=False)
        send_data= {}
        send_data["answer"] = answer
        return Response(send_data, status=status.HTTP_201_CREATED)

def create_context(
    question, df, max_len=1800, size="ada"
):
    """
    Create a context for a question by finding the most similar context from the dataframe
    """

    # Get the embeddings for the question
    q_embeddings = openai.Embedding.create(input=question, engine='text-embedding-ada-002')['data'][0]['embedding']

    # Get the distances from the embeddings
    df['distances'] = distances_from_embeddings(q_embeddings, df['embeddings'].values, distance_metric='cosine')


    returns = []
    cur_len = 0

    # Sort by distance and add the text to the context until the context is too long
    for i, row in df.sort_values('distances', ascending=True).iterrows():
        # Add the length of the text to the current length
        cur_len += row['n_tokens'] + 4
        
        # If the context is too long, break
        if cur_len > max_len:
            break
        
        # Else add it to the text that is being returned
        returns.append(row["text"])

    # Return the context
    return "\n\n###\n\n".join(returns)


def answer_question(
    chatHistory=[
        {
            "humanChat": False,
            "chatContent": "Am I allowed to publish model outputs to Twitter, without a human review?"
        }
    ],
    debug=False,
):

    try:
        """
        Answer a question based on the most similar context from the dataframe texts
        """
        history = ""

        for chat in chatHistory[0]:
            if(chat['humanChat']):
                history+=f"\nHuman Queston: {chat['chatContent']}"
            else:
                history+=f"\nBot Answer: {chat['chatContent']}"

        question = rewrite_question(history)

        context = create_context(question, df)
        # If debug, print the raw model response
        if debug:
            print("Context:\n" + context)
            print("\n\n")
        # Create a completions using the questin and context
        # response = get_result_chatgptapi(chatHistory[0], context)
        response = get_result_from_gpt3(history, context)
        return response["answer"]

    except Exception as e:
        print(e)
        return "Excuse me, one problem happens to me."
    

def get_result_chatgptapi(history, context):
    final_question = history[-1]['chatContent']
    previous_question = ''
    if(len(history)>=3):
        previous_question=history[-3]['chatContent']
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": 'system', "content": "You are a kind and friendly assistant and chatbot to answer about general question and introduce the website-docs.pineconnector.com. Please answer only content needed."},
            {"role": 'user', "content": final_question},
            {
                "role": 'assistant',
                "content": context
            },
            {
                "role": 'user',
                "content": previous_question
            }
        ]
    )

    return {
        'answer': response.choices[0].message['content'],
        'usage': response['usage'],
    }

def rewrite_question(history):
    final_question = openai.Completion.create(
        model="text-davinci-003",
        prompt=f"Check out the chat below, and rewrite the last question into one question to cover the main points and make sense from that alone.\n---\nChatting History:\n{history}\n\n---\nNew Question: ",
        temperature=0.7,
        max_tokens=256,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
    )["choices"][0]["text"].strip()
    return final_question

def get_result_from_gpt3(history,context):
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=f"You are a kind and friendly assistant and chatbot to answer about general question and introduce the website-docs.pineconnector.com. Answer based below context and next rules. \n- If there is a URL link, make it clickable with a title or html tag containing the words 'here'\n- If there is the code, put in <code> tag. \n---\nContext:\n{context}\n---\nChatting History:\n{history}\nAnswer: ",
        temperature=0.3,
        max_tokens=1000,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
    )
    return {
        "answer": response["choices"][0]["text"].strip(),
        'usage': response['usage'],
    }