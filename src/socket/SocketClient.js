import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
class SocketClient {
  constructor(url, jwt) {
    this.url = url;
    this.jwt = jwt;
    this.client = new Client();
    const socket = new SockJS(url + `?token=${jwt}`);

    this.client.configure({
      webSocketFactory: () => socket,
      debug: (str) => {
        console.log(str);
      },
      onConnect: () => {
        console.log("connected!");
      },
      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      },
      onWebSocketError: (error) => {
        console.error("Error with websocket: ", error);
      },
    });

    this.client.activate();
  }

  publish = ({ destination, body }) => {
    this.client.publish({
      destination: destination,
      body: JSON.stringify(body),
    });
  };

  deactivate = () => {
    this.client.deactivate();
  };

  subscribe = (topic, callback, ...forMessageTypes) => {
    return this.client.subscribe(topic, (message) => {
      // if (
      //   !forMessageTypes ||
      //   forMessageTypes.includes(JSON.parse(message.body).messageType)
      // ) {
      //   callback(message);
      // }
      callback(message);
    });
  };

  awaitConnect = async (awaitConnectConfig) => {
    const {
      retries = 10,
      curr = 0,
      timeinterval = 1000,
    } = awaitConnectConfig || {};
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.connected) {
          resolve();
        } else {
          console.log("failed to connect! retrying");
          if (curr >= retries) {
            console.log("failed to connect within the specified time interval");
            reject();
          } else {
            this.awaitConnect({ ...awaitConnectConfig, curr: curr + 1 })
              .then(resolve)
              .catch(reject);
          }
        }
      }, timeinterval);
    });
  };

  get connected() {
    return this.client.connected;
  }

  get jwt() {
    return this.jwt;
  }

  set jwt(value) {}
}

export default SocketClient;
