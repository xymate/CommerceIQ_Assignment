const express = require("express");
const router = express.Router();
const { readDataFromFile, writeDataToFile } = require("../utils/utils");

// GET /posts
router.get("/", async (req, res) => {
  const { posts } = await readDataFromFile();
  if(posts.length==0)
    res.json({ error: "No posts found" });
  res.json(posts);
  
});

// GET /posts/{id}
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { posts } = await readDataFromFile();
  const post = await posts.find((post) => post.id === id);
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }
  res.json(post);
});

// POST /posts
const validatePostData = (postData) => {
  if (
    !postData.hasOwnProperty("title") ||
    !postData.hasOwnProperty("author") ||
    !postData.hasOwnProperty("views") ||
    !postData.hasOwnProperty("reviews") ||
    typeof postData.title !== "string" ||
    typeof postData.author !== "string" ||
    typeof postData.views !== "number" ||
    typeof postData.reviews !== "number"
  ) {
    return false;
  }
  return true;
};

router.post("/", async (req, res) => {
  try {
    const { posts, authors } = await readDataFromFile();
    const { id, ...postData } = req.body;

    // Check if the id already exists
    if (posts.find((post) => post.id === id)) {
      return res
        .status(400)
        .json({ error: "ID already exists, try a different ID" });
    }

    // Validate post data
    if (!validatePostData(postData)) {
      return res.status(400).json({ error: "Invalid post data" });
    }

    const newPost = { id, ...postData };

    const authorName = postData.author;
    let [firstName, lastName] = authorName.split(" ");

    // If there's only one word, consider it as the first name and make last name empty string
    if (!lastName) {
      lastName = "";
    }

    const authorIndex = authors.findIndex(
      (author) =>
        author.first_name === firstName && author.last_name === lastName
    );

    if (authorIndex === -1) {
      // Create a new author if not exists
      const newAuthor = {
        id: authors.length,
        first_name: firstName,
        last_name: lastName,
        posts: 1,
      };
      authors.push(newAuthor);
    } else {
      // Update existing author's post count
      authors[authorIndex].posts += 1;
    }

    // Add the new post
    posts.push(newPost);

    // Write data back to the JSON file
    writeDataToFile({ posts, authors });

    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error adding new post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE/posts/{id}
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const allPosts = await readDataFromFile();

    // Find the post with the provided ID
    const postIndex = allPosts.posts.findIndex((post) => post.id == id);
    if (postIndex === -1) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Update the post properties only if the data is sent
    const updatedPost = { ...allPosts.posts[postIndex] };
    if (data.id !== undefined) {
      if (updatedPost.id !== data.id)
        throw new Error("You cannot update the ID");
    }
    if (data.title !== undefined) {
      updatedPost.title = data.title;
    }
    if (data.author !== undefined) {
      updatedPost.author = data.author;
    }
    if (data.views !== undefined) {
      updatedPost.views = data.views;
    }
    if (data.reviews !== undefined) {
      updatedPost.reviews = data.reviews;
    }

    // Write the updated data back to the JSON file
    allPosts.posts[postIndex] = updatedPost;
    writeDataToFile(allPosts);

    res.json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: error.message });
  }
});

// DELETE/posts/{id}
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const data = await readDataFromFile();
  const index = await data.posts.findIndex((post) => post.id == id);
  if (index === -1) {
    return res.status(404).json({ error: "Post not found" });
  }
  data.posts.splice(index, 1);
  writeDataToFile(data);
  res.json({ message: "Post deleted successfully" });
});

module.exports = router;
