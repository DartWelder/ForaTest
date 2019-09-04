import ChatRoom from './components/chatRoom/ChatRoom'
import Lobby from './components/lobby/Lobby';

export default [
    {
        path: "/chat/:id",
        component: ChatRoom
    },
    {
        path: "/",
        exact: true,
        component: Lobby
    }
];