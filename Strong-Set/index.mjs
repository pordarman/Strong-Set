/**
 * Checks if the elements in two entered objects are all the same
 * @param {Object} object1 
 * @param {Object} object2 
 * @returns {Boolean}
 */

function sameObject(object1, object2) {
    let objectEnt1 = Object.entries(object1)
    let objectEnt2 = Object.entries(object2)
    if (objectEnt1.length != objectEnt2.length) return false
    for (const value of objectEnt1) {
        let obj = objectEnt2.find(a => a[0] === key)
        if (!obj || !sameValue(value, obj[1])) return false
    }
    return true
}

/**
 * Checks if two entered values are the same
 * @param {any} value1 
 * @param {any} value2 
 * @returns {Boolean}
 */

function sameValue(value1, value2) {
    try {
        if (value1 === value2) return true;
        let pro1 = Object.prototype.toString.call(value1)
        let pro2 = Object.prototype.toString.call(value2)
        if (pro1 !== pro2) return false
        switch (pro1) {
            case "[object String]":
            case "[object Number]":
            case "[object Boolean]": {
                return value1 === value2
            }
            case "[object Array]": {
                return sameArray(value1, value2)
            }
            case "[object Date]": {
                return value1.getTime() === value2.getTime()
            }
            case "[object Object]": {
                return sameObject(value1, value2)
            }
        }
        if (value1 instanceof Set && value2 instanceof Set) return sameArray([...value1], [...value2])
        if (value1 instanceof Set && value2 instanceof Set) return sameArray([...value1.entries()], [...value2.entries()])
        if (value1 instanceof RegExp && value2 instanceof RegExp) return (value1.source === value2.source) && (value1.flags === value2.flags)
        if (value1?.prototype !== undefined) return value1?.prototype === value2?.prototype
        if (value1?.name !== undefined) return value1?.name === value2?.name
    } catch (e) { }
    return false
}

/**
 * Checks if the elements in the two entered arrays are all the same
 * @param {Array} array1 
 * @param {Array} array2 
 * @returns {Boolean}
 */

function sameArray(array1, array2) {
    let obj = {}
    if (array1.length != array2.length) return false
    return array1.every(value_1 => array2.some((a2, i) => {
        let isSame = sameValue(value_1, a2)
        if (!isSame || obj[i]) return false
        obj[i] = true
        return true
    }))
}

class StrongSet extends Set {

    /**
     * You set whether to create the Set function with any value while it is being created
     * @param {StrongSet|Set|Array} props 
     */
    constructor(props) {
        super(props)
    }



    /**
     * Default sort function to use when sorting objects in an array
     * @param {any} firstValue - First object to sort
     * @param {any} secondValue - Second object to sort
     * @returns {Boolean}
     */

    static defaultSort(firstValue, secondValue) {
        return Number(firstValue > secondValue) || Number(firstValue === secondValue) - 1;
    }



    /**
     * Release version of StrongSet module
     * @returns {String} 
     */

    get version() {
        return `v0.0.1`
    }



    /**
     * Make the return value "[object StrongSet]" in the Object.prototype.toString.call(StrongSet) function
     * @returns {String}
     */

    get [Symbol.toStringTag]() {
        return "StrongSet"
    }



    /**
     * Appends a new element with a specified value to the end of the Set. Identical in behavior to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/add Set.add()}
     * @param {any} value - Data to be added to the Set function
     * @returns {StrongSet}
     */

    add(value) {
        super.add(value);
        return this;
    }



    /**
     * Checks if the value you entered in the Set function exists. Identical in behavior to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/has Set.has()}
     * @param {any} value - Data to check
     * @param {Boolean}
     */

    has(value) {
        return super.has(value) || [...this.keys()].some(key => sameValue(value, key));
    }



    /**
     * It deletes all the data inside the Set function and recreates the function by writing the data you entered into the Set function
     * @param {...any} values - Data to be written into when recreating the Set function
     * @returns {StrongSet}
     * @example
     * 
     * // Let's write some data first
     * StrongSet.add("hello")
     * StrongSet.add("test")
     * 
     * // There are only 2 data in the Set function. Now let's add multiple new data without touching the data inside this function
     * StrongSet.addMany("hii", "whats up", "bro", "heyy")
     * 
     * // Now when we print this Set function to console, we will see "hello" "test", "hii", "whats up", "bro" and "heyy" value data
     * 
     * console.log(StrongSet) // StrongSet(6) { 'hello', 'test', 'hii', 'whats up', 'bro', 'heyy' }
     */

    addMany(...values) {
        for (const value of values) {
            super.add(value)
        }
        return this
    }



    /**
     * It deletes all the data inside the Set function and recreates the function by writing the data you entered into the Set function
     * @param {Set|StrongSet|Array<any>} values - Data to be written into when recreating the Set function
     * @returns {StrongSet}
     * @example
     * 
     * // Let's write some data first
     * StrongSet.add("hello")
     * StrongSet.add("test")
     * 
     * // There are only 2 data in the Set function. Now we delete all the data inside this function and create a new one
     * StrongSet.setSet("hii", "ily <3")
     * 
     * // Now when we print this Set function to the console we will only see the key data "this" and "a"
     * 
     * console.log(StrongSet) // StrongSet(2) { 'hii', 'ily <3' }
     */

    setSet(...values) {
        super.clear()
        for (const value of values) {
            this.add(value)
        }
        return this;
    }



    /**
     * Used to delete data from the Set function Identical in behavior to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/delete Set.delete()}
     * @param {any} value - The name of the value to delete
     * @returns {Boolean} Returns true if the data to be deleted exists in the Set function, false otherwise
     */

    delete(value) {
        if (super.has(value)) return super.delete(value)
        let keys = [...this.keys()],
            dataIndex = keys.findIndex(value_1 => sameValue(value_1, value))
        if (dataIndex === -1) return false;
        super.clear()
        for (const value_1 of keys.slice(0, dataIndex)) {
            this.add(value_1)
        }
        for (const value_1 of keys.slice(dataIndex + 1)) {
            this.add(value_1)
        }
        return true
    }



    /**
     * Deletes the first element of the Set function
     * @param {Number} amount - Number of data to be deleted
     * @return {Boolean} Returns true if the data to be deleted exists in the Set function, false otherwise
     */

    deleteFirst(amount = 1) {
        let size = this.size
        if (size === 0) return false;
        amount = Math.floor(amount)
        if (amount === 1 || isNaN(amount)) {
            let key = this.keys().next().value
            return this.delete(key)
        }
        amount = Math.min(size, amount)
        if (amount < 0) return this.deleteLast(-amount)
        let keys = [...this.keys()].slice(0, amount)
        for (const key of keys) {
            this.delete(key)
        }
        return true
    }



    /**
     * Deletes the last element of the Set function
     * @param {Number} amount - Number of data to be deleted
     * @return {Boolean} Returns true if the data to be deleted exists in the Set function, false otherwise
     */

    deleteLast(amount = 1) {
        let size = this.size
        if (size === 0) return false;
        amount = Math.floor(amount)
        if (amount === 1 || isNaN(amount)) {
            let keys = [...this.keys()]
            let lastKey = keys[keys.length - 1]
            return this.delete(lastKey)
        }
        amount = Math.min(size, amount)
        if (amount < 0) return this.deleteFirst(-amount)
        let keys = [...this.keys()].slice(-amount)
        for (const key of keys) {
            this.delete(key)
        }
        return true
    }



    /**
     * Checks if the key values you entered are all found in the Set function
     * @param  {...any} values - Values to be checked
     * @returns {Boolean}
     */

    hasAll(...values) {
        return values.every((key) => this.has(key));
    }



    /**
     * Checks if at least 1 of the key values you entered exists in the Set function
     * @param  {...any} values - Values to be checked
     * @returns {Boolean}
     */

    hasAny(...values) {
        return values.some((key) => this.has(key));
    }



    /**
     * Calls first saved data or multiple data values in Set function
     * @param {Number} amount - Number of values to call
     * @returns {any|Array<any>}
     */

    first(amount = 1) {
        amount = Math.floor(amount)
        if (amount === 1 || isNaN(amount)) return this.values().next().value;
        if (amount < 0) return this.last(-amount);
        amount = Math.min(this.size, amount);
        const iter = this.values();
        return Array.from({ length: amount }, () => iter.next().value);
    }



    /**
     * Calls last saved data or multiple data values in Set function
     * @param {Number} amount - Number of values to call
     * @returns {any|Array<any>}
     */

    last(amount = 1) {
        amount = Math.floor(amount)
        const arr = [...this.values()];
        if (amount === 1 || isNaN(amount)) return arr[arr.length - 1];
        if (amount < 0) return this.first(-amount);
        if (!amount) return [];
        return arr.slice(-amount);
    }



    /**
     * Returns the value corresponding to the index value in an array. Identical in behavior to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at Array.at()}
     * @param {Number} index - Index number
     * @returns {any}
     */

    at(index) {
        index = Math.floor(index);
        const arr = [...this.values()];
        return arr.at(index);
    }



    /**
     * It pulls random data from all values
     * @param {Number} amount - Number of data to return
     * @returns {any|Array<any>}
     */

    random(amount = 1) {
        let size = this.size
        if (size === 0) return [];
        amount = Math.floor(amount)
        const arr = [...this.values()];
        if (amount === 1 || isNaN(amount)) return arr[Math.floor(Math.random() * arr.length)];
        amount = Math.min(size, amount)
        if (!amount) return [];
        return Array.from({ length: amount }, () => arr.splice(Math.floor(Math.random() * arr.length), 1)[0]);
    }



    /**
     * Reverses the data inside the Set function. Identical in behavior to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse Array.reverse()}
     * @returns {StrongSet}
     */

    reverse() {
        const entries = [...this.keys()].reverse();
        this.clear();
        for (const value of entries) {
            this.add(value)
        }
        return this;
    }



    /**
     * Checks if the Set function is empty
     * @returns {Boolean}
     */

    isEmpty() {
        return this.size === 0
    }


    /**
     * Searches for the value of a single item where the given function returns a truthy value. Identical in behavior to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find Array.find()}
     * @param {( value: any, index: Number, this: StrongSet ) => Boolean} fn - The function to test with (should return boolean)
     * @param {any} thisArg - Value to use as `this` when executing function
     * @returns {any}
     */

    find(fn, thisArg) {
        if (typeof fn !== "function") throw new TypeError(`The ${fn} value is not a function. Please enter a valid function expression`);
        if (thisArg !== undefined) fn = fn.bind(thisArg);
        const keys = [...this.keys()];
        for (let i = 0; i < this.size; i++) {
            const value = keys[i];
            if (fn(value, i, this)) return value;
        }
        return undefined;
    }



    /**
     * Removes items that satisfy the provided filter function
     * @param {( value: any, index: Number, this: StrongSet ) => Boolean} fn - Function used to test (should return a boolean)
     * @param {any} thisArg - Value to use as `this` when executing function 
     * @returns {Number} The number of removed entries
     */

    sweep(fn, thisArg) {
        if (typeof fn !== "function") throw new TypeError(`The ${fn} value is not a function. Please enter a valid function expression`);
        if (thisArg !== undefined) fn = fn.bind(thisArg);
        const previousSize = this.size,
            keys = [...this.keys()];
        for (let i = 0; i < this.size; i++) {
            const value = keys[i];
            if (fn(value, i, this)) this.delete(value);
        }
        return previousSize - this.size;
    }



    /**
     * Searches for the value of multiple elements for which the given function returns a true value and returns them in the Set function, not an array. Identical in behavior to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter Array.filter()}
     * @param {( value: any, index: Number, this: StrongSet ) => Boolean} fn - The function to test with (should return boolean)
     * @param {any} thisArg - Value to use as `this` when executing function
     * @returns {StrongSet}
     */

    filter(fn, thisArg) {
        if (typeof fn !== "function") throw new TypeError(`The ${fn} value is not a function. Please enter a valid function expression`);
        if (thisArg !== undefined) fn = fn.bind(thisArg);
        const results = new this.constructor[Symbol.species](),
            keys = [...this.keys()];
        for (let i = 0; i < this.size; i++) {
            const value = keys[i];
            if (fn(value, i, this)) results.add(value);
        }
        return results;
    }


    /**
     * Partitions the StrongSet into two Sets where the first StrongSet contains the items that passed and the second contains the items that failed
     * @param {( value: any, index: Number, this: StrongSet ) => Boolean} fn - Function used to test (should return a boolean)
     * @param {any} thisArg - Value to use as `this` when executing function
     * @returns {Array<StrongSet,StrongSet>}
     */

    partition(fn, thisArg) {
        if (typeof fn !== "function") throw new TypeError(`The ${fn} value is not a function. Please enter a valid function expression`);
        if (thisArg !== undefined) fn = fn.bind(thisArg);
        const results = [
            new this.constructor[Symbol.species](),
            new this.constructor[Symbol.species]()
        ],
            keys = [...this.keys()];
        for (let i = 0; i < this.size; i++) {
            const value = keys[i];
            if (fn(value, i, this)) {
                results[0].add(value);
            } else {
                results[1].add(value);
            }
        }
        return results;
    }



    /**
     * Sets each item into a StrongSet, then joins the results into a single StrongSet. Identical in behavior to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap Array.flatMap()}
     * @param {( value: any, index: Number, this: StrongSet ) => any} fn - Function that produces a new StrongSet
     * @param {any} thisArg - Value to use as `this` when executing function
     * @returns {StrongSet}
     */

    flatMap(fn, thisArg) {
        const Sets = this.map(fn, thisArg);
        return new this.constructor[Symbol.species]().concat(...Sets);
    }



    /**
     * Sets each item to another value into an array. Identical in behavior to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map Array.map()}
     * @param {( value: any, index: Number, this: StrongSet ) => any} fn - Function that produces an element of the new array, taking three arguments
     * @param {any} thisArg - Value to use as `this` when executing function 
     * @returns {Array<any>}
     */

    map(fn, thisArg) {
        if (typeof fn !== "function") throw new TypeError(`The ${fn} value is not a function. Please enter a valid function expression`);
        if (thisArg !== undefined) fn = fn.bind(thisArg);
        const iter = this.keys();
        return Array.from({ length: this.size }, (_, i) => {
            return fn(iter.next().value, i, this);
        });
    }



    /**
     * Checks if there exists an item that passes a test. Identical in behavior to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some Array.some()}
     * @param {( value: any, index: Number, this: StrongSet ) => Boolean} fn - Function used to test (should return a boolean)
     * @param {any} thisArg - Value to use as `this` when executing function
     * @returns {Boolean}
     */

    some(fn, thisArg) {
        if (typeof fn !== "function") throw new TypeError(`The ${fn} value is not a function. Please enter a valid function expression`);
        if (thisArg !== undefined) fn = fn.bind(thisArg);
        const keys = [...this.keys()];
        for (let i = 0; i < this.size; i++) {
            if (fn(keys[i], i, this)) return true;
        }
        return false;
    }



    /**
     * Checks if all items passes a test. Identical in behavior to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every Array.every()}
     * @param {( value: any, index: Number, this: StrongSet ) => Boolean} fn - Function used to test (should return a boolean)
     * @param {any} thisArg - Value to use as `this` when executing function
     * @returns {Boolean}
     */

    every(fn, thisArg) {
        if (typeof fn !== "function") throw new TypeError(`The ${fn} value is not a function. Please enter a valid function expression`);
        if (thisArg !== undefined) fn = fn.bind(thisArg);
        const keys = [...this.keys()];
        for (let i = 0; i < this.size; i++) {
            if (!fn(keys[i], i, this)) return false;
        }
        return true;
    }



    /**
     * Applies a function to produce a single value. Identical in behavior to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce Array.reduce()}
     * @param {( initialValue: any, value: any, this: StrongSet ) => any} fn - Function used to reduce, taking four arguments; `accumulator`, `currentValue` and `StrongSet`
     * @param {any} initialValue - Starting value for the accumulator
     * @returns {any}
     */

    reduce(fn, initialValue) {
        if (typeof fn !== "function") throw new TypeError(`The ${fn} value is not a function. Please enter a valid function expression`);
        let accumulator;
        if (initialValue !== undefined) {
            accumulator = initialValue;
            for (const value of this) accumulator = fn(accumulator, value, this);
            return accumulator;
        }
        let first = true;
        for (const value of this) {
            if (first) {
                accumulator = value;
                first = false;
                continue;
            }
            accumulator = fn(accumulator, value, this);
        }
        if (first) throw new TypeError("Reduce of empty Set with no initial value");
        return accumulator;
    }



