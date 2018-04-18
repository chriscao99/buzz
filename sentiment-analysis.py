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









