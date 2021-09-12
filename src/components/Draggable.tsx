import React, { ReactElement, useRef } from 'react';
import { Shape } from 'interfaces/Shape';
import useDraggable from 'hooks/useDraggable';

/**
 * @function Draggable Draggable component.
 * @param {Shape} shape shape data.
 * @param {VoidFunction} onClick click action.
 */
const Draggable = ({ shape, onClick }: {
  shape: Shape,
  onClick: () => void
}) : ReactElement => {
  const { coords, type, color } = shape;
  // create mutable ref object of current element
  const draggyRef = useRef<HTMLDivElement>(null);
  // useDraggable hook on the mutable ref.
  useDraggable(draggyRef);

  /**
   * @function handleDelete runs the parent component's onClick function to remove item from array.
   */
  const handleDelete = (): void => {
    onClick();
  };

  return (
    <div
      ref={draggyRef}
      style={{
        position: 'absolute',
        left: coords.x,
        top: coords.y,
        backgroundColor:
          type === 'star' || type === 'triangle' ? 'transparent' : color,
        borderBottomColor:
          type === 'star' || type === 'triangle' ? color : 'transparent',
      }}
      className={`${type} flex flex-col items-center relative cursor-pointer`}
    >
      <div
        onClick={handleDelete}
        className="hidden bg-red-700 rounded-full h-8 w-8 p-1 absolute -right-4 -top-5"
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#fff">
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M14.12 10.47L12 12.59l-2.13-2.12-1.41 1.41L10.59 14l-2.12 2.12 1.41 1.41L12 15.41l2.12 2.12 1.41-1.41L13.41 14l2.12-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9z" />
        </svg>

      </div>
    </div>
  );
};

export default Draggable;
