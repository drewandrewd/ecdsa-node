import server from "./server";

import * as secp from "ethereum-cryptography/secp256k1";
function Wallet({ address, setAddress, balance, setBalance, privateKey,setPrivateKey }) {
  async function onChange(evt) {
    const privateKey  = evt.target.value;
    setPrivateKey(privateKey);
    const address = secp.secp256k1.getPublicKey(privateKey);
    setAddress(address);
    if (privateKey) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private key
        <input placeholder="Type a private key" value={privateKey} onChange={onChange}></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
