import Dexie, { type Table } from "dexie";
import type { Note, NoteTags, Tag } from "@/model/index.model";

/**
 * Doc
 * ---
| IndexedDB                    | Dexie        |
| ---------------------------- | ------------ |
| `keyPath: id, autoIncrement` | `++id`       |
| index                        | `field`      |
| unique index                 | `&field`     |
| compound index               | `&[a+b]`     |
| DB_VERSION                   | `version(n)` |

 */
export class DB extends Dexie {
  notes!: Table<Note, number>;
  tags!: Table<Tag, number>;
  notes_tags!: Table<NoteTags, number>;

  constructor() {
    super("db_by_pri");

    /* version = DB_VERSION */
    // v1 - initial schema
    this.version(1).stores({
      notes: "++id, text, texture, pri_set, created_at, updated_at",
      tags: "++id, &name",
      notes_tags: "++id, noteId, tagId, &[noteId+tagId]",
    });

    // v2 - add `pinned` flag for notes
    this.version(2).stores({
      notes: "++id, text, texture, pri_set, created_at, updated_at, pinned",
      tags: "++id, &name",
      notes_tags: "++id, noteId, tagId, &[noteId+tagId]",
    });

    // v3 - add `synced and deleted` fields for notes
    this.version(3).stores({
      notes: "++id, text, texture, pri_set, created_at, updated_at, pinned, synced, deleted",
      tags: "++id, &name",
      notes_tags: "++id, noteId, tagId, &[noteId+tagId]",
    });
  }
}

export const db = new DB();
