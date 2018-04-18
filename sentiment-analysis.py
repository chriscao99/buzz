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

tweets  = twitterAPI.user_timeline(screen_name="chriscao99", count=10)


#Prints the last 10 tweets
print("Number of tweets received: {}".format(len(tweets)) + "\n")
print("Latest 10 tweets: \n")
for one in tweets:
    tweet_text = one.text
    print(tweet_text + "\n")

#Prints the last 10 tweets using Pandas 
nicer_tweets = pnds.DataFrame(data = [tweet.text for tweet in tweets], columns=["Last 10 Tweets"])
print("Displayed in a nicer way: \n")
display(nicer_tweets.head(10))
print()



