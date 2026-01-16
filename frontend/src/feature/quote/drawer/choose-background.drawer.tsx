import { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, Save, Shirt } from "lucide-react";

export default function ChooseBackground() {
  // separate lists: textures and color/overlay presets
  const textures = [
    "src/assets/images/fresh-snow.png",
    "src/assets/images/dark-wood.png",
    "src/assets/images/cardboard.png",
  ];

  interface ColorPresets {
    id: string;
    overlay?: string;
    color?: string;
  }

  const colorPresets: ColorPresets[] = [
    { id: "red", color: "red" }, // solid color
    { id: "sun", overlay: "linear-gradient(to right, #ff512f, #dd2476)" }, // gradient overlay
    { id: "yellow", color: "yellow" },
    { id: "blue", color: "blue" },
    { id: "dark-fade", overlay: "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6))" },
  ];

  // state
  const [selectedTexture, setSelectedTexture] = useState(textures[0]);
  const [selectedPreset, setSelectedPreset] = useState(colorPresets[0]);

  // build inline style for preview & thumbnails that need composition
  const buildStyle = (texture: string, preset: ColorPresets) => {
    return {
      backgroundImage: `${preset?.overlay ?? "none"}, ${texture ? `url(${texture})` : "none"}`,
      backgroundColor: preset?.color ?? undefined,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  };

  const apply = () => {
    const result = {
      image: selectedTexture,
      color: selectedPreset.color ?? undefined,
      overlay: selectedPreset.overlay ?? undefined,
    };
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon">
          <Shirt />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="p-4">
        <DrawerTitle className="w-full text-center text-lg font-medium p-4">
          Choose Background
        </DrawerTitle>
        {/* Top bar */}
        <div className="flex items-center justify-between ">
          {/*
          <div className="flex items-center justify-center gap-2 p-4">
            <ArrowLeftIcon className="w-5 h-5" />
          </div>
            */}
          {/*
          <div className="flex items-center gap-2">
            <DrawerClose>
              <Button variant="ghost">Close</Button>
            </DrawerClose>
            <Button onClick={apply} leftIcon={<Save />}>
              Apply
            </Button>
          </div>
            */}
        </div>

        {/* Live preview */}
        <div className="w-full h-48 rounded-lg mb-4 overflow-hidden shadow">
          <div
            className="w-full h-full"
            style={buildStyle(selectedTexture, selectedPreset)}
          />
        </div>

        {/* Textures (images) */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-2">Textures</h4>
          <div className="flex gap-4 overflow-auto p-2">
            {textures.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTexture(t)}
                className={`w-28 h-20 rounded-lg shrink-0  focus:outline-none ${selectedTexture === t ? "ring-2 ring-primary" : "border"
                  }`}
                aria-pressed={selectedTexture === t}
                title={t}
              >
                <div
                  className="w-full h-full rounded-lg"
                  style={{
                    backgroundImage: `url(${t})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Colors / Overlays */}
        <div>
          <h4 className="text-sm font-semibold mb-2">Colors & Overlays</h4>
          <div className="flex gap-4 overflow-auto p-2">
            {colorPresets.map((p) => {
              const isSelected = selectedPreset.id === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPreset(p)}
                  className={`w-20 h-20 rounded-lg shrink-0 p-0 relative focus:outline-none ${isSelected ? "ring-2 ring-primary" : "border"
                    }`}
                  aria-pressed={isSelected}
                  title={p.id}
                >
                  <div
                    className="w-full h-full rounded-lg"
                    style={{
                      ...(p.overlay
                        ? { backgroundImage: p.overlay, backgroundSize: "cover", backgroundPosition: "center" }
                        : { backgroundColor: p.color }),
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
