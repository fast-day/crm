import "./style/editor-theme.css";

import EditorJS, { type OutputData } from '@editorjs/editorjs';
import EditorjsList from '@editorjs/list';
import Quote from '@editorjs/quote';
import Header from '@editorjs/header';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDebounce } from '@/shared/hooks';
import { useCustomerUpdateDocumentMutation } from "@/entities/customers";
import { toast } from "sonner";
import { getErrorMessage } from "@/shared/utils";

interface IEditorProps {
  customer_id: string;
  document_id: string;
  name: string | null;
  data: OutputData | undefined;
}

export const Editor = ({ customer_id, document_id, name, data }: IEditorProps) => {
  const ref = useRef<EditorJS | null>(null);
  const documentRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [title, setTitle] = useState(name ?? "");
  const [outputData, setOutputData] = useState<OutputData | null>(null);
  const [document] = useCustomerUpdateDocumentMutation();

  useEffect(() => {
    if (!documentRef.current) return;

    const editor = new EditorJS({
      holderId : "editorjs",

      data,

      tools: {
        header: {
          class: Header,
          inlineToolbar : true
        },
        List: {
          class: EditorjsList,
          inlineToolbar: true,
          config: {
            defaultStyle: 'unordered'
          },
        },
        quote: Quote,
      },
      autofocus: name?.length ? true : false,

      onChange: async (api) => {
        const output = await api.saver.save();
        setOutputData(output);
      },

    });
    
    ref.current = editor;
    
    editor.isReady.then(() => {
      if (!name?.trim()) {
        inputRef.current?.focus();
      }
    });
    
    return () => {
      editor.isReady.then(() => { editor.destroy(); ref.current = null });
    };
  }, []);

  const debounce = useDebounce(outputData, 6000);

  const updateDocument = useCallback(async (content: OutputData | null) => {
    try {
      const res = await document(
        {
          customer_id,
          document_id,
          body: { name: title, content }
        }
      ).unwrap();

      console.log(res);
    }
    catch (error) {
      console.error("Не удалось обновить документ", error);
      toast.error(getErrorMessage(error));
    }
  }, [customer_id, document, document_id, title]);

  useEffect(() => {
    if (debounce === null) return;
    console.log("debounce", debounce);
    updateDocument(debounce);
  }, [debounce, updateDocument]);

  return (
    <div>
      <div className="max-w-162.5 mx-auto">
        <input
          ref={inputRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Название заметки"
          className="w-full border-none bg-transparent text-5xl font-bold outline-none placeholder:text-primary/50"
        />
      </div>
      <div ref={documentRef} id='editorjs'></div>
    </div>
  );
}
