import { fal } from "@fal-ai/client";
import open from "open";
import fs from "fs/promises";
import download from "image-downloader";

// Image function
async function image({ model_name, input_file_name }) {
	const input = JSON.parse(await fs.readFile(input_file_name, "utf-8"));
	const config = JSON.parse(await fs.readFile("config.json", "utf-8"));
	fal.config({
		credentials: config.FAL_API_KEY,
	});

	// Subscribe to the FAL AI service
	const result = await fal.subscribe(model_name, {
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
}

// Video function
async function video() {
	const input = JSON.parse(await fs.readFile("input_video-kling.json", "utf-8"));
	const config = JSON.parse(await fs.readFile("config.json", "utf-8"));
	fal.config({
		credentials: config.FAL_API_KEY,
	});

	// Subscribe to the FAL AI service
	const result = await fal.subscribe("fal-ai/kling-video/v1.5/pro/image-to-video", {
		input,
		logs: true,
		onQueueUpdate: (update) => {
			if (update.status === "IN_PROGRESS") {
				//update.logs.map((log) => log.message).forEach(console.log);
			}
		},
	});

	// Check if the result has a video
	if (result.data.video && result.data.video.url) {
		const url = result.data.video.url;
		console.log(url);

		// Open the video in the browser
		if (config.OPEN_BROWSER) {
			await open(url);
		}

		// Download the video and save the URL to a text file
		if (config.DOWNLOAD) {
			const outputPath = config.OUTPUT_PATH || "./";
			const name = Date.now();
			download
				.image({
					url,
					dest: `../../${outputPath + name}.mp4`,
				})
				.then(({ filename }) => {
					fs.writeFile(
						`${outputPath + name}.txt`,
						JSON.stringify(result.data, null, "\t")
					);
					console.log("Video saved!");
				})
				.catch((err) => console.error(err));
		}
	} else {
		console.log("No video found");
		console.log(result.data);
		console.log(result.requestId);
	}
}

//  Main function, check the arguments and call the corresponding function
const args = process.argv[2];
if (args === "image-flux")
	image({ model_name: "fal-ai/flux-lora", input_file_name: "input_image-flux.json" });
else if (args === "image-sd")
	image({ model_name: "fal-ai/lora", input_file_name: "input_image-sd.json" });
else if (args === "image-sdxl")
	image({ model_name: "fal-ai/lora", input_file_name: "input_image-sdxl.json" });
else if (args === "image-huggingface")
	image({ model_name: "fal-ai/lora", input_file_name: "input_image-huggingface.json" });
else if (args === "video-kling") video();
else {
	console.error("Invalid arguments, read the fucking README.md file.");
	process.exit(1);
}
