A bare-bones example of how to combine aiohttp with MongoDB and a Process Pool
to handle database queries / updates asynchronously and do potentially long
running work in a process pool.

requires python 3.6, tested with python 3.7

### Usage: Running the Python Service Locally

```bash
# install requirements
pip install aiohttp motor

# run the mongo daemon
docker container run -d --name my-mongod -p 27017:27017 --rm mongo

# run the web-server
python app.py
```


Then in browser, visit `http://localhost:1919/Hello` and you'll be treated with
a response like the following, with 
* the requested resource path, 
* the number of times the resourcse path has been requested, which is stored in Mongodb
* a simple hash of the URI between 1 and 99
* the id of the sub-process in which the hash was calculated
* the name of the host process


```json
{
  "name": "Hello",
  "count": 1,
  "favoriate-number": 86,
  "process": 29049,
  "host-name": "py-server"
}
```

To stop the background mongo deamon process, use

```
docker container stop my-mongod
```


### Usage 2: Running the Python Service in Docker

Start up:

```bash
docker build . -t py-service
docker container run -d --name my-mongod --rm  mongo
docker container run -d --name py-service -p 19191:19191 -e "HOST=my-mongod" -e "PROCESS_COUNT=2" --rm py-service

# Create a network for automatic dns resolution
docker network create mynet
docker network connect mynet py-service
docker network connect mynet my-mongod
```

Clean up:

```bash
docker container stop my-mongod py-service
```

### Usage 2: Running the Python Service in Docker Behind a Load Balancer

Set up:

```bash
docker build . -t py-service

# Create a network for automatic dns resolution
docker network create mynet

# Create the resources
docker container run -d --name my-mongod --rm --net mynet mongo
docker container run -d --name py-service1 -e "HOST=my-mongod" -e "PROCESS_COUNT=3" -e "NAME=py-server-1" --rm --net mynet py-service
docker container run -d --name py-service2 -e "HOST=my-mongod" -e "PROCESS_COUNT=3" -e "NAME=py-server-2" --rm --net mynet py-service
docker container run -d --name proxy -p 8080:8080 --rm --net bridge --net mynet -v $(pwd)/ui/build:/www/data:ro -v $(pwd):/etc/nginx:ro nginx

# Make a few queries
for run in {1..5}; do curl localhost:8080/d/Hello; done
```


This will print something like the following to the console:

```
{"name": "Hello", "count": 25, "favoriate number": 86, "process": 13, "host-name": "py-server-2"}
{"name": "Hello", "count": 26, "favoriate number": 86, "process": 14, "host-name": "py-server-1"}
{"name": "Hello", "count": 27, "favoriate number": 86, "process": 15, "host-name": "py-server-2"}
{"name": "Hello", "count": 28, "favoriate number": 86, "process": 15, "host-name": "py-server-1"}
{"name": "Hello", "count": 29, "favoriate number": 86, "process": 14, "host-name": "py-server-2"}
```

or better yet, open your browser to [localhost:8080]

Clean up:
```bash
docker container stop proxy my-mongod py-service1 py-service2
```
<!--
curl -d '{"name":"Hello"}' -H "Content-Type: application/json" -X POST http://localhost:8080/d/
-->

