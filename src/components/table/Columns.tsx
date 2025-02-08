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
      <DataTableColumnHeader
        className="-ml-8 w-full"
        column={column}
        title="Image"
      />
    ),
    cell: ({ row }) => {
      const images = row.getValue('image') as string[];
      const imageUrl = images?.[0] as string;

      return (
        <div className="-ml-2 w-full">
          <Image
            alt="Product Image"
            src={imageUrl}
            height={100}
            width={100}
            loading="lazy"
            className="size-20 rounded-md object-cover"
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
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="border-r border-dashed text-center"
        column={column}
        title="Created At"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="border-r border-dotted text-center">
          <span className="font-medium">
            {new Intl.DateTimeFormat('en-IN', {
              dateStyle: 'long',
            }).format(row.getValue('createdAt'))}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const rowDate = new Date(row.getValue(id));
      const [startDate, endDate] = value;
      return rowDate >= startDate && rowDate <= endDate;
    },
  },
  {
    id: 'actions',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="border-r border-dashed text-center"
        column={column}
        title="Updated At"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="border-r border-dotted text-center">
          <span className="font-medium">
            {new Intl.DateTimeFormat('en-IN', {
              timeStyle: 'medium',
            }).format(row.getValue('createdAt')).toLocaleUpperCase()}
          </span>
        </div>
      );
    },
  },
];
