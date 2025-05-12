export type Wishlist = {
  userId: string;
  items: Array<{
    id: string;
    name: string;
    currentBid: number;
    startingBid: number;
    bidInterval: number;
    endDate: Date;
    image: string;
    topBidder: string;
  }>;
};
