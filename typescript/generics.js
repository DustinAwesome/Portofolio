var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function identity(arg) {
    console.log(arg);
    return arg;
}
var output = identity("myString");
var output1 = identity("myString");
function loggingIdentity(arg) {
    console.log(arg.length);
    return arg;
}
function loggingIdentity1(arg) {
    console.log(arg.length); // Array has a .length, so no more error
    return arg;
}
var myIdentity;
myIdentity = identity;
myIdentity(["a", "b", "c"]);
var myIdentity1;
myIdentity1 = identity;
myIdentity1(["a", "b", "c"]);
var myIdentity2;
myIdentity2 = identity;
{
    function identity1(arg) {
        return arg;
    }
    var myIdentity_1 = identity1;
    myIdentity_1(1111);
}
var GenericNumber = /** @class */ (function () {
    function GenericNumber() {
    }
    return GenericNumber;
}());
var myGenericNumber = new GenericNumber();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
    return x + y;
};
var stringNumeric = new GenericNumber();
stringNumeric.zeroValue = "";
stringNumeric.add = function (x, y) {
    return x + y;
};
console.log(stringNumeric.add(stringNumeric.zeroValue, "test1"));
console.log(myGenericNumber.add(1, 2));
{
    function loggingIdentityConstraint(arg) {
        console.log(arg.length);
        return arg;
    }
    //loggingIdentity(1);
    loggingIdentityConstraint({ length: 10 });
}
{
    function getProperty(obj, key) {
        return obj[key];
    }
    var x = { a: 1, b: 2, c: 3, d: 4 };
    getProperty(x, "a");
    //getProperty(x, "m");
}
{
    function create(c) {
        return new c();
    }
    var BeeKeeper_1 = /** @class */ (function () {
        function BeeKeeper() {
            this.hasMask = true;
        }
        return BeeKeeper;
    }());
    var ZooKeeper_1 = /** @class */ (function () {
        function ZooKeeper() {
            this.nametag = "Mikle";
        }
        return ZooKeeper;
    }());
    var Animal = /** @class */ (function () {
        function Animal() {
            this.numLegs = 4;
        }
        return Animal;
    }());
    var Bee = /** @class */ (function (_super) {
        __extends(Bee, _super);
        function Bee() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.keeper = new BeeKeeper_1();
            return _this;
        }
        return Bee;
    }(Animal));
    var Lion = /** @class */ (function (_super) {
        __extends(Lion, _super);
        function Lion() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.keeper = new ZooKeeper_1();
            return _this;
        }
        return Lion;
    }(Animal));
    function createInstance(c) {
        return new c();
    }
    createInstance(Lion).keeper.nametag;
    createInstance(Bee).keeper.hasMask;
}
