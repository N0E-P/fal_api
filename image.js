import { fal } from "@fal-ai/client";
import open from "open";
import fs from "fs/promises";
import download from "image-downloader";

(async () => {
	const config = JSON.parse(await fs.readFile("config.json", "utf-8"));
	const input = JSON.parse(await fs.readFile("image_input.json", "utf-8"));

	fal.config({
		credentials: config.FAL_API_KEY,
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

	if (result.data.images && result.data.images.length > 0) {
		const imageUrl = result.data.images[0].url;
		console.log(imageUrl);

		// Open the image in the browser and download it
		await open(imageUrl);
		download
			.image({
				url: imageUrl,
				dest: "../../output",
			})
			.then(({ filename }) => {
				console.log("Saved to", filename);
			})
			.catch((err) => console.error(err));
	} else {
		console.log("No image found");
		console.log(result.data);
		console.log(result.requestId);
	}
})();
