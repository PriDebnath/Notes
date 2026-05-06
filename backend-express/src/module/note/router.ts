import { Router } from "express";
import { syncNote, getAllNote,deleteNote, updateNoteHandler } from "./controller";
import { validatedJwtToken } from "../../middleware/jwt.middleware";


const router = Router()
 
router.post("/sync", validatedJwtToken, syncNote)
router.get("/", validatedJwtToken, getAllNote)
router.patch("/:_id", validatedJwtToken, updateNoteHandler)
router.delete("/:_id", validatedJwtToken, deleteNote)

export   {router}