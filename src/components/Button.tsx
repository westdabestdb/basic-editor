import React, { ReactElement } from 'react';
/**
 * @function Button Button component.
 * @param {string} text text of the button.
 * @param {Function} onClick click action.
 * @param {boolean} disabled whether if the button is interactive or not.
 */
const Button = ({
  text,
  onClick,
  disabled,
}: {
  text: string;
  onClick: (value?: never) => void;
  // eslint-disable-next-line react/require-default-props
  disabled?: boolean
}): ReactElement => {
  // const { text, disabled, onClick } = props;

  const handleClick = (event: any): void => {
    onClick(event.target.value);
  };

  return (
    <div
      onMouseDown={!disabled ? handleClick : undefined}
      className={`${disabled ? 'bg-gray-400' : 'bg-black cursor-pointer'
      } h-12 px-4 text-white  flex items-center justify-center rounded-xl`}
    >
      {text}
    </div>
  );
};

export default Button;
