# Private Set Intersection (PSI)

PSI allows two parties that each possess a set of items to find out the intersection of these items, without revealing the non-intersecting items.

There are many variants of PSI: some find the size of the intersection only, while others allow computing a function over the intersection.
Furthermore, some are optimized for cases where both parties have similarly-sized sets, or cases where they have radically asymmetric sizes.

## Your task

You will implement a simple PSI protocol based on a cryptographic assumption called [DDH](https://en.wikipedia.org/wiki/Decisional_Diffie%E2%80%93Hellman_assumption).

Your particular implementation targets a setup where a client has **one** password, and a server has a list with **many** bad passwords: for example, password that are compromised or revealed in some hack, or that are known to be in various password dictionaries that hackers use.

The purpose is to allow the client to check if the password is a bad password, without revealing it to the server or revealing all the bad passwords to the client.

The protocol works as follows:
1. The client and server hash all the passwords to points on an elliptic curve. This elliptic curve is carefully chosen for you so that we believe DDH holds for it.
2. The client and server each generate a random mask, which we can (almost) think of as encryption keys. Call these *kc* and *ks* respectively.
3. The client masks its hashed password with its mask, concretely, in elliptic curves this is: `q = hash(password) * kc`.
4. The client sends `q` to the server.
5. The server masks `q` and all of its hashed passwords using its mask, i.e. server computes `r = q * ks` and `p_i = hash(password_i) * ks` for each password.
6. The server sends all these to the client.
7. The client unmasks its query by taking out `kc` from it, e.g. `r / kc = hash(password) * kc * ks / kc = hash(password) * ks`.
8. Note that the client also receives all `p_i = hash(password_i) * ks` from the server, so if the password is in the bad list, one of these will match the unmasked query!

The protocol works because any adversary cannot distinguish (within reasonable time) between `q = h * kc` and `q' = <random>`. In other words, multiplying by an unknown random mask produces uniformly random outputs to adversaries with realistic computational power.
This is a product of the DDH assumption, which we believe is true, and is one of the foundations of modern cryptography.

## Your implementation

Make sure you have nodejs installed. We tested this using node `v14.18.1`.

Install all dependencies `npm install`.

Your implemenation goes in `client.js` and `server.js`. Stub code is provided for you, as well as steps 1 through 4. You need to implement the remaining steps.

The stub code uses [OPRF](https://github.com/multiparty/oprf), a javascript library for masking and unmasking elliptic curve points. Look at the README for this library for API documentation. Specifically, you will need to use
`scalarMult(...)`, `unmaskPoint(...)`, `encodePoint(...)`, and `decodePoint(...)`.

## Running

To test your implementation, open two terminals.

First, run the server `node server.js`.

After the server is running, in a different terminal window, run the client `node client.js p@ssword`.

Your implementation must indicate that `password`, `p@ssword`, `p@ssw0rd`, and `passw0rd` are all compromised, but not any other password.

