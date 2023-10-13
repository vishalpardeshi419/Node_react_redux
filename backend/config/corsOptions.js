// whitelisting domain to allow
const allowedOrigins = require('./allowedOrigins');

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }

// const corsOptions = {
//     origin: (origin, callback) => {
//         // Why used (!origin) in if below
//         // This happens when you load your page in the same origin that you are making API calls to. The browser doesn't set the "Origin" header unless the API call's domain is different from the one where the page is being served.
//         if(allowedOrigins.indexOf(origin) !== -1 || !origin) {
//             callback(null, true)
//         }else {
//             callback(new Error('Not Allowed by CORS'));
//         }
//     },
//     optionsSuccessStatus: 200
// }

module.exports = corsOptions;