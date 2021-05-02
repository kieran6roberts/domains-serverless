import { useState } from "react";

export default function Home() {

  const [ input, setInput ] = useState("");
  const [ domain, setDomain ] = useState({});

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

    const { data } = await response.json();
    console.log(data)
    setDomain({ ...data.domain, domainError: data?.error ?? null });
    console.log(domain)
  };

  const handleAddDomainToProject = async () => {
    const response = await fetch("/api/addDomainToProject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        domainName: domain.name,
      })
    });

    const data = await response.json();
    return data;
  }

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

    const newProjectDomains = await handleAddDomainToProject();
    console.log(newProjectDomains)

    setDomain({
      ...domain,
      ssl: data?.cert?.uid ? true : null,
      record: data?.dns.uid ? true : null,
      certError: data?.cert?.error ?? null,
      projectDomains: !newProjectDomains.error ? [...newProjectDomains] : null,
      projectDomainsError: newProjectDomains.error ?? null
    });
  }

  return (
    <div className="p-6">
      <h1 className="mb-8">
        Welcome to Hashnode
      </h1>
      <a href={domain.ssl && domain.record ? `https://${domain.name}` : "https://hashnode-project-serverless.vercel.app/blog"} className="block p-2 mb-8 bg-pink-200 w-max">
        To blog
      </a>
      <form onSubmit={handleCustomDomainSubmit}>
        <label 
        className="mr-4 font-bold" 
        htmlFor="domain">
          Enter your custom domain:
          </label>
        <input 
        className="p-2 mb-8 mr-8 border-2 border-gray-900" 
        onChange={handleInputChange}
        id="domain" 
        type="text" 
        value={input}
        />
        <button className="p-2 bg-pink-300" type="submit">
          Submit
        </button>
      </form>
      {domain.domainError ? 
      <p>
        {domain.domainError.message}
      </p> : null}
      {!domain.domainError && domain.name ? 
      <div>
      <p className="mb-4">
        The following custom domain has been added successfully: {domain.name}
      </p>
      <p className="mb-4">
        Next we need to add the following CNAME record: cname.vercel-dns.com 
      </p>
      <button className="p-4 mb-8 bg-pink-200" onClick={handleAddDNSRecord}>
        Add record and generate SSL Certificate
      </button>
      {console.log(domain)}
      {domain.error ? <p className="text-pink-600">{domain.error.message}</p> : null}
      </div> : null}
      {domain.projectDomains && domain.projectDomains.some(({ domain: newDomain }) => newDomain === domain.name) ? 
      <p>Domain <span className="font-bold">{domain.name}</span> successfully added to project!</p>
      : null }
      {domain.projectDomainsError ? <p>{domain.projectDomainsError.message}</p> : null}
    </div>
  )
}
