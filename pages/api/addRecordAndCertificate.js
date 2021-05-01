export default async function addRecordAndCertificate (req, res) {
    const { name, type, value, ttl } = req.body;

    const dnsRes = await fetch(`https://api.vercel.com/v2/domains/${req.body.domain}/records`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.VERCEL_TEST_TOKEN}`
        },
        body: JSON.stringify({
            name: name,
            type: type,
            value: value,
            ttl: ttl
        })
    });

    const dnsData = await dnsRes.json();
    console.log(dnsData)

      const certRes = await fetch(`https://api.vercel.com/v3/now/certs`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.VERCEL_TEST_TOKEN}`
        },
        body: JSON.stringify({
            domains: [req.body.domain],
        })
    });

    const certData = await certRes.json();
    console.log(certData)

    return res.json({ dns: dnsData, cert: certData });
}