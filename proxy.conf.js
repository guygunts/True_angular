
let url=`http://localhost:4201/google`
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
    },
    {
        context:"/getuser*",
            target: `${url}/getuser`,
            secure: false,
            logLevel: "debug",
            changeOrigin: true ,
            pathRewrite: {
                "^/getuser*": ""
              } 
        },
        {
            context:"/userlist",
                target: `${url}/userlist`,
                secure: false,
                logLevel: "debug",
                changeOrigin: true ,
                pathRewrite: {
                    "^/userlist": ""
                  }
        },
        {
            context:"/userinsert",
                target: `${url}/userinsert`,
                secure: false,
                logLevel: "debug",
                changeOrigin: true ,
                pathRewrite: {
                    "^/userinsert": ""
                  }
        },
        {
            context:"/useredit",
                target: `${url}/useredit`,
                secure: false,
                logLevel: "debug",
                changeOrigin: true ,
                pathRewrite: {
                    "^/useredit": ""
                  }
        },
        {
            context:"/userdelete",
                target: `${url}/userdelete`,
                secure: false,
                logLevel: "debug",
                changeOrigin: true ,
                pathRewrite: {
                    "^/userdelete": ""
                  }
        },
        {
            context:"/license",
                target: `${url}/license`,
                secure: false,
                logLevel: "debug",
                changeOrigin: true ,
                pathRewrite: {
                    "^/license": ""
                  }
        },
        {
            context:"/updatestastus",
                target: `${url}/updatestastus`,
                secure: false,
                logLevel: "debug",
                changeOrigin: true ,
                pathRewrite: {
                    "^/updatestastus": ""
                  }
        },
        {
            context:"/updatelicense",
                target: `${url}/updatelicense`,
                secure: false,
                logLevel: "debug",
                changeOrigin: true ,
                pathRewrite: {
                    "^/updatelicense": ""
                  }
        },
        {
            context:"/generatelicense",
                target: `${url}/generatelicense`,
                secure: false,
                logLevel: "debug",
                changeOrigin: true ,
                pathRewrite: {
                    "^/generatelicense": ""
                  }
        },
        {
            context:"/adjustspeed",
                target: `${url}/adjustspeed`,
                secure: false,
                logLevel: "debug",
                changeOrigin: true ,
                pathRewrite: {
                    "^/adjustspeed": ""
                  }
        },
        {
            context:"/uploadadjustspeed",
                target: `${url}/uploadadjustspeed`,
                secure: false,
                logLevel: "debug",
                changeOrigin: true ,
                pathRewrite: {
                    "^/uploadadjustspeed": ""
                  }
        },
        {
            context:"/getmaxrate*",
                target: `${url}/getmaxrate`,
                secure: false,
                logLevel: "debug",
                changeOrigin: true ,
                pathRewrite: {
                    "^/getmaxrate*": ""
                  }
        },
        {
            context:"/maxratelist",
                target: `${url}/maxratelist`,
                secure: false,
                logLevel: "debug",
                changeOrigin: true ,
                pathRewrite: {
                    "^/maxratelist": ""
                  }
        },
        {
            context:"/maxrateedit",
                target: `${url}/maxrateedit`,
                secure: false,
                logLevel: "debug",
                changeOrigin: true ,
                pathRewrite: {
                    "^/maxrateedit": ""
                  }
        },
        {
            context:"/maxratedelete",
                target: `${url}/maxratedelete`,
                secure: false,
                logLevel: "debug",
                changeOrigin: true ,
                pathRewrite: {
                    "^/maxratedelete": ""
                  }
        },
        {
            context:"/Blacklistlist",
                target: `${url}/Blacklistlist`,
                secure: false,
                logLevel: "debug",
                changeOrigin: true ,
                pathRewrite: {
                    "^/Blacklistlist": ""
                  }
        },
        {
            context:"/blacklistadd",
                target: `${url}/blacklistadd`,
                secure: false,
                logLevel: "debug",
                changeOrigin: true ,
                pathRewrite: {
                    "^/blacklistadd": ""
                  }
        },
        {
            context:"/blacklistdelete",
                target: `${url}/blacklistdelete`,
                secure: false,
                logLevel: "debug",
                changeOrigin: true ,
                pathRewrite: {
                    "^/blacklistdelete": ""
                  }
        },
        {
            context:"/blacklist",
                target: `${url}/blacklist`,
                secure: false,
                logLevel: "debug",
                changeOrigin: true ,
                pathRewrite: {
                    "^/blacklist": ""
                  }
        },
        {
            context:"/Blacklistfiledelete",
                target: `${url}/Blacklistfiledelete`,
                secure: false,
                logLevel: "debug",
                changeOrigin: true ,
                pathRewrite: {
                    "^/Blacklistfiledelete": ""
                  }
        },
        {
            context:"/Blacklistfile",
                target: `${url}/Blacklistfile`,
                secure: false,
                logLevel: "debug",
                changeOrigin: true ,
                pathRewrite: {
                    "^/Blacklistfile": ""
                  }
        },
        {
            context:"/Blacklistdownload",
                target: `${url}/Blacklistdownload`,
                secure: false,
                logLevel: "debug",
                changeOrigin: true ,
                pathRewrite: {
                    "^/Blacklistdownload": ""
                  }
        },
        {
            context:"/planofferinsert",
                target: `${url}/planofferinsert`,
                secure: false,
                logLevel: "debug",
                changeOrigin: true ,
                pathRewrite: {
                    "^/planofferinsert": ""
                  }
        },
        {
            context:"/planofferedit",
                target: `${url}/planofferedit`,
                secure: false,
                logLevel: "debug",
                changeOrigin: true ,
                pathRewrite: {
                    "^/planofferedit": ""
                  }
        },
        {
            context:"/planofferdelete",
                target: `${url}/planofferdelete`,
                secure: false,
                logLevel: "debug",
                changeOrigin: true ,
                pathRewrite: {
                    "^/planofferdelete": ""
                  }
        },
        {
            context:"/offerinsertfile",
                target: `${url}/offerinsertfile`,
                secure: false,
                logLevel: "debug",
                changeOrigin: true ,
                pathRewrite: {
                    "^/offerinsertfile": ""
                  }
        },
        {
            context:"/planofferdropdown",
                target: `${url}/planofferdropdown`,
                secure: false,
                logLevel: "debug",
                changeOrigin: true ,
                pathRewrite: {
                    "^/planofferdropdown": ""
                  }
        },
        {
            context:"/errorcodelist",
                target: `${url}/errorcodelist`,
                secure: false,
                logLevel: "debug",
                changeOrigin: true ,
                pathRewrite: {
                    "^/errorcodelist": ""
                  }
        },
        {
            context:"/errorcodeinsert",
                target: `${url}/errorcodeinsert`,
                secure: false,
                logLevel: "debug",
                changeOrigin: true ,
                pathRewrite: {
                    "^/errorcodeinsert": ""
                  }
        },
        {
            context:"/errorcodeedit",
                target: `${url}/errorcodeedit`,
                secure: false,
                logLevel: "debug",
                changeOrigin: true ,
                pathRewrite: {
                    "^/errorcodeedit": ""
                  }
        },
        {
            context:"/errorcodedelete",
                target: `${url}/errorcodedelete`,
                secure: false,
                logLevel: "debug",
                changeOrigin: true ,
                pathRewrite: {
                    "^/errorcodedelete": ""
                  }
        },
        {
            context:"/notifymappinglist",
                target: `${url}/notifymappinglist`,
                secure: false,
                logLevel: "debug",
                changeOrigin: true ,
                pathRewrite: {
                    "^/notifymappinglist": ""
                  }
        },
        {
            context:"/Notifymappinginsert",
                target: `${url}/Notifymappinginsert`,
                secure: false,
                logLevel: "debug",
                changeOrigin: true ,
                pathRewrite: {
                    "^/Notifymappinginsert": ""
                  }
        },
        {
            context:"/notifymappingedit",
                target: `${url}/notifymappingedit`,
                secure: false,
                logLevel: "debug",
                changeOrigin: true ,
                pathRewrite: {
                    "^/notifymappingedit": ""
                  }
        },
        {
            context:"/Notifymappingdelete",
                target: `${url}/Notifymappingdelete`,
                secure: false,
                logLevel: "debug",
                changeOrigin: true ,
                pathRewrite: {
                    "^/Notifymappingdelete": ""
                  }
        },
        {
            context:"/login",
                target: `${url}/login`,
                secure: false,
                logLevel: "debug",
                changeOrigin: true ,
                pathRewrite: {
                    "^/login": ""
                  }
        },
        {
            context:"/auth",
                target: `${url}/auth`,
                secure: false,
                logLevel: "debug",
                changeOrigin: true ,
                pathRewrite: {
                    "^/auth": ""
                  }
        },
        {
            context:"/menu*",
                target: `${url}/menu`,
                secure: false,
                logLevel: "debug",
                changeOrigin: true ,
                pathRewrite: {
                    "^/menu*": ""
                  }
        },
        {
            context:"/servicelist",
                target: `${url}/servicelist`,
                secure: false,
                logLevel: "debug",
                changeOrigin: true ,
                pathRewrite: {
                    "^/servicelist": ""
                  }
        },
        {
            context:"/priceplanlist",
                target: `${url}/priceplanlist`,
                secure: false,
                logLevel: "debug",
                changeOrigin: true ,
                pathRewrite: {
                    "^/priceplanlist": ""
                  }
        },
        {
            context:"/packagelist",
                target: `${url}/packagelist`,
                secure: false,
                logLevel: "debug",
                changeOrigin: true ,
                pathRewrite: {
                    "^/packagelist": ""
                  }
        },
        {
            context:"/priceplanedit",
                target: `${url}/priceplanedit`,
                secure: false,
                logLevel: "debug",
                changeOrigin: true ,
                pathRewrite: {
                    "^/priceplanedit": ""
                  }
        },
        {
            context:"/serviceedit",
                target: `${url}/serviceedit`,
                secure: false,
                logLevel: "debug",
                changeOrigin: true ,
                pathRewrite: {
                    "^/serviceedit": ""
                  }
        },
        {
            context:"/packagedit",
                target: `${url}/packagedit`,
                secure: false,
                logLevel: "debug",
                changeOrigin: true ,
                pathRewrite: {
                    "^/packagedit": ""
                  }
        }
    ];
    
module.exports = PROXY_CONFIG;