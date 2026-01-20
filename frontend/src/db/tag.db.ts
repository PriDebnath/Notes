import { db } from "@/db/db"


export const getOrAddTag = async (name: string) => {
    if (!name) throw new Error("Tag name is requied")
    const normalized = name.toLowerCase().trim()
    try {
        let id = await db.tags.add({ name: normalized })
        return { id, name: normalized }
    } catch (eww) {
        let existing = await db.tags
            .where("name")
            .equals(normalized)
            .first()

        if (existing) return existing;
        throw eww // 🤢
    }
}