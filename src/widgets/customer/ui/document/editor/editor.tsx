import "./style/editor-theme.css";

import EditorJS, { type OutputData } from '@editorjs/editorjs';
import EditorjsList from '@editorjs/list';
import Quote from '@editorjs/quote';
import Header from '@editorjs/header';
import { useEffect, useRef, useState } from 'react';
import { useDebounce } from '@/shared/hooks';

interface IEditorProps {
  data: OutputData | undefined;
}

export const Editor = ({ data }: IEditorProps) => {
  const ref = useRef<EditorJS | null>(null);
  const documentRef = useRef<HTMLDivElement | null>(null);
  const [outputData, setOutputData] = useState<OutputData | null>(null);

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
      autofocus: true,

      onChange: async (api) => {
        const output = await api.saver.save();
        setOutputData(output);
      }
    });

    ref.current = editor;

    
    return () => {
      editor.isReady.then(() => { editor.destroy(); ref.current = null });
    };
  }, []);

  const debounce = useDebounce(outputData, 6000);

  useEffect(() => {
    console.log("debounce", debounce);
  }, [debounce]);

  return <div ref={documentRef} id='editorjs'></div>;
}
