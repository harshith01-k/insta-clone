import React, { useState } from "react";
import { db, storage } from "./firebase";
import { Button } from "@material-ui/core";
import firebase from "firebase";
import "./Upload.css";

function Upload({ userNum }) {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        // Error function
        console.log(error);
        alert(error.message);
      },
      () => {
        // complete function ...
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // Post image URL inside db
            db.collection("posts").add({
              // timestamp is used here to figure out the time the image was uploaded, which is gonna determine the order in which we display the posts (latest at the top)
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imgUrl: url,
              username: userNum,
              imagename: image.name,
            });

            // Reset everything once upload process is completed
            setProgress(0);
            setCaption("");
            setImage(null);
            // closemodal(false);

            // viewwhichuser("");
            // viewsinglepost(false);
          });
      }
    );
  };
  return (
    <div className="upload">
      <input
        required
        className="caption"
        value={caption}
        type="text"
        onChange={(e) => {
          setCaption(e.target.value);
        }}
        placeholder="Enter Caption"
      />
      <input required type="file" onChange={handleChange} />
      {caption && image ? (
        <Button disabled={false} className="btn-upload" onClick={handleUpload}>
          upload
        </Button>
      ) : (
        <Button disabled className="btn-upload op" onClick={handleUpload}>
          upload
        </Button>
      )}
    </div>
  );
}

export default Upload;
