# bisecting-numbers

> Integer-like number system where any number can be bisected to form infinite
> integer *sub*systems.

# background

## what *is* this?

If used without bisection, bisecting numbers cover the integers (`..., -3, -2,
-1, 0, 1, 2, 3, ...`) 1:1. They are represented in code as though as `string`,
not `number`.

`'50'` is a valid bisecting number.

However, it's superpower is that it provides the means to bisect an integer into
an integer subsystem:

```js
bisect('50') => '50.0'
```

Once a number is bisected, it can be incremented and decremented only within its
subsystem:

```js
inc('50.0') => '50.1'

dec('50.0') => '50.-1'   // *not* 49
```

Bisection can also be nested:

```js
bisect(bisect('50.1')) => '50.1.0.0'

inc('50.1.0.9') => '50.1.0.10'
```

Finally, any two bisecting numbers can also be compared. This is important. The
absolute ordering of bisecting numbers is such that any bisection space fits
entirely between the two integers in the upper space around it:

```js
compare('50', '50.0') => -1  // 50.0 is larger than 50
compare('50.0', '51') => -1  // 50.0 is smaller than 51

// The entire infinite system 50.* fits between 50 and 51
compare('50', '50.19.53.14009') => -1
compare('50.19.53.14009', '51') => -1
```


## why is this useful?

(coming soon)


# example

```js
var binums = require('bisecting-numbers')

```

```
(coming soon)
```

# methods

## var bn = binums(alphabet)

Returns an object that codifies the bisecting number system over the given
string `alphabet` (where `alphabet.charAt(0)` is the zero value, the next is 1,
etc). If not provided, the alphabet is the string
`'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'`.

## bn.fromInteger
## bn.bisect
## bn.inc
## bn.dec
## bn.segments
## bn.prefix
## bn.suffix
## bn.compare

# install

With [npm](https://npmjs.org/) installed, run

```
$ npm install bisecting-numbers
```

# license

ISC
