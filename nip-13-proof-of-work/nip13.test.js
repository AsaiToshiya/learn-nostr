const {
  generateSecretKey,
  getPublicKey,
  finalizeEvent,
  verifyEvent,
  nip13,
} = require("nostr-tools");

test("mine PoW and sign an event", async () => {
  const sk = generateSecretKey();
  const pk = getPublicKey(sk);

  const event = {
    pubkey: pk,
    created_at: 1651794653,
    kind: 1,
    tags: [],
    content: "It's just me mining my own business",
  };

  // ID の先頭ビットの 0 が難易度の桁数になるまでイベントのハッシュ化を繰り返す
  const minedEvent = nip13.minePow(event, 21);

  // 署名する
  const signedEvent = finalizeEvent(minedEvent, sk);

  expect(verifyEvent(signedEvent)).toBeTruthy();
  expect(nip13.getPow(signedEvent.id)).toEqual(21);
});

test("verify the example event", async () => {
  const event = {
    "id": "000006d8c378af1779d2feebc7603a125d99eca0ccf1085959b307f64e5dd358",
    "pubkey": "a48380f4cfcc1ad5378294fcac36439770f9c878dd880ffa94bb74ea54a6f243",
    "created_at": 1651794653,
    "kind": 1,
    "tags": [
      ["nonce", "776797", "20"]
    ],
    "content": "It's just me mining my own business",
    "sig": "284622fc0a3f4f1303455d5175f7ba962a3300d136085b9566801bc2e0699de0c7e31e44c81fb40ad9049173742e904713c3594a1da0fc5d2382a25c11aba977"
  };

  expect(verifyEvent(event)).toBeTruthy();
});
