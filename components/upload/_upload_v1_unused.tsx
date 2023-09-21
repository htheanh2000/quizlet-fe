import Image from "next/image"
import { useRef, useState } from "react"

export function UploadImage() {
  let [imagePreviews, setImagePreviews] = useState<JSX.Element[]>([])

  let inputRef = useRef<HTMLInputElement>(null)

  const handleFiles = (e: { target: { files: any } }) => {
    const fileList = e.target.files
    const previewImages: JSX.Element[] = [...imagePreviews]

    console.log("fileList: " , fileList);
    console.log("new Date().getTime(): " , new Date().getTime());
    
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i]
      if (file.type.startsWith("image/")) {
        const imgSrc = URL.createObjectURL(file)
        previewImages.push(
          <Image
            width={100}
            height={100}
            key={file.name + '-' + new Date().getTime()}
            src={imgSrc}
            alt={`Image ${i}`}
          />
        )
      }
    }

    setImagePreviews(previewImages)
  }


  // https://stackoverflow.com/questions/4109276/how-to-detect-input-type-file-change-for-the-same-file
  const onInputClick = (event) => {
    event.target.value = '';
}


  return (
    <div className="mt-4 rounded border px-2 border-input ">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 items-center justify-items-center	">
            {imagePreviews}
            <div
            onClick={() => {
              inputRef.current?.click()
            }}
            className="w-full p-0 m-0 aspect-[1/1] flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed text-center hover:bg-accent hover:text-accent-foreground"
          >
            <p className="m-0 p-2 text-bold text-xl">Upload</p>
            <input
              ref={inputRef}
              type="file"
              id="fileInput"
              className="hidden"
              accept="image/*"
              multiple
              onClick={onInputClick}
              onChange={handleFiles}
            />
          </div>
          </div>
          
    </div>
  )
}
