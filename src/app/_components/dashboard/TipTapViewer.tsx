'use client';

import { cn } from '@/lib/utils';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Typography from '@tiptap/extension-typography';
import { EditorContent, JSONContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export function TipTapViewer({
  json,
  className,
}: {
  json: JSONContent;
  className?: string;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Typography,
    ],
    editable: false,
    editorProps: {
      attributes: {
        class:
          'prose-base leading-none prose focus:outline-none min-h-[300px] p-2 max-w-none dark:prose-invert',
      },
    },

    content: json,
    immediatelyRender: false,
  });

  return <EditorContent editor={editor} className={cn(className)} />;
}
