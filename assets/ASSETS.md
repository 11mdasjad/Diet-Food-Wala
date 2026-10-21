# Asset provenance

All food images are illustrative, not photographs of the business's actual products. The header and footer use the user-supplied Diet Food Wala logo, cleaned with the built-in image generation tool. Line icons remain original SVG code.

## Generated images

Built-in image generation tool used (not CLI/API fallback).

- `images/chicken-hero.jpg`, with source `images/chicken-hero.png`: professional square food photograph of a white ceramic bowl with grilled chicken, avocado, eggs, cherry tomatoes, cucumber, greens and quinoa. Soft daylight, ivory backdrop, 45-degree view, no text or logo. Used for the hero and chicken salad sample.
- Prompt: “Use case: photorealistic-natural. Asset type: premium healthy food website hero. Create a square professional food photograph of one generous white ceramic bowl with beautifully arranged sliced grilled chicken with grill marks, avocado slices, halved boiled eggs, red cherry tomatoes, crisp cucumber slices, curly lettuce and baby spinach, a little quinoa. Entire bowl visible, centered, occupies 90% of the square frame, viewed from slightly above at a 45 degree angle. Warm ivory pale cream seamless background with very soft natural shadows. Delicious fresh natural textures, warm daylight, vivid greens and reds, premium editorial food photography. No text, no logos, no hands, no utensils. This will be used as a large website hero and product image.”

- `images/paneer-bowl.jpg`: “Use case: photorealistic-natural. Asset: healthy meal website product photo. A fresh paneer salad in a white ceramic bowl: cubed lightly grilled Indian paneer cheese, cucumber rounds, cherry tomatoes, lettuce, baby spinach, lemon and seeds. Professional editorial food photography, 45 degree overhead angle, centered entire bowl fills most of square composition. Soft natural daylight, pale warm ivory table, premium restaurant presentation. No text, logos, utensils or hands.”
- `images/chicken-rice-bowl.jpg`: same prompt direction, with subject “A chicken rice bowl in a white ceramic bowl: sliced grilled chicken breast, brown rice, broccoli, carrots, cherry tomatoes, a few spinach leaves.”
- `images/chicken-hero-small.jpg`: optimized 600px derivative for smaller displays.

The original hero PNG is retained in source but excluded from the public build.

## Downloaded photo references

Locally stored Unsplash assets:

- `hero-salad.jpg`, `quinoa-bowl.jpg`: https://images.unsplash.com/photo-1512621776951-a57141f2eefd
- `chicken-salad.jpg`: https://images.unsplash.com/photo-1546069901-ba9599a7e63c
- `chicken-rice.jpg`: https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38
- `paneer-salad.jpg`: https://images.unsplash.com/photo-1515543904379-3d757afe72e4

Names describe initial layout slots; downloaded photos are general food inspiration and are superseded by generated subject-specific assets where available. Replace all sample photography with approved actual-product images for a production catalogue.

Inter is requested from Google Fonts with `display=swap`, with a sans-serif fallback.

## Supplied logo cleanup

`images/diet-food-wala-logo.png`: transparent, closely cropped version of the user-supplied logo. Built-in image generation edit, preserving the green leaves, fork, steam, bowl curves and stacked DIET / FOOD / WALA lettering. Prompt: remove the white background and excess whitespace, preserve original design and colors, clean and sharpen edges, keep a small even safe margin; no new elements, shadows or text. Displayed with `object-fit: contain` so it never stretches.
