# `nreq`

Limited implementation of [`nreq`](https://github.com/nostr-protocol/nips/pull/882) in JavaScript.


## Setup

```bash
git clone --filter=blob:none --no-checkout --sparse https://github.com/AsaiToshiya/learn-nostr.git
cd learn-nostr
git sparse-checkout set 882-nip-19-add-nreq nip-19-bech-32-encoded-entities
git checkout main
cp ./nip-19-bech-32-encoded-entities/tlv.js 882-nip-19-add-nreq
cd 882-nip-19-add-nreq
pnpm install
```


## Test

```bash
$ pnpm test

> 882-nip-19-add-nreq@1.0.0 test /path/to/882-nip-19-add-nreq
> jest

 PASS  ./nreq.test.js
  √ encode and decode nreq (3 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.457 s
Ran all test suites.
```


## License

CC0 1.0. See `LICENSE.txt`.
