import { fal } from "@fal-ai/client";
import open from "open";
import fs from "fs/promises";
import download from "image-downloader";

(async () => {
	const input = JSON.parse(await fs.readFile("video_input.json", "utf-8"));
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
})();
