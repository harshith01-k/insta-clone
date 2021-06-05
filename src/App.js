import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./Header";
import Posts from "./Posts";
import { db } from "./firebase";
import Upload from "./Upload";

function App() {
  const [posts, setPosts] = useState([]);
  const [userName, setUserName] = useState("");
  const [present, setPresent] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp")
      .onSnapshot((snapshot) =>
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })))
      );
  }, []);

  return (
    <div className="app">
      <Header
        user={user}
        setUser={setUser}
        present={present}
        setPresent={setPresent}
        userName={userName}
        setUserName={setUserName}
      />
      <div className="uploader">
        {userName.displayName && user ? (
          <Upload userNum={userName.displayName} />
        ) : (
          <h3 className="alert">
            SignUP or Login to upload image and to put comment
          </h3>
        )}
      </div>

      <div className="app_post">
        {posts.map(({ post, id }) => (
          <Posts
            key={id}
            user={user}
            postId={id}
            caption={post.caption}
            imgUrl={post.imgUrl}
            username={post.username}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
