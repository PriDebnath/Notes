import {
  Drawer,
  DrawerTitle,
  DrawerClose,
  DrawerHeader,
  DrawerContent,
  DrawerTrigger,
  DrawerDescription,
} from "@/components/ui/drawer";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { QuoteFormData } from "@/model/index.model";
import { ArrowLeftIcon, Save, Shirt } from "lucide-react";
import useBackground, { type Pri_set, type TextureKey } from "@/hook/use-background.hook";

interface Props {
  onValueUpdate: (key: keyof QuoteFormData, value: string) => void
}

export default function ChooseBackground(props: Props) {
  const { onValueUpdate } = props
  const [open, setOpen] = useState(false)

  const { textures, colorPresets, buildStyle } = useBackground()
  const [selectedTexture, setSelectedTexture] = useState<TextureKey>();
  const [selectedPreset, setSelectedPreset] = useState<Pri_set>('pri_set_0');


  const handleTextureClick = (key: TextureKey) => {
    setSelectedTexture(key)
    onValueUpdate("texture", key)
  }

  const handlePriSetClick = (pri: Pri_set) => {
    setSelectedPreset(pri)
    onValueUpdate("pri_set", pri)
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}
    >
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon" 
        className={
          cn(
            open ? "text-primary" : ""
          )}>
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
            style={buildStyle(selectedTexture!, selectedPreset)}
          />
        </div>

        {/* Textures (images) */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-2">Textures</h4>
          <div className="flex gap-4 overflow-auto p-2">
            {Object.entries(textures).map((textureObj) => {
              const [key, value] = textureObj
              return (
                <button
                  key={key}
                  onClick={() => handleTextureClick(key as TextureKey)}
                  className={`w-28 h-20 rounded-lg shrink-0  focus:outline-none ${selectedTexture === key ? "ring-2 ring-primary" : "border"
                    }`}
                  aria-pressed={selectedTexture === key}
                  title={key}
                >
                  <div
                    className="w-full h-full rounded-lg"
                    style={{
                      backgroundImage: `url(${value})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                </button>
              )
            })}
          </div>
        </div>

        {/* Colors / Overlays */}
        <div>
          <h4 className="text-sm font-semibold mb-2">Colors & Overlays</h4>
          <div className="flex gap-4 overflow-auto p-2">
            {Object.entries(colorPresets).map((pri) => {
              const [key, value] = pri

              const isSelected = selectedPreset === key;
              return (
                <button
                  key={key}
                  onClick={() => handlePriSetClick(key as Pri_set)}
                  className={`w-20 h-20 rounded-lg shrink-0 p-0 relative focus:outline-none ${isSelected ? "ring-2 ring-primary" : "border"
                    }`}
                  aria-pressed={isSelected}
                  title={value.name}
                >
                  <div
                    className="w-full text-xs flex items-center justify-center h-full rounded-lg"
                    style={{
                      ...(value.overlay
                        ? { backgroundImage: value.overlay, backgroundSize: "cover", backgroundPosition: "center" }
                        : { backgroundColor: value.color }),
                    }}
                  >
                    {value.name}
                    {/* 
                  */}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
