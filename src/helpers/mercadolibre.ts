import * as getEnv from 'getenv';

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
