import uuid from 'uuid';

export default class User {
    constructor (user: IUser) {
        this.name = user.name;
        this.userId = user.userId;
        this.isCurrentUser = user.isCurrentUser;
    }

    public name: string;
    public userId: string;
    public isCurrentUser: boolean;

    static GetEmptyObject() :IUser {
        return {
            name: '',
            userId: uuid(),
            isCurrentUser: false
        };
    }
}

export interface IUser {
    name: string;
    userId: string;
    isCurrentUser: boolean;
    allowCamera?: boolean;
}