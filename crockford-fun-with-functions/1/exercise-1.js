(() => {
    var log = (arg) => {
        if (typeof arg === "object") arg = JSON.stringify(arg)

        document.writeln(arg)
    }

    var add = (num1, num2) => num1 + num2
    var sub = (num1, num2) => num1 - num2
    var mul = (num1, num2) => num1 * num2

    var identifyF = (arg) => {
        return () => arg
    }

    var addF = (arg1) => {
        return (arg2) => {
            return arg1 + arg2
        }
    }

    var curry = (func, arg1) => {
        return (arg2) => {
            return func(arg1, arg2)
        }
    }

    var curryR = (func, arg1) => {
        return (arg2) => {
            return func(arg2, arg1)
        }
    }

    var liftF = (func) => {
        return (arg1) => {
            return (arg2) => {
                return func(arg1, arg2)
            }
        }
    }

    var inc1 = addF(1)
    var inc2 = curry(add, 1)
    var inc3 = curryR(add, 1)
    var inc4 = liftF(add)(1)

    var twice = (func) => {
        return (arg1) => {
            return func(arg1, arg1)
        }
    }

    var doubL = twice(add)
    var square = twice(mul)

    var reverse = (func) => {
        return (arg1, arg2) => {
            return func(arg2, arg1)
        }
    }

    var reverse2 = (func) => {
        return (...args) => {
            return func(...args.reverse())
        }
    }

    // 👆 Reverses any number of arguments - nice

    var composeU = (func1, func2) => {
        return (arg1) => {
            return func2(func1(arg1))
        }
    }

    // Write a function that takes two binary functions and returns a function that calls them both
    // using the arguments from the second invocation

    var composeB = (func1, func2) => {
        return (arg1, arg2, arg3) => {
            return func2(func1(arg1, arg2), arg3)
        }
    }

    // Write a limit function that allows a binary function to be called a limited number of times

    var limit = (func, lim) => {
        var count = 0
        return (arg1, arg2) => {
            count ++
            if (count <= lim) { return func(arg1, arg2) }
            return undefined
        }
    }

    var addLtd = limit(add, 1)

    // GENERATORS

    // Write a FROM factory that produces a generator that will produce a series of values

    // var from = (arg) => {
    //     var count = arg - 1

    //     return () => {
    //         count += 1
    //         return count
    //     }
    // }

    // 👇🏻 Doug's answer

    var from = (arg) => {
        return () => {
            var next = arg
            arg += 1
            return next
        }
    }

    var gen = from(10)

    // Write a TO factory that takes a generator and an end value, and returns a generator that will
    // produce numbers up to that limit

    var to = (gen, endVal) => {
        return () => {
            var x = gen()
            
            if (x < endVal) {
                return x
            }

            return undefined
        }
    }

    var gen = to(from(3), 5)

    // Write a FROMTO factory that produces a generator that will produce values in a range

    // var fromTo = (fromVal, toVal) => {
    //     var count = fromVal - 1

    //     return () => {
    //         count += 1

    //         if (count < toVal) {
    //             return count
    //         }

    //         return undefined
    //     }
    // }

    // Doug's answer below:

    var fromTo = (start, end) => {
        return to(from(start), end)
    }

    var gen = fromTo(0, 3)

    // Write an ELEMENT factory that takes an array and a generator and returns a generator that will
    // produce elements from the array

    var element = (arr, generator) => {
        return () => {
            return arr[generator()]
        }
    }

    // Doug's answer below:

    var element = (array, gen) => {
        return () => {
            var index = gen()

            if (index !== undefined) {
                return array[index]
            }
        }
    }

    var gen = element(["a", "b", "c", "d"], fromTo(1, 3))

    // Modify the ELEMENT factory so that the generator argument is optional. 
    // If a generator is not provided, then each of the elements of the array will be produced.

    // var element = (array, gen) => {
    //     var count = 0

    //     return () => {
    //         if (gen) {
    //             var index = gen()
                
    //             if (index !== undefined) {
    //                 return array[index]
    //             }
    //         } else {
    //             var elem = array[count]
    //             count += 1
    //             return elem
    //         }
    //     }
    // }

    // Doug's answer

    var element = (array, gen) => {
        if (gen === undefined) {
            gen = fromTo(0, array.length)
        }

        return function() {
            var index = gen()

            if (index !== undefined) {
                return array[index]
            }
        }
    }

    var gen = element(["a", "b", "c", "d"])

    // Write a COLLECT generator that takes a generator and an array and produces a function that will
    // collect the results in the array


    var collect = (gen, arr) => {
        return () => {
            var val = gen()

            if (val !== undefined) {
                arr.push(val)
            }

            return val
        }
    }

    var array = []
    var gen = collect(fromTo(0, 2), array)

    // Write a FILTER factory that takes a generator and a predicate (returns true or false
    // depending on conditions) and produces a generator that produces only the values approved by
    // the predicate

    // var filter = (generator, predicate) => {
    //     return () => {
    //         var array = []
    //         collect(generator, array)()
    //     }
    // }

    // Doug's answer
    function filter(gen, predicate) {
        return function() {
            var value

            do {
                value = gen()
            } while (
                value !== undefined
                && !predicate(value)
            )

            return value
        }
    }

    var gen = filter(
        fromTo(0, 5),
        function third(value) {
            return (value % 3) === 0
        })

    // Write a CONCAT factory that takes two generators and produces a generator that combines the sequences

    var concat = (gen1, gen2) => {
        return () => {
            let val = gen1()

            if (val !== undefined) {
                return val
            } else {
                let val = gen2()
                return val
            }
        }
    }

    var gen = concat(fromTo(0, 3), fromTo(0, 2))

    // var genSymF = (prefix) => {
    //     var count = 0

    //     return () => {
    //         count += 1
    //         if (typeof prefix === 'string') {
    //             return `${prefix}${count}`
    //         }
    //     }
    // }


    var genSymF = (prefix) => {
        var gen = from(1)
        
        return () => {
            if (typeof prefix === 'string') {
                return `${prefix}${gen()}`
            }
        }
    }

    var genTaco = genSymF('🌮')

    // Make a factory factory genSymFF that takes a starting value and returns a factory

    var genSymFF = (startVal) => {
        return (prefix) => {
            var gen = from(startVal)

            return () => {
                if (typeof prefix === 'string') {
                    return `${prefix}${gen()}`
                }
            }
        }
    }

    var genSymF = genSymFF(10)

    var genG = genSymF('G')

    // Make a factory fibonacciIf that returns a generator that will return the next fobonacci number

    var fibonacciIf = (num1, num2) => {
        var lastVal = num1
        var nextVal = num2
        
        return () => {
            var total = lastVal + nextVal

            lastVal = nextVal
            nextVal = total

            return total
        }
    }

    var fib = fibonacciIf(0, 1)

    // Write a counter constructor that returns an object containing two functions that implement an
    // up/down counter, hiding the counter

    var counter = () => {
        var count = 0

        return {
            up: () => {
                count += 1
                return count
            },
            down: () => {
                count -= 1
                return count
            }
        }
    }

    var object = counter()

    var up = object.up
    var down = object.down

    // log(up())
    // log(down())
    // log(down())
    // log(up())

    // Make a revocable constructor that takes a binary function, and returns an object containing an invoke
    // function that can invoke the binary function, and a revoke function that disables the invoke function

    
    var revocable = (func) => {
        var isRevoked = false

        return {
            invoke: (arg1, arg2) => {
                if (!isRevoked) {
                    return func(arg1, arg2)
                }
            },
            revoke: () => {
                isRevoked = true
            }

        }
    }

    var rev = revocable(add)
    var add_rev = rev.invoke

    // log(add_rev(3,4)) // 7
    // rev.revoke()
    // log(add_rev(5,7)) // undefined

    // Write a constructor m that takes a value and an optional source string, and returns them in an object

    var m = (value, source) => {
        return {
            value,
            source: (typeof source === 'string')
                ? source
                : String(value)
        }
    }

    // Write a function addM that takes two m objects and returns an m object

    // var addM = (m1, m2) => {
    //     return {
    //         value: m1.value + m2.value,
    //         source: `(${m1.value} + ${m2.value})`
    //     }
    // }

    var addM = (m1, m2) => {
        return m(
            m1.value + m2.value,
            `(${m1.source} + ${m2.source})`
        )
    }

    // log((addM(m(3), m(4))))

    // Write a function liftM that takes a binary function and a string, and returns a function that acts
    // on m objects

    var liftM = (func, separator) => {
        return (arg1, arg2) => {
            return {
                value: func(arg1.value, arg2.value),
                source: `(${arg1.source} ${separator} ${arg2.source})`
            }
        }
    }

    var addM = liftM(add, '+')
    var mulM = liftM(mul, '*')

    // log(mulM(m(3), m(4)))

    // Modify liftM so that the functions it produces can accept arguments that are either numbers or m objects

    var liftM = (func, separator) => {
        var sanitize = (objOrNum) => {
            if (typeof objOrNum === 'object') {
                return objOrNum
            } else {
                return {
                    value: objOrNum,
                    source: objOrNum
                }
            }
        }

        return (arg1, arg2) => {
            var sanitizedArg1 = sanitize(arg1)
            var sanitizedArg2 = sanitize(arg2)

            return {
                value: func(sanitizedArg1.value, sanitizedArg2.value),
                source: `(${sanitizedArg1.source} ${separator} ${sanitizedArg2.source})`
            }
        }
    }

    var addM = liftM(add, '+')

    // log(addM(3, 4))

    // Make a fuction continuize that takes a unary function and returns a function that takes a callback
    // and an argument

    var continuize = (func) => {
        return (callback, arg) => {
            callback(func(arg))
        }
    }

    var sqrtC = continuize(Math.sqrt)

    sqrtC(console.log, 81)

})()