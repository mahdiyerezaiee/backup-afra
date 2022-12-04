export const addUser=(user)=>{

    return async dispatch=>{
    
    await dispatch ({type:'SET_USER',payload: user});
    
    };
    
    };
    export const addUserInfo=(userInfo)=>{

        return async dispatch=>{
        
        await dispatch ({type:'SET_USERINFO',payload: userInfo});
        
        };
        
        };
    
        export const clearUserInfo=()=>{
    
            return async dispatch=>{
        
                await dispatch({type:'CLEAR_USERINFO'});
            };
        };
    export const clearUser=()=>{
    
        return async dispatch=>{
    
            await dispatch({type:'CLEAR_USER',payload: {}});
        };
    };
    export const setOTPCode=(code)=>{

        return async dispatch=>{
    
            await dispatch({type:'SET_OTP',payload: code});
        };

    }
    export const addUserRoles=(userInfo)=>{

        return async dispatch=>{
        
        await dispatch ({type:'SET_USERROLES',payload: userInfo});
        
        };
        
        };
    
        export const clearUserRoles=()=>{
    
            return async dispatch=>{
        
                await dispatch({type:'CLEAR_USERROLES',payload: []});
            };
        };