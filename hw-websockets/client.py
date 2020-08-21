import asyncio
import websockets

async def hello(uri):
    async with websockets.connect(uri) as websocket:
        for x in range(1000):
            await websocket.send("Hello world!" + str(x))
            resp = await websocket.recv()
            print( resp )
        await websocket.send("quit")

asyncio.get_event_loop().run_until_complete(
    hello('ws://echo-service-dot-db-t01-apps.ew.r.appspot.com:80'))
