import { fal } from "@fal-ai/client";
import open from "open";
import fs from "fs/promises";

(async () => {
	const config = JSON.parse(await fs.readFile("config.json", "utf-8"));
	const input = JSON.parse(await fs.readFile("input.json", "utf-8"));

	fal.config({
		credentials: config.credentials,
	});

	const result = await fal.subscribe("fal-ai/flux-lora", {
		input,
		logs: true,
		onQueueUpdate: (update) => {
			if (update.status === "IN_PROGRESS") {
				update.logs.map((log) => log.message).forEach(console.log);
			}
		},
	});
	//console.log(result.data);
	//console.log(result.requestId);

	if (result.data.images && result.data.images.length > 0) {
		const imageUrl = result.data.images[0].url;
		await open(imageUrl);
	}
})();
