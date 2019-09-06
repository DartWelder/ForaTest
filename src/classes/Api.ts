import openSocket from 'socket.io-client';
import { Constants} from '../constats';

export default class Api {
    static socket = openSocket(Constants.backEndURL);

    static EmitEvent<T> (name: string, data: T) {
        return Api.socket.emit(name, data)
    }
}