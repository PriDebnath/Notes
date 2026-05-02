import React from "react"
import { ArrowLeftIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "@tanstack/react-router"

const NavigationComponent = () => {
  return (
    <Link to="/"
      aria-label="link-to-home-link"
      className='flex items-center gap-2'
    >
      <Button variant="outline" size="icon"
        aria-label='go-to-home-button'
        title='go-to-home-button'>
        <ArrowLeftIcon />
      </Button>
    </Link>
  )
}
export default React.memo(NavigationComponent)