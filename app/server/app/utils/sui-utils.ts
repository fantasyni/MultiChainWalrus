import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { getFullnodeUrl, SuiClient, SuiObjectResponse } from '@mysten/sui/client';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { Transaction, TransactionArgument } from '@mysten/sui/transactions';
import { fromB64, fromBase64, SUI_CLOCK_OBJECT_ID } from '@mysten/sui/utils';
import { CONFIG, SuiType } from '../constants';
import { bcs } from '@mysten/bcs';

export type Network = 'mainnet' | 'testnet';

export const ACTIVE_NETWORK = (process.env.NETWORK as Network) || 'testnet';

export const SUI_BIN = `sui`;

export const getActiveAddress = () => {
	return execSync(`${SUI_BIN} client active-address`, { encoding: 'utf8' }).trim();
};

/** Returns a signer based on the active address of system's sui. */
// export const getSigner = () => {
// 	let mnemonic: string = process.env.SUI_MNEMONIC || "";
// 	const pair = Ed25519Keypair.deriveKeypair(mnemonic);
// 	return pair;
// };

export const getSigner = () => {
	let SUI_PRIVATE_KEY = readFileSync(process.cwd() + "/.key").toString(); 
	const pair = Ed25519Keypair.fromSecretKey(SUI_PRIVATE_KEY);

	return pair;
};


/** Get the client for the specified network. */
export const getClient = (network: Network) => {
	return new SuiClient({ url: getFullnodeUrl(network) });
};

// export const getMultiGetObjects = async (ids: string[]) => {
// 	const client = getClient(CONFIG.NETWORK);
// 	return await client.multiGetObjects({
// 		ids,
// 		options: {
// 			showType: true,
// 			showOwner: true,
// 			showContent: true,
// 		}
// 	});
// }

/** A helper to sign & execute a transaction. */
export const signAndExecute = async (txb: Transaction, network: Network) => {
	const client = getClient(network);
	const signer = getSigner();

	return client.signAndExecuteTransaction({
		transaction: txb,
		signer,
		options: {
			showEvents: true,
		},
	});
};


export const redeem_walrus = async (vaa: string) => {
	const tx = new Transaction();

	const vaa_bytes = fromBase64(vaa);

	let vaa_bcs = bcs.vector(bcs.u8()).serialize(vaa_bytes);

	let [verifiedVAA] = parse_and_verify(tx, tx.object(process.env.WORMHOLE_CORE_STATE || ""), tx.pure(vaa_bcs), tx.object(SUI_CLOCK_OBJECT_ID))

	redeem_walrus_message(tx, tx.object(process.env.MULTICHAIN_STATE || ""), verifiedVAA)

	const results = await signAndExecute(tx, ACTIVE_NETWORK);

	return results;
};

export function parse_and_verify(tx: Transaction, arg0: TransactionArgument, arg1: TransactionArgument, arg2: TransactionArgument) {
	let args: any[] = [
		arg0, arg1, arg2
	]

	return tx.moveCall({
		target: `${process.env.WORMHOLE_CORE}::vaa::parse_and_verify`,
		arguments: args,
	})
}

export function redeem_walrus_message(tx: Transaction, arg0: TransactionArgument, arg1: TransactionArgument) {
	let args: any[] = [
		arg0, arg1
	]

	return tx.moveCall({
		target: `${process.env.MULTICHAIN_WALRUS}::multichain_walrus::redeem_walrus_message`,
		arguments: args,
	})
}

/** Publishes a package and saves the package id to a specified json file. */
export const publishPackage = async ({
	packagePath,
	network,
	exportFileName = 'contract',
}: {
	packagePath: string;
	network: Network;
	exportFileName: string;
}) => {
	const txb = new Transaction();

	const { modules, dependencies } = JSON.parse(
		execSync(`${SUI_BIN} move build --dump-bytecode-as-base64 --path ${packagePath}`, {
			encoding: 'utf-8',
		}),
	);

	const cap = txb.publish({
		modules,
		dependencies,
	});

	// Transfer the upgrade capability to the sender so they can upgrade the package later if they want.
	txb.transferObjects([cap], getActiveAddress());

	const results = await signAndExecute(txb, network);

	// @ts-ignore-next-line
	const packageId = results.objectChanges?.find((x) => x.type === 'published')?.packageId;

	// save to an env file
	writeFileSync(
		`${exportFileName}.json`,
		JSON.stringify({
			packageId,
		}),
		{ encoding: 'utf8', flag: 'w' },
	);
};
