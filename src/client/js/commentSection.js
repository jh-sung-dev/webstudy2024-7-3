const form = document.getElementById("commentForm");

if (form) {
  const videocontainer = document.querySelector("#videoContainer");
  const textarea = form?.querySelector("textarea");
  const btn = form?.querySelector("button");
  const videoComments = document?.querySelector(".video__comments ul");
  const delbtn = document?.querySelectorAll(".video__comment button");
  const videoid = videocontainer.dataset.videoid;

  const deleteComment = async (event) => {
    const item = event.currentTarget.parentElement;
    const response = await fetch(`/api/comment/${event.currentTarget.dataset.commentid}`, {
      method: "DELETE"
    });
    if (response.status === 200) {
      videoComments.removeChild(item);
    }
  };

  const addComment = (text, id) => {
    const newComment = document.createElement("li");
    newComment.className = "video__comment m-1 p-1 d-flex justify-content-between border border-dark-subtle rounded";
    const mySpan = document.createElement("span");
    mySpan.innerText = `${text}`;
    const myDelBtn = document.createElement("button");
    myDelBtn.dataset.commentid = id;
    myDelBtn.innerText = "X";
    myDelBtn.addEventListener("click", deleteComment);
    newComment.appendChild(mySpan);
    newComment.appendChild(myDelBtn);
    videoComments.prepend(newComment);
  };

  btn?.addEventListener("click", async (event) => {
    event.preventDefault();
    if (textarea.value) {
      const response = await fetch(`/api/videos/${videoid}/comment`, {
        method: "POST",
        body: JSON.stringify({ videoid, text: textarea.value }),
      });

      if (response.status === 201) {
        const { newCommentId } = await response.json();
        addComment(textarea.value, newCommentId);
        textarea.value = "";
      }
    }
  });

  delbtn.forEach((elem) => elem.addEventListener("click", deleteComment));
}
