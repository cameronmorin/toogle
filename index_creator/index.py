import json
from elasticsearch import Elasticsearch

es = Elasticsearch([{'host': 'localhost', 'port': 9200}])
filename = "../data/tweets.json"
i = 1
with open(filename, 'r') as tweets:
  for raw_tweet in tweets:
    print('Tweet #: ', i)
    tweet = json.loads(raw_tweet)
    # tweet_data = {
    #   "userName": tweet['user']['name'],
    #   "time": tweet['created_at'],
    #   "text": tweet['text'],
    #   "urls": tweet['entities']['urls'],
    #   "location": tweet['place']['bounding_box']['coordinates'][0][1]
    # }
    if 'user' not in tweet or 'created_at' not in tweet or 'text' not in tweet or 'entities' not in tweet or 'place' not in tweet:
        pass
        
    elif tweet['place'] is not None:
        tweet_data = {
            "userName": tweet['user']['name'],
            "userId": tweet['user']['id'],
            "time": tweet['created_at'],
            "text": tweet['text'],
            "url": tweet['entities']['urls'],
            "location": tweet['place']['bounding_box']['coordinates'][0][1],
            "picture": tweet['user']['profile_image_url_https'],
            "followers": tweet['user']['followers_count']
        }
    else:
        tweet_data = {
            "userName": tweet['user']['name'],
            "userId": tweet['user']['id'],
            "time": tweet['created_at'],
            "text": tweet['text'],
            "url": tweet['entities']['urls'],
            "location": None,
            "picture": tweet['user']['profile_image_url_https'],
            "followers": tweet['user']['followers_count']
        }
    i += 1

    es.index(index="toogle", ignore=400,  body=tweet_data, doc_type="document")