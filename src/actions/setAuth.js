import * as KEYS from './stringKeys';

export const setAuth = auth => {
    return {
        type: KEYS.USER_AUTH,
        payload: auth.user
    }
};