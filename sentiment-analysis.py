#General imports for analysis
import tweepy
import sys
import pandas as pnds 
# import numpys as nump

#Imports for visualizations
from IPython.display import display
import matplotlib.pyplot as plot
import seaborn as sbn 
from twittercreds import * #Gets our Twitter credentials


def api_setup():

    auth = tweepy.OAuthHandler(API_KEY, API_SECRET)
    auth.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)

    api = tweepy.API(auth)

    return api

twitterAPI = api_setup()

tweets  = twitterAPI.user_timeline(screen_name="realDonaldTrump", count=10)

print("Number of tweets received: {}".format(len(tweets)) + "\n")

print("Latest 10 tweets: \n")
for one in tweets:
    tweet_text = one.text
    print(tweet_text + "\n")

