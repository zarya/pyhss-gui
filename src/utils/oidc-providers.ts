import { sleep } from './helpers';
import {AuthApi} from '../services/pyhss';

export const authLogin = (password: string, api: string) => {
  return new Promise(async (res, rej) => {
    localStorage.setItem('token',password);
    AuthApi.login().then((data) => {
      if (data.data.result === "OK") {
          localStorage.setItem(
              'authentication',
              JSON.stringify({ profile: { email: 'admin@example.com' } })
          );
          localStorage.setItem('api',api);
          return res({ profile: { email: 'admin@example.com' } });
      } else {
        return rej({ message: 'Credentials are wrong!' });
      }
    })
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
