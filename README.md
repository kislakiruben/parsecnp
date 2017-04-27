# ParseCNP
A parser for CNP (cod numeric personal; romanian SSN).

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

cnp.sex;          // returns the sex as a string
cnp.birthdate     // returns a Date object
cnp.year          // returns the year as a number in full format (ie. 1970, not 70)
cnp.month         // returns the month as a number (1 indexed, not 0)
cnp.day           // returns the day as a number
cnp.county        // returns an object holding info about the county
cnp.county.name   // returns the name of the county
cnp.county.ISO    // returns the second part of the ISO 3166-2:RO code
cnp.coynty.code   // returns the county code used by the CNP
cnp.serial        // returns the serial number
cnp.checksum      // returns the checksum
cnp.isValid       // checks if the CNP is valid or not
cnp.toString()    // converts the CNP to a string
cnp.toJSON()      // outputs this object in JSON format
```
