import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useWebSocket from '../hooks/useWebSocket';
import { RootState } from '../app/store';
import { setPrecision, updateOrderBook } from '../features/websocketSlice';
import { BidRow, AskRow } from './Row';
import ControlPanel from './ControlPanel';
import './OrderBook.css';

const OrderBook: React.FC = () => {
  useWebSocket();

  useEffect(() => {
    const storedState = localStorage.getItem('orderBookState');
    const result = storedState
      ? JSON.parse(storedState)
      : { bids: [], asks: [], precision: 2 };

    const { bids, asks, precision } = result;

    dispatch(setPrecision(precision));
    dispatch(updateOrderBook({ bids, asks }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispatch = useDispatch();
  const { bids, asks, precision } = useSelector(
    (state: RootState) => state.websocket,
  );

  const [barZoom, setBarZoom] = useState(1);

  const formatValue = useCallback(
    (value: number) => (value ? value.toFixed(precision) : null),
    [precision],
  );

  const handleZoomIn = useCallback(
    () => setBarZoom((prev) => Math.min(prev + 0.1, 2)),
    [],
  );
  const handleZoomOut = useCallback(
    () => setBarZoom((prev) => Math.max(prev - 0.1, 0.5)),
    [],
  );
  const handleIncreasePrecision = useCallback(
    () => dispatch(setPrecision(Math.min(precision + 1, 4))),
    [dispatch, precision],
  );
  const handleDecreasePrecision = useCallback(
    () => dispatch(setPrecision(Math.max(precision - 1, 0))),
    [dispatch, precision],
  );

  const bidRows = useMemo(
    () =>
      bids.map((bid, index) => (
        <BidRow
          key={index}
          data={bid}
          barZoom={barZoom}
          formatValue={formatValue}
          barClass='green'
          type='bid'
        />
      )),
    [bids, barZoom, formatValue],
  );

  const askRows = useMemo(
    () =>
      asks.map((ask, index) => (
        <AskRow
          key={index}
          data={ask}
          barZoom={barZoom}
          formatValue={formatValue}
          barClass='red'
          type='ask'
        />
      )),
    [asks, barZoom, formatValue],
  );

  return (
    <div className='order-book'>
      <ControlPanel
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onIncreasePrecision={handleIncreasePrecision}
        onDecreasePrecision={handleDecreasePrecision}
      />

      <div className='order-book-content'>
        <div className='order-book-side'>
          <h4>Bids</h4>
          <div className='table'>
            <div className='header-row'>
              <span className='header'>Count</span>
              <span className='header'>Amount</span>
              <span className='header'>Total</span>
              <span className='header'>Price</span>
            </div>
            {bidRows}
          </div>
        </div>

        <div className='order-book-side'>
          <h4>Asks</h4>
          <div className='table'>
            <div className='header-row'>
              <span className='header'>Price</span>
              <span className='header'>Total</span>
              <span className='header'>Amount</span>
              <span className='header'>Count</span>
            </div>
            {askRows}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderBook;
