import { Profile } from './../model/profile.interface';

const profileList: Profile[] = [ 
    { firstName: 'Minho', lastName: 'Shin', email: 'shinminho@gmail.com',	
        avatar: 'assets/imgs/avatar.png',key:"" },
    { firstName: 'Bob', lastName: '', email: 'bob@minions.com',		
        avatar: 'assets/imgs/avatar.png',key:"" },
    { firstName: 'Dory', lastName: '', email: 'dory@unforgettable.com',	
        avatar: 'assets/imgs/avatar.png',key:"" }
];
export const PROFILE_LIST = profileList;
