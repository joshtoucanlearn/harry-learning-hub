# Harry Hub — FLAME pixel galaxy adaptation

The background is a WebGL 2 port of Joshua’s actual FLAME main-menu shader:
`flame-godot/assets/ui/shaders/flame_terminal_pixel_galaxy_v1.gdshader`.
The original scene is `scenes/shell/terminal_main_menu.tscn`. FLAME files were read, not changed.

The ordered Bayer dithering / nine-colour palette technique derives from Not Jam’s **Space Generator**, published under CC0 1.0:
- https://not-jam.itch.io/space-generator
- https://github.com/NotJamGames/SpaceGenerator
- Pinned upstream revision: `1111fac02c03a58f0f6bf34b9860af24449065a6`
- Upstream file: `GeneratorLayers/NebulaLayer/nebula_shader.gdshader`
- https://creativecommons.org/publicdomain/zero/1.0/

FLAME’s diagonal galactic band, dust lanes, deterministic star fields and stepped parallax are preserved. Harry’s version uses a quieter midnight/slate palette, somewhat livelier star movement, and a very slow cloud-density variation. It remains pixelated rather than blurred.

`galaxy-noise.png` was exported from Godot FastNoiseLite / NoiseTexture2D using the exact FLAME scene parameters: seed 1821316500, frequency 0.013, five octaves, 512×512 seamless texture. The export ran in a separate temporary Godot project.

The current interactive renderer (`components/galaxy.tsx`) runs at up to 30 frames per second and 560 art pixels wide, pauses when the page is hidden, and honours calm mode and reduced motion. The default Pixel preset uses the original midnight still as a texture with the same pointer and radial displacement as the procedural Earth preset. A software image warp, capped at 320 art pixels wide, retains this effect without WebGL; it does not substitute outline circles. The untouched still remains visible while image resources load. No gameplay logic, audio, client records, or FLAME menu text is included in these background assets.
