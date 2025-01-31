let videos = [];

// Function to open the upload modal
function openUploadModal() {
    document.getElementById("uploadModal").style.display = "flex";
}

// Function to close the upload modal
function closeUploadModal() {
    document.getElementById("uploadModal").style.display = "none";
}

// Function to upload a video
function uploadVideo() {
    const videoInput = document.getElementById("videoInput");
    const videoTitle = document.getElementById("videoTitle");
    const videoFeed = document.getElementById("videoFeed");

    // Ensure video file and title are provided
    if (!videoInput.files.length || !videoTitle.value) {
        alert("Please select a video and enter a title!");
        return;
    }

    // Create a video object
    const video = {
        title: videoTitle.value,
        url: URL.createObjectURL(videoInput.files[0]),
        likes: 0,
        comments: [],
    };

    // Add the new video to the array
    videos.push(video);

    // Create a new video card to display
    const videoCard = document.createElement("div");
    videoCard.classList.add("video-card");
    videoCard.innerHTML = `
        <video controls>
            <source src="${video.url}" type="video/mp4" />
        </video>
        <div class="video-info">
            <h3>${video.title}</h3>
            <button onclick="likeVideo(${videos.length - 1})">Like (${video.likes})</button>
            <button onclick="addComment(${videos.length - 1})">Comment</button>
        </div>
    `;

    // Add video card to the feed
    videoFeed.prepend(videoCard);

    // Clear input fields and close modal
    document.getElementById("videoInput").value = "";
    document.getElementById("videoTitle").value = "";
    closeUploadModal();
}

// Function to like a video
function likeVideo(index) {
    videos[index].likes += 1;
    updateLikes(index);
}

// Function to add a comment to a video
function addComment(index) {
    const comment = prompt("Enter your comment:");
    if (comment) {
        videos[index].comments.push(comment);
        updateComments(index);
    }
}

// Function to update likes
function updateLikes(index) {
    const videoCard = document.querySelectorAll(".video-card")[index];
    const likeButton = videoCard.querySelector("button");
    likeButton.innerText = `Like (${videos[index].likes})`;
}

// Function to update comments
function updateComments(index) {
    const commentsContainer = document.querySelectorAll(".video-card .video-info")[index].querySelector(".comments");
    commentsContainer.innerHTML = videos[index].comments.map(comment => `<p>${comment}</p>`).join('');
}
