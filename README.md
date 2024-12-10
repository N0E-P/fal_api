# Flux LoRa API - Node.js Example

## 1. Download the packages

```bash
npm install
```

## 2. Rename config.example.json, image_input.example.json and video_input.example.json to config.json, image_input.json and video_input.json respectively

## 3. Fill in the config.json, video_input.json and image_input.json with your own values

## 4. Create a folder named "output" in the root directory

## 5. Run the code

```bash
node image.js
```

OR

```bash
node video.js
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

# Image Input Variables

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
	"output_format": "jpeg"
}
```

## Bonus - You can add a seed in config.json to get the same image every time

```json
{
	"seed": "your seed"
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

{
"prompt": "A stylish woman walks down a Tokyo street filled with warm glowing neon and animated city signage. She wears a black leather jacket, a long red dress, and black boots, and carries a black purse.",
"image_url": "https://fal.media/files/panda/TuXlMwArpQcdYNCLAEM8K.webp",
"duration": "5",
"aspect_ratio": "16:9"
}
