let helloWorld: string = "Hello World";

// support primitive types
// boolean, bigint, null, number, string, symbol, undefined

// defining types
interface User {
    name: string;
    id: number;
}

const user1: User = {
    name: "John",
    id: 0,
};

class UserAccount {
    name: string;
    id: number;

    constructor(name: string, id: number) {
        this.name = name;
        this.id = id;
    }
}

const user2: User = new UserAccount("Murphy", 1);

console.log(user1, user2);

// function part
function getAdminUser(): User {
    return user1;
}

function deleteUser(user: User) {
    // ...
}

// composing types
// union types

type MyBool = true | false;
type WindowStates = "open" | "closed" | "minimized";
type LockStates = "locked" | "unlocked";
type OddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;

function getLength(obj: string | string[]) {
    return obj.length;
}

// type assertion
// typeof s === "string"

function wrapInArray(obj: string | string[]) {
    if (typeof obj === "string") {
        return [obj];
    } else {
        return obj;
    }
}

// generics
type StringArray = Array<string>;
type NumberArray = Array<number>;
type ObjectWithNameArray = Array<{ name: string }>;

interface Backpack<Type> {
    add: (obj: Type) => void;
    get: () => Type;
}

declare const backpack: Backpack<string>;


// structural typing system

interface Point {
    x: number;
    y: number;
}

function logPoint(p: Point) {
    console.log(`${p.x}, ${p.y}`);
}

// logs "12, 26"
const point = { x: 12, y: 26 };
logPoint(point);

const point3 = { x: 12, y: 26, z: 89 };
logPoint(point3); // logs "12, 26"

const rect = { x: 33, y: 3, width: 30, height: 80 };
logPoint(rect); // logs "33, 3"

class VirtualPoint {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

const newVPoint = new VirtualPoint(13, 56);
logPoint(newVPoint); // logs "13, 56"
