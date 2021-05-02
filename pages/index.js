import Link from "next/link";
import { useState } from "react";

export default function Home() {

  const [ input, setInput ] = useState("");
  const [ domain, setDomain ] = useState({});
  const [ projectDomains, setProjectDomains ] = useState([]);

  const handleInputChange = (event) => setInput(event.target.value);

  const handleCustomDomainSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("/api/addDomainToProject", {
      method: "POST",
      headers: {
              "Content-Type": "application/json"
          },
      body: JSON.stringify(input)
    });

    const data = await response.json();
    console.log(data)

    setProjectDomains(data);
    setDomain({ name: input });
  };

  const handleAddDNSRecord = async () => {
    const response = await fetch("/api/addRecordAndCertificate", {
      method: "POST",
      headers: {
              "Content-Type": "application/json"
          },
      body: JSON.stringify({
        domain: input,
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
      cert: data.cert?.uid ?? null,
      record: data.dns?.uid ?? null,
      certError: data.cert?.error ?? null,
      recordError: data.dns?.error ?? null
    });
  }

  return (
    <div className="p-6">
      <h1 className="mb-8">
        Welcome to Hashnode
      </h1>
      {domain.ssl && domain.record ? 
      <a href={`https://${domain.name}/blog`}>
        To Blog
      </a>
      :
      <Link href="/blog" passHref>
        <a className="block p-2 mb-8 bg-pink-200 w-max">
          To Blog
        </a>
      </Link>}
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
      {projectDomains.length ? 
      <div>
      <p className="mb-4">
        The following custom domain has been added successfully: {domain.name}
      </p>
      <p className="mb-4">
        Next we need to add the following CNAME record: <span className="font-bold">cname.vercel-dns.com</span><br/>
        With the name of: <span className="font-bold">{input.substr(0, input.indexOf('.'))}</span>
      </p>
      <button className="p-4 mb-8 bg-pink-200" onClick={handleAddDNSRecord}>
        Add record and generate SSL Certificate
      </button>
      {domain.certError ? <p className="text-pink-600">{domain.certError.message}</p> : null}
      {domain.recordError ? <p className="text-pink-600">{domain.recordError.message}</p> : null}
      </div> : null}
      {domain.cert && domain.record ? 
      <>
      <p className="mb-4">New Domain successfully added to project!</p>
      <a className="inline-block p-2 bg-pink-300" href={`https://${domain.name}`}>
        Visit domain
      </a>
      </>
      : null }
      {domain.projectDomainsError ? <p>{domain.projectDomainsError.message}</p> : null}
    </div>
  )
}
