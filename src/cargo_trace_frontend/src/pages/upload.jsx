import { useState } from "react";
import { cargo_trace_backend } from "declarations/cargo_trace_backend";

export default function UploadDoc() {
  const [fileHash, setFileHash] = useState("");
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  const upload = async () => {
    const owner = window.ic?.plug?.principalId || "anonymous";
    const id = await cargo_trace_backend.upload_document(name, fileHash, owner);
    setMsg(`Uploaded document ID: ${id}`);
  };

  const transfer = async (id, newOwner) => {
    const result = await cargo_trace_backend.transfer_document(id, newOwner);
    setMsg(result);
  };

  return (
    <div>
      <input placeholder="Doc name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="File hash (or CID)" onChange={(e) => setFileHash(e.target.value)} />
      <button onClick={upload}>Upload Document</button>

      <br />
      <button onClick={() => transfer(1, "importer-wallet-id")}>Transfer Doc #1</button>

      <p>{msg}</p>
    </div>
  );
}
