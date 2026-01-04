import { ServerPage } from "@/request";
import { createLogger } from "@/logger";

const logger = createLogger("Ping");

export default {
  async main(data, request, res) {
    logger.info("Received a Ping", { data, request, res });
    return {
      data: data,
      message: "pong",
    };
  },
  methods: "get",
  path: "/ping",
  params: {
    // token: "string!",
  },
} as ServerPage;
