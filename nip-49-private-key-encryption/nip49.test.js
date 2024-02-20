const { encrypt, decrypt } = require("./nip49");

test("decrypt test data", async () => {
  const encryptedKey =
    "ncryptsec1qgg9947rlpvqu76pj5ecreduf9jxhselq2nae2kghhvd5g7dgjtcxfqtd67p9m0w57lspw8gsq6yphnm8623nsl8xn9j4jdzz84zm3frztj3z7s35vpzmqf6ksu8r89qk5z2zxfmu5gv8th8wclt0h4p";
  const passphrase = "nostr";

  const decryptedKey = await decrypt(encryptedKey, passphrase);
  expect(decryptedKey).toEqual(
    "3501454135014541350145413501453fefb02227e449e57cf4d3a3ce05378683"
  );
});

test("encrypt and decrypt private key", async () => {
  const privateKey =
    "abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789";
  const passphrase = "abc123";

  const encryptedKey = await encrypt(privateKey, passphrase, 16);
  const decryptedKey = await decrypt(encryptedKey, passphrase);
  expect(decryptedKey).toEqual(privateKey);
});

test("normalize passphrase", async () => {
  const encryptedKey =
    "ncryptsec1qggrc8nkvhdcjry7ylqm04ktknl3mzcwysxrrc8nm2jjg434np5sv5pe98v3xgs7nyrs9nrer9qdakwfekaah2vjd822z6wuh2tqu3j5v2ezkn4ft823gqwqqzfmhcyq8qzp7kp6x7mfdryg9q2f2vqs";
  const passphrase = "ÅΩẛ̣";

  const decryptedKey1 = await decrypt(encryptedKey, passphrase);
  const decryptedKey2 = await decrypt(
    await encrypt(decryptedKey1, passphrase, 16),
    passphrase
  );
  expect(decryptedKey1).toEqual(
    "3501454135014541350145413501453fefb02227e449e57cf4d3a3ce05378683"
  );
  expect(decryptedKey2).toEqual(decryptedKey1);
});
