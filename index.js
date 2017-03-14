
// function reduce(arr, f, base) {
//     if (arr.length) {
//         return reduce(arr.slice(1), f, f(base, arr[0]));
//     } else {
//         return base;
//     }
// }


// const markPlayer = { name: 'mark', score: 100 };
// function updateScore(player) {
//     player.score++
// }
// updateScore(markPlayer);
// updateScore(markPlayer);
// markPlayer; // { name: 'mark', score: 102 }
//
// console.log(markPlayer);


// const markPlayer = { name: 'mark', score: 100 };
// function updateScore(player) {
//     return Object.assign({}, player, { score: player.score + 1 });
// }
// updateScore(updateScore(markPlayer)); // { name: 'mark', score: 102 }
// updateScore(markPlayer);

// console.log(markPlayer);


// function add(x, y) {
//     return x + y;
// }
//
// const add = function add(x, y) {
//     return x + y;
// };
//
// const add = function (x, y) {
//     return x + y;
// };

// const add = (x, y) => x + y;
//
// function twice(x, f) {
//     return f(f(x));
// }
// function pow2(x) {
//     return x * x;
// }
// twice(2, pow2); // 16
//
// const twice = (x, f) => f(f(x));
// const pow2 = x => x * x;
// twice(2, pow2); // 16
//
//
// const twice = (x, f) => f(f(x));
// twice(2, x => x * x); // 16
//
//
// function makePow2() {
//     return function pow2(x) {
//         return x * x;
//     }
// }
// const pow2 = makePow2();
// pow2(3); // 9
//
// const makePow2 = () => x => x * x;
// const pow2 = makePow2();
// pow2(3); // 9
//
//
// function add(x, y) {
//     return x + y;
// }
//
// function add(x) {
//     return function (y) {
//         return x + y;
//     }
// }
//
// const add = x => y => x + y;
//
// const add2 = add(2); // y => 2 + y;
// const add3 = add(3); // y => 3 + y;
// add2(5); // 7
// add3(5); // 8
// add(4)(5); // 9

// reduce([1, 2, 3], (acc, x) => acc + x, 0);

const reduce = ([head, ...rest], f, acc) =>
    typeof head !== 'undefined'
    ? reduce(rest, f, f(acc, head))
    : acc;

// const reduce = (arr, f, acc) => {
//     let accTemp = acc;
//     for (let i = 0; i < arr.length; i++) {
//         accTemp = f(accTemp, arr[i]);
//     }
//     return accTemp;
// };


const arr = [1, 2, 3, 4];

// const sum = (acc, x) => acc + x;

const map = (arr, f) => reduce(arr, (acc, x) => [...acc, f(x)], []);

const mapReducer = f => (acc, x) => [...acc, f(x)];
const map2 = (arr, f) => reduce(arr, mapReducer(f), []);

const filterReducer = f => (acc, x) => f(x) ? [...acc, x] : acc;
const filter = (arr, f) => reduce(arr, filterReducer(f), []);

const findReducer = f => (acc, x) => acc || (f(x) ? x : acc);
const find = (arr, f) => reduce(arr, findReducer(f), undefined);


// console.log(reduce(arr, sum, 0));
// console.log(map(arr, x => x * 2));
console.log(map2(arr, x => x * 2));
console.log(filter(arr, x => x > 2));
console.log(find(arr, x => x > 1 && x < 4));
// console.log(arr.find(x => x > 1 && x < 4));
//
//
// // console.log(
// //     ((arr, f) => (
// //         function reduce([head, ...rest], f, base) {
// //             return typeof head !== 'undefined'
// //                 ? reduce(rest, f, f(base, head))
// //                 : base
// //         })(arr, (acc, x) => [...acc, f(x)], [])
// //     )([1, 2, 3, 4], x => x * 2)
// // );
// //
// // console.log(
// //     (x => x * 2)(3)
// // );
// //
//
const arrToSort = [3, 2, 4, 1];
//
// // function qsort(arr) {
// //     if (arr.length <= 1)
// //         return arr;
// //     const pivot = arr.pop();
// //     return [
// //         ...qsort(arr.filter((el) => el <= pivot)),
// //         pivot,
// //         ...qsort(arr.filter((el) => el > pivot))
// //     ];
// // }
//
// const sort = ([pivot, ...rest]) =>
//     rest.length
//     ? [
//         ...qsort(filter(rest, x => x <= pivot)),
//         pivot,
//         ...qsort(filter(rest, x => x > pivot))
//     ]
//     : typeof pivot !== 'undefined' ? [pivot] : [];
//
//
//
const sort = ([pivot, ...rest], f) =>
    rest.length
    ? [
        ...sort(filter(rest, x => f(x, pivot) <= 0), f),
        pivot,
        ...sort(filter(rest, x => f(x, pivot) > 0), f)
    ]
    : typeof pivot !== 'undefined' ? [pivot] : [];
