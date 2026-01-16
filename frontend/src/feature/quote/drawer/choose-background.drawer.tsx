import { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import useBackground from "@/hook/use-background.hook";
import { ArrowLeftIcon, Save, Shirt } from "lucide-react";

export default function ChooseBackground() {

  const { textures, colorPresets, buildStyle } = useBackground()

  const [selectedTexture, setSelectedTexture] = useState(textures[0]);
  const [selectedPreset, setSelectedPreset] = useState(colorPresets[0]);

  const apply = () => {
    const result = {
      image: selectedTexture,
      color: selectedPreset.color ?? undefined,
      overlay: selectedPreset.overlay ?? undefined,
    };
  };

  return (
    <Drawer
    >
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon">
          <Shirt />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="p-4" aria-describedby="Choose Background">
        <DrawerHeader>
          <DrawerTitle>Choose Background</DrawerTitle>
          <DrawerDescription>
            Select a texture and a color
          </DrawerDescription>
        </DrawerHeader>
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
                  title={p.name}
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
