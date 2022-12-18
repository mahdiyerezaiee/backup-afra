export const addCustomerInfo = (info) => {

    return async dispatch => {

        await dispatch({ type: 'SET_INFO', payload: info });

    };
}