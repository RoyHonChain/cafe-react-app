// components/Post.js
export default function Post(props) {
    const post = props.post;
    const time = post.createdAt;
    const shortTime = time.slice(0,10);
    return (
      <div className="Post">
        <div>
          {post.metadata.content}
        </div>
        <div style = {{ marginTop: '7px', borderTop: '1px solid grey'}}>
          {shortTime}
        </div>    
      </div>
    );
  }