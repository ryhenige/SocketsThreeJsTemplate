import io from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:4001";
const options = {
    withCredentials: true,
    transports: ['websocket'],
    upgrade: false
}
export const socket = io(ENDPOINT, options);

export const Listener = (handleSocket) => {

    socket.on('connected', (data) => {
        handleSocket('connected', data);
    });

    socket.on('setBoxPos', (data) => {
        handleSocket('setBoxPos', data);
    })

    return (null);
} 
