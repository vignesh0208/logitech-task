import React from 'react';

interface RowProps {
  data: {
    count: number;
    amount: number;
    total: number;
    price: number;
  };
  barZoom: number;
  formatValue: (value: number) => string | null;
  barClass: string;
  type: string;
}

const Row: React.FC<RowProps> = ({
  type,
  data,
  barZoom,
  formatValue,
  barClass,
}) => (
  <div className={`order-row ${type}-row ${barClass}`}>
    <span className='count'>{data.count}</span>
    <span className='amount'>{formatValue(Math.abs(data.amount))}</span>
    <span className='total'>{formatValue(data.total)}</span>
    <span className='price'>{formatValue(data.price)}</span>
    <div
      className={`bar ${barClass}`}
      style={{
        width: `${Math.abs(data.amount) * barZoom}%`,
      }}></div>
  </div>
);

export const BidRow = React.memo(Row);
export const AskRow = React.memo(Row);
