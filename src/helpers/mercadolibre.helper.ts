import * as getEnv from 'getenv';
import * as meli from 'mercadolibre';
import { UserTokenInfo } from '../interfaces/request.interface';

const MERCADOLIBRE_APP_ID = getEnv('MERCADOLIBRE_APP_ID');
const MERCADOLIBRE_CLIENT_SECRET = getEnv('MERCADOLIBRE_CLIENT_SECRET');
const API_URL = getEnv('API_URL');

export const mercadoLibreParams = () => {
  return {
    clientID: MERCADOLIBRE_APP_ID,
    clientSecret: MERCADOLIBRE_CLIENT_SECRET,
    callbackURL: `${API_URL}/auth/mercadolibre/redirecturi`,
  };
};

export interface Profile {
  id: number;
  nickname: string;
  first_name: string;
  last_name: string;
  email: string;
}

export const postMercadoLibre = <MercadoLibreType>(userTokenInfo: UserTokenInfo, path, body, params = null) => {
  const meliInstance = new meli.Meli(
    MERCADOLIBRE_APP_ID,
    MERCADOLIBRE_CLIENT_SECRET,
    userTokenInfo.oauthAccessToken,
    userTokenInfo.oauthRefreshToken,
  );

  return new Promise<MercadoLibreType>((resolve, reject) => {
    meliInstance.post(path, body, params, (err, res) => {
      if (err) reject(err);
      const { error } = res;
      if (error) reject(res);
      resolve(res);
    });
  });
};

export const putMercadoLibre = <MercadoLibreType>(userTokenInfo: UserTokenInfo, path, body, params = null) => {
  const meliInstance = new meli.Meli(
    MERCADOLIBRE_APP_ID,
    MERCADOLIBRE_CLIENT_SECRET,
    userTokenInfo.oauthAccessToken,
    userTokenInfo.oauthRefreshToken,
  );

  return new Promise<MercadoLibreType>((resolve, reject) => {
    meliInstance.put(path, body, params, (err, res) => {
      if (err) reject(err);
      const { error } = res;
      if (error) reject(res);
      resolve(res);
    });
  });
};

export const getMercadoLibre = (userTokenInfo: UserTokenInfo, path, params = null) => {
  const meliInstance = new meli.Meli(
    MERCADOLIBRE_APP_ID,
    MERCADOLIBRE_CLIENT_SECRET,
    userTokenInfo.oauthAccessToken,
    userTokenInfo.oauthRefreshToken,
  );

  return new Promise((resolve, reject) => {
    meliInstance.get(path, params, (err, res) => {
      if (err) reject(err);
      const { error } = res;
      if (error) reject(res);
      resolve(res);
    });
  });
};
