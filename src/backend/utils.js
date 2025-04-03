export function vigenereDecrypt(text, key) {
  const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .,!?";
  let decryptedText = "";
  let keyIndex = 0;
  const keyLength = key.length;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const charIndex = ALPHABET.indexOf(char);
    if (charIndex === -1) {
      decryptedText += char;
      continue;
    }

    const keyChar = key[keyIndex % keyLength];
    const keyCharIndex = ALPHABET.indexOf(keyChar);
    const newIndex = (charIndex - keyCharIndex + ALPHABET.length) % ALPHABET.length;
    decryptedText += ALPHABET[newIndex];

    keyIndex++;
  }
  return decryptedText;
}
