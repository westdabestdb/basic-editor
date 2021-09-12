import React, { ReactElement, useState } from 'react';
import './App.css';
import randomColor from 'randomcolor';
import domtoimage from 'dom-to-image';
import Draggable from 'components/Draggable';
import { Shape } from 'interfaces/Shape';
import Button from './components/Button';

const App = (): ReactElement => {
  const shapes = ['square', 'triangle', 'circle', 'star'];

  const [elems, setElems] = useState<Shape[]>([]);

  /**
   * @function saveDesign creates png of the .area element.
   */
  const saveDesign = (): void => {
    domtoimage
      .toJpeg(document.querySelector('.area'), { quality: 0.95 })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'uizard-design.jpeg';
        link.href = dataUrl;
        link.click();
      });
  };

  /**
   * @function resetBoard clears the array and resets the board.
   */
  const resetBoard = (): void => {
    setElems([]);
  };

  /**
   * @function removeElement removes a shape at index.
   * @param {number} index index of the shape in array.
   */
  const removeElement = (index: number): void => {
    elems.splice(index, 1);
    setElems([...elems]);
  };

  /**
   * @function getRandomPosition returns a random x,y coordinates in default range.
   */
  const getRandomPosition = (): [number, number] => {
    const x = window.innerWidth - 180;
    const y = window.innerHeight - 180;
    const randomX = Math.random() * (x - 90) + 90;
    const randomY = Math.random() * (y - 90) + 90;
    return [randomX, randomY];
  };

  /**
   * @function getCenterPosition returns center x,y coordinates of screen.
   */
  const getCenterPosition = (): [number, number] => {
    const x = window.innerWidth / 2 - 80;
    const y = window.innerHeight / 2 - 80;
    return [x, y];
  };

  /**
   * @function spawnElement creates a shape and adds to elems array.
   * @param {Boolean} center whether shape is in center or has a random location.
   * @param {string} type whether shape is random or pre-selected.
   */
  const spawnElement = (center = false, type = ''): void => {
    const coords = center ? getCenterPosition() : getRandomPosition();
    const shapeData: Shape = {
      type:
        type === '' ? shapes[Math.floor(Math.random() * shapes.length)] : type,
      color: randomColor(),
      coords: {
        x: coords[0],
        y: coords[1],
      },
    };
    setElems([...elems, shapeData]);
  };

  return (
    <div className="bg-green-50 h-screen w-full flex flex-col">
      <div className="h-16 flex w-full flex items-center justify-center gap-8">
        <Button text="Spawn Random Shape" onClick={spawnElement} />
        <Button
          text="Save Design"
          disabled={elems.length === 0}
          onClick={saveDesign}
        />
        <Button text="Reset Board" onClick={resetBoard} />
        <div className="flex items-center justify-between">
          {shapes.map((e) => (
            <div
              key={e}
              onClick={() => spawnElement(true, e)}
              className={`${e} scale  transform cursor-pointer`}
              style={{
                backgroundColor:
                  e === 'star' || e === 'triangle' ? 'transparent' : '#000',
                borderBottomColor:
                  e === 'star' || e === 'triangle' ? '#000' : 'transparent',
              }}
            />
          ))}
        </div>
      </div>
      <div className="area h-full w-full bg-green-50">
        {elems.map((e, index) => (
          <Draggable
            key={e.color + e.type}
            onClick={() => removeElement(index)}
            shape={e}
          />
        ))}
      </div>
    </div>
  );
};
export default App;
