import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateOrderBook } from '../features/websocketSlice';
import { ArrayListItem } from '../features/websocketSlice';

const useWebSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let ws: WebSocket | null = null;
    let reconnectTimeout: NodeJS.Timeout;
    let attempt = 0;

    const connectWebSocket = () => {
      console.log('Connecting to WebSocket...');
      ws = new WebSocket('wss://api-pub.bitfinex.com/ws/2');

      ws.onopen = () => {
        console.log('WebSocket connection opened.');
        ws?.send(
          JSON.stringify({
            event: 'subscribe',
            channel: 'book',
            symbol: 'tBTCUSD',
          }),
        );
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (Array.isArray(data) && data.length > 1) {
          const channelId = data[0];
          const updates = data[1];

          if (Array.isArray(updates)) {
            const newBids: ArrayListItem[] = [];
            const newAsks: ArrayListItem[] = [];

            if (updates.length === 3) {
              const [price, count, amount] = updates;

              if (count > 0) {
                const total = Math.abs(amount) * price;

                if (amount > 0) {
                  newBids.push({ channelId, price, amount, count, total });
                } else {
                  newAsks.push({ channelId, price, amount, count, total });
                }
              }
            } else {
              updates.forEach((update: any) => {
                const [price, count, amount] = update;

                if (count > 0) {
                  const total = Math.abs(amount) * price;

                  if (amount > 0) {
                    newBids.push({ channelId, price, amount, count, total });
                  } else {
                    newAsks.push({ channelId, price, amount, count, total });
                  }
                }
              });
            }

            dispatch(
              updateOrderBook({
                bids: newBids,
                asks: newAsks,
              }),
            );
          }
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      ws.onclose = () => {
        console.warn('WebSocket connection closed. Attempting to reconnect...');
        if (attempt < 5) {
          attempt += 1;
          const delay = Math.pow(2, attempt) * 1000;
          reconnectTimeout = setTimeout(connectWebSocket, delay);
        } else {
          console.error('Failed to reconnect after 5 attempts.');
        }
      };
    };

    connectWebSocket();

    return () => {
      console.log('Cleaning up WebSocket...');
      clearTimeout(reconnectTimeout);
      ws?.close();
    };
  }, [dispatch]);
};

export default useWebSocket;
