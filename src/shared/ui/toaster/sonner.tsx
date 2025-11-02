import { Toaster } from 'sonner';
type ToasterProps = React.ComponentProps<typeof Toaster>;

export const Sonner = ({ ...props }: ToasterProps) => {
  return (
    <Toaster 
      className="toaster group"
      closeButton
      richColors
      duration={5000}
      visibleToasts={2}
      expand
      position={'bottom-right'}
      toastOptions={{
        classNames: {
          closeButton: "border-2 w-5 h-5",
          content: "p-1 py-0 text-sm"
        },
      }}
      {...props}
    />
  )
}
