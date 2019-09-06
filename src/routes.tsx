import ChatRoom from './components/chatRoom/ChatRoom';
import Lobby from './components/lobby/Lobby';

export default [    
    {
        path: "/",
        exact: true,
        component: Lobby
    },
    {
        path: "/chat/:id",
        component: ChatRoom
    }
]