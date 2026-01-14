
import { useEffect, useState, useRef } from "react"

export const useGetKeyBoardHeight = () => {
  const [keyBoardHeight, setKeyBoardHeight] = useState(0)
  
  useEffect(()=>{
    function updateHeight(){
      const vv = window.visualViewport
      const innerHeight = window.innerHeight
      const keyBoardHeightNew = innerHeight - vv.height - vv.offsetTop
      setKeyBoardHeight(keyBoardHeightNew)
    }
    updateHeight()
    
    window.addEventListener("resize",updateHeight)
    window.addEventListener("scroll",updateHeight)
    
    return () => {
      window.removeEventListener('resize', updateHeight)
      window.removeEventListener('scroll', updateHeight)
    }
  },[])
  
  return keyBoardHeight
}