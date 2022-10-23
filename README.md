## HH NODE

Hardhat standalone node as docker image:

![alt text](https://github.com/p00temkin/hhnode/blob/master/img/hhnode.png?raw=true)

* Resets to block 0 on restart
* Chain ID 31337
* RPC listens to localhost port 8545 connections
* Generates 10 accounts with 100 ETH each
* Automining enabled
* Mnemonic for 10 prefunded accounts set to Hardhat default: "test test test test test test test test test test test junk"

Any changes to the above just edit hardhat.config.js before building the docker image. For port changes make sure to edit the port in Dockerfile as well.

### Prerequisites

Docker 4.x+

### Building the application

```
docker build -t hhnode .
docker run -d -p 8545:8545 hhnode
```

### Expose over HTTPS using NGINX

If you want to wrap the RPC with HTTPS you can use NGINX. Create a config file under 'sites-enabled' with

```
upstream hhnode {
    server <yourIP>:8545 max_fails=30 fail_timeout=10s;
}
```

Next setup your domain SSL certificate. Unless you are already setup with the ssl keys, a good guided option is to use <https://letsencrypt.org/>. Add the following section to your NGINX site config:

```
server {
    listen 443 ssl;
    server_name yourdomain;

    ssl_certificate /etc/letsencrypt/live/yourdomain/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain/privkey.pem;

    ...
```

Finally add a route to the RPC node using /rpc:

```
    location /rpc {
        proxy_pass http://yourdomain;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header  Authorization $http_authorization;
        proxy_pass_header Authorization;
    }
```

Following these steps your Hardhat dev node should be available using "https://yourdomain/rpc". Add this as a new chain to Metamask and import the first prefunded account (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266) and you will see 100 ETH balance.

![alt text](https://github.com/p00temkin/hhnode/blob/master/img/metamask.png?raw=true)

### Support/Donate

To support this project directly:

   ```
   Ethereum/EVM: forestfish.x / 0x207d907768Df538F32f0F642a281416657692743
   Algorand: forestfish.algo / HDWK77MR2O7BLSNFIYG3OPBKTPLNB5PHK4XLGGUYEK4LKTMK7WOCLHE57I
   ```

Or please consider donating to EFF:
[Electronic Frontier Foundation](https://supporters.eff.org/donate)

or to Let's Encrypt:
[Let's Encrypt](https://letsencrypt.org/donate/)
