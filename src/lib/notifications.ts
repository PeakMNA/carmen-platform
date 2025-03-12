import { toast } from "@/components/ui/use-toast"

export const notify = {
  success: (message: string) => {
    toast({
      title: "Success",
      description: message,
      variant: "default",
    })
  },
  error: (message: string) => {
    toast({
      title: "Error",
      description: message,
      variant: "destructive",
    })
  },
  loading: (message: string) => {
    toast({
      title: "Loading",
      description: message,
    })
  },
  dismiss: () => {
    console.warn("Toast dismiss should be called from a component using useToast()")
  }
} 