
let url=`http://localhost:4201`
const PROXY_CONFIG = [
{
    context:"/offerlist",
        target: `${url}/planofferlist`,
        secure: false,
        logLevel: "debug",
        changeOrigin: true ,
        pathRewrite: {
            "^/offerlist": ""
          } 
    }
    ];

module.exports = PROXY_CONFIG;