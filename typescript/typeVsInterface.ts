interface PointInterface {
    x: number;
    y: number;
}

type PointType = {
    x: number;
    y: number;
}

const getReactangleAreaInterface = (point: PointInterface) => point.x * point.y;
const getReactangleAreaType = (point: PointType) => point.x * point.y;


//1. One difference is, that interfaces create a new name that is used everywhere. 
//Type aliases don’t create a new name — for instance, error messages won’t 
// use the alias name.
// incorrect!!!

// same error for below two lines
// getReactangleAreaInterface({x: 10});
// getReactangleAreaType({x: 10});

// 2.A second more important difference is that type aliases 
// cannot be extended or implemented from
// incorrect !!!

interface ThreeDimensions extends PointType {
    z: number;
}

class Reactangle implements PointType {
    x = 2;
    y = 3;
}


class ReactanglePrism implements ThreeDimensions {
    x = 2;
    y = 3;
    z = 4;
}

interface Shape {
    getArea(): number;
}

type Perimeter = {
    getPerimeter(): number;
}

class Reactangle1 implements Shape, Perimeter {
    x = 2;
    y = 3;
    
    getArea() {
        return this.x * this.y;
    }
    
    getPerimeter() {
        return 2 * (this.x + this.y);
    }
}

// 3. type aliases cannot extend/implement other types
// incorrect !!! (partially correct)

interface Point {
    x:number;
    y:number;
}

interface Shape1 {
    area(): number;
}

type PerimeterType = {
    perimeter(): number;
}

// using intersection operator
type ReactangleShape = Point & Shape1 & PerimeterType;

class Reactangle2 implements ReactangleShape {
    x = 2;
    y = 3;
    
    area() {
        return this.x * this.y;
    }
    
    perimeter() {
        return 2 * (this.x + this.y);
    }
}

type ReactanglePartial = Partial<Shape1 & PerimeterType> & Point;

const reactanglePartial1: ReactanglePartial = {
    x: 2,
    y: 3,

    // area() {
    //     return this.x * this.y;
    // }
}

const reactanglePartial2: ReactanglePartial = {
    x: 2,
    y: 3,

    area() {
        return this.x * this.y;
    }
}

const reactanglePartial3: ReactanglePartial = {
    x: 2,
    y: 3,

    area() {
        return this.x * this.y;
    },

    perimeter() {
        return 2 * (this.x + this.y);
    },

    // weak type detection
    // aaaaa() {
    //     return 2 * (this.x + this.y);
    // }
}

interface Counter {
    (start: number): string;

    interval: number;
    reset(): void;
}

// same
// type Counter = {
//     (start: number): string;
//     interval : number;
//     reset(): void;
// }

const getCounter = () => {

    const counter = (function (start: number) { }) as Counter;

    counter.interval = 123;
    counter.reset = function () { };

    return counter;
}



const counter = getCounter();
counter(10);
counter.reset();
counter.interval = 5.0;


// What is usually a good idea/practice, is to dissect our hybrid definition in two parts:


// difference is below:
// 1. you cannot use implements on an class with type alias if 
// you use union operator within your type definition

{
    interface Point {
        x: number;
        y: number;
    }

    interface Shape {
        area(): number;
    }

    type Perimeter = {
        perimeter(): number;
    }

    type ReactangleShape = (Shape | Perimeter) & Point;

    // cannot work
    // class Reactangle implements ReactangleShape {
    //     x = 2;
    //     y = 3;

    //     area() {
    //         return this.x * this.y;
    //     }

    //     perimeter() {
    //         return 2 * (this.x + this.y);
    //     }
    // }

    const reactangle: ReactangleShape = {
        x: 2,
        y: 3,

        area() {
            return this.x * this.y;
        },

        perimeter() {
            return 2 * (this.x + this.y);
        }
    }
}

// 2. you cannot use extends on an interface with type alias 
// if you use union operator within your type definition
{
    interface Point {
        x: number;
        y: number;
    }

    interface Shape {
        area(): number;
    }

    type Perimeter = {
        perimeter(): number;
    }

    type ReactangleShape = (Shape | Perimeter) & Point;

    // interface Reactangle extends ReactangleShape {

    // }
}

// 3. declaration merging doesn’t work with type alias
{

    interface Box {
        height: number;
        width: number;
    }

    interface Box {
        scale: number;
    }

    let box: Box = { height: 5, width: 6, scale: 10 };

    type Box1 = {
        height: number;
        width: number;
    }

    // type Box1 = {
    //     scale: number;
    // }
}