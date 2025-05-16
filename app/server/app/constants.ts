import dotenv from 'dotenv';
dotenv.config();

export type APP_ENV_TYPE = {
    PORT: string;
}

export const APP_ENV: APP_ENV_TYPE = {
    PORT: process.env.PORT + '',
};

export const AES_SECRET_KEY: string = process.env.AES_SECRET_KEY + '';

export type Network = 'mainnet' | 'testnet' | 'devnet' | 'localnet';

export const CONFIG = {
	/// Look for events every 1s
	POLLING_INTERVAL_MS: 1000,
	DEFAULT_LIMIT: 50,
	NETWORK: (process.env.NETWORK as Network) || 'testnet',
};

export const SuiType: string =  "0x2::sui::SUI";