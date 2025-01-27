import { createSlice, PayloadAction } from '@reduxjs/toolkit';
const MAX_ENTRIES = '50';
export interface ArrayListItem {
  channelId: number;
  count: number;
  price: number;
  amount: number;
  total: number;
}

interface OrderBookState {
  bids: ArrayListItem[];
  asks: ArrayListItem[];
  precision: number;
}

const initialState: OrderBookState = {
  bids: [],
  asks: [],
  precision: 2,
};

const websocketSlice = createSlice({
  name: 'websocket',
  initialState,
  reducers: {
    updateOrderBook(
      state: OrderBookState,
      action: PayloadAction<{ bids: ArrayListItem[]; asks: ArrayListItem[] }>,
    ) {
      const { bids, asks } = action.payload;

      const updateArray = (
        existingArray: ArrayListItem[],
        newItems: ArrayListItem[],
      ) => {
        const updatedArray = [...existingArray];

        newItems.forEach((newItem) => {
          const index = updatedArray.findIndex(
            (item) => item.channelId === newItem.channelId,
          );
          if (index !== -1) {
            updatedArray[index] = { ...updatedArray[index], ...newItem };
          } else {
            updatedArray.push(newItem);
          }
        });
        return updatedArray.slice(-MAX_ENTRIES);
      };

      state.bids = updateArray(state.bids, bids);
      state.asks = updateArray(state.asks, asks);

      localStorage.setItem('orderBookState', JSON.stringify(state));
    },
    setPrecision(state, action: PayloadAction<number>) {
      state.precision = Math.max(0, Math.min(action.payload, 4));
      localStorage.setItem('orderBookState', JSON.stringify(state));
    },
  },
});

export const { updateOrderBook, setPrecision } = websocketSlice.actions;
export default websocketSlice.reducer;
