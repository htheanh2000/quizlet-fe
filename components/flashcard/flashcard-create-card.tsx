import { useCallback } from "react";
import Dropzone from "../upload/dropzone";
import { Input } from "../ui/input"
import { UploadImage } from "../upload/upload"

export function FlashcardCreateCard() {

 
  
  return (
    <div className="w-full rounded border border-gray-500 p-8">
      <p className="m-0 p-0">1</p>
      <div className="my-2 h-[1px] w-full bg-gray-500"></div>
      <div className="flex gap-4">
        <Input placeholder="Front desciption" />
        <Input placeholder="Back desciption" />
      </div>
      <UploadImage />
    </div>
  )
}
