
import { useEffect, useState, useRef } from "react"

export const useGetKeyBoardHeight = () => {
  const [keyBoardHeight, setKeyBoardHeight] = useState(0)
  
  useEffect(()=>{
    const vv = window.visualViewport
    if (!vv) return
    
    function updateHeight(){
      const innerHeight = window.innerHeight
      const keyBoardHeightNew = innerHeight - vv.height - vv.offsetTop
      const keyBoardHeightNormalized =  keyBoardHeightNew > 0 ? keyBoardHeightNew : 0
      setKeyBoardHeight(keyBoardHeightNormalized)
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