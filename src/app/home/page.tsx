import EmptyState from '@/app/_components/home/EmptyState';

export default async function ListingPage() {
  return (
    <EmptyState
      title="No Items Available for Bidding"
      description="There are currently no items open for bidding. Check back later or explore other categories."
      text="Refresh Page"
      href="/home"
    />
  );
}
