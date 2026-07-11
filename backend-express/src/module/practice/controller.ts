import { Request, Response, NextFunction } from "express";
import { User, userModel } from "../user/model";
import { errorHandler } from "../../utils/error-handler";
import mongoose, { model } from "mongoose";
import { clientRedis } from "../../utils/config/redis.config";
import { queueManager } from "../../utils/background-job/index";
// import { queueService } from "../../utils/config/worker.config ";

const emailQueue = queueManager?.get('email')
const notificationQueue = queueManager?.get('notification')

export const practiceWorker = async (
    req: Request, res: Response
) => {
    try {
        if (!emailQueue) {
            return res.status(503).json({
                message: "Queue is down (Redis not connected)",
            });
        }

        await emailQueue.add("test-job", {
            action: "send-email",
        });

        await emailQueue.add("test-job", {
            name: "fail",
        });

        setTimeout(async () => {
            await notificationQueue?.add("sent-after-2-scond", {
                name: "anything",
            });
        }, 2000);

        return res.json({
            success: true,
            message: "Jobs added to queue",
        });
    } catch (error: any) {
        console.log(error);
        errorHandler({ error, response: res })
    }

}


export const practiceTransaction = async (
    req: Request, res: Response
) => {
    req.log.info('something else')
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


            let upp = await userModel.findByIdAndUpdate(_id + "yo", {
                name: "upp2"
            },
                { returnDocument: 'after' }
            ).session(session)

            //console.log({ upp });

            res.status(200).json(upp)
            console.log("  transaction complete");
        })
    } catch (error: any) {
        console.log(error);

        console.log("  transaction failed");
        errorHandler({ error, response: res })
    }

}


export const practiceCache = async (req: Request, res: Response) => {
    const cacheKey = "cache"

    try {
        const cachedData = await clientRedis?.get(cacheKey)
        if (cachedData) {
            res.status(200).json(JSON.parse(cachedData))
            req.log.info("Data served from cache")
            return
        } else {
            const data = await userModel.find()
            res.status(200).json(data)
            await clientRedis?.set(cacheKey, JSON.stringify(data))
            req.log.info("Data served from db")
        }
    } catch (error) {
        errorHandler({ error, response: res })
    }
}