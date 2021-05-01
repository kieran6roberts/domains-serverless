import { useState } from "react";

export default function Home() {

  const [ input, setInput ] = useState("");
  const [ domain, setDomain ] = useState(null);

  const handleInputChange = (event) => setInput(event.target.value);

  const handleCustomDomainSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("/api/createDomain", {
      method: "POST",
      headers: {
              "Content-Type": "application/json"
          },
      body: JSON.stringify(input)
    });

    const data = await response.json();
    console.log(data)
    setDomain(data.data.domain);
  };

  const handleAddDNSRecord = async () => {
    const response = await fetch("/api/addRecordAndCertificate", {
      method: "POST",
      headers: {
              "Content-Type": "application/json"
          },
      body: JSON.stringify({
        domain: domain.name,
        name: "blog",
        type: "CNAME",
        value: "cname.vercel-dns.com",
        ttl: 60
      })
    });

    const data = await response.json();
    console.log(data);
    
    setDomain({
      ...domain,
      ssl: data?.cert?.uid ? true : null,
      record: data?.dns.uid ? true : null,
      error: data?.cert?.error ?? null
    });
  }

  return (
    <div className="p-6">
      <h1 className="mb-8">
        Welcome to Hashnode
      </h1>
      <a href={domain?.ssl && domain?.record ? `https://${domain.name}` : "http://localhost:3000/blog"} className="block p-2 mb-8 bg-pink-200 w-max">
        To blog
      </a>
      <form onSubmit={handleCustomDomainSubmit}>
        <label 
        className="mr-4 font-bold" 
        htmlFor="domain">
          Enter your custom domain:
          </label>
        <input 
        className="p-2 mb-8 border-2 border-gray-900" 
        onChange={handleInputChange}
        id="domain" 
        type="text" 
        value={input}
        />
      </form>
      <div>
          {domain ? 
          <>
          <p className="mb-4">
            The following custom domain has been added successfully: {domain.name}
          </p>
          <p className="mb-4">
            Next we need to add the following CNAME record: cname.vercel-dns.com 
          </p>
          <button className="p-4 mb-8 bg-pink-200" onClick={handleAddDNSRecord}>
            Add record and generate SSL Certificate
          </button>
          {domain.error ? <p className="text-pink-600">{domain.error.message}</p> : null}
          </> : null
          }
      </div>
    </div>
  )
}
