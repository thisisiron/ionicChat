import { Profile } from './profile.interface';

export interface Message {
    user: Profile;
    date: Date;
    lastMessage: string; 
}
