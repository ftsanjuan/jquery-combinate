jquery-combinate
================

jQuery Combinate is a jQuery plugin for combining ("combinating") and separating ("decombinating") strings contained in separate input textfields.

## Setup

By default jquery-combinate searches for form `<input>` fields having `class='combinate'` combining and inserting their contents into a new hidden `<input>` field.

## Basic Usage

In most cases, to combine values from separate fields you simply call:

``` js
$(selector).combinate();
```

-  `selector` is typically a form containing `<input>` fields with `class='combinate'`.
-  By default, this will insert the combinated value into a hidden `<input>` field appended to `selector`.
-  Supply the `resultElement` option to designate where to insert the combinated value.


To combine values from separate fields into a single field, call:

``` js
$(selector).decombinate();
```

-  `selector` is the field containing the value to be separated into separate fields.
-  The recipient fields should have `class='decombinate'`.


## Options


### $(selector).combinate(options)

- **combineClass** : 'combinate'
  - the class name used by the fields to be combined.
- **resultElement** : '',
  - a css selector denoting the input element into which the combinated string should be inserted.
    - Must be a selector for a ***single element***. Typically you will supply the element's ID rather than a class.
- **separator** : ''
  - an optional string to separate each piece in the final combinated string.
- **exclude** : ''
  - a css selector denoting elements to be excluded.
- **debug** : false
  - indicates whether or not to display the debugger log messages in console.

### $(selector).decombinate(options)

- **resultClass** : 'decombinate'
  - a CSS class designating the fields which the decombined string should be inserted into.
- **pieceLength** : 0
  - the number of characters to insert into each field.
- **exclude** : ''
  - a css selector denoting elements to be excluded from decombination.
- **debug** : false
  - indicates whether or not to display the debugger log messages in console.

