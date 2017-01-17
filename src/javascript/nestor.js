/**
 * @license NestorJS v0.0.1
 * @author Pedro Cardoso, https://github.com/limkavitch
 * License: ISC
 */
(function(window){ "use strict;"

  /**
    NestorJS is a tool for converting between data formats in Javascript.
  */
  var nestor = window.nestor || (window.nestor = {});

  nestor.nest     = nest;
  nestor.convert  =
  {
    "rowArray":
      {
        "to":
        {
          "properties": rowArrayToProperties
        }
      }
  };

  // window.nestor = nestor;

  /**
    @param {object} objectToNest the object containing the properties
    @description converts dotted properties to nested properties inside objects
    @example  { "user.name.first":"John", "user.name.last":"Doe" }
    parses to { "user": { "name" : { "first":"John", "last":"Doe" } } }
  */
  function nest(objectToNest)
  {
    let keys = Object.keys(objectToNest),
        nestedObject = {};

    keys.forEach(function(key){
      let separator = ".",
          subkeys   = key.split(separator),
          value     = objectToNest[key];

      addProperty(nestedObject, subkeys, value);
    });

    function addProperty(object, subkeys, value)
    {
      let subObject,
          currentKey;

      currentKey  = subkeys.splice(0,1);
      subObject   = object[currentKey] || {};

      if(subkeys.length > 0)
      {
        addProperty(subObject, subkeys, value);
      }
      else
      {
        subObject = value;
      }
      object[currentKey] = subObject;
    }

    return nestedObject;
  }

  /**
    @param {array} headers  Array with property names
    @param {array} rows     Array with arrays of data
    @description converts a table-like object and a header array to an object
    with the same properties defined in the header
    @example array = [ [1,2,3,4], [5,6,7,8] ] with header = ["a","","c","d"]
    parses to [ {"a":1,"b":2,"c":3,"d":4}, {"a":5,"b":6,"c":7,"d":8} ]
  */
  function rowArrayToProperties(headers,rows)
  {
    let columnCount = headers.length
        objects     = [];

    rows.forEach(function(row){
      let object = {};
      for(let c = 0; c < columnCount; c++)
      {
        let property     = headers[c];
        object[property] = row[c];
      }
      objects.push(object);
    });

    return objects;
  }

})(window);
