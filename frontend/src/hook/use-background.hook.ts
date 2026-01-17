




interface ColorPresets {
    id: number;
    name: string;
    overlay?: string;
    color?: string;
}

const colorPresets = {
    pri_set_1: { id: 1, name: "red", color: "red" } as ColorPresets,
    pri_set_2: { id: 2, name: "sun", overlay: "linear-gradient(to right, #ff512f, #dd2476)" } as ColorPresets, // gradient overlay
    pri_set_3: { id: 3, name: "yellow", color: "yellow" } as ColorPresets,
    pri_set_4: { id: 4, name: "blue", color: "blue" } as ColorPresets,
    pri_set_5: { id: 5, name: "dark-fade", overlay: "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6))" } as ColorPresets,
}

export type Pri_set = keyof typeof colorPresets

export type TextureKey = keyof typeof textures

const textures = {
    fresh_snow: "src/assets/images/fresh-snow.png",
    dark_wood: "src/assets/images/dark-wood.png",
    cardboard: "src/assets/images/cardboard.png",
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
    console.log({ style, preset,texture });

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

  console.log({ style, preset, texture });

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