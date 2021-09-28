import SHA256 from "crypto-js/sha256";

export default class Block {
  // Payload data
  data: any;
  // Calculated hash
  hash: string;
  // Hash of previous block
  previousHash: string;
  // Current nonce (used to mine hash)
  nonce: number;

  constructor(data: any, previousHash: string) {
    // Save passed values
    this.data = data;
    this.previousHash = previousHash;

    // Set nonce to starting value
    this.nonce = 0;
  }

  /**
   * Calcuates hash of block with current nonce
   * @return {string} Calculated SHA256 hash
   */
  calculateHash(): string {
    return SHA256(
      this.previousHash + JSON.stringify(this.data) + this.nonce
    ).toString();
  }

  /**
   * Mine the hash
   * @param {number} Difficulty settings
   * @return {string} Calculated hash
   */
  mine(difficulty: number) {
    // Expected beginning of the hash
    let expectedHash = new Array(difficulty).fill("0").join("");

    while (true) {
      // Increase the nonce
      this.nonce++;
      // Calcuate the new hash with the new noonce
      let hash = this.calculateHash();

      // Check if right hash found
      if (hash.slice(0, difficulty) == expectedHash) {
        // Save the hash
        this.hash = hash;
        // Stop the loop!
        break;
      }
    }
  }
}
