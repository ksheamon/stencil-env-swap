/*
Upon generating Stencil CLI credentials, the BigCommerce panel will output the following information. 
You will need to make note of the Access Token and Store Hash for this file.
    ACCESS TOKEN
    CLIENT NAME
    CLIENT ID
    CLIENT SECRET
    NAME
    API PATH: https://api.bigcommerce.com/stores/{{STORE HASH}}/v3/
*/

const hash = "{{STORE HASH}}";
const token = "{{ACCESS TOKEN}}";
const port = 3304;

export default {
    normalStoreUrl: `https://store-${hash}.mybigcommerce.com/`,
    accessToken: token,
    host: "https://api.bigcommerce.com",
    port: port
};