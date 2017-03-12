
// function reduce(arr, f, base) {
//     if (arr.length) {
//         return reduce(arr.slice(1), f, f(base, arr[0]));
//     } else {
//         return base;
//     }
// }

const reduce = ([head, ...rest], f, base) =>
    typeof head !== 'undefined'
    ? reduce(rest, f, f(base, head))
    : base;

const arr = [1, 2, 3, 4];

const sum = (acc, x) => acc + x;

const map = (arr, f) => reduce(arr, (acc, x) => [...acc, f(x)], []);

const mapReducer = f => (acc, x) => [...acc, f(x)];
const map2 = (arr, f) => reduce(arr, mapReducer(f), []);

const filterReducer = f => (acc, x) => f(x) ? [...acc, x] : acc;
const filter = (arr, f) => reduce(arr, filterReducer(f), []);

const findReducer = f => (acc, x) => acc || (f(x) ? x : acc);
const find = (arr, f) => reduce(arr, findReducer(f), undefined);


const res = reduce(sum, 0, arr);

// console.log(reduce(arr, sum, 0));
// console.log(map(arr, x => x * 2));
// console.log(map2(arr, x => x * 2));
// console.log(filter(arr, x => x > 2));
// console.log(find(arr, x => x > 1 && x < 4));
// console.log(arr.find(x => x > 1 && x < 4));
//
//
// console.log(
//     ((arr, f) => (
//         function reduce([head, ...rest], f, base) {
//             return typeof head !== 'undefined'
//                 ? reduce(rest, f, f(base, head))
//                 : base
//         })(arr, (acc, x) => [...acc, f(x)], [])
//     )([1, 2, 3, 4], x => x * 2)
// );
//
// console.log(
//     (x => x * 2)(3)
// );
//

const arrToSort = [3, 2, 4, 1];

// function qsort(arr) {
//     if (arr.length <= 1)
//         return arr;
//     const pivot = arr.pop();
//     return [
//         ...qsort(arr.filter((el) => el <= pivot)),
//         pivot,
//         ...qsort(arr.filter((el) => el > pivot))
//     ];
// }

const qsort = ([pivot, ...rest]) =>
    rest.length
    ? [
        ...qsort(filter(rest, x => x <= pivot)),
        pivot,
        ...qsort(filter(rest, x => x > pivot))
    ]
    : typeof pivot !== 'undefined' ? [pivot] : [];



const sort = ([pivot, ...rest], f) =>
    rest.length
        ? [
            ...sort(filter(rest, x => f(x, pivot) <= 0), f),
            pivot,
            ...sort(filter(rest, x => f(x, pivot) > 0), f)
        ]
        : typeof pivot !== 'undefined' ? [pivot] : [];


// console.log(qsort(arrToSort));
// console.log(arrToSort.sort((a, b) => a < b ? 1 : -1));
// console.log(sort(arrToSort, (a, b) => a < b ? 1 : -1));
//
//
// console.log(arrToSort.sort((a, b) => a > b ? 1 : -1));
// console.log(sort(arrToSort, (a, b) => a > b ? 1 : -1));
//
//
const characters = [
    {name: 'Aublario', age: 18, power: 130},
    {name: 'Honser', age: 13, power: 250},
    {name: 'Bzothibhokh', age: 19, power: 80},
    {name: 'Per', age: 28, power: 20},
    {name: 'Goexisco', age: 12, power: 170},
    {name: 'Sploppend', age: 31, power: 110},
];
//
// console.log(arrT.sort((a, b) => a.age < b.age ? -1 : 1));
// console.log(sort(arrT, (a, b) => a.age < b.age ? -1 : 1));
// console.log(sort(arrT, (a, b) => a.name < b.name ? -1 : 1));


const names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];

const countOccurs = (acc, x) => ((x in acc) ? acc[x]++ : acc[x] = 1) && acc;

// console.log(reduce(names, countOccurs, {}));


let namesCounters = {};

for (let i = 0; i < names.length; i++) {
    (names[i] in namesCounters) ? namesCounters[names[i]]++ : namesCounters[names[i]] = 1;
}

// console.log(namesCounters);
// console.log(qsort(names));

const max = (arr, f = x => x) => reduce(arr, (acc, x) => f(x) > f(acc) ? x : acc, arr[0]);

// console.log(max(arrToSort));
// console.log(max(arrT, x => x.age));

const pipe = (...f) => x => reduce(f, (acc, v) => v(acc), x);

const findMature = arr => filter(arr, x => x.age >= 18);
const sortByPower = arr => sort(arr, (a, b) => a.power > b.power ? -1 : 1);
const multiplyPower = arr => map(arr, x => Object.assign({}, x, { power: x.power * 1.5 }));
const first3 = arr => reduce(arr, (acc, x) => acc.length >= 3 ?  acc : [...acc, x], []);

console.log(first3(multiplyPower(sortByPower(findMature(characters)))));
console.log(pipe(findMature, sortByPower, multiplyPower, first3)(characters));

const unary = f => x => f(x);

console.log(['10', '10', '10', '10'].map(x => parseInt(x)));
console.log(['10', '10', '10', '10'].map(unary(parseInt)));