    /**
     * Identical to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/forEach Set.forEach()} but returns the StrongSet instead of undefined
     * @param {( value: any, value2: any, this: StrongSet ) => any} fn - Function to execute for each element
     * @param {any} thisArg - Value to use as `this` when executing function
     * @returns {StrongSet}
     */

    each(fn, thisArg) {
        if (typeof fn !== "function") throw new TypeError(`The ${fn} value is not a function. Please enter a valid function expression`);
        this.forEach(fn, thisArg);
        return this;
    }



    /**
     * Runs a function on the StrongSet and returns the StrongSet
     * @param {( this: StrongSet ) => any} fn 
     * @param {any} thisArg 
     * @returns {StrongSet}
     */

    tap(fn, thisArg) {
        if (typeof fn !== "function") throw new TypeError(`The ${fn} value is not a function. Please enter a valid function expression`);
        if (thisArg !== undefined) fn = fn.bind(thisArg);
        fn(this);
        return this;
    }



    /**
     * Creates an identical shallow copy of this StrongSet
     * @returns {StrongSet}
     */

    clone() {
        return new this.constructor[Symbol.species](this);
    }



    /**
     * Combines this StrongSet with others into a new StrongSet. None of the source Sets are modified
     * @param  {...(StrongSet|Set)} Sets - Sets to merge
     * @returns {StrongSet}
     */

    concat(...Sets) {
        const newColl = this.clone();
        for (const Set of Sets) {
            for (const value of Set) {
                newColl.add(value);
            }
        }
        return newColl;
    }


    /**
     * Checks if this StrongSet shares identical items with another
     * @param {StrongSet|Set} Set 
     * @returns {Boolean}
     */

    equals(Set) {
        if (!Set) return false;
        if (this === Set) return true;
        if (this.size !== Set.size) return false;
        for (const value of this) {
            if (!Set.has(value)) return false;
        }
        return true;
    }



    /**
     * The sort method sorts the items of a StrongSet in place and returns it
     * @param {( value_1: any, value_2 ) => Boolean} compareFunction - Specifies a function that defines the sort order. If omitted, the StrongSet is sorted according to each character's Unicode code point value, according to the string conversion of each element
     * @returns {StrongSet}
     */

    sort(compareFunction = StrongSet.defaultSort) {
        const entries = [...this.keys()];
        entries.sort((a, b) => compareFunction(a[0], b[0]));
        super.clear();
        for (const value of entries) {
            super.add(value);
        }
        return this;
    }



    /**
     * The intersect method returns a new structure containing items where the keys and values are present in both original structures
     * @param {StrongSet|Set} other - The other StrongSet to filter against
     * @returns {StrongSet}
     */

    intersect(other) {
        const Set = new this.constructor[Symbol.species]();
        for (const value of other) {
            if (this.has(value)) Set.add(value);
        }
        return Set;
    }



    /**
     * The difference method returns a new structure containing items where the key is present in one of the original structures but not the other
     * @param {StrongSet|Set} other - The other StrongSet to filter against
     * @returns 
     */

    difference(other) {
        const Set = new this.constructor[Symbol.species]();
        for (const value of other) {
            if (!this.has(key)) Set.add(value);
        }
        for (const value of this) {
            if (!other.has(key)) Set.add(value);
        }
        return Set;
    }



    /**
     * The sorted method sorts the elements of a StrongSet and returns it. This does not change the main object
     * @param {( value_1: any, value_2 ) => Boolean} compareFunction - Specifies a function that defines the sort order. If omitted, the StrongSet is sorted according to each character's Unicode code point value, according to the string conversion of each element
     * @returns {StrongSet}
     */

    sorted(compareFunction = StrongSet.defaultSort) {
        return new this.constructor[Symbol.species](this).sort((av, bv) => compareFunction(av, bv));
    }



    /**
     * Set function returns Array object as
     * @returns {Array<any>}
     */

    toArray() {
        return [...this.keys()];
    }


}

export default StrongSet;