import Dexie, { type Table } from "dexie";
import type { Quote, QuoteTags, Tag } from "@/model/index.model";

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
  quotes!: Table<Quote, number>;
  tags!: Table<Tag, number>;
  quotes_tags!: Table<QuoteTags, number>;

  constructor() {
    super("db_by_pri");

    /* version = DB_VERSION */
    // v1 - initial schema
    this.version(1).stores({
      quotes: "++id, text, texture, pri_set, created_at, updated_at",
      tags: "++id, &name",
      quotes_tags: "++id, quoteId, tagId, &[quoteId+tagId]",
    });

    // v2 - add `pinned` flag for quotes
    this.version(2).stores({
      quotes: "++id, text, texture, pri_set, created_at, updated_at, pinned",
      tags: "++id, &name",
      quotes_tags: "++id, quoteId, tagId, &[quoteId+tagId]",
    });
  }
}

export const db = new DB();
