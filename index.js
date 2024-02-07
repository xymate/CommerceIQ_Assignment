const express = require("express");
const app = express();
const PORT = 8080;
const postRoutes=require('./routes/post');
const authorRoutes=require('./routes/author');

app.use(express.json());

app.use('/posts',postRoutes);
app.use('/authors',authorRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
