import Blockchain from "../src/blockchain";
import Block from "../src/block";

describe("Testing blockchain", () => {
  // Create the blockchain
  let blockchain = new Blockchain({ difficulty: 2 });
  // First block
  let genesisBlock: any = blockchain.chain[0];

  test("Checking genesis block", () => {
    // Make sure exists
    expect(genesisBlock).not.toBe(undefined);
    // Check if previous hash is right
    expect(genesisBlock.previousHash).toBe("0");
    // Validate
    expect(blockchain.isValid()).toBe(true);
  });

  test("Adding testing blocks", () => {
    // Add some elements
    blockchain.addBlock({ id: 0 });
    blockchain.addBlock({ id: 1 });
    blockchain.addBlock({ id: 2 });

    // Check if successfully added
    expect(blockchain.chain.length).toBe(4);

    // Validate
    expect(blockchain.isValid()).toBe(true);
  });

  test("Changing values", () => {
    // Change some data that shouldn't be able to be changed
    blockchain.chain[2].data = { id: 1, message: "This is hacked." };

    // Validate
    expect(blockchain.isValid()).toBe(false);
  });

  test("Recalculating hash", () => {
    // Recalculate hash
    blockchain.chain[2].mine(blockchain.difficulty);

    // Validate
    expect(blockchain.isValid()).toBe(false);
  });
});
