import { Queue, Worker, Processor, type ConnectionOptions } from "bullmq";
import { QUEUES} from "./index"

type QUEUES_NAME = keyof typeof QUEUES

export class QueueManager {
    private readonly queues = new Map<QUEUES_NAME, Queue>();

    register(name: QUEUES_NAME, connection: ConnectionOptions) {
        const queue = new Queue(
            name,
            { connection }
        );

        new Worker(
            name,
            async (job) => {
                console.log("Processing:", job.data);
            },
            { connection }
        );

        this.queues.set(name, queue);
    }

    get(name: QUEUES_NAME) {
        return this.queues.get(name);
    }

    getAll() {
        return [...this.queues.values()];
    }
}

