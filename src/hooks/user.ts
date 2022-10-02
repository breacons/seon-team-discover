import {User} from '@/interfaces/user';
import {useState} from 'react';

export const useProfile = (): User => {
  const [user, setUser] = useState<User>({ email: '' });


  return user;
};
