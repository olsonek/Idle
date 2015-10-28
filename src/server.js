/**
 * Created by Eddie on 10/28/2015.
 */
import Server from 'socket.io';

export default function startServer() {
    const io = new Server().attach(8090);
}