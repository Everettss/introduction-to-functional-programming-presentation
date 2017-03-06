
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


// const res = reduce(sum, 0, arr);

console.log(reduce(arr, sum, 0));
console.log(map(arr, x => x * 2));
console.log(map2(arr, x => x * 2));
console.log(filter(arr, x => x > 2));
console.log(find(arr, x => x > 1 && x < 4));
console.log(arr.find(x => x > 1 && x < 4));


console.log(
    ((arr, f) => (
        function reduce([head, ...rest], f, base) {
            return typeof head !== 'undefined'
                ? reduce(rest, f, f(base, head))
                : base
        })(arr, (acc, x) => [...acc, f(x)], [])
    )([1, 2, 3, 4], x => x * 2)
);

console.log(
    (x => x * 2)(3)
);

