const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/learnato_forum';
mongoose.connect(MONGO)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  votes: { type: Number, default: 0 },
  isAnswered: { type: Boolean, default: false },
  replies: [{ content: String, createdAt: { type: Date, default: Date.now } }],
}, { timestamps: true });
const Post = mongoose.model('Post', postSchema);
app.post('/posts', async (req, res) => {
  const post = await Post.create(req.body);
  res.json(post);
});
app.get('/posts', async (req, res) => {
  const { search } = req.query;
  const query = search ? { $or: [ { title: { $regex: search, $options: 'i' } }, { content: { $regex: search, $options: 'i' } } ] } : {};
  const posts = await Post.find(query).sort({ createdAt: -1 });
  res.json(posts);
});
app.get('/posts/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.json(post);
});
app.post('/posts/:id/reply', async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.replies.push(req.body);
  await post.save();
  res.json(post);
});
app.post('/posts/:id/upvote', async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.votes += 1;
  await post.save();
  res.json(post);
});
app.patch('/posts/:id/answered', async (req, res) => {
  const flag = typeof req.body.flag === 'boolean' ? req.body.flag : true;
  const post = await Post.findByIdAndUpdate(req.params.id, { isAnswered: flag }, { new: true });
  res.json(post);
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
