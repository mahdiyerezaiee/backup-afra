
import http from "./httpService";

let configure=window.globalThis.site_url;



export const CreateInvoice=(invoiceData)=>{
    return http.post(`${configure}/Invoice/CreateInvoice`,JSON.stringify(invoiceData));
}

export const GetInvoicesWithSearch=(url)=>{

    return http.post(`${configure}/Invoice/GetInvoices`,url);

}