import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button} from "@/components/ui/button"
import { ArrowLeftIcon,Save, Shirt } from 'lucide-react'

export default function ChooseBackground (){
  const backgrounds = [
  {
    image: "src/assets/images/fresh-snow.png",
    color: "red",
  },
  {
    image: "src/assets/images/fresh-snow.png",
    overlay: "linear-gradient(to right, red, orange)",
  },
  {
    image: "src/assets/images/dark-wood.png",
    color: "yellow",
  },
  {
    image: "src/assets/images/cardboard.png",
    color: "blue",
  },
]

return (
<Drawer>
  <DrawerTrigger>
   <Button variant="outline" size="icon">
          <Shirt/>
            </Button>
  </DrawerTrigger>
  <DrawerContent>
  {/*
    <DrawerHeader>
      <DrawerTitle>Are you absolutely sure?</DrawerTitle>
      <DrawerDescription>This action cannot be undone.</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <Button>Submit</Button>
      <DrawerClose>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
    */}
    
          <div className="flex flex-row gap-4 p-4 overflow-auto ">
  {backgrounds.map((bg, i) => (
   <div
  className="w-40 h-40 rounded-lg bg-cover bg-center flex-shrink-0"
  style={{
    backgroundImage: `
      ${bg.overlay ?? "none"},
      ${bg.image ? `url(${bg.image})` : "none"}
    `,
    backgroundColor: bg.color,
  }}

/>

  ))}
</div>

  </DrawerContent>
</Drawer>
)
}