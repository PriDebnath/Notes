import { Router } from "express";
import { syncNote, getAllNote,deleteNote } from "./controller";
import { validatedJwtToken } from "../../middleware/jwt.middleware";


const router = Router()
 
router.post("/sync", validatedJwtToken, syncNote)
router.get("/", validatedJwtToken, getAllNote)
router.delete("/:_id", validatedJwtToken, deleteNote)

export   {router}