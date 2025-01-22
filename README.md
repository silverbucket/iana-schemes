# Schemes

A javascript object map of official [iana.org Uniform Resource Identifier (URI) Schemes](http://www.iana.org/assignments/uri-schemes/uri-schemes.xhtml) and crowd sourced unofficial schemes.

This can be used to look up the rfc's for the corresponding schemes or check a schemes validity based on of it exists in the list of not.

:warning: **This repo was forked and modified for publishing via. JSR for Deno. Not all documentation here has been updated for TypeScript/Deno. The original repository appears inactive https://github.com/Munter/schemes**

## Usage

```javascript
import schemas from 'jsr:@silverbucket/iana-schemas';

schemes.permanent[0]; // {
                      //   "scheme": "aaa",
                      //   "description": "Diameter Protocol",
                      //   "reference": [
                      //     {
                      //       "type": "rfc",
                      //       "href": "http://www.iana.org/go/rfc6733"
                      //     }
                      //   ]
                      // }

schemes.provisional[0]; // {
                        //   "scheme": "acr",
                        //   "description": "acr",
                        //   "reference": [],
                        //   "template": "http://www.iana.org/assignments/uri-schemes/prov/acr"
                        // }

schemes.historical[0]; // {
                       //   "scheme": "fax",
                       //   "description": "fax",
                       //   "reference": [
                       //     {
                       //       "type": "rfc",
                       //       "href": "http://www.iana.org/go/rfc2806"
                       //     },
                       //     {
                       //       "type": "rfc",
                       //       "href": "http://www.iana.org/go/rfc3966"
                       //     }
                       //   ]
                       // }

schemes.unofficial[0]; // {
                       //   "scheme": "android-app"
                       // }

schemes.allByName; // {
                   //   'aaa': { ... } // scheme object
                   //   'aaas': { ... } // scheme object
                   //   'about': { ... } // scheme object
                   //   'acap': { ... } // scheme object
                   //   'acct': { ... } // scheme object
                   //   'cap': { ... } // scheme object
                   //   'cid': { ... } // scheme object
                   //   'coap': { ... } // scheme object
                   //   'coaps': { ... } // scheme object
                   //   'crid': { ... } // scheme object
                   //   ...
                   // }
```

## Contributing

Part of this module is auto generated from iana official lists, but the unofficial ones are not. If you find that a specific scheme is missing from these lists, please submit a pull request that adds it to the [unofficial schemes list](https://github.com/silverbucket/iana-schemes/blob/master/lib/unofficial.json).


## License
(The MIT License)

Copyright (c) 2015 Peter Müller <munter@fumle.dk>
Copyright (c) 2025 Nick Jennings <nick@silverbucket.net>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
