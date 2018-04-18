#General imports for analysis
import tweepy
import sys
import pandas as pnds 
import numpy as nump

#Imports for visualizations
from IPython.display import display
import matplotlib.pyplot as plot
import seaborn as sbn 
from twittercreds import * #Gets our Twitter credentials

#Uses Twitter credentials to set up Tweepy in order to access tweets
def api_setup():

    auth = tweepy.OAuthHandler(API_KEY, API_SECRET)
    auth.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)

    api = tweepy.API(auth)

    return api

twitterAPI = api_setup()

tweets  = twitterAPI.user_timeline(screen_name="realDonaldTrump", count=10)


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

#Adds columns for favs (likes) and RTs, as well as date and source
likes = []
for tweet in tweets:
    likes.append(tweet.favorite_count)
nicer_tweets['Likes'] = likes

nicer_tweets['Retweets'] = nump.array([tweet.retweet_count for tweet in tweets])
nicer_tweets['Date'] = nump.array([tweet.created_at for tweet in tweets])
nicer_tweets['Source'] = nump.array([tweet.source for tweet in tweets])

display(nicer_tweets.head(10))
print()

#Includes data on most liked tweet
print()
mostLikes = nump.max(nicer_tweets['Likes'])
print("Most likes on any of the last 10 tweets is: {}".format(mostLikes))
print()
mostLikesIndex = nicer_tweets[nicer_tweets.Likes == mostLikes].index[0]
mostLikesTweet = nicer_tweets['Last 10 Tweets'][mostLikesIndex]
print("That tweet was: {}".format(mostLikesTweet))
print()

#Displays likes over time as a Series using pandas
likesTrend = pnds.Series(data=nicer_tweets['Likes'].values, index=nicer_tweets['Date'])
likesTrend.plot(figsize=(16, 4), color = 'r')
print(likesTrend.to_string)

#Testing pie chart

sources = []
for source in nicer_tweets['Source']:
    if source not in sources:
        sources.append(source)

# We print sources list:
print("Creation of content sources:")
for source in sources:
    print("* {}".format(source))

percent = nump.zeros(len(sources))

for source in nicer_tweets['Source']:
    for index in range(len(sources)):
        if source == sources[index]:
            percent[index] += 1
            pass

percent /= 100

pie_chart = pnds.Series(percent, index=sources, name='Sources')
pie_chart.plot.pie(fontsize=11, autopct='%.2f', figsize=(6, 6))

#Sentiment analysis portion
from textblob import TextBlob
import re

def extractTweet(tweet):
    return ' '.join(re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)", " ", tweet).split())

def negOrpos(tweet):
    tweetAlone = TextBlob(extractTweet(tweet))
    if tweetAlone.sentiment.polarity > 0:
        return 1 #positive
    elif tweetAlone.sentiment.polarity == 0:
        return 0 #neutral
    else:
        return -1 #negative

nicer_tweets['Sentiment Analysis'] = nump.array([negOrpos(tweet) for tweet in nicer_tweets['Last 10 Tweets']])

display(nicer_tweets.head(10))

pos = [ tweet for index, tweet in enumerate(nicer_tweets['Last 10 Tweets']) if nicer_tweets['Sentiment Analysis'][index] > 0]
neutral = [ tweet for index, tweet in enumerate(nicer_tweets['Last 10 Tweets']) if nicer_tweets['Sentiment Analysis'][index] == 0]
neg = [ tweet for index, tweet in enumerate(nicer_tweets['Last 10 Tweets']) if nicer_tweets['Sentiment Analysis'][index] < 0]

print("Percentage of positive tweets: {}%".format(len(pos)*100/len(nicer_tweets['Last 10 Tweets'])))
print("Percentage of neutral tweets: {}%".format(len(neutral)*100/len(nicer_tweets['Last 10 Tweets'])))
print("Percentage de negative tweets: {}%".format(len(neg)*100/len(nicer_tweets['Last 10 Tweets'])))