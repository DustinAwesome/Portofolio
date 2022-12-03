function identity<Type>(arg: Type): Type {
    console.log(arg);
    return arg;
}

let output = identity<string>("myString");
let output1 = identity("myString");

function loggingIdentity<Type>(arg: Type[]): Type[] {
    console.log(arg.length);
    return arg;
}

function loggingIdentity1<Type>(arg: Array<Type>): Array<Type> {
    console.log(arg.length); // Array has a .length, so no more error
    return arg;
}

let myIdentity: <Type>(arg: Type) => Type;
myIdentity = identity;

myIdentity(["a", "b", "c"]);

let myIdentity1: { <Type>(arg: Type): Type };
myIdentity1 = identity;

myIdentity1(["a", "b", "c"]);

interface GenericIdentityFn {
    <Type>(arg: Type): Type;
}

let myIdentity2: GenericIdentityFn;
myIdentity2 = identity;

{
    interface GenericIdentityFn<Type> {
        (arg: Type): Type;
    }

    function identity1<Type>(arg: Type): Type {
        return arg;
    }

    let myIdentity: GenericIdentityFn<number> = identity1;

    myIdentity(1111);
}

class GenericNumber<NumType> {
    zeroValue: NumType | undefined;
    add: ((x: NumType, y: NumType) => NumType) | undefined;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
    return x + y;
};

let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function (x, y) {
    return x + y;
};

console.log(stringNumeric.add(stringNumeric.zeroValue, "test1"));

console.log(myGenericNumber.add(1, 2));

{
    interface Lengthwise {
        length: number;
    }

    function loggingIdentityConstraint<Type extends Lengthwise>(
        arg: Type
    ): Type {
        console.log(arg.length);
        return arg;
    }

    //loggingIdentity(1);
    loggingIdentityConstraint({ length: 10 });
}

{
    function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
        return obj[key];
    }

    let x = { a: 1, b: 2, c: 3, d: 4 };

    getProperty(x, "a");
    //getProperty(x, "m");
}

{
    function create<Type>(c: { new (): Type }): Type {
        return new c();
    }

    class BeeKeeper {
        hasMask: boolean = true;
    }

    class ZooKeeper {
        nametag: string = "Mikle";
    }

    class Animal {
        numLegs: number = 4;
    }

    class Bee extends Animal {
        keeper: BeeKeeper = new BeeKeeper();
    }

    class Lion extends Animal {
        keeper: ZooKeeper = new ZooKeeper();
    }

    function createInstance<A extends Animal>(c: new () => A): A {
        return new c();
    }

    createInstance(Lion).keeper.nametag;
    createInstance(Bee).keeper.hasMask;
}
