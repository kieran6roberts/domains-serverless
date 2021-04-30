export default async function (req, res) {
  res.status(200).json({ message: "success "});

  const certRes = fetch(`${process.env.VERCEL_BASE}${process.env.VERCEL_CREATE_CERT_ENDPOINT}`, {
    method:"POST",
    headers: {
      "Content-Type: application/json",
      Authorization: "Bearer <TOKEN>"
    },

  })
}
