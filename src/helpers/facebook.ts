import { NATI_BACKEND_PATH } from '../helpers/constants';
import * as getEnv from 'getenv';

const FACEBOOK_APP_ID = getEnv('FACEBOOK_APP_ID');
const FACEBOOK_APP_SECRET = getEnv('FACEBOOK_APP_SECRET');

export const facebookParams = () => {
  return {
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    // callbackURL: `${NATI_BACKEND_PATH}/auth/facebook/redirect`,
    scope: 'public_profile,email',
    profileFields: ['id', 'email', 'first_name', 'last_name'],
    // passReqToCallback: true, // Sends request to validate function
    // // state: true, // Sends socket Id param in request.params.state
    // session: false, // Forbids to use express session
    // display: 'popup',
  };
};
