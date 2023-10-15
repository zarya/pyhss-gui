import { sleep } from './helpers';
import {AuthApi} from '../services/pyhss';

export const authLogin = (password: string, api: string) => {
  return new Promise(async (res, rej) => {
    AuthApi.login(api,password).then((data) => {
      if (data.data.result === "OK") {
          localStorage.setItem(
              'authentication',
              JSON.stringify({ profile: { api: api } })
          );
          localStorage.setItem('api',api);
          localStorage.setItem('token',password);
          return res({ profile: { email: 'admin@example.com', api: api } });
      } else {
        return rej({ message: 'Credentials are wrong!' });
      }
    }).catch(err => {
        return rej({ message: 'Unable to reach api! OR api token is wrong!'})
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
