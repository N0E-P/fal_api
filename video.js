import { fal } from "@fal-ai/client";
import open from "open";
import fs from "fs/promises";
import download from "image-downloader";

(async () => {
	const config = JSON.parse(await fs.readFile("config.json", "utf-8"));
	const input = JSON.parse(await fs.readFile("video_input.json", "utf-8"));

	fal.config({
		credentials: config.FAL_API_KEY,
	});

	const result = await fal.subscribe("fal-ai/kling-video/v1.5/pro/image-to-video", {
		input,
		logs: true,
		onQueueUpdate: (update) => {
			if (update.status === "IN_PROGRESS") {
				update.logs.map((log) => log.message).forEach(console.log);
			}
		},
	});

	if (result.data.video && result.data.video.url) {
		const url = result.data.video.url;
		const name = Date.now();
		console.log(url);

		// Open the video in the browser and download it
		await open(url);
		download
			.image({
				url: url,
				dest: `../../output/${name}.mp4`,
			})
			.then(({ filename }) => {
				console.log("Saved to output!");
			})
			.catch((err) => console.error(err));

		//Create a Date.now().txt file with the URL
		fs.writeFile(`./output/${name}.txt`, url);
	} else {
		console.log("No video found");
		console.log(result.data);
		console.log(result.requestId);
	}
})();
