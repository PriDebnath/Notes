import { Request, Response, NextFunction } from "express";
import { User, userModel } from "../user/model";
import { errorHandler } from "../../utils/error-handler";
import mongoose from "mongoose";
import { logger } from "../../utils/config/logger.config";

export const practiceTransaction = async (
    req: Request, res: Response
) => {
  req.log.info('Stuff')
//   logger.info('logger.info')
    console.log("  transaction call start");
    const _id = "69f1dfcb8dca2a9b04c36406"
    try {
        await mongoose.connection.transaction(async (session) => {
            console.log("  transaction start");
            let up = await userModel.findByIdAndUpdate(_id, {
                name: "up2"
            },
            { returnDocument: 'after' }
            ).session(session)

            //console.log({ up });


            let upp = await userModel.findByIdAndUpdate(_id+"yo", {
                name: "upp2"
            },
                { returnDocument: 'after' }
            ).session(session)

            //console.log({ upp });

            res.status(200).json(upp)
            console.log("  transaction complete");
        })
    } catch (error: any) {
        console.log("  transaction failed");
        errorHandler({ error, response: res })
    }

}
