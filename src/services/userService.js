import http from "./httpService";

import configure from "./config.json";

export const registerUser = user => {
    return http.post(
        `${configure.ForoshApi}/Account/register`,
        JSON.stringify(user)
    );
};


export const loginUser = user => {
    return http.post(`${configure.ForoshApi}/User/Login`, JSON.stringify(user));
    
};
export const verifyUser = user => {
    return http.post(`${configure.ForoshApi}/User/Verify`, JSON.stringify(user));
    
};
export const RefreshToken = refresh => {
    return http.post(`${configure.ForoshApi}/User/Refresh`, JSON.stringify(refresh));
    
};

export const GetUserInfo=()=>{

    return http.get(`${configure.ForoshApi}/AuthenticatedUser/GetUserInfo`);
}
export const GetUserData=(id)=>{

    return http.get(`${configure.ForoshApi}/AuthenticatedUser/GetUserInfo?userId=${id}`);
}
export const GetUsersRoles=(userId)=>{

    return http.get(`${configure.ForoshApi}/AuthenticatedUser/GetUserRoles?UserId=${userId}`);
}

export const GetAllUsers=()=>{

    return http.get(`${configure.ForoshApi}/AuthenticatedUser/GetUsers`);
}
export const SetUserRole=(userRole)=>{
    return http.post(`${configure.ForoshApi}/AuthenticatedUser/SetUserRoles`,JSON.stringify(userRole));
}
export const CreateUser=(userData)=>{
    return http.post(`${configure.ForoshApi}/AuthenticatedUser/CreateUser`,JSON.stringify(userData));
}


export const GetDataWithSearch=(url)=>{

    return http.get(`${configure.ForoshApi}/AuthenticatedUser/GetUsers`,url);
}
export const GetForKarbars=(url)=>{

    return http.get(`${configure.ForoshApi}/AuthenticatedUser/GetUsers`,url);
}


