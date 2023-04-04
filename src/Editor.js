import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Editor(props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (props.match.params.id) {
      async function fetchBlogPost() {
        const res = await axios.get(`/api/blog-posts/${props.match.params.id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
      }
      fetchBlogPost();
    }
  }, [props.match.params.id]);

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleContentChange(event) {
    setContent(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!title.trim() || !content.trim()) {
      setErrorMessage('Please fill out all fields.');
      return;
    }
    setErrorMessage('');
    if (props.match.params.id) {
      axios.put(`/api/blog-posts/${props.match.params.id}`, { title, content })
        .then(res => {
          props.history.push(`/blog-posts/${props.match.params.id}`);
        })
        .catch(err => console.log(err));
    } else {
      axios.post('/api/blog-posts', { title, content })
        .then(res => {
          props.history.push('/');
        })
        .catch(err => console.log(err));
    }
  }

  return (
    <div>
      <h2>{props.match.params.id ? 'Edit' : 'Create'} Blog Post</h2>
      {errorMessage && <div>{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" value={title} onChange={handleTitleChange} />
        <label htmlFor="content">Content:</label>
        <textarea id="content" name="content" value={content} onChange={handleContentChange}></textarea>
        <button type="submit">{props.match.params.id ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
}

export default Editor;
