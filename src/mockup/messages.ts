import { PROFILE_LIST } from './profiles';
import { Message } from './../model/message.interface';

const messageList: Message[] = [];

PROFILE_LIST.forEach((user) => {   
    messageList.push( {    
        user: user, date: new Date(), lastMessage: 'Hello' } 
    )
});
export const MESSAGE_LIST = messageList;