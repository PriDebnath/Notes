import { Router } from "express";
import { syncNote, getAllNote,deleteNote, updateNoteController ,getNoteController} from "./controller";
import { validatedJwtToken } from "../../middleware/jwt.middleware";


const router = Router()
 
router.post("/sync", validatedJwtToken, syncNote)
router.get("/", validatedJwtToken, getAllNote)
router.get("/:_id", validatedJwtToken, getNoteController)
router.patch("/:_id", validatedJwtToken, updateNoteController)
router.delete("/:_id", validatedJwtToken, deleteNote)

export   {router}