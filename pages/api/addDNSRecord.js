export default async function createDomain (req, res) {
  const domainRes = await fetch(`https://api.vercel.com/v2/domains/${req.body.name}/records`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer wAAUPWRAGyfB4t3ygsgTWGfE"
    },
    body: JSON.stringify(req.body)
  });

  const data = await domainRes.json();
  console.log(data)

  return res.json({ data });
}