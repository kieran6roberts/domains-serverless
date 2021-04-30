import { useState } from "react";

export default function Home() {

  const [ input, setInput ] = useState("");

  const handleInputChange = (event) => setInput(event.target.value);

  const handleCustomDomainSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("/api/domain", {
      method: "POST",
      headers: {
              "Content-Type": "application/json"
          },
      body: JSON.stringify(input)
    }).then(res => console.log(res.json()));
  };

  return (
    <div>
      <h1>
        Welcome to Hashnode
      </h1>
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
    </div>
  )
}
