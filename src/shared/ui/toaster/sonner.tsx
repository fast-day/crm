import { Toaster } from 'sonner';
type ToasterProps = React.ComponentProps<typeof Toaster>;

export const Sonner = ({ ...props }: ToasterProps) => {
  return (
    <Toaster 
      className="toaster group sm:w-145!"
      richColors
      duration={5000}
      visibleToasts={1}
      expand
      icons={{ error: null, success: null, warning: null }}
      position={'bottom-center'}
      toastOptions={{
        classNames: {
          toast: "sm:w-145! flex justify-center",
          content: "text-xs sm:text-md text-white",
          error: "bg-error-background! bg-none border-none! text-error-color-text! text-sm justify-center rounded-full! py-5.5! sm:py-7! px-4!",
          success: "bg-success-background! bg-none border-none! text-success-color-text! text-sm justify-center rounded-full! py-5.5! sm:py-7! px-4!",
          warning: "bg-warn-background! bg-none border-none! text-warn-color-text! text-sm justify-center rounded-full! py-5.5! sm:py-7! px-4!",
        },
      }}
      {...props}
    />
  )
}
