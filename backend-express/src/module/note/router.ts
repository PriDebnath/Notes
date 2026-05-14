import { Router } from "express";
import { syncNote, getAllNote, deleteNote, updateNoteController, getNoteController } from "./controller";
import { validatedJwtToken } from "../../middleware/jwt.middleware";
import { validateZodSchema } from "../../middleware/zod.middleware";
import { noteUpdateZodSchema } from "./schema";

const router = Router()

router.post("/sync", validatedJwtToken, syncNote)
router.get("/", validatedJwtToken, getAllNote)
router.get("/:_id", getNoteController)
router.patch(
    "/:_id",
    validatedJwtToken,
    validateZodSchema(noteUpdateZodSchema, 'body'),
    updateNoteController
)
router.delete("/:_id", validatedJwtToken, deleteNote)

export { router }