export default async function createDomain (req, res) {
  const domainRes = await fetch("https://api.vercel.com/v4/domains", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.VERCEL_TEST_TOKEN}`
    },
    body: JSON.stringify({ name: req.body })
  });

  const data = await domainRes.json();

  return res.status(200).json({ data });
}
