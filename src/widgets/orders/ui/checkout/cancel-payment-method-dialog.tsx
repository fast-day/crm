import { useDialog } from "@/entities/dialog"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/shared/ui"

export const CancelPaymentMethodDialog = () => {
  const { closeDialog } = useDialog();

  return (
    <Dialog open={true} onOpenChange={closeDialog}>

      <DialogContent className="max-w-85! p-4!">
        <DialogHeader>
          <DialogTitle className="text-xl">Предупреждение</DialogTitle>
          <DialogDescription className="text-sm leading-4.5 text-center">Чтобы сохранить заказ, вам необходимо отменить способ оплаты.</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose size={"size_44"} variant={"dialog_apply"}>Хорошо</DialogClose>
        </DialogFooter>

      </DialogContent>

    </Dialog>
  )
}
