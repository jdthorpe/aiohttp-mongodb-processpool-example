A bare-bones example of how to combine aiohttp with MongoDB and a Process Pool
to handle database queries / updates asynchronously and do potentially long
running work in a process pool.

requires python 3.6, tested with python 3.7

### Usage:

```bash
# install requirements
pip install aiohttp motor

# run the mongo daemon
docker run -d --name my-mongod -p 27017:27017 mongo

# run the web-server
python app.py
```

Then in browser, visit `http://localhost:1919/Hello` and you'll be treated with
a response like the following, with the path, the number of times this path has
been requested which is stored in Mongodb, a simple hash of the URI between 1
and 99, and the id of the sub-process in which the hash was calculated:


```json
{
  "name": "Hello",
  "count": 1,
  "favoriate number": 86,
  "process": 29049
}
```

To stop the background mongo deamon process, use

```
docker container stop my-mongod
```
