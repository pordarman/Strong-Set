## [![Alisa Logo](https://i.hizliresim.com/aug2sp9.png)](https://www.npmjs.com/package/strong-set/)


[![Package Name](https://img.shields.io/badge/Package%20name-strong--set-red)](https://www.npmjs.com/package/strong-set/)
[![Package size](https://img.shields.io/bundlejs/size/strong-set?label=Package%20size)](https://www.npmjs.com/package/strong-set/)
[![Version](https://img.shields.io/npm/v/strong-set.svg?label=Package%20version)](https://www.npmjs.com/package/strong-set/)
[![License](https://img.shields.io/npm/l/strong-set.svg?label=License)](https://www.npmjs.com/package/strong-set/)

[![NPM](https://nodei.co/npm/strong-set.png?downloads=true)](https://www.npmjs.com/package/strong-set/)

# Source file

- [strong-set](https://github.com/pordarman/strong-set)

<br>

# Creator(s)

- [Ali Çelik](https://github.com/pordarman)

<br>

# Social media accounts

- Ali: [Instagram](https://www.instagram.com/ali.celk/) - [Discord](https://discord.com/users/488839097537003521) - [Spotify](https://open.spotify.com/user/215jixxk4morzgq5mpzsmwwqa?si=41e0583b36f9449b)

<br>

# What is this module?

- This module is more advanced version of Set function

- This module provides a more stable way for you by eliminating the deficiencies and errors of the Set function

- It has all the commands you need and there is an explanation of how each command should be used

<br>

# So how to use?

It's very simple, first you have to open any javascript file and write the following in it:
<br>

```js
// Node.js
const Strong_Set = require("strong-set")

// Without node.js
import Strong_Set from "strong-set"


// Build without any data in it
const StrongSet_1 = new Strong_Set()

// Build with data inside (Array)
const StrongSet_2 = new Strong_Set(["value", "anotherValue"])

// Build with data inside (Set or StrongSet)
const StrongSet_3 = new Strong_Set(StrongSet_1)
```

Each StrongSet specifies a different Set function and the data they all hold is different. You can increase this as much as you want

After typing this you can access **all** commands

<br>

### **CAUTION!!**
Please make your definitions as above. If you have made a definition as below, the module will not work properly and will give an error!

```js
// Incorrect command definition

const Strong_Set = require("strong-set")

const { has, add } = new Strong_Set()
// This command will throw an error!


const StrongSet = new Strong_Set()
// This command will work as it should
```

<br>

# Example

Now let's show how to write data to the Set function and check the written data
<br>

```js
// Writing data to the Set function
StrongSet.add("hello")
StrongSet.add({ hello: "World!" })

// Now when we print the StrongSet function to the console, the following will appear on the screen:
```
![Writing data to the Set function](https://i.hizliresim.com/jrao0l3.png)

<br>

Now let's try to pull the data we wrote
```js
// Now let's check the data we wrote
StrongSet.has("hello") // true

StrongSet.has({ hello: "World!" }) // true
// If you tried to check it with the regular Set function, it would most likely return false.
// But thanks to this StrongSet module, it will return whatever data you typed, no matter what you typed
```

*StrongSet module always wins*

<br>

# So why strong-set?

- The StrongSet module is a fairly simple yet effective module and overpowered for its package size

- The StrongSet module is an open source module, so if you get an error you can fix it yourself

- The StrongSet module is being developed every day, helping you in the best way with new features and increasing performance

- You don't have to wait long while downloading due to the low package size

- Aaaannddd if you download it you will make me very happy 👉👈

<br>


# Updates

## v0.0.1

- Module shared publicly 🥳🥳

<br>

Please do not forget to use it in the latest version for more **stable** and **performance** of the module!

<br>

# And finally

- If you want to support this module, if you request me on [github](https://github.com/pordarman), I will be happy to help you

- Thank you for reading this far, i love you 💗

- See you in my next modules!

<br>

![lovee](https://gifdb.com/images/high/drake-heart-hands-aqm0moab2i6ocb44.webp)
