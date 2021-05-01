import posts from "../../public/posts.json";

export default (req, res) => {
  return res.status(200).json(posts)
}