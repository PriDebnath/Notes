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
  let backgrounds = ["red", "blue", "yellow", "green"]
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
      key={i}
      style={{ background: bg }}
      className="w-40 h-40 border rounded-lg flex-shrink-0"
    />
  ))}
</div>

  </DrawerContent>
</Drawer>
)
}