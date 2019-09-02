import openSocket from 'socket.io-client'

export default class Api {
    static socket = openSocket('http://localhost:3001');

    static EmitEvent<T> (name: string, data: T) {
        return Api.socket.emit(name, data)
    }
}