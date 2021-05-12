import * as getEnv from 'getenv';

const INSTAGRAM_CLIENT_ID = getEnv('INSTAGRAM_CLIENT_ID');
const INSTAGRAM_CLIENT_SECRET = getEnv('INSTAGRAM_CLIENT_SECRET');

export const instagramParams = () => {
  return {
    clientID: INSTAGRAM_CLIENT_ID,
    clientSecret: INSTAGRAM_CLIENT_SECRET,
  };
};
