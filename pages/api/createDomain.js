export default async function createDomain (req, res) {
  const domainRes = await fetch("https://api.vercel.com/v4/domains", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer wAAUPWRAGyfB4t3ygsgTWGfE"
    },
    body: JSON.stringify({ name: req.body })
  });

  const data = await domainRes.json();

  return res.json({ data });
}