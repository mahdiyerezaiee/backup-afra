import http from "./httpService";

import config from "./config.json";

export const getExtraData=(id,source)=>{
    return http.get(`${config.ForoshApi}/ExtraData/GetExtraDatas?Id=${id}&DataSourceId=${source}`);
}