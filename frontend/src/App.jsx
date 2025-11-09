import React, { useEffect, useState } from 'react';
import axios from 'axios';
export default function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [search, setSearch] = useState('');
  const API = 'http://localhost:5000';
  const fetchPosts = async () => {
    const res = await axios.get(`${API}/posts?search=${encodeURIComponent(search)}`);
    setPosts(res.data);
  };
  useEffect(() => { fetchPosts(); }, [search]);
  const addPost = async () => {
    if (!title.trim()) return alert('Title required');
    await axios.post(`${API}/posts`, { title, content });
    setTitle(''); setContent('');
    fetchPosts();
  };
  const upvote = async (id) => { await axios.post(`${API}/posts/${id}/upvote`); fetchPosts(); };
  const toggleAnswered = async (id, flag) => { await axios.patch(`${API}/posts/${id}/answered`, { flag }); fetchPosts(); };
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Learnato Forum</h1>
      <div className="mb-4 flex gap-2">
        <input className="border p-2 flex-1" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <div className="mb-4 bg-white p-4 rounded shadow">
        <input className="border p-2 w-full mb-2" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <textarea className="border p-2 w-full mb-2" placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
        <button onClick={addPost} className="bg-blue-600 text-white px-4 py-2 rounded">Add Post</button>
      </div>
      <div>
        {posts.length === 0 && <p className="text-center text-gray-600">No posts yet</p>}
        {posts.map(p => (
          <div key={p._id} className="bg-white p-4 rounded shadow mb-3">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">{p.title}</h2>
                <p className="text-gray-700">{p.content}</p>
                <p className="text-sm text-gray-600">Votes: {p.votes} | Replies: {p.replies?.length || 0}</p>
              </div>
              <div className="text-right">
                <p className="text-sm">{p.isAnswered ? '✅ Answered' : '❌ Not answered'}</p>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <button onClick={() => upvote(p._id)} className="bg-green-500 text-white px-3 py-1 rounded">Upvote</button>
              {!p.isAnswered && <button onClick={() => toggleAnswered(p._id, true)} className="bg-gray-500 text-white px-3 py-1 rounded">Mark Answered</button>}
              {p.isAnswered && <button onClick={() => toggleAnswered(p._id, false)} className="bg-yellow-500 text-white px-3 py-1 rounded">Unmark</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
