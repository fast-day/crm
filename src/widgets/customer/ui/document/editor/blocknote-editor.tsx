import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import type { Block, BlockNoteEditor } from "@blocknote/core";
import { useEffect, useRef, useState } from "react";
import { useDebounce, useIsPending } from "@/shared/hooks";
import { useCustomerUpdateDocumentMutation } from "@/entities/customers";
import { toast } from "sonner";
import { getErrorMessage } from "@/shared/utils";

interface IEditorProps {
  editor: BlockNoteEditor;
  name: string | null;
  customer_id: string;
  document_id: string;
}

export const Editor = ({ editor, name, customer_id, document_id }: IEditorProps) => {
  const [title, setTitle] = useState(name ?? "");
  const [content, setContent] = useState<Block[] | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const isFirstRender = useRef(true);

  const [document] = useCustomerUpdateDocumentMutation();

  const onChange = () => {
    setContent(editor.document);
  }

  const titleDebounce = useDebounce(title, 2500);
  const contentDebounce = useDebounce(content, 2500);
  const isSaving = useIsPending(content, contentDebounce);

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    editor.focus();
  }

  useEffect(() => {
    if (!name?.trim()) {
      inputRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    document({ customer_id, document_id, body: { name: titleDebounce, content: contentDebounce } }).unwrap()
      .catch(error => toast.error(getErrorMessage(error)));
  }, [titleDebounce, contentDebounce]);

  return (
    <div>
      <div className="max-w-180 mx-auto">
        <input
          ref={inputRef}
          value={title}
          onKeyDown={handleTitleKeyDown}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Название заметки"
          className="w-full border-none bg-transparent text-5xl font-bold outline-none placeholder:text-primary/50"
        />
      </div>
      <BlockNoteView editor={editor} onChange={onChange} theme={"light"} />
      {isSaving && <div className="fixed bottom-23 1100:bottom-5 right-5 text-xs text-primary/70">Сохраняем...</div>}
    </div>
  )
}
