import { fal } from "@fal-ai/client";
import open from "open";
import fs from "fs/promises";
import download from "image-downloader";

(async () => {
	const input = JSON.parse(await fs.readFile("image_input.json", "utf-8"));
	const config = JSON.parse(await fs.readFile("config.json", "utf-8"));
	fal.config({
		credentials: config.FAL_API_KEY,
	});

	// Subscribe to the FAL AI service
	const result = await fal.subscribe("fal-ai/flux-lora", {
		input,
		logs: true,
		onQueueUpdate: (update) => {
			if (update.status === "IN_PROGRESS") {
				//update.logs.map((log) => log.message).forEach(console.log);
			}
		},
	});

	// Open every images in the browser and/or download them to the output path
	if (result.data.images && result.data.images.length > 0) {
		for (const image of result.data.images) {
			console.log(image.url);

			// Open the image in the browser
			if (config.OPEN_BROWSER) {
				await open(image.url);
			}

			// Download the image and save the URL to a text file
			if (config.DOWNLOAD) {
				const outputPath = config.OUTPUT_PATH || "./";
				const name = Date.now();
				download
					.image({
						url: image.url,
						dest: `../../${outputPath + name}.png`,
					})
					.then(({ filename }) => {
						fs.writeFile(
							`${outputPath + name}.txt`,
							JSON.stringify(result.data, null, "\t")
						);
						console.log("Image saved!");
					})
					.catch((err) => console.error(err));
			}
		}
	} else {
		console.log("No image found");
		console.log(result.data);
		console.log(result.requestId);
	}
})();
