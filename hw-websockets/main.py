import server
import sys

def bootapp():
    server.init_service()
    print(sys.version)

if __name__ == "__main__":
      bootapp()
