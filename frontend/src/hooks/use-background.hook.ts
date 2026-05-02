

import dark_wood from "../assets/texture/dark-wood.png";
import crisp_paper_ruffles from "../assets/texture/crisp-paper-ruffles.png";
import brick_wall from "../assets/texture/brick-wall.png";
import snow from "../assets/texture/snow.png";
import fresh_snow from "../assets/texture/fresh-snow.png";
import cartographer from "../assets/texture/cartographer.png";
import cardboard from "../assets/texture/cardboard.png";
import xv from "../assets/texture/xv.png";
import food from "../assets/texture/food.png";
import flowers from "../assets/texture/flowers.png";
import foggy_birds from "../assets/texture/foggy-birds.png";
import pink_flowers from "../assets/texture/pink-flowers.webp";
import leaves from "../assets/texture/leaves.webp";
import watercolor from "../assets/texture/watercolor.webp";


interface ColorPresets {
    id: number;
    name: string;
    overlay?: string;
    color?: string;
}

const colorPresets = {
  pri_set_0: { id: 0, name: "none" } as ColorPresets,

  pri_set_1: { id: 1, name: "red", color: "red" } as ColorPresets,

  pri_set_2: {
    id: 2,
    name: "sun",
    overlay: "linear-gradient(to right, #ff512f, #dd2476)",
  } as ColorPresets, // gradient overlay

  pri_set_3: { id: 3, name: "yellow", color: "yellow" } as ColorPresets,

  pri_set_4: { id: 4, name: "blue", color: "blue" } as ColorPresets,

  pri_set_5: {
    id: 5,
    name: "dark-fade",
    overlay:
      "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6))",
  } as ColorPresets,

  // 🔽 NEW SOLID COLORS
  pri_set_6: { id: 6, name: "green", color: "#22c55e" } as ColorPresets,
  pri_set_7: { id: 7, name: "purple", color: "#a855f7" } as ColorPresets,
  pri_set_8: { id: 8, name: "slate", color: "#334155" } as ColorPresets,

  // 🔽 NEW GRADIENT OVERLAYS
  pri_set_9: {
    id: 9,
    name: "ocean",
    overlay: "linear-gradient(to right, #2193b0, #6dd5ed)",
  } as ColorPresets,

  pri_set_10: {
    id: 10,
    name: "mint",
    overlay: "linear-gradient(to right, #00b09b, #96c93d)",
  } as ColorPresets,

  pri_set_11: {
    id: 11,
    name: "violet-fade",
    overlay:
      "linear-gradient(to bottom, rgba(139,92,246,0.2), rgba(139,92,246,0.7))",
  } as ColorPresets,
  pri_set_12: {
    id: 12,
    name: "skyblue",
    color : 'skyblue'
  } as ColorPresets,
};


export type Pri_set = keyof typeof colorPresets

export type TextureKey = keyof typeof textures

const textures = {
  dark_wood,
  crisp_paper_ruffles,
  brick_wall,
  snow,
  fresh_snow,
  cartographer,
  cardboard,
  xv,
  food,
  flowers,
  foggy_birds,
  pink_flowers,
  leaves,
  watercolor,
};


// build inline style for preview & thumbnails that need composition
const buildStyle = (texture: TextureKey, pri_set: Pri_set) => {
    const preset = colorPresets[pri_set]
    const style = {
        ...(preset?.overlay && { backgroundImage: preset.overlay }),
        ...((textures[texture] && preset?.color )&& { backgroundImage: `url(${textures[texture]}` }),
        // backgroundImage: `${texture ?? "none"}, ${texture ? `url(${texture})` : "none"}`,
        backgroundColor: preset?.color ?? undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
    };
    // console.log({ style, preset,texture });

    return style
};

const buildStyleString = (texture: TextureKey, pri_set: Pri_set): string => {
  const preset = colorPresets[pri_set];

  const backgroundImages: string[] = [];

  // overlay on top
  if (preset?.overlay) {
    backgroundImages.push(preset.overlay);
  }

  // texture below overlay
  if (textures[texture] && preset?.color) {
    backgroundImages.push(`url(${textures[texture]})`);
  }

  const style = `
    background-image: ${backgroundImages.length ? backgroundImages.join(", ") : "none"};
    background-color: ${preset?.color ?? "transparent"};
    background-size: cover;
    background-position: center;
  `.trim();

  // console.log({ style, preset, texture });

  return style;
};


export default function useBackground() {



    return {
        textures,
        colorPresets,
        buildStyle,
        buildStyleString
    }


}