import { connect, Socket } from 'socket.io-client'
import { ServerToClientEvents, ClientToServerEvents } from './types';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = connect("https://panel-party-ws.fly.dev/");

socket.on("clientJoin", ({ id }) => console.info(`Client joined [id=${id}]`));
socket.on("clientLeave", ({ id }) => console.info(`Client leave [id=${id}]`));

const main = async () => {
    while (true) {
        const key: any = await new Promise(resolve => process.stdin.once("data", resolve));
        socket.emit("keyPress", { key: key.toString(), sid: socket.id });
    }
}

main()