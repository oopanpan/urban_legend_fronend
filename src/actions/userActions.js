import * as KEYS from './stringKeys';

export const setAuth = auth => {
    return {
        type: KEYS.SET_USER_AUTH,
        payload: auth.user
    }
};

export const delAuth = () => {
    return {
        type: KEYS.DEL_USER_AUTH
    }
}