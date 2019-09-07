import openSocket from 'socket.io-client';
import { Constants } from '../constats';

export default class Api {
    static socket = openSocket(Constants.backEndURL);

    static EmitEvent<T>(name: string, data: T) {
        return Api.socket.emit(name, data)
    }

    static stopSocketListening(events: string[] | string): void {
        if (Array.isArray(events)) {
            events.forEach((e)=>{
                this.socket.off(e);
            })
        } else if (typeof(events) === 'string'){
            this.socket.off(events);
        }
}
}