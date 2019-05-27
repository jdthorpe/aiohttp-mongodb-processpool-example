"""
A minimal examle of a worker which (1) recieves work requests via http
(aiohttp) executes database fetch / upate asynchronously in the main process,
and does work in a pool of sub-process.
"""
# pylint: disable=invalid-name
import os
import json
import functools
import asyncio
from concurrent.futures import ProcessPoolExecutor
from aiohttp import web
from pymongo import ReturnDocument
from motor.motor_asyncio import AsyncIOMotorClient


def main():
    """
    start the server
    """
    mongo_client = AsyncIOMotorClient()
    coll = mongo_client.customers.counts

    loop = asyncio.get_event_loop()
    executor = ProcessPoolExecutor()

    async def handle_get(request):
        """
        handle get request
        """
        name = request.match_info.get("name", "Anonymous")
        return await do_work(name)

    async def handle_post(request):
        """
        handle post request
        """
        data = await request.json()
        return await do_work(data.get("name", "Anonymous"))

    async def do_work(name):
        """
        worker
        """
        count_data = await coll.find_one_and_update(
            {"name": name},
            {"$setOnInsert": {"name": name}, "$inc": {"count": 1}},
            upsert=True,
            return_document=ReturnDocument.AFTER,
        )

        completed_work = await loop.run_in_executor(executor, getFavNum, name)
        return web.Response(
            text=json.dumps(
                {
                    "name": name,
                    "count": count_data["count"],
                    "favoriate number": completed_work["value"],
                    "process": completed_work["process"],
                }
            )
        )

    app = web.Application()
    app.add_routes([web.get("/{name}", handle_get), web.post("/", handle_post)])
    web.run_app(app, port=19191)


def getFavNum(x):
    """
    get the modulus of a string
    """
    value = functools.reduce(lambda x, y: (x * y) % 199, bytes(x, "utf-8")) % 98 + 1
    return {"value": value, "process": os.getpid()}


if __name__ == "__main__":
    main()
