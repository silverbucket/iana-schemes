# IANA Schemes

A javascript object map of official
[iana.org Uniform Resource Identifier (URI) Schemes](http://www.iana.org/assignments/uri-schemes/uri-schemes.xhtml)
and crowd sourced unofficial schemes.

This can be used to look up the RFCs for the corresponding schemes or check a
schemes validity based on of it exists in the list of not.

:warning: **This repo was forked and modified for publishing via. JSR for Deno.
Not all documentation here has been updated for TypeScript/Deno. The original
repository appears inactive https://github.com/Munter/schemes**

## Usage

```javascript
import schemas from "jsr:@silverbucket/iana-schemas";

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

Part of this module is auto generated from IANA official lists, but the
unofficial ones are not. If you find that a specific scheme is missing from
these lists, please submit a pull request that adds it to the
[unofficial schemes list](https://github.com/silverbucket/iana-schemes/blob/master/lib/unofficial.json).
