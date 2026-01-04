import { ServerPage } from "@/request";
import { createLogger } from "@/logger";
import { sql } from "..";

const logger = createLogger("Message");

export default {
  async main(data, request, res) {
    logger.info("Received a message", { data });

    const result = await sql.exec("INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)", [data.name, data.email, data.subject, data.message]);

    if (result.affectedRows === 0) {
      logger.error("Failed to insert message", {
        data,
        result: result
      });
      return {
        message: "Failed to insert message",
      };
    }

    logger.info("Message inserted", {
      data,
      result: result
    });

    return {
      message: "Message received",
    };
  },
  methods: "post",
  path: "/message",
  params: {
    name: "string!",
    email: "string!",
    subject: "string!",
    message: "string!",
  },
} as ServerPage;
