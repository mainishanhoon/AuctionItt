'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from './ColumnHeader';
import { DataTableRowActions } from "./RowActions";
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
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="border-r border-dashed text-center"
        column={column}
        title="Customer"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="border-r border-dotted text-center">
          <span className="font-bold">{row.getValue('description')}</span>
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
      const date = new Date(row.getValue('createdAt'));
      const formattedDate = date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
      return (
        <div className="border-r border-dotted text-center">
          <span className="font-bold">{formattedDate}</span>
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
];
