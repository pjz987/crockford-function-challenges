const add = (x, y) => x + y

const sub = (x, y) => x - y

const mul = (x, y) => x * y

const identity = (arg) => arg

const identityf = (arg) => () => arg

function addf(x) {
   return (y) => x + y
}

function liftf(fn) {
    return function(x) {
        return function(y) {
            return fn(x, y)
        }
    }
}

function curry(fn, x) {
    return function(y) {
        return fn(x, y)
    }
}

function twice(fn) {
    return (x) => fn(x, x)
}

function reverse(fn) {
    return (x, y) => fn(y, x)
}

function composeu(fn1, fn2) {
    return (x) => fn2(fn1(x))
}

function composeb(fn1, fn2) {
    return (x, y, z) => fn2(z, fn1(x, y))
}

function limit(fn, int) {
    let counter = 0
    function outFunc(x, y) {
        console.log(counter)
        if (int > counter) {
            counter++
            return fn(x, y)
        }
    }
    return outFunc
}

function from(start) {
    counter = -1
    return function() {
        counter ++
        return start + counter
    }
}

function to(gen, end) {
    return function(int) {
        if (int < end) {
            return gen(int)
        }
    }
}