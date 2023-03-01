import { useQuery } from "@apollo/client";
import fetchProfileQuery from "../queries/fetchProfileQuery.js";
import Profile from "../components/Profile.js";
import Post from "../components/Post.js";


function Blog() {

  const { loading, error, data } = useQuery(fetchProfileQuery, {
    variables: {
      request: { profileId: '0x766d'},
      publicationsRequest: {
        profileId: '0x766d',
        publicationTypes: ["POST"],
      },
    },
  });

  if (loading) return "Loading..";
  if (error) return `Error! ${error.message}`;

  return (
    <div className='Blog'>
        <div className="banner-text">Blog powered by Lens</div>
        <Profile profile={data.profile} displayFullProfile={true} />
          {data.publications.items.map((post, idx) => {
            return <Post key={idx} post={post}/>;
          })}
      
    </div>
  );


  
}

export default Blog;
