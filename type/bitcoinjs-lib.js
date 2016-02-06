/* @flow
 * Type definitions for bitcoinjs-lib
 */

type Network = {
    pubKeyHash: number;
    scriptHash: number;
    dustThreshold: number;
    feePerKB: number;
};

type Input = {
    script: Buffer;
    hash: Buffer;
    index: number;
    sequence: number;

    // additional: hash converted to tx id
    id: string;
};

type Output = {
    script: Buffer;
    value: number;

    // additional: cached address from the script
    address: ?string;
};

declare module 'bitcoinjs-lib' {

    declare var address: {
        fromOutputScript(script: Buffer, network?: Network): string;
    };

    declare var script: {
        fromAddress(address: string, network?: Network): Buffer;
    };
    
    declare class ECPair {
        d: ?Buffer;
        Q: ?Buffer;
        constructor(d: ?Buffer, Q: ?Buffer): void;
    }

    declare class HDNode {
        depth: number;
        fingerprint: number;
        index: number;
        keyPair: ECPair;
        chainCode: Buffer;
        static fromBase58(
            str: string,
            networks: Array<Network> | Network
        ): HDNode;
        derive(index: number): HDNode;
        toBase58(): string;
        constructor(keyPair: ECPair, chainCode: Buffer): void;
    }

    declare class Transaction {
        static fromHex(hex: string): Transaction;
        ins: Array<Input>;
        outs: Array<Output>;
        toHex(): string;
    }
}
