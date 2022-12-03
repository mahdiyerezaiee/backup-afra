export const userReducer = (state = {}, action) => {

    switch (action.type) {

        case 'SET_USER':
            return { ...action.payload };
        case 'CLEAR_USER':
            return {...action.payload};

        default:
            return state;
    }
}


export const codeReducer = (state = 0, action) => {

    switch (action.type) {

        case 'SET_OTP':
            return action;


        default:
            return state;

    }
}

export const userInfoReducer = (state = {}, action) => {

    switch (action.type) {

        case 'SET_USERINFO':
            return { ...action.payload };
        case 'CLEAR_USERINFO':
            return {};

        default:
            return state;
    }
}
export const userRoles = (state = [], action) => {

    switch (action.type) {

        case 'SET_USERROLES':
            return [ ...action.payload] ;
        case 'CLEAR_USERROLES':
            return [ ...action.payload];

        default:
            return state;
    }
}