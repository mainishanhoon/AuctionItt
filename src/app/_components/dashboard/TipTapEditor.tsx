/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { Editor } from '@tiptap/react';
import {
  IconBold,
  IconItalic,
  IconUnderline,
  IconStrikethrough,
  IconList,
  IconListNumbers,
  IconAlignLeft,
  IconAlignCenter,
  IconAlignRight,
  IconArrowForwardUp,
  IconArrowBackUp,
  IconQuotes,
  IconHeading,
} from '@tabler/icons-react';
import { Button } from '@/app/_components/ui/button';
import { Toggle } from '@/app/_components/ui/toggle';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/app/_components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Separator } from '@/app/_components/ui/separator';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Typography from '@tiptap/extension-typography';
import { useEffect } from 'react';
import { useInputControl } from '@conform-to/react';
import { Underline } from '@tiptap/extension-underline';

interface TipTapEditorProps {
  field: any;
  className?: string;
}

export default function TipTapEditor({ field, className }: TipTapEditorProps) {
  const input = useInputControl(field);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Typography,
    ],
    editorProps: {
      attributes: {
        class:
          'prose-sm leading-none font-display prose focus:outline-none min-h-[300px] p-2 max-w-none dark:prose-invert',
      },
    },
    onUpdate: ({ editor }) => {
      const value = JSON.stringify(editor.getJSON());
      input.change?.(value);
    },
    content: input.value ? JSON.parse(String(input.value)) : '',
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && input.value && editor.getHTML() !== input.value) {
      editor.commands.setContent(JSON.parse(String(input.value)));
    }
  }, [editor, input.value]);

  return (
    <div className="w-full">
      <div
        className={cn(
          'bg-background h-full overflow-hidden rounded-lg border-2',
          className,
        )}
      >
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

interface MenuBarProps {
  editor: Editor | null;
}

function MenuBar({ editor }: MenuBarProps) {
  if (!editor) {
    return null;
  }

  return (
    <div className="bg-sidebar flex flex-wrap items-center rounded-t-lg border-b p-1">
      <TooltipProvider>
        <div className="flex flex-wrap gap-0.5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive('bold')}
                onPressedChange={() =>
                  editor.chain().focus().toggleBold().run()
                }
                className={cn(
                  editor.isActive('bold') && 'bg-muted text-muted-foreground',
                )}
              >
                <IconBold />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Bold</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive('italic')}
                onPressedChange={() =>
                  editor.chain().focus().toggleItalic().run()
                }
                className={cn(
                  editor.isActive('italic') && 'bg-muted text-muted-foreground',
                )}
              >
                <IconItalic />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Italic</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive('underline')}
                onPressedChange={() =>
                  editor.chain().focus().toggleUnderline().run()
                }
                className={cn(
                  editor.isActive('underline') &&
                    'bg-muted text-muted-foreground',
                )}
              >
                <IconUnderline />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Underline</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive('strike')}
                onPressedChange={() =>
                  editor.chain().focus().toggleStrike().run()
                }
                className={cn(
                  editor.isActive('strike') && 'bg-muted text-muted-foreground',
                )}
              >
                <IconStrikethrough />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Strikethrough</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive('code')}
                onPressedChange={() =>
                  editor.chain().focus().toggleBlockquote().run()
                }
                className={cn(
                  editor.isActive('code') && 'bg-muted text-muted-foreground',
                )}
              >
                <IconQuotes />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>BlockQuote</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive('heading', { level: 3 })}
                onPressedChange={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                className={cn(
                  editor.isActive('heading', { level: 3 }) &&
                    'bg-muted text-muted-foreground',
                )}
              >
                <IconHeading />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Heading</TooltipContent>
          </Tooltip>
        </div>

        <Separator orientation="vertical" className="mx-1 h-5 w-px" />

        <div className="flex flex-wrap gap-0.5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive('bulletList')}
                onPressedChange={() =>
                  editor.chain().focus().toggleBulletList().run()
                }
                className={cn(
                  editor.isActive('bulletList') &&
                    'bg-muted text-muted-foreground',
                )}
              >
                <IconList />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Bullet List</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive('orderedList')}
                onPressedChange={() =>
                  editor.chain().focus().toggleOrderedList().run()
                }
                className={cn(
                  editor.isActive('orderedList') &&
                    'bg-muted text-muted-foreground',
                )}
              >
                <IconListNumbers />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Ordered List</TooltipContent>
          </Tooltip>
        </div>

        <Separator orientation="vertical" className="mx-1 h-5 w-px" />

        <div className="flex flex-wrap gap-0.5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive({ textAlign: 'left' })}
                onPressedChange={() =>
                  editor.chain().focus().setTextAlign('left').run()
                }
                className={cn(
                  editor.isActive({ textAlign: 'left' }) &&
                    'bg-muted text-muted-foreground',
                )}
              >
                <IconAlignLeft />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Align Left</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive({ textAlign: 'center' })}
                onPressedChange={() =>
                  editor.chain().focus().setTextAlign('center').run()
                }
                className={cn(
                  editor.isActive({ textAlign: 'center' }) &&
                    'bg-muted text-muted-foreground',
                )}
              >
                <IconAlignCenter />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Align Center</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive({ textAlign: 'right' })}
                onPressedChange={() =>
                  editor.chain().focus().setTextAlign('right').run()
                }
                className={cn(
                  editor.isActive({ textAlign: 'right' }) &&
                    'bg-muted text-muted-foreground',
                )}
              >
                <IconAlignRight />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Align Right</TooltipContent>
          </Tooltip>
        </div>

        <Separator orientation="vertical" className="mx-1 h-5 w-px" />

        <div className="flex flex-wrap gap-0.5">
          <Tooltip>
            <TooltipTrigger asChild className="size-6 md:size-8">
              <Button
                size="sm"
                variant="ghost"
                type="button"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
              >
                <IconArrowBackUp className="size-2" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Undo</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild className="size-6 md:size-8">
              <Button
                size="sm"
                type="button"
                variant="ghost"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
              >
                <IconArrowForwardUp className="size-2" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Redo</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
}
