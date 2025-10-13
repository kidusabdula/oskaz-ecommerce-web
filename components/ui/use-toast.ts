import { useState } from "react"

export type Toast = {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
}

const useToasts = () => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = (props: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { ...props, id }])
    return id
  }

  const dismiss = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return {
    toasts,
    toast,
    dismiss,
  }
}

export { useToasts }