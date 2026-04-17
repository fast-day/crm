import { useDispatch } from "react-redux"
import { dialogClose, dialogOpen } from "../slice/dialog.slice";
import type { DialogData, DialogDataMap, DialogNames } from "../types/dialog.type";

interface UseDialogReturnProps {
  openDialog: <N extends DialogNames>(name: N, data: DialogData<N>) => void,
  closeDialog: () => void
}

type DialogPayload = {
  [K in DialogNames]: {
    name: K;
    data: DialogDataMap[K];
  }
}[DialogNames];

export const useDialog = (): UseDialogReturnProps => {
  const dispatch = useDispatch();

  const openDialog = <N extends DialogNames>(name: N, data: DialogData<N>) => {
    dispatch(dialogOpen({ name: name, data } as DialogPayload));
  }

  const closeDialog = () => {
    dispatch(dialogClose());
  }

  return {
    openDialog,
    closeDialog,
  }
};