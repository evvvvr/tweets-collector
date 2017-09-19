# Tweets Collector

## Purpose

Provide HTTP REST API (with a frontend client) to search tweets fetched by
specific keyword via elasticsearch.

## Overall Design
TODO: add design diagram

Components are loosely coupled which allows to scale them independently
and fail independently without affecting other parts of the system.

As API and frontend client server instances share nothing and don't have any
state they could be scaled by introducing new instances behind load balancer.

Search index scaling is handled by Elasticsearch.

Database could be scaled by introducing sharded cluster (MongoDB is used).
Then multiple indexer instances could be introduced each indexing different db
shards.

One db instance is single point of failure which could be mitigated by
introducing replica set (or by using messaging to communicate between components
and get tweets to index from message queue, see below). 

Components are decoupled and can be replaced with different implementations
while respecting the data model/communications protocol.

Further step is to use messaging to communicate between components:
TODO: add messaging design diagram.

This would also mean lower latency for tweets indexing as periodical search index 
update would be replaced with updating index whenever new tweet appears in 
indexer message queue.

### Fetcher
Gets tweets containing given keyword and stores them in database marked as not
indexed.

On start, it uses Twitter search API (TODO: add link) to populate database with historical
tweets (since latest tweet in db if exists) as its only way to retrieve
historical data from Twitter (not older than 7 days due to API limitation).
Then, it uses  Twitter Stream API (TODO: add link) to pull new tweets.

It will fetch tweets only from public accounts.

### Indexer
First it re-creates search index and puts there all tweets from db,
then it adds scheduled job to periodically check database for not indexed tweets
and index them.

Cron-style scheduling is used to schedule indexer job, therefore adding latency
between storing new tweets and indexing them.

### API
HTTP server providing REST API with search endpoint querying Elasticsearch.
Search results are limited to 100 latest tweets.
TODO: add endpoint info

## Considerations
TODO: what to add here?

## To Implement
There also are some things which were not implemented.

Use something like nodemon to restart processes.

Fetcher could start getting historical tweets via API and listening for new tweets
via streaming API concurrently, or this parts could be further decoupled into
two separate services.

Are graceful exits of services and graceful error handling and retries.
Indexer now tries to bulk index all not indexed tweets - break bulk into chunks.
Prevent indexer job to start again when its already running.

Add API versioning.

## How To Start
TODO: Add this section