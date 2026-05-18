import pino from "pino-http"
import pinoPretty from "pino-pretty"

export const logger = pino({
 autoLogging: false,
}, pinoPretty({
        ignore: "req,res,pid,hostname", 
      messageFormat: "`{req.method}`->`{req.url}` -> {msg}",
}));