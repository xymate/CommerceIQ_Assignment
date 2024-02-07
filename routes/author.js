const express = require("express");
const router = express.Router();
const { readDataFromFile, writeDataToFile } = require("../utils/utils");

// GET /authors
router.get("/", async(req, res) => {
  const { authors } = await readDataFromFile();
  if(authors.length==0)
    res.json({error:"No authors found"});
  res.json(authors);
});

// GET /authors/{id}
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const { authors } = readDataFromFile();
  const post = authors.find((post) => post.id == id);
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }
  res.json(post);
});

// POST /authors
router.post("/", (req, res) => {
  const { authors } = readDataFromFile();
  const newPost = { id: authors.length, ...req.body };
  authors.push(newPost);
  writeDataToFile({ ...readDataFromFile(), authors });
  res.status(201).json(newPost);
});

// DELETE/authors/{id}
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const data = readDataFromFile();
  const index = data.authors.findIndex((post) => post.id == id);
  if (index === -1) {
    return res.status(404).json({ error: "Post not found" });
  }
  data.authors.splice(index, 1);
  writeDataToFile(data);
  res.json({ message: "Post deleted successfully" });
});

module.exports= router;
