import { dialogSelector, useDialog } from "@/entities/dialog"
import { Button, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/shared/ui";
import { useSelector } from "react-redux"

export const ConfirmDialog = () => {
  const { confirm } = useSelector(dialogSelector);
  const { resolveConfirmDialog } = useDialog();

  if (!confirm.open) return null;

  return (
    <Dialog open={confirm.open} onOpenChange={() => resolveConfirmDialog(false)}>
      <DialogContent className="max-w-120!">
        <DialogTitle>{confirm.title}</DialogTitle>
        {confirm.description && <DialogDescription className="leading-5">{confirm.description}</DialogDescription>}

        <DialogFooter>
          <DialogClose size={"size_54"} variant={"dialog_close"}>Отмена</DialogClose>
          <Button size={"size_54"} variant={"dialog_apply"} onClick={() => resolveConfirmDialog(true)}>Подтвердить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
