import React from 'react';
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
  return (
    <div className='controls'>
      <Button onClick={onIncreasePrecision}>Increase Precision</Button>
      <Button onClick={onDecreasePrecision}>Decrease Precision</Button>
      <Button onClick={onZoomIn}>Zoom In Bars</Button>
      <Button onClick={onZoomOut}>Zoom Out Bars</Button>
    </div>
  );
};

export default React.memo(ControlPanel);
