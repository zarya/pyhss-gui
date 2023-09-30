import { UserManager, UserManagerSettings } from 'oidc-client-ts';
import { sleep } from './helpers';

export const authLogin = (password: string) => {
  return new Promise(async (res, rej) => {
    await sleep(500);
    if (password === 'admin') {
      localStorage.setItem(
        'authentication',
        JSON.stringify({ profile: { email: 'admin@example.com' } })
      );
      return res({ profile: { email: 'admin@example.com' } });
    }
    return rej({ message: 'Credentials are wrong!' });
  });
};

export const getAuthStatus = () => {
  return new Promise(async (res, rej) => {
    await sleep(500);
    try {
      let authentication = localStorage.getItem('authentication');
      if (authentication) {
        authentication = JSON.parse(authentication);
        return res(authentication);
      }
      return res(undefined);
    } catch (error) {
      return res(undefined);
    }
  });
};
