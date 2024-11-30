# Video input variables

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
