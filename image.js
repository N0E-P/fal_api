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

	// Check if the result has an image
	if (result.data.images && result.data.images.length > 0) {
		const url = result.data.images[0].url;
		console.log(url);

		// Open the image in the browser
		if (config.OPEN_BROWSER) {
			await open(url);
		}

		// Download the image and save the URL to a text file
		if (config.DOWNLOAD) {
			const outputPath = config.OUTPUT_PATH || "./";
			const name = Date.now();
			download
				.image({
					url: url,
					dest: `../../${outputPath + name}.png`,
				})
				.then(({ filename }) => {
					fs.writeFile(`${outputPath + name}.txt`, url);
					console.log("Image saved!");
				})
				.catch((err) => console.error(err));
		}
	} else {
		console.log("No image found");
		console.log(result.data);
		console.log(result.requestId);
	}
})();
