import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DialogUnion } from "../types/dialog.type";

type DialogConfirmType = {
  open: boolean;
  title: string;
  description?: string;
}

interface DialogState {
  dialog: DialogUnion;
  confirm: DialogConfirmType;
}

const initialState: DialogState = {
  dialog: {
    name: undefined,
    data: undefined,
  },
  confirm: {
    open: false,
    title: "",
    description: undefined,
  }
};

const dialogSlice = createSlice({
  name: "dialog",
  initialState: initialState,
  reducers: {
    dialogOpen: (state, action: PayloadAction<DialogUnion>) => {
      state.dialog = action.payload;
    },
    dialogClose: (state) => {
      state.dialog.name = undefined;
      state.dialog.data = undefined;
    },
    confirmDialog: (state, action: PayloadAction<DialogConfirmType>) => {
      state.confirm = action.payload;
    },
    confirmCloseDialog: (state) => {
      state.confirm.open = false;
      state.confirm.title = "";
      state.confirm.description = undefined;
    }
  },
});

export const {
  dialogOpen,
  dialogClose,
  confirmDialog,
  confirmCloseDialog,
} = dialogSlice.actions;
export default dialogSlice.reducer;