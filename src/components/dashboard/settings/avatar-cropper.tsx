'use client'

import 'react-image-crop/dist/ReactCrop.css'

import type { User } from 'better-auth'
import { useRouter } from 'next/navigation'
import type { SyntheticEvent } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { FileRejection, FileWithPath } from 'react-dropzone'
import { useDropzone } from 'react-dropzone'
import type { Crop } from 'react-image-crop'
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop'
import { toast } from 'sonner'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/shadcn/avatar'
import { Button } from '@/components/shadcn/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/shadcn/dialog'
import { Separator } from '@/components/shadcn/separator'
import { useIsMobile } from '@/hooks/use-mobile'
import { updateUser } from '@/lib/auth/client'

interface AvatarCropperProps {
  user: User
}

interface FileWithPreview extends File {
  preview: string
}

export function AvatarCropper({ user }: AvatarCropperProps) {
  const router = useRouter()
  const isMobile = useIsMobile()
  const aspect = 1 // 1:1 square
  const [file, setFile] = useState<FileWithPreview | null>(null)
  const [open, setOpen] = useState(false)
  const onDrop = useCallback((acceptedFiles: FileWithPath[], fileRejections: FileRejection[]) => {
    if (fileRejections.length > 0) {
      toast.error(fileRejections[0].errors[0].message)
      return
    }
    const file = acceptedFiles[0]
    setFile(Object.assign(file, {
      preview: URL.createObjectURL(file),
    }))
    setOpen(true)
  }, [])
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    maxSize: 500 * 1024,
    noDrag: true,
    accept: { 'image/*': [] },
    onDrop,
  })
  const imgRef = useRef<HTMLImageElement>(null)
  const [crop, setCrop] = useState<Crop>()
  const [croppedImage, setCroppedImage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => {
      if (file) {
        URL.revokeObjectURL(file.preview)
      }
    }
  }, [file])

  function onImageLoad(e: SyntheticEvent<HTMLImageElement>) {
    if (file) {
      URL.revokeObjectURL(file.preview)
    }
    const { width, height } = e.currentTarget
    setCrop(centerCrop(
      makeAspectCrop({ unit: '%', width: 50, height: 50 }, aspect, width, height),
      width,
      height,
    ))
  }

  function onCropComplete(crop: Crop) {
    if (imgRef.current && crop.width && crop.height) {
      setCroppedImage(getCroppedImg(imgRef.current, crop))
    }
    else {
      setCroppedImage(null)
    }
  }

  function getCroppedImg(image: HTMLImageElement, crop: Crop) {
    const canvas = document.createElement('canvas')
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    canvas.width = crop.width * scaleX
    canvas.height = crop.height * scaleY
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      toast.error('No canvas context')
      return null
    }
    ctx.imageSmoothingEnabled = true
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY,
    )
    return canvas.toDataURL('image/png', 1)
  }

  async function handleSubmit() {
    await updateUser({
      image: croppedImage,
    }, {
      onRequest: () => {
        setIsSubmitting(true)
      },
      onResponse: () => {
        setIsSubmitting(false)
      },
      onSuccess: () => {
        setOpen(false)
        router.refresh()
        toast.success('Avatar updated successfully')
      },
      onError: (ctx) => {
        toast.error(ctx.error.message || 'Unknown error.')
      },
    })
  }

  return (
    <div className="flex justify-between items-center gap-2.5 p-4 md:px-6 border-b">
      <div className="flex flex-col gap-1 ml-0.5">
        <span className="text-xs md:text-sm">Avatar</span>
        <span className="text-xs text-muted-foreground">Click on the avatar to upload a custom one from your files.</span>
      </div>
      <Avatar
        {...getRootProps()}
        className="size-9 md:size-10 rounded-full border-2 border-dashed cursor-pointer select-none"
      >
        <input {...getInputProps()} />
        <AvatarImage src={user.image || undefined} alt={user.name || 'Avatar'} />
        <AvatarFallback className="text-xs md:text-sm">{user.name?.charAt(0)?.toUpperCase() || 'U'}</AvatarFallback>
      </Avatar>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 gap-0">
          <DialogHeader className="pt-4">
            <DialogTitle className="px-6 text-left text-sm md:text-base">
              Avatar Cropper
            </DialogTitle>
            <DialogDescription className="px-6 text-left text-xs md:text-sm">
              Crop your avatar to the desired size.
            </DialogDescription>
          </DialogHeader>
          <Separator className="mt-2.5 md:mt-4" />
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={c => onCropComplete(c)}
            circularCrop={true}
            aspect={aspect}
            minWidth={80}
            minHeight={80}
            className="max-h-[300px] md:max-h-[480px]"
          >
            <img
              ref={imgRef}
              src={file?.preview}
              alt={file?.name}
              className="size-full object-contain"
              onLoad={onImageLoad}
            />
          </ReactCrop>
          <Separator className="mb-2.5 md:mb-4" />
          <DialogFooter className="pb-4 px-6">
            <DialogClose asChild>
              <Button variant="outline" size={isMobile ? 'xs' : 'sm'}>Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              size={isMobile ? 'xs' : 'sm'}
              onClick={handleSubmit}
              disabled={!croppedImage || isSubmitting}
            >
              {isSubmitting && <span className="iconify size-4 animate-spin tabler--loader-2" />}
              <span>Upload</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
