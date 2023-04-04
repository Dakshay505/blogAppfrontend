import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import App from './App';
import BlogPost from './BlogPost';
import Editor from './Editor';

function AppRouter() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Blog Posts</Link></li>
          <li><Link to="/editor">New Post</Link></li>
        </ul>
      </nav>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/blog-posts/:id" component={BlogPost} />
        <Route path="/editor/:id?" component={Editor} />
      </Switch>
    </Router>
  );
}

export default AppRouter;
