import cairosvg, os, shutil

OUT = "/mnt/user-data/outputs/bpulse-brand"
for d in ("icon", "mark", "favicon", "social", "lockup"):
    os.makedirs(f"{OUT}/{d}", exist_ok=True)

IRON  = "#161614"
CREAM = "#F5F1E6"
GOLD  = "#F2C230"
DEEP  = "#7A5812"

B = ("M0 0 H320 A175 175 0 0 1 320 350 H365 A185 185 0 0 1 365 720 H0 Z "
     "M150 92 H300 A83 83 0 0 1 300 258 H150 Z "
     "M150 442 H345 A93 93 0 0 1 345 628 H150 Z")
BW, BH = 550, 720
DEPTH, STEPS = 64, 56


def lerp_hex(a, b, t):
    A = tuple(int(a[i:i+2], 16) for i in (1, 3, 5))
    Bc = tuple(int(b[i:i+2], 16) for i in (1, 3, 5))
    return "#%02X%02X%02X" % tuple(int(A[k] + (Bc[k]-A[k]) * t) for k in range(3))


def extrude(face=CREAM, near=GOLD, far=DEEP, depth=DEPTH, steps=STEPS):
    out = []
    for i in range(steps, 0, -1):
        t = i / steps
        col = lerp_hex(far, near, 1 - t)
        out.append(f'<path d="{B}" fill-rule="evenodd" fill="{col}" '
                   f'transform="translate({depth*t:.2f},{depth*t:.2f})"/>')
    out.append(f'<path d="{B}" fill-rule="evenodd" fill="{face}"/>')
    return "\n    ".join(out), BW + depth, BH + depth


def flat(fill=CREAM):
    return f'<path d="{B}" fill-rule="evenodd" fill="{fill}"/>', BW, BH


def wrap(body, w, h, pad=0, bg=None, rx=None):
    W, H = w + pad*2, h + pad*2
    r = f' rx="{rx:.1f}" ry="{rx:.1f}"' if rx else ""
    b = f'<rect width="{W:.0f}" height="{H:.0f}"{r} fill="{bg}"/>' if bg else ""
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W:.0f} {H:.0f}" width="{W:.0f}" height="{H:.0f}">
  {b}
  <g transform="translate({pad},{pad})">
    {body}
  </g>
</svg>'''


def square(size, body, w, h, bg=IRON, rx_pct=0.225, scale_pct=0.52):
    s = (size * scale_pct) / h
    tx, ty = (size - w*s)/2, (size - h*s)/2
    r = size * rx_pct if rx_pct else 0
    rr = f' rx="{r:.1f}" ry="{r:.1f}"' if rx_pct else ""
    bgr = f'<rect width="{size}" height="{size}"{rr} fill="{bg}"/>' if bg else ""
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}" width="{size}" height="{size}">
  {bgr}
  <g transform="translate({tx:.2f},{ty:.2f}) scale({s:.5f})">
    {body}
  </g>
</svg>'''


def lockup(dark=True, w=1600, h=460):
    body, bw, bh = extrude(depth=44, steps=44)
    ink = CREAM if dark else IRON
    bg  = IRON if dark else "#F4EEE6"
    mh = 300.0
    s = mh / bh
    mw = bw * s
    x0 = 90
    gap = 76
    tx = x0 + mw + gap
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}">
  <rect width="{w}" height="{h}" fill="{bg}"/>
  <g transform="translate({x0},{(h-mh)/2:.1f}) scale({s:.5f})">
    {body}
  </g>
  <text x="{tx:.0f}" y="{h/2+62:.0f}" font-family="IBM Plex Sans, Inter, DejaVu Sans, sans-serif"
        font-size="200" font-weight="500" letter-spacing="-8" fill="{ink}">bpulse</text>
</svg>'''


def png(svg_path, out, w, h=None):
    cairosvg.svg2png(url=svg_path, write_to=out, output_width=w, output_height=h or w)


ex_body, ex_w, ex_h = extrude()

# ---- app icon
for s in (1024, 512, 256, 180, 128, 64):
    p = f"{OUT}/icon/icon-{s}.svg"
    open(p, "w").write(square(s, ex_body, ex_w, ex_h))
    png(p, f"{OUT}/icon/bpulse-icon-{s}.png", s)
    if s != 1024:
        os.remove(p)
os.rename(f"{OUT}/icon/icon-1024.svg", f"{OUT}/icon/bpulse-icon.svg")

# ---- mark, transparent, for dark grounds
p = f"{OUT}/mark/bpulse-mark-dark.svg"
open(p, "w").write(wrap(ex_body, ex_w, ex_h, pad=0))
png(p, f"{OUT}/mark/bpulse-mark-dark-1024.png", 1024, int(1024*ex_h/ex_w))

# ---- mark for light grounds: iron face, gold extrusion
lt_body, lw, lh = extrude(face=IRON, near=GOLD, far="#8A6414")
p = f"{OUT}/mark/bpulse-mark-light.svg"
open(p, "w").write(wrap(lt_body, lw, lh, pad=0))
png(p, f"{OUT}/mark/bpulse-mark-light-1024.png", 1024, int(1024*lh/lw))

# ---- mono, single flat colour, inherits currentColor
mono = f'<path d="{B}" fill-rule="evenodd" fill="currentColor"/>'
open(f"{OUT}/mark/bpulse-mark-mono.svg", "w").write(
    f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {BW} {BH}" width="{BW}" height="{BH}">
  {mono}
</svg>''')

# ---- favicon: flat, no extrusion, square container
fb, fw, fh = flat(CREAM)
p = f"{OUT}/favicon/favicon.svg"
open(p, "w").write(square(64, fb, fw, fh, rx_pct=0.18, scale_pct=0.62))
for s in (48, 32, 16):
    png(p, f"{OUT}/favicon/favicon-{s}.png", s)
shutil.move(p, f"{OUT}/favicon/bpulse-favicon.svg")

# ---- lockups
for name, dark in (("dark", True), ("light", False)):
    p = f"{OUT}/lockup/bpulse-lockup-{name}.svg"
    open(p, "w").write(lockup(dark))
    png(p, f"{OUT}/lockup/bpulse-lockup-{name}.png", 1600, 460)

# ---- social: LinkedIn avatar 400, OG card 1200x630
p = f"{OUT}/social/avatar.svg"
open(p, "w").write(square(400, ex_body, ex_w, ex_h, rx_pct=0, scale_pct=0.56))
png(p, f"{OUT}/social/bpulse-avatar-400.png", 400)
os.remove(p)

og_body, ow, oh = extrude(depth=52, steps=48)
s = 300.0 / oh
og = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <rect width="1200" height="630" fill="{IRON}"/>
  <g transform="translate(96,{(630-300)/2 - 30:.0f}) scale({s:.5f})">
    {og_body}
  </g>
  <text x="{96 + ow*s + 64:.0f}" y="300" font-family="IBM Plex Sans, Inter, DejaVu Sans, sans-serif"
        font-size="112" font-weight="500" letter-spacing="-4" fill="{CREAM}">bpulse</text>
  <text x="{96 + ow*s + 64:.0f}" y="376" font-family="IBM Plex Sans, Inter, DejaVu Sans, sans-serif"
        font-size="40" font-weight="400" fill="{GOLD}">We finish what starts.</text>
</svg>'''
p = f"{OUT}/social/bpulse-og.svg"
open(p, "w").write(og)
png(p, f"{OUT}/social/bpulse-og-1200x630.png", 1200, 630)

print("\n".join(sorted(
    os.path.join(r.replace(OUT, ""), f)
    for r, _, fs in os.walk(OUT) for f in fs)))
