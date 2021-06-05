import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import firebase from "firebase";
import { db } from "./firebase";
import "./Post.css";

function Posts({ postId, imgUrl, username, caption, user }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (event) => {
    event.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };
  return (
    <div className="post">
      <div className="post_header">
        <Avatar
          className="post__avatar"
          alt={username}
          src="/static/images/avatar/1.jpg"
        />
        <h3>{username}</h3>
      </div>
      <img src={imgUrl} alt="dhb" className="post-image" />
      <p className="post-text">
        <strong>{username}</strong> : {caption}
      </p>
      <div className="post__comments">
        comments :<br></br>
        {comments.map((comment) => (
          <p>
            <strong>{comment.username}</strong> : {comment.text}
          </p>
        ))}
      </div>
      <div className="comments-sections">
        {user && (
          <form className="post__commentsBox">
            <input
              className="post__input"
              type="text"
              placeholder="Add a comment.."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              className="post__button"
              disabled={!comment}
              type="submit"
              onClick={postComment}
            >
              Post
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Posts;
