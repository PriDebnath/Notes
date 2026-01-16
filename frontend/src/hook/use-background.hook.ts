

const textures = [
    "src/assets/images/fresh-snow.png",
    "src/assets/images/dark-wood.png",
    "src/assets/images/cardboard.png",
];

interface ColorPresets {
    id: number;
    name: string;
    overlay?: string;
    color?: string;
}

const colorPresets: ColorPresets[] = [
    { id: 1, name: "red", color: "red" }, // id: 1 ,solname color
    { id: 2, name: "sun", overlay: "linear-gradient(to right, #ff512f, #dd2476)" }, // gradient overlay
    { id: 3, name: "yellow", color: "yellow" },
    { id: 4, name: "blue", color: "blue" },
    { id: 5, name: "dark-fade", overlay: "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6))" },
];

// build inline style for preview & thumbnails that need composition
const buildStyle = (texture: string, preset: ColorPresets) => {
    return {
        backgroundImage: `${preset?.overlay ?? "none"}, ${texture ? `url(${texture})` : "none"}`,
        backgroundColor: preset?.color ?? undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
    };
};


export default function useBackground() {



    return {
        textures,
        colorPresets,
        buildStyle
    }


}