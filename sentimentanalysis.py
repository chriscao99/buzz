#General imports for analysis
import tweepy
import sys
import os
from pandas import DataFrame as df
from pandas import Series as srs
import numpy
from textblob import TextBlob
import re

#Imports for visualizations
# from IPython.display import display
# import matplotlib.pyplot as plot
# import seaborn as sbn

#Uses Twitter credentials to set up Tweepy in order to access tweets
def api_setup():

    API_KEY = os.environ['API_KEY']
    API_SECRET = os.environ['API_SECRET']
    ACCESS_TOKEN = os.environ['ACCESS_TOKEN']
    ACCESS_TOKEN_SECRET = os.environ['ACCESS_TOKEN_SECRET']

    auth = tweepy.OAuthHandler(API_KEY, API_SECRET)
    auth.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)

    api = tweepy.API(auth)

    return api

last10 = {}

def takeHandle(handle, context):
    """
    THIS IS THE SECTION OF CODE LAMBDA RUNS
    """
    user = handle['user']
    twitterAPI = api_setup()

    # user = input("Enter Twitter Handle (Ex. @chriscao99): ")

    tweets  = twitterAPI.user_timeline(screen_name=user, count=10)

    populateDict(tweets)
    return last10

#Sentiment analysis portion

def negOrpos(tweet):
    tweetAlone = TextBlob(extractTweet(tweet))
    if tweetAlone.sentiment.polarity > 0:
        return 1 #positive
    elif tweetAlone.sentiment.polarity == 0:
        return 0 #neutral
    else:
        return -1 #negative

def extractTweet(tweet):
    return ' '.join(re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)", " ", tweet).split())

def populateDict(tweets):
    pos_count = 0
    ntrl_count = 0
    neg_count = 0
    total_counted = 0.0

    for one in tweets:
        tweet_text = one.text
        rating = negOrpos(extractTweet(tweet_text))
        if rating == 1:
            pos_count += 1
            total_counted += 1.0
        elif rating == 0:
            ntrl_count += 1
            total_counted += 1.0
        elif rating == -1:
            neg_count += 1
            total_counted += 1.0

    last10['pos'] = (pos_count / total_counted)*100
    last10['neg'] = (neg_count / total_counted)*100
    last10['ntrl'] = (ntrl_count / total_counted)*100

if __name__ == "__main__":
    """
    THIS IS HOW YOU RUN LOCALLY
    """
    takeHandle(None, None)


# pos = [ tweet for index, tweet in enumerate(nicer_tweets['Last 10 Tweets']) if nicer_tweets['Sentiment Analysis'][index] > 0]
# neutral = [ tweet for index, tweet in enumerate(nicer_tweets['Last 10 Tweets']) if nicer_tweets['Sentiment Analysis'][index] == 0]
# neg = [ tweet for index, tweet in enumerate(nicer_tweets['Last 10 Tweets']) if nicer_tweets['Sentiment Analysis'][index] < 0]

# print("Percentage of positive tweets: {}%".format(len(pos)*100/len(nicer_tweets['Last 10 Tweets'])))
# print("Percentage of neutral tweets: {}%".format(len(neutral)*100/len(nicer_tweets['Last 10 Tweets'])))
# print("Percentage de negative tweets: {}%".format(len(neg)*100/len(nicer_tweets['Last 10 Tweets'])))
# print()
