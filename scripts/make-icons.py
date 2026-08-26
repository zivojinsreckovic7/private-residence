"""Build the app icons from the crest. Run from the project root.

Needs Pillow, which is not a project dependency: this is run by hand when the
crest artwork changes, not as part of a build.

public/logo-mark.jpg carries the full lockup: crest, MS monogram, then the
"PRIVATE RESIDENCE / CYPRUS" wordmark under a rule. The wordmark is illegible
much below 96px, so no icon carries it.

Two crops, because the mark does not survive being scaled linearly. The full
crest reads from 32px up. At 16px its bracket and palm collapse into noise
across the top third of the tile and take the monogram's legibility with them,
so that one size is cut to the monogram alone and set larger in the frame.
"""
from PIL import Image, ImageFilter

SRC = "public/logo-mark.jpg"
# Measured on the source. FULL is the crest and monogram, above the gold rule;
# TIGHT is the near-black monogram alone.
FULL = (179, 16, 529, 511)
TIGHT = (186, 154, 528, 510)

src = Image.open(SRC).convert("RGB")
ground = src.getpixel((2, 2))


def master(box, fill):
    """The crop centred on a square of ground, occupying `fill` of the side."""
    mark = src.crop(box)
    side = round(max(mark.size) / fill)
    canvas = Image.new("RGB", (side, side), ground)
    canvas.paste(mark, ((side - mark.width) // 2, (side - mark.height) // 2))
    return canvas


full = master(FULL, 0.82)
tight = master(TIGHT, 0.84)


def at(source, size, sharpen=False):
    im = source.resize((size, size), Image.LANCZOS)
    if sharpen:
        im = im.filter(ImageFilter.UnsharpMask(radius=0.6, percent=90, threshold=2))
    return im


at(full, 512).save("src/app/icon.png", optimize=True)
at(full, 180).save("src/app/apple-icon.png", optimize=True)

# RGBA, not RGB: Next stores ICO entries as PNG and its decoder rejects a
# PNG in the .ico that is not RGBA ("The PNG is not in RGBA format!"), which
# fails the build rather than just degrading the icon.
at(full, 48, sharpen=True).convert("RGBA").save(
    "src/app/favicon.ico",
    format="ICO",
    sizes=[(48, 48), (32, 32), (16, 16)],
    append_images=[
        at(full, 32, sharpen=True).convert("RGBA"),
        at(tight, 16, sharpen=True).convert("RGBA"),
    ],
)
print("ground", ground, "full", full.size, "tight", tight.size)
