import { useDispatch } from "react-redux"
import { confirmCloseDialog, confirmDialog, dialogClose, dialogOpen } from "../slice/dialog.slice";
import type { DialogData, DialogDataMap, DialogNames } from "../types/dialog.type";

interface UseDialogReturnProps {
  openDialog: <N extends DialogNames>(name: N, data: DialogData<N>) => void,
  closeDialog: () => void;
  openConfirmDialog: (params: { title: string, description?: string }) => Promise<boolean>;
  resolveConfirmDialog: (res: boolean) => void;
}

type DialogPayload = {
  [K in DialogNames]: {
    name: K;
    data: DialogDataMap[K];
  }
}[DialogNames];

const confirmResolverRef = { current: null as ((v: boolean) => void) | null };

export const useDialog = (): UseDialogReturnProps => {
  const dispatch = useDispatch();

  const openDialog = <N extends DialogNames>(name: N, data: DialogData<N>) => {
    dispatch(dialogOpen({ name: name, data } as DialogPayload));
  }

  const closeDialog = () => {
    dispatch(dialogClose());
  }

  const openConfirmDialog = (params: { title: string, description?: string }): Promise<boolean> => {
    return new Promise((resolve) => {
      confirmResolverRef.current = resolve;
      dispatch(confirmDialog({ open: true, ...params }));
    })
  }

  const resolveConfirmDialog = (res: boolean) => {
    confirmResolverRef.current?.(res);
    confirmResolverRef.current = null;
    dispatch(confirmCloseDialog());
  }

  return {
    openDialog,
    closeDialog,
    openConfirmDialog,
    resolveConfirmDialog,
  }
};