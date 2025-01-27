import React, { useCallback } from 'react';
import { debounce } from '../utils/debounce';

interface ControlPanelProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onIncreasePrecision: () => void;
  onDecreasePrecision: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  onZoomIn,
  onZoomOut,
  onIncreasePrecision,
  onDecreasePrecision,
}) => {
  const debouncedZoomIn = useCallback(debounce(onZoomIn, 300), [onZoomIn]);
  const debouncedZoomOut = useCallback(debounce(onZoomOut, 300), [onZoomOut]);
  const debouncedIncreasePrecision = useCallback(
    debounce(onIncreasePrecision, 300),
    [onIncreasePrecision],
  );
  const debouncedDecreasePrecision = useCallback(
    debounce(onDecreasePrecision, 300),
    [onDecreasePrecision],
  );

  return (
    <div className='controls'>
      <button onClick={debouncedIncreasePrecision}>Increase Precision</button>
      <button onClick={debouncedDecreasePrecision}>Decrease Precision</button>
      <button onClick={debouncedZoomIn}>Zoom In Bars</button>
      <button onClick={debouncedZoomOut}>Zoom Out Bars</button>
    </div>
  );
};

export default React.memo(ControlPanel);
