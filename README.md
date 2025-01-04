# Run FLUX, Stable Diffusion and Kling APIs from Fal.ai using Node.js

## 1. Download the packages

```bash
npm install
```

## 2. Rename config.example.json to config.json and fill in the API key value

More details can be found below.

## 3. Fill in the input files for the models you want to run

More details can be found below.

## 4. Run the code

```bash
npm run start -- image-flux
```

OR

```bash
npm run start -- image-sd
```

OR

```bash
npm run start -- video-kling
```

---

---

---

---

---

---

---

---

---

---

# Config Variables

## FAL_API_KEY

(string)

Your API key for the Fal API.

## DOWNLOAD

(boolean)

If set to true, the generated image or video will be downloaded to the OUTPUT_PATH. Default value: true

## OUTPUT_PATH

(string)

The path where the generated image or video will be saved.

## OPEN_BROWSER

(boolean)

If set to true, the generated image or video will be opened in the default browser. Default value: true

## Example

```json
{
	"FAL_API_KEY": "682258328623826858",
	"OUTPUT_PATH": "../output/",
	"DOWNLOAD": true,
	"OPEN_BROWSER": false
}
```

---

---

---

---

---

---

---

---

---

---

# FLUX Image Input Variables

[Source](https://fal.ai/models/fal-ai/flux-lora/api)

## prompt

(string)

The prompt to generate an image from.

## image_size

(ImageSize | Enum)

The size of the generated image. Default value: landscape_4_3

Possible enum values: square_hd, square, portrait_4_3, portrait_16_9, landscape_4_3, landscape_16_9

Note: For custom image sizes, you can pass the width and height as an object:

```json
{
	"width": 1280,
	"height": 720
}
```

## num_inference_steps

(integer)

The number of inference steps to perform. Default value: 28

## seed

(integer)

The same seed and the same prompt given to the same version of the model will output the same image every time.

## loras

(list<LoraWeight>)

The LoRAs to use for the image generation. You can use any number of LoRAs and they will be merged together to generate the final image. Default value: ``

## guidance_scale

(float)

The CFG (Classifier Free Guidance) scale is a measure of how close you want the model to stick to your prompt when looking for a related image to show you. Default value: 3.5

## sync_mode

(boolean)

If set to true, the function will wait for the image to be generated and uploaded before returning the response. This will increase the latency of the function but it allows you to get the image directly in the response without going through the CDN.

## num_images

(integer)

The number of images to generate. Default value: 1

## enable_safety_checker

(boolean)

If set to true, the safety checker will be enabled. Default value: true

## output_format

(OutputFormatEnum)

The format of the generated image. Default value: "jpeg"

Possible enum values: jpeg, png

## Example

```json
{
	"prompt": "Extreme close-up of a single tiger eye, direct frontal view. Detailed iris and pupil. Sharp focus on eye texture and color. Natural lighting to capture authentic eye shine and depth. The word \"FLUX\" is painted over it in big, white brush strokes with visible texture.",
	"image_size": "landscape_4_3",
	"num_inference_steps": 28,
	"guidance_scale": 3.5,
	"num_images": 1,
	"enable_safety_checker": true,
	"output_format": "jpeg",
	"seed": "your seed"
}
```

```json
{
	"prompt": "",
	"loras": [
		{
			"name": "",
			"path": "",
			"scale": 1
		}
	],
	"notUsedLora": [],
	"image_size": "portrait_16_9",
	"num_inference_steps": 28,
	"guidance_scale": 3.5,
	"num_images": 1,
	"enable_safety_checker": false,
	"output_format": "png"
}
```

---

---

---

---

---

---

---

---

---

---

# Stable diffusion Image Input Variables

[Source](https://fal.ai/models/fal-ai/lora/api#schema-input)

## model_name

(string)

URL or HuggingFace ID of the base model to generate the image.

## unet_name

(string)

URL or HuggingFace ID of the custom U-Net model to use for the image generation.

## variant

(string)

The variant of the model to use for huggingface models, e.g. 'fp16'.

## prompt

(string)

The prompt to use for generating the image. Be as descriptive as possible for best results.

## negative_prompt

(string)

The negative prompt to use.Use it to address details that you don't want in the image. This could be colors, objects, scenery and even the small details (e.g. moustache, blurry, low resolution). Default value: ""

## prompt_weighting

(boolean)

If set to true, the prompt weighting syntax will be used. Additionally, this will lift the 77 token limit by averaging embeddings.

## loras

(list<LoraWeight>)

The LoRAs to use for the image generation. You can use any number of LoRAs and they will be merged together to generate the final image. Default value: ``

## embeddings

(list<Embedding>)

The embeddings to use for the image generation. Only a single embedding is supported at the moment. The embeddings will be used to map the tokens in the prompt to the embedding weights. Default value: ``

## controlnets

(list<ControlNet>)

The control nets to use for the image generation. You can use any number of control nets and they will be applied to the image at the specified timesteps. Default value: ``

## controlnet_guess_mode (boolean)

If set to true, the controlnet will be applied to only the conditional predictions.

## ip_adapter

(list<IPAdapter>)

The IP adapter to use for the image generation. Default value: ``

## image_encoder_path

(string)

The path to the image encoder model to use for the image generation.

## image_encoder_subfolder

(string)

The subfolder of the image encoder model to use for the image generation.

## image_encoder_weight_name

(string)

The weight name of the image encoder model to use for the image generation. Default value: "pytorch_model.bin"

## ic_light_model_url

(string)

The URL of the IC Light model to use for the image generation.

## ic_light_model_background_image_url

(string)

The URL of the IC Light model background image to use for the image generation. Make sure to use a background compatible with the model.

## ic_light_image_url

(string)

The URL of the IC Light model image to use for the image generation.

## seed

(integer)

The same seed and the same prompt given to the same version of Stable Diffusion will output the same image every time.

## image_size

(ImageSize | Enum)

The size of the generated image. You can choose between some presets or custom height and width that must be multiples of 8. Default value: square_hd

Possible enum values: square_hd, square, portrait_4_3, portrait_16_9, landscape_4_3, landscape_16_9

Note: For custom image sizes, you can pass the width and height as an object:

```json
{
	"image_size": {
		"width": 1280,
		"height": 720
	}
}
```

## num_inference_steps

(integer)

Increasing the amount of steps tells Stable Diffusion that it should take more steps to generate your final result which can increase the amount of detail in your image. Default value: 30

## guidance_scale

(float)

The CFG (Classifier Free Guidance) scale is a measure of how close you want the model to stick to your prompt when looking for a related image to show you. Default value: 7.5

## clip_skip

(integer)

Skips part of the image generation process, leading to slightly different results. This means the image renders faster, too.

## scheduler

(SchedulerEnum)

Scheduler / sampler to use for the image denoising process.

Possible enum values: DPM++ 2M, DPM++ 2M Karras, DPM++ 2M SDE, DPM++ 2M SDE Karras, Euler, Euler A, Euler (trailing timesteps), LCM, LCM (trailing timesteps), DDIM, TCD

## timesteps

(TimestepsInput)

Optionally override the timesteps to use for the denoising process. Only works with schedulers which support the timesteps argument in their set_timesteps method. Defaults to not overriding, in which case the scheduler automatically sets the timesteps based on the num_inference_steps parameter. If set to a custom timestep schedule, the num_inference_steps parameter will be ignored. Cannot be set if sigmas is set. Default value: [object Object]

## sigmas

(SigmasInput)

Optionally override the sigmas to use for the denoising process. Only works with schedulers which support the sigmas argument in their set_sigmas method. Defaults to not overriding, in which case the scheduler automatically sets the sigmas based on the num_inference_steps parameter. If set to a custom sigma schedule, the num_inference_steps parameter will be ignored. Cannot be set if timesteps is set. Default value: [object Object]

## image_format

(ImageFormatEnum)

The format of the generated image. Default value: "png"

Possible enum values: jpeg, png

## num_images

(integer)

Number of images to generate in one request. Note that the higher the batch size, the longer it will take to generate the images. Default value: 1

## enable_safety_checker

(boolean)

If set to true, the safety checker will be enabled.

## tile_width

(integer)

The size of the tiles to be used for the image generation. Default value: 4096

## tile_height

(integer)

The size of the tiles to be used for the image generation. Default value: 4096

## tile_stride_width

(integer)

The stride of the tiles to be used for the image generation. Default value: 2048

## tile_stride_height

(integer)

The stride of the tiles to be used for the image generation. Default value: 2048

## eta

(float)

The eta value to be used for the image generation.

## debug_latents

(boolean)

If set to true, the latents will be saved for debugging.

## debug_per_pass_latents

(boolean)

If set to true, the latents will be saved for debugging per pass.

## Example

```json
{
	"model_name": "stabilityai/stable-diffusion-xl-base-1.0",
	"prompt": "Photo of a european medieval 40 year old queen, silver hair, highly detailed face, detailed eyes, head shot, intricate crown, age spots, wrinkles",
	"negative_prompt": "cartoon, painting, illustration, worst quality, low quality, normal quality",
	"prompt_weighting": true,
	"loras": [],
	"embeddings": [],
	"controlnets": [],
	"ip_adapter": [],
	"image_encoder_weight_name": "pytorch_model.bin",
	"image_size": "square_hd",
	"num_inference_steps": 30,
	"guidance_scale": 7.5,
	"timesteps": {
		"method": "default",
		"array": []
	},
	"sigmas": {
		"method": "default",
		"array": []
	},
	"image_format": "jpeg",
	"num_images": 1,
	"tile_width": 4096,
	"tile_height": 4096,
	"tile_stride_width": 2048,
	"tile_stride_height": 2048
}
```

---

---

---

---

---

---

---

---

---

---

# Video input variables

[Source](https://fal.ai/models/fal-ai/kling-video/v1/standard/image-to-video/api?platform=js)

## prompt

(string)

## image_url

(string)

## duration

(DurationEnum)
The duration of the generated video in seconds Default value: "5"

Possible enum values: 5, 10

## aspect_ratio

(AspectRatioEnum)
The aspect ratio of the generated video frame Default value: "16:9"

Possible enum values: 16:9, 9:16, 1:1

## Example

```json
{
	"prompt": "A stylish woman walks down a Tokyo street filled with warm glowing neon and animated city signage. She wears a black leather jacket, a long red dress, and black boots, and carries a black purse.",
	"image_url": "https://fal.media/files/panda/TuXlMwArpQcdYNCLAEM8K.webp",
	"duration": "5",
	"aspect_ratio": "16:9"
}
```

```json
{
	"prompt": "",
	"image_url": "",
	"duration": "10",
	"aspect_ratio": "9:16"
}
```
