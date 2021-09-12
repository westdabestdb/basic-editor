/**
   * @interface Shape shape interface.
   * @param {string} type type of shape, from shapes array.
   * @param {string} color color of shape, comes from randomColor.
   * @param {Object} coords x,y coordiates of shape.
   */
export interface Shape {
    type: string,
    color: string,
    coords: {
      x: number,
      y: number
    }
  }