//
//
// // console.log(qsort(arrToSort));
// console.log(arrToSort.sort((a, b) => a < b ? -1 : 1));
console.log(sort([1, 4, 2, 3], (a, b) => a < b ? -1 : 1));
console.log(sort([1, 4, 2, 3], (a, b) => a < b ? 1 : -1));


const people = [
    { name: 'bob', age: 18 },
    { name: 'alice', age: 13 },
    { name: 'steve', age: 27 }
];
sort(people, (a, b) => a.age < b.age ? -1 : 1);
console.log(sort(people, (a, b) => a.age < b.age ? -1 : 1)); // { name: 'steve', age: 27 }

// //
// //
// // console.log(arrToSort.sort((a, b) => a > b ? 1 : -1));
// // console.log(sort(arrToSort, (a, b) => a > b ? 1 : -1));
// //
// //
// const characters = [
//     {name: 'Aublario', age: 18, power: 130},
//     {name: 'Honser', age: 13, power: 250},
//     {name: 'Bzothibhokh', age: 19, power: 80},
//     {name: 'Per', age: 28, power: 20},
//     {name: 'Goexisco', age: 12, power: 170},
//     {name: 'Sploppend', age: 31, power: 110},
// ];
// //
// // console.log(arrT.sort((a, b) => a.age < b.age ? -1 : 1));
// // console.log(sort(arrT, (a, b) => a.age < b.age ? -1 : 1));
// // console.log(sort(arrT, (a, b) => a.name < b.name ? -1 : 1));
//
//
// const names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];
//
// const countOccurs = (acc, x) => ((x in acc) ? acc[x]++ : acc[x] = 1) && acc;
//
// // console.log(reduce(names, countOccurs, {}));
//
//
// let namesCounters = {};
//
// for (let i = 0; i < names.length; i++) {
//     (names[i] in namesCounters) ? namesCounters[names[i]]++ : namesCounters[names[i]] = 1;
// }
//
// // console.log(namesCounters);
// // console.log(qsort(names));
//

// const max = arr => reduce(arr, (acc, x) => x > acc ? x : acc, arr[0]);
// const max = arr => reduce(arr, maxReducer, maxInitVal);
// const sum = arr => reduce(arr, (acc, x) => acc + x, 0);
//
// // console.log(max([1, 3, 2]));
// console.log(sum([1, 3, 2]));
//
// // const max = (arr, f = x => x) =>
// //     reduce(arr, (acc, x) => f(x) > f(acc) ? x : acc, arr[0]);
//
// const maxReducer = f => (acc, x) => f(x) > f(acc) ? x : acc;
// const max = (arr, f) => reduce(arr, maxReducer(f), arr[0]);
//
// const people = [
//     { name: 'bob', age: 18 },
//     { name: 'alice', age: 13 },
//     { name: 'steve', age: 27 }
// ];
// max(people, x => x.age); // { name: 'steve', age: 27 }
// console.log(max(people, x => x.age));

//
// // console.log(max(arrToSort));
// // console.log(max(arrT, x => x.age));
//
// const pipe = (...f) => x => reduce(f, (acc, v) => v(acc), x);
//
// const findMature = arr => filter(arr, x => x.age >= 18);
// const sortByPower = arr => sort(arr, (a, b) => a.power > b.power ? -1 : 1);
// const multiplyPower = arr => map(arr, x => Object.assign({}, x, { power: x.power * 1.5 }));
// const first3 = arr => reduce(arr, (acc, x) => acc.length >= 3 ?  acc : [...acc, x], []);
//
// console.log(first3(multiplyPower(sortByPower(findMature(characters)))));
// console.log(pipe(findMature, sortByPower, multiplyPower, first3)(characters));
//
// const unary = f => x => f(x);
//
// console.log(['10', '10', '10', '10'].map(x => parseInt(x)));
// console.log(['10', '10', '10', '10'].map(unary(parseInt)));
//
