# MultiChainWalrus

Multi Chain Walrus is a permissionless, open-source cross chain walrus file uploader built on Wormhole primitives to facilitate cross-chain, one-click file upload.

* Empowerment: Enable cross-chain uploads via Walrus and use multi-currency as gas for uploads to drive broader adoption of Walrus, bringing various benefits to users.

* Economic Model: Implement an economic model by charging a small transaction fee to allow developers to generate revenue.

![mcw.png](./images/mcw.png)

# Setup
* app/client 
```
npm install
npm run dev
```

* app/server
```
npm install
npm run dev
```

* app/evm

deploy to optimism sepolia

```
bash sh/deploy_op.sh -n testnet -c evm -k ${EVM_PRIVATE_KEY}
```

deploy to eth sepolia
```
bash sh/deploy.sh -n testnet -c evm -k ${EVM_PRIVATE_KEY}
```

* deploy sui move
```
npm install -g @deepmove/deep
```

create new **.env** file with **SUI_PRIVATE_KEY**

enter deepmove command line tools
```
deepmove
```

```
publish testnet
```