# bisecting-numbers

> Integer-like number system where any number can be bisected to form infinite
> integer *sub*systems.

# background

## what *is* this?

If used without bisection, bisecting numbers cover the integers (`..., -3, -2,
-1, 0, 1, 2, 3, ...`) 1:1. They are represented in code as though as `string`,
not `number`.

`'50'` is a valid bisecting number.

However, its superpower is that it provides the means to bisect an integer into
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

## just use real numbers!

It's true! `1` can be "bisected" to `1.1`, which has an infinite number of
values betweeen 1 and 2.

You could also bisect further by making it so `bisect(1.1) => 1.01`, and then
increment in amounts of `0.01`.

How do you decrement though? You can't make the a subsystem negative without
negating the entire value!

Well, you could make it so `bisect(1) => 1.5`. Now values < 1.5 are "negative".
You can increment such that `inc(1.9) => 1.51`, etc. You can decrement the same
way, so that `dec(1.5) => 1.4`, and `dec(1.1) => 1.54`.

You could keep on applying awkward rules like this to achieve the same effect.

## nice properties

The real motivation for this module came from a desire for the following
properties, for
[bisecting-between](https://github.com/noffle/bisecting-between), that real
numbers don't grant:

1. truly infinite (real numbers are `number` in JS, which is finite)
2. able to use a custom alphabet (`01`, `0123456789`, `0123456789ABCDEF`, etc)
   to maximize use of the printable character space.
3. fairly easy for humans to read and gauge ordering of number pairs
4. minimize the string length increase when increment and decrement are used, in
   favour of bisecting being more space expensive


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

## bn.zero()

Returns the alphabet's zero value as a bisecting number. `0` by default.

## bn.bisect(num)
## bn.inc(num)
## bn.dec(num)
## bn.segments(num)
## bn.prefix(num)
## bn.suffix(num)
## bn.compare(a, b)

# install

With [npm](https://npmjs.org/) installed, run

```
$ npm install bisecting-numbers
```

# license

ISC
