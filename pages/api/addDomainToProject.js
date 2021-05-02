export default async function addDomainToProject(req, res) {
    const projectResponse = await fetch("https://api.vercel.com/v1/projects/hashnode-project-serverless", {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.VERCEL_TEST_TOKEN}`
        }
    });

    const { id } = await projectResponse.json();

    const response = await fetch(`https://api.vercel.com/v1/projects/${id}/alias`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.VERCEL_TEST_TOKEN}`
        },
        body: JSON.stringify({ 
            domain: req.body.domainName
         })
    });

    const data = await response.json();

    return res.status(200).json(data);
}