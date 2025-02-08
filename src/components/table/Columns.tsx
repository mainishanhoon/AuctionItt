'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from './ColumnHeader';
import { DataTableRowActions } from './RowActions';
import { Badge } from '@/components/ui/badge';
import { Items } from '@/lib/schema';
import Image from 'next/image';

export const columns: ColumnDef<Items>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader className="sr-only" column={column} title="ID" />
    ),
    cell: ({ row }) => {
      return <span className="sr-only">{row.getValue('id')}</span>;
    },
  },
  {
    accessorKey: 'image',
    header: ({ column }) => (
      <DataTableColumnHeader className="w-full -ml-32" column={column} title="Image" />
    ),
    cell: ({ row }) => {
      const images = row.getValue('image') as string[];
      const imageUrl = images?.[0] as string;

      return (
        <div className="w-full">
          <Image
            alt="Product Image"
            src={imageUrl}
            height={100}
            width={100}
            loading="lazy"
            className="h-20 w-fit rounded-md object-cover outline-dashed outline-2 outline-muted-foreground"
          />
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="border-r border-dashed text-center"
        column={column}
        title="Item's Name"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="border-r border-dotted text-center">
          <span className="font-medium">{row.getValue('name')}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="border-r border-dashed text-center"
        column={column}
        title="Description"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="border-r border-dotted text-center">
          <span className="font-medium">{row.getValue('description')}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="border-r border-dashed text-center"
        column={column}
        title="Price"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="border-r border-dotted text-center">
          <span className="font-medium">{row.getValue('price')}</span>
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
