import asyncio
import websockets

# I've broken the code down into small steps so that each step can be expained carefully

# get the event loop so that you stop it gracefully
eventLoop = asyncio.get_event_loop()

async def echo(websocket, path):
    async for message in websocket:
        print( message )
        await websocket.send(message)
        # if the client sends a character string "quit" then stop the event loop
        if message == "quit" :
            eventLoop.stop()

def init_service():
    print("waiting for data...")
    wsFuture = websockets.serve(echo, '0.0.0.0', 8080) 
    # schedule echo() to run
    eventLoop.run_until_complete( wsFuture )

    # run all waiting tasks
    eventLoop.run_forever()
    print("run forever terminated")


