// components/Profile.js
export default function Profile(props) {
  const profile = props.profile;

  // When displayFullProfile is true, we show more info.
  const displayFullProfile = props.displayFullProfile;

  //const picOriginal =`https://ipfs.infura.io/ipfs/+${profile.picture.original.url.slice(7)}`;
  //const pic ="https://ipfs.infura.io/ipfs/"+profile.picture.url.slice(7);
  const picIPFS = profile.picture.original.url;
  const picUrl = `https://ipfs.filebase.io/ipfs/${picIPFS.slice(7)}`;
  console.log(picUrl);

  return (
    <div className="p-8">
        <div className="Profile">
          <div className="Photo">
            {profile.picture ? (
                  <img
                    src={
                      picUrl
                    }
                  />
                ) : (
                  <div
                    style={{
                      backgrondColor: "gray",
                    }}
                  />
                )}
          </div>
          <div className="Info">
            <div className="Handle">
              {profile.handle}
              {displayFullProfile &&
                profile.name &&
                " (" + profile.name + ")"}
            </div>

            <div>
            {profile.bio}
            </div>

            <div className="Owner">
              {profile.ownedBy}
            </div>

            <div className="Follow">
              following: {profile.stats.totalFollowing} followers:{" "}
              {profile.stats.totalFollowers}
            </div>
          </div>

        </div>
    </div>
  );
}