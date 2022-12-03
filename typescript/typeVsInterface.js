var getReactangleAreaInterface = function (point) { return point.x * point.y; };
var getReactangleAreaType = function (point) { return point.x * point.y; };
var Reactangle = /** @class */ (function () {
    function Reactangle() {
        this.x = 2;
        this.y = 3;
    }
    return Reactangle;
}());
var ReactanglePrism = /** @class */ (function () {
    function ReactanglePrism() {
        this.x = 2;
        this.y = 3;
        this.z = 4;
    }
    return ReactanglePrism;
}());
var Reactangle1 = /** @class */ (function () {
    function Reactangle1() {
        this.x = 2;
        this.y = 3;
    }
    Reactangle1.prototype.getArea = function () {
        return this.x * this.y;
    };
    Reactangle1.prototype.getPerimeter = function () {
        return 2 * (this.x + this.y);
    };
    return Reactangle1;
}());
var Reactangle2 = /** @class */ (function () {
    function Reactangle2() {
        this.x = 2;
        this.y = 3;
    }
    Reactangle2.prototype.area = function () {
        return this.x * this.y;
    };
    Reactangle2.prototype.perimeter = function () {
        return 2 * (this.x + this.y);
    };
    return Reactangle2;
}());
var reactanglePartial1 = {
    x: 2,
    y: 3
};
var reactanglePartial2 = {
    x: 2,
    y: 3,
    area: function () {
        return this.x * this.y;
    }
};
var reactanglePartial3 = {
    x: 2,
    y: 3,
    area: function () {
        return this.x * this.y;
    },
    perimeter: function () {
        return 2 * (this.x + this.y);
    }
};
// same
// type Counter = {
//     (start: number): string;
//     interval : number;
//     reset(): void;
// }
var getCounter = function () {
    var counter = (function (start) { });
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
};
var counter = getCounter();
counter(10);
counter.reset();
counter.interval = 5.0;
// What is usually a good idea/practice, is to dissect our hybrid definition in two parts:
// difference is below:
// 1. you cannot use implements on an class with type alias if 
// you use union operator within your type definition
{
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
    var reactangle = {
        x: 2,
        y: 3,
        area: function () {
            return this.x * this.y;
        },
        perimeter: function () {
            return 2 * (this.x + this.y);
        }
    };
}
// 2. you cannot use extends on an interface with type alias 
// if you use union operator within your type definition
{
    // interface Reactangle extends ReactangleShape {
    // }
}
// 3. declaration merging doesn’t work with type alias
{
    var box = { height: 5, width: 6, scale: 10 };
    // type Box1 = {
    //     scale: number;
    // }
}
