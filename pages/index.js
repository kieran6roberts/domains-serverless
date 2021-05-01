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
    console.log(data)
  }

  return (
    <div className="p-6">
      <h1 className="mb-8">
        Welcome to Hashnode
      </h1>
      <a href={domain ? `https://blog.${domain.name}` : "http://localhost:3000/blog"} className="p-2 bg-pink-200">
        To blog
      </a>
      <form onSubmit={handleCustomDomainSubmit}>
        <label 
        className="mr-4" 
        htmlFor="domain">
          Enter your custom domain:
          </label>
        <input 
        className="border-2 border-gray-900" 
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
            Your custom domain: {domain.name}
          </p>
          <p className="mb-4">
            Next we need to add the following CNAME record: cname.vercel-dns.com 
          </p>
          <button className="p-4 bg-pink-200" onClick={handleAddDNSRecord}>
            Add record and generate SSL Certificate
          </button>
          </> : null
          }
      </div>
    </div>
  )
}
