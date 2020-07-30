const add = (x, y) => x + y

const sub = (x, y) => x - y

const mul = (x, y) => x * y

const identity = (arg) => arg

const identityf = (arg) => () => arg

function addf(x) {
    return (y) => x + y
}

function liftf(fn) {
    return function (x) {
        return function (y) {
            return fn(x, y)
        }
    }
}

function curry(fn, x) {
    return function (y) {
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
        if (int > counter) {
            counter++
            return fn(x, y)
        }
    }
    return outFunc
}

function from(start) {
    let counter = -1
    return function () {
        counter++
        return start + counter
    }
}

function to(gen, end) {
    return function (x) {
        // console.log(gen(x), end)
        let value = gen(x)
        if (value < end) {
            return value
        }
    }
}

function fromTo(start, end) {
    let counter = -1
    return function () {
        counter++
        if (start + counter < end) {
            return start + counter
        }
    }
}

function element(arr, gen) {
    if (gen) {
        return () => arr[gen()]
    } else {
        let counter = -1
        return function () {
            counter++
            return arr[counter]
        }
    }
}

function collect(gen, array) {
    return function () {
        let index = gen()
        if (index != undefined) {
            array.push(index)
            // console.log(array, index)
            return index
        }
    }
}

function filter(gen, pred) {
    return function () {
        while (true) {
            let value = gen()
            if (pred(value)) {
                return value
            } else if (value === undefined) {
                return undefined
            }
        }
    }
    // let counter = 0
    // function checkPred() {
    //     let value = gen()
    //     // console.log(pred(value))
    //     if (pred(value)) {
    //         counter ++
    //         console.log(counter, 'counter')
    //         console.log(value, 'value')
    //         return value
    //     } else if (value != undefined) {
    //         // console.log(value)
    //         checkPred()
    //     }
    // }
    // return checkPred
}

function concat(gen1, gen2) {
    let gen = 1
    return function () {
        if (gen === 1) {
            let value = gen1()
            if (value != undefined) {
                return value
            } else {
                gen = 2
            }
        }
        if (gen === 2) {
            let value = gen2()
            return value
        }
    }
}

function repeat(gen) {
    while (true) {
        value = gen()
        if (value === undefined) {
            break
        }
    }
}

function gensymf(a) {
    let counter = 0;
    return function() {
        counter ++
        return a + counter
    }
}

function counter(x) {
    let y = x
    let obj = {
        
        up: function() {
            y++
            return y
        },
        down: function() {
            y--
            return y
        }
    }
    // console.log(obj)
    return obj
}

function revocable(fn) {
    let revoked = false
    let obj = {
        invoke: (x, y) => {
            if (!revoked) {
                return fn(x, y)
            }
        },
        revoke: () => {
            revoked = true
        }
    }
    return obj
}

function m(val, source=null) {
    if (source === null) {
        source = val.toString()
    }
    return {
        value: val,
        source: source
    }
}

function addm(m1, m2) {
    return {
        value: m1.value + m2.value,
        source: `(${m1.source}+${m2.source})`,
    }
}

function liftm(fn, str) {
    return function(m1, m2) {
        return {
            value: fn(m1.value, m2.value),
            source: `(${m1.source}${str}${m2.source})`
        }
    }
}

function exp(arr) {
    let fn = arr[0]
    let args = arr.filter((el, i) => i > 0)
    args = args.map((el) => (typeof(el) === 'object') ? exp(el) : el)
    return fn(...args)
}

function addg(x) {
    return (y) => {
        x + addf(y)
    }
}