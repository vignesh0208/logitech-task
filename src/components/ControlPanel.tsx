import React, { useCallback } from 'react';
import { debounce } from '../utils/debounce';
import { Button } from './ui/button';

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
      <Button onClick={debouncedIncreasePrecision}>Increase Precision</Button>
      <Button onClick={debouncedDecreasePrecision}>Decrease Precision</Button>
      <Button onClick={debouncedZoomIn}>Zoom In Bars</Button>
      <Button onClick={debouncedZoomOut}>Zoom Out Bars</Button>
    </div>
  );
};

export default React.memo(ControlPanel);
