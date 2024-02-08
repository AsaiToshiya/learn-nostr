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
