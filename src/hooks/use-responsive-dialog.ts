import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@/components/shadcn/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/shadcn/drawer'
import { useIsMobile } from '@/hooks/use-mobile'

export function useResponsiveDialog() {
  const isMobile = useIsMobile()

  return {
    isMobile,
    Dialog: isMobile ? Drawer : Dialog,
    Trigger: isMobile ? DrawerTrigger : DialogTrigger,
    Content: isMobile ? DrawerContent : DialogContent,
    Title: isMobile ? DrawerTitle : DialogTitle,
    Description: isMobile ? DrawerDescription : DialogDescription,
    Header: isMobile ? DrawerHeader : DialogHeader,
    Footer: isMobile ? DrawerFooter : DialogFooter,
    Close: isMobile ? DrawerClose : DialogClose,
    Overlay: isMobile ? DrawerOverlay : DialogOverlay,
    Portal: isMobile ? DrawerPortal : DialogPortal,
  }
}
