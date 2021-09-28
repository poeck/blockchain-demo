import Block from "./block";

export interface IBlockchainOptions {
  difficulty?: number;
}

export default class Blockchain {
  // Current chain
  chain: Block[];
  // Difficulty (for mining hashes)
  difficulty: number = 2;

  constructor(options?: IBlockchainOptions) {
    if (options) {
      // Save the difficulty
      if (options.difficulty) this.difficulty = options.difficulty;
    }

    // Reset the chain
    this.chain = [];
    // Create the first (genesis) block
    this.createGenesisBlock();
  }

  /**
   * Create and add the first (genesis) block.
   * The genesis block is special because it
   * hasn't got a previous block
   */
  createGenesisBlock(): void {
    this.chain.push(new Block({}, "0"));
  }

  /**
   * Get the latest block from the current chain
   * @return {Block} Last block in the chain
   */
  getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  /**
   * Add & mine a new block with the passed data
   */
  addBlock(data: any): void {
    // Create the block
    let block = new Block(data, this.getLatestBlock().hash);
    // Mine the hash
    block.mine(this.difficulty);
    // Add it to the chain
    this.chain.push(block);
  }

  /**
   * Check if block chain is still valid
   * @return {boolean} Blockchain is valid
   */
  isValid(): boolean {
    // Loop through the chain
    // i starts at 1 so the genesis block is skipped
    for (let i = 1; i < this.chain.length; i++) {
      // Current block
      let block = this.chain[i];
      // Previous block
      let previousBlock = this.chain[i - 1];

      // Check if newest hash
      if (block.hash !== block.calculateHash()) return false;
      // Check if previous hash matches
      if (block.previousHash !== previousBlock.hash) return false;
    }

    // Everything ok!
    return true;
  }
}
