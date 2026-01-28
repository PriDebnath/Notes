import { toPng } from "html-to-image"

interface Option {
  backgroundColor: string
}

export const exportAsImage = async (element: HTMLDivElement | null, option: Option) => {
  if (!element) {
    console.warn('No element found')
    return
  }
  const dataUrl = await toPng(element, {
    pixelRatio: 2,        // crisp image
    //backgroundColor: "#fff"
    cacheBust: true,
    backgroundColor: option.backgroundColor
  })

  return dataUrl
}

export const exportAndShare = async (dataUrl: string) => {
  // dataUrl is base64 
  // convert base64 → Blob → File
  const res = await fetch(dataUrl)
  const blob = await res.blob()
  const fileName = "note-by-pri-" + new Date().getTime() + "-.png"
  const file = new File([blob], fileName, { type: "image/png" })

  // mobile share
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    await navigator.share({
      files: [file],
      title: "Note 💙",
      text: "Sharing a note 💙",
    })
  } else {
    // fallback download
    const link = document.createElement("a")
    const fileName = "note-by-pri-" + new Date().getTime() + "-.png"
    link.download = fileName
    link.href = dataUrl
    link.click()
  }
}
