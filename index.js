import { fal } from "@fal-ai/client";
import open from "open";
import fs from "fs/promises";
import download from "image-downloader";

// Make a request to the fal.ai API
async function request(model_name, input_file_name) {
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

			// Download the image and save the data to a text file
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
							JSON.stringify(result.data, null, "\t") +
								"\n\n" +
								JSON.stringify(input, null, "\t")
						);
						console.log("Image saved!");
					})
					.catch((err) => console.error(err));
			}
		}

		// Open the video in the browser and/or download it to the output path
	} else if (result.data.video && result.data.video.url) {
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
						JSON.stringify(result.data, null, "\t") +
							"\n\n" +
							JSON.stringify(input, null, "\t")
					);
					console.log("Video saved!");
				})
				.catch((err) => console.error(err));
		}

		//Nothing has been found
	} else {
		console.log("No image or video found");
		console.log(result.data);
		console.log(result.requestId);
	}
}

//  Main function, check the arguments and call the corresponding function
const args = process.argv[2];
if (args === "image-flux") request("fal-ai/flux-lora", "input_image-flux.json");
else if (args === "image-sd") request("fal-ai/lora", "input_image-sd.json");
else if (args === "image-sdxl") request("fal-ai/lora", "input_image-sdxl.json");
else if (args === "image-huggingface") request("fal-ai/lora", "input_image-huggingface.json");
else if (args === "video-kling")
	request("fal-ai/kling-video/v1.6/pro/image-to-video", "input_video-kling.json");
else if (args === "video-luma")
	request("fal-ai/luma-dream-machine/image-to-video", "input_video-luma.json");
else if (args === "video-haiper")
	request("fal-ai/haiper-video/v2/image-to-video", "input_video-haiper.json");
else if (args === "video-minimax")
	request("fal-ai/minimax/video-01/image-to-video", "input_video-minimax.json");
else if (args === "video-pixverse")
	request("fal-ai/pixverse/v3.5/image-to-video", "input_video-pixverse.json");
else if (args === "video-hunyuan")
	request("fal-ai/hunyuan-video-img2vid-lora", "input_video-hunyuan.json");
else if (args === "extend-hunyuan")
	request("fal-ai/hunyuan-video-lora/video-to-video", "input_extend-hunyuan.json");
else console.error("Invalid arguments, read the fucking README.md file.");
