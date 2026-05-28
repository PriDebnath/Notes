import pino from "pino-http"

export const logger = pino({
 autoLogging: false,
  transport: {
    target: "pino-pretty", 
    options: {
      colorize: true,
      translateTime: "HH:MM:ss",
      ignore: "req,res,pid,hostname", 
      messageFormat: "`{req.method}`->`{req.url}` -> {msg}",
    },
  },
});


//// Alternative
// import pino from "pino-http"
// import pinoPretty from "pino-pretty"

// export const logger = pino({
//  autoLogging: false,
// }, pinoPretty({
//         ignore: "req,res,pid,hostname", 
//       messageFormat: "`{req.method}`->`{req.url}` -> {msg}",
// }));