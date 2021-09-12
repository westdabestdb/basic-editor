import {
  useState, useEffect,
} from 'react';

/**
 * @function useDraggable hook for making draggable elements.
 * @param {any} el element reference.
 */
const useDraggable = (el: any): void => {
  // default x,y coordinates and position set function.
  const [{ x, y }, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // if element is selected and has border around it, and if user clicks outside,
    // remove border from selected item.
    const onClickOutside = (e: MouseEvent): void => {
      if (!el.current?.contains(e.target)) {
        const activeElem = document.querySelector('.outline-black');
        if (activeElem === el.current) {
          // if active element is focused
          activeElem?.classList.remove('outline-black');
          activeElem?.children[0].classList.remove('block');
          activeElem?.children[0].classList.add('hidden');
        }
      }
    };

    /**
     * @function onMouseDown function to handle current element selection when cursor is pressed inside element.
     * @param {MouseEvent} event default event.
     */
    const onMouseDown = (event: MouseEvent): void => {
      const activeElem = document.querySelector('.outline-black');

      /**
       * get starting x,y coordinates by calculating cursor location minus previous x,y
       */
      const startX = event.pageX - x;
      const startY = event.pageY - y;

      if (activeElem !== el.current) {
        // if active element is not current element, meaning if user clicked to another shape
        // remove any indicators for selected item
        activeElem?.classList.remove('outline-black');
        activeElem?.children[0].classList.remove('block');
        activeElem?.children[0].classList.add('hidden');
      }

      // add indicators to the current element
      el.current.classList.add('outline-black');
      el.current.children[0].classList.remove('hidden');
      el.current.children[0].classList.add('block');

      /**
       * @function onMouseMove function to calculate and update the x,y of element by cursor position minus previously calculated starting position.
       * @param {MouseEvent} event default event.
       */
      const onMouseMove = (event: MouseEvent): void => {
        const xPos = event.pageX - startX;
        const yPos = event.pageY - startY;
        setPosition({ x: xPos, y: yPos });
      };

      /**
       * add event listener for mousemove event and attach onMouseMove handler that updates x,y.
       */
      document.addEventListener('mousemove', onMouseMove);

      /**
       * add event listener for mouseup event and remove onMouseMove handler once that updates x,y.
       */
      document.addEventListener(
        'mouseup',
        () => document.removeEventListener('mousemove', onMouseMove),
        { once: true },
      );
    };

    /**
     * create event listener for mousedown event and attach onMouseDown handler to start drag process.
     * create event listener on document for mousedown event and attach onClickOutside handler to detect outside clicks on current the element.
     */
    el.current?.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousedown', onClickOutside);

    return () => {
      // do the clean up, remove listeners for onMouseDown on element and onClickOutside on document.
      el.current?.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [x, y, el]); // re-subscribe as long as x y or el value changes.

  useEffect(() => {
    // eslint-disable-next-line no-param-reassign
    el.current.style.transform = `translate3d(${x}px, ${y}px, 0)`; // update element's position in 3d space
  }, [x, y]);
};

export default useDraggable;
