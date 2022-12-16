# ParseCNP ![example workflow](https://github.com/kislakiruben/parsecnp/actions/workflows/pull-request.yml/badge.svg)
A parser for C.N.P. (short for ***C***od ***N***umeric ***P***ersonal or *Personal Identification Number*).

C.N.P. is a 13 digit unique number assigned to Romanian people at birth and to residents.

## Installation
Using npm:
```terminal
npm install parsecnp --save
```
Using Yarn
```terminal
yarn add parsecnp
```
In a browser
```html
<script src="dist/ParseCNP.min.js"></script>
```

## Usage
The package exports `ParseCNP` as a global.
```js
// using new
const cnp = new ParseCNP(1700101123456);
// using factory
ParseCNP(1700101123456);
```

## API
```js
const cnp = new ParseCNP(1700101123456);

cnp.sex;          // => "male" (string)
cnp.birthdate     // => Thu Jan 01 1970 00:00:00 GMT+0200 (Date)
cnp.year          // => 1970 (number)
cnp.month         // => 1 (number)
cnp.day           // => 1 (number)
cnp.county.name   // => "Cluj" (string)
cnp.county.ISO    // => "CJ" (string)
cnp.coynty.code   // => "12" (string)
cnp.serial        // => "345" (string)
cnp.checksum      // => "6" (string)
cnp.isValid       // => false (boolean)
cnp.toString()    // => "1700101123456" (string)
cnp.toJSON()      // => (string)
```
