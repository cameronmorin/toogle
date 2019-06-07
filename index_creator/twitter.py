import tweepy, json, sys
import apiKeys
from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream
from tweepy import API
# from tweepy import OAuthHandler
#FIXME make auth keys private

consumer_key = apiKeys.consumer_key
consumer_secret = apiKeys.consumer_secret
access_token = apiKeys.access_token
access_token_secret = apiKeys.access_token_secret

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)

api = tweepy.auth.API(auth)

# tweet = api.get_status(1134185585038565376)
# print(tweet.source)
# json_results = []
# testFile = open('../data/test_search.json', 'a')
# results = api.search('semantic-ui')
# for result in results:
#     json_results.append(json.dumps(result._json))
#     testFile.write(str(json.dumps(result._json)))


newFile = open('../data/new_test.json', 'a')


def callListener():
    tech = [
        'python',
        'react', 
        'vue',
        'angular',
        'c++',
        'html',
        'css',
        'software',
        'amazon',
        'apple'
    ]

    common = [
        'a',
        'the', 
        'i',
        'and'
    ]

    # Open JSON file to write to
    # outfile = open('../data/test.txt', 'w')


    # public_tweets = api.home_timeline()
    # for tweet in public_tweets:
    #     print(tweet.text)


    # #override tweepy.StreamListener to add logic to on_status
    class MyStreamListener(tweepy.StreamListener):

        def __init__(self):
            super(StreamListener, self).__init__()
            self.save_file = open('../data/tweets.json','a')
            self.tweets = []

        def on_data(self, tweet):
            inTweet = json.loads(tweet)
            try:
                for url in inTweet["entities"]["urls"]:
                    print(url["url"])
                    newFile.write(str(tweet))
            except KeyError:
                print(tweet)
                sys.exit()
            # for url in inTweet["entities"]["urls"]["url"]:
            #     # print('Found url: ' + str(url))
            #     print(url["url"])
            self.tweets.append(inTweet)
            # self.save_file.write(str(tweet))
            # if (len(self.tweets) > 20):
            #     sys.exit()

        # def on_connect(self, status):
        #     print('Connected to the stream.')

        def on_error(self, status):
            print(status)
            return True

    myStreamListener = MyStreamListener()
    myStream = tweepy.Stream(auth = api.auth, listener=myStreamListener)
    myStream.filter(track=common, languages=['en'])


callListener()
