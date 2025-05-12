'use client';

import { toast } from 'sonner';
import { Button } from '@/app/_components/ui/button';
import { IconTrash } from '@tabler/icons-react';

interface RemoveWishlistItemProps {
  userId: string;
  itemId: string;
}

export default function RemoveWishlistItem({
  userId,
  itemId,
}: RemoveWishlistItemProps) {
  async function removeItemFromWishlist() {
    toast.promise(
      fetch(`/api/wishlist/removeFromWishlist/${userId}/${itemId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      {
        loading: 'Removing from Wishlist...',
        success: 'Removed from Wishlist',
        error: 'Could not be Removed from Wishlist',
      },
    );
  }

  return (
    <Button onClick={removeItemFromWishlist} variant="destructive">
      <IconTrash />
      <span>Remove</span>
    </Button>
  );
}
