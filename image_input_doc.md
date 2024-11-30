# Image input variables

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
