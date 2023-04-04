import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BlogPost(props) {
  const [blogPost, setBlogPost] = useState(null);
  const [commentContent, setCommentContent] = useState('');

  useEffect(() => {
    async function fetchBlogPost() {
      const res = await axios.get(`/api/blog-posts/${props.match.params.id}`);
      setBlogPost(res.data);
    }
    fetchBlogPost();
  }, [props.match.params.id]);

  function handleCommentContentChange(event) {
    setCommentContent(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios.post(`/api/blog-posts/${props.match.params.id}/comments`, { content: commentContent })
      .then(res => {
        setBlogPost(prevState => {
          const updatedComments = [...prevState.comments, res.data[res.data.length - 1]];
          return { ...prevState, comments: updatedComments };
        });
        setCommentContent('');
      })
      .catch(err => console.log(err));
  }

  if (!blogPost) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{blogPost.title}</h2>
      <p>By {blogPost.author.username}</p>
      <p>{blogPost.content}</p>
      <h3>Comments</h3>
      <ul>
        {blogPost.comments.map(comment => (
          <li key={comment._id}>
            <p>{comment.content}</p>
            <p>By {comment.user.username} on {new Date(comment.date).toLocaleString()}</p>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
    <label htmlFor="content">Comment:</label>
    <input type="text" id="content" name="content" value={commentContent} onChange={handleCommentContentChange} />
    <button type="submit">Submit</button>
  </form>
</div>
)
}

export default BlogPost;