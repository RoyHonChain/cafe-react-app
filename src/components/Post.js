// components/Post.js
export default function Post(props) {
    const post = props.post;
    const time = post.createdAt;
    const shortTime = time.slice(0,10);
    return (
      <div style={{ position:'relative' }}>

        <div className="Post">
          <div>
            {post.metadata.content}
          </div>
          <div style={{ marginTop: '15px', borderBottom: '1px solid grey' }}></div>
          <div style = {{ marginTop: '7px'}}>
            {shortTime}
          </div>
        </div>

        <div className="PostShadow">
          <div>
            {post.metadata.content}
          </div>
          <div style={{ marginTop: '15px', borderBottom: '1px solid grey' }}></div>
          <div style = {{ marginTop: '7px'}}>
            {shortTime}
          </div>
        </div>
        
      </div>

    );
  }