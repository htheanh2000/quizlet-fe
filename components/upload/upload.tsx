"use client"
import Image from "next/image"
import { useCallback, useRef, useState } from "react"
import Dropzone from "./dropzone"
// cuid is a simple library to generate unique IDs
import cuid from "cuid"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { useDrag, useDrop } from "react-dnd"
import update from "immutability-helper"
import TouchBackend from "react-dnd-touch-backend"

// Three of the most popular React drag-and-drop packages are:

// react-beautiful-dnd
// React-Grid-Layout
// React DnD

interface IImage {
  src: any
  id: string | ArrayBuffer
}

interface ImageListProps {
  images: IImage[]
}

const type = "Image" // Need to pass which type element can be draggable, its a simple string or Symbol. This is like an Unique ID so that the library know what type of element is dragged or dropped on.

export function UploadImage() {
  const [images, setImages] = useState<IImage[]>([])

  // simple way to check whether the device support touch (it doesn't check all fallback, it supports only modern browsers)
  // const isTouchDevice = () => {
  //   if ("ontouchstart" in window) {
  //     return true
  //   }
  //   return false
  // }

  // Assigning backend based on touch support on the device
  const backendForDND = HTML5Backend

  const onDrop = useCallback((acceptedFiles) => {
    // Loop through accepted files
    acceptedFiles.map((file) => {
      // Initialize FileReader browser API
      const reader = new FileReader()
      // onload callback gets called after the reader reads the file data
      reader.onload = function (e) {
        // add the image into the state. Since FileReader reading process is asynchronous, its better to get the latest snapshot state (i.e., prevState) and update it.
        setImages((prevState) => [
          ...prevState,
          { id: cuid(), src: e.target?.result },
        ])
      }
      // Read the file as Data URL (since we accept only images)
      reader.readAsDataURL(file)
      return file
    })
  }, [])

  const SingleImage = ({ image, index }: { image: IImage; index: number }) => {
    const ref = useRef(null) // Initialize the reference

    // useDrop hook is responsible for handling whether any item gets hovered or dropped on the element
    const [, drop] = useDrop({
      // Accept will make sure only these element type can be droppable on this element
      accept: type,
      hover(item: any) {
        if (!ref.current) {
          return
        }
        const dragIndex = item.index
        // current element where the dragged element is hovered on
        const hoverIndex = index
        // If the dragged element is hovered in the same place, then do nothing
        if (dragIndex === hoverIndex) {
          return
        }
        // If it is dragged around other elements, then move the image and set the state with position changes
        moveImage(dragIndex, hoverIndex)
        /*
          Update the index for dragged item directly to avoid flickering
          when the image was half dragged into the next
        */
        item.index = hoverIndex
      },
    })

    // useDrag will be responsible for making an element draggable. It also expose, isDragging method to add any styles while dragging
    const [{ isDragging }, drag] = useDrag(() => ({
      // what type of item this to determine if a drop target accepts it
      type: type,
      // data of the item to be available to the drop methods
      item: { id: image.id, index },
      // method to collect additional data for drop handling like whether is currently being dragged
      collect: (monitor) => {
        return {
          isDragging: monitor.isDragging(),
        }
      },
    }))

    /* 
      Initialize drag and drop into the element using its reference.
      Here we initialize both drag and drop on the same element (i.e., Image component)
    */
    drag(drop(ref))

    // Add the reference to the element
    return (
      <div
        ref={ref}
        style={{ opacity: isDragging ? 0 : 1 }}
        className="file-item"
      >
        <Image
          width={0}
          height={0}
          sizes={"100%"}
          className="m-0 w-full rounded"
          key={`${image.id}-image`}
          src={image.src}
          alt={`img - ${image.id}`}
        />
      </div>
    )
  }

  const moveImage = (dragIndex, hoverIndex) => {
    // Get the dragged element
    const draggedImage = images[dragIndex]
    /*
      - copy the dragged image before hovered element (i.e., [hoverIndex, 0, draggedImage])
      - remove the previous reference of dragged element (i.e., [dragIndex, 1])
      - here we are using this update helper method from immutability-helper package
    */
    setImages(
      update(images, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, draggedImage],
        ],
      })
    )
  }

  // ImageList Component
  const ImageList = ({ images }: ImageListProps) => {
    const renderImage = (image: IImage, index: number) => {
      return image ? (
        <SingleImage image={image} index={index} key={`${image.id}-image`} />
      ) : null
    }
    return (
      <section className="mt-4 grid grid-cols-2 items-center justify-items-center gap-2 md:grid-cols-3 lg:grid-cols-4">
        {images.map(renderImage)}
      </section>
    )
  }

  return (
    <div>
      <Dropzone onDrop={onDrop} accept={"image/*"} />
      <DndProvider backend={backendForDND}>
        <ImageList images={images} />
      </DndProvider>
    </div>
  )
}
