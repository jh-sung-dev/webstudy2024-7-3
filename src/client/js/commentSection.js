const form = document.getElementById("commentForm");

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment";
  const mySpan = document.createElement("span");
  mySpan.innerText = `${text}`;
  const mySpanDel = document.createElement("span");
  mySpanDel.innerText = "X";
  newComment.appendChild(mySpan);
  newComment.appendChild(mySpanDel);
  videoComments.prepend(newComment);
};

if (form) {
  const videocontainer = document.querySelector("#videoContainer");
  const textarea = form?.querySelector("textarea");
  const btn = form?.querySelector("button");

  const videoid = videocontainer.dataset.videoid;

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
}
