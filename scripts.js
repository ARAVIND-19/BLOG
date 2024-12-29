function renderPosts(posts) {
  const postList = document.getElementById('post-list');
  if (!postList) return;

  postList.innerHTML = '';
  Object.values(posts).forEach(post => {
    const postItem = document.createElement('li');
    postItem.className = 'post-item';
    postItem.innerHTML = `
      <div class="post-content-wrapper" onclick="openPost(${post.id})">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-date">${post.date}</p>
        <p class="post-summary">${post.summary}</p>
      </div>
    `;
    postList.appendChild(postItem);
  });
}

function filterPosts(event) {
  const query = event.target.value.trim().toLowerCase();
  if (!query) {
    renderPosts(CONFIG.POSTS);
    return;
  }

  const filteredPosts = Object.values(CONFIG.POSTS).filter(post =>
    post.title.toLowerCase().includes(query)
  );
  renderPosts(filteredPosts);
}

function toggleDarkMode() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  try {
    localStorage.setItem('theme', newTheme);
  } catch (error) {
    console.error('Failed to save theme to localStorage:', error);
  }
}

function openPost(id) {
  if (!id) return;
  window.location.href = `post.html?id=${id}`;
}

document.addEventListener('DOMContentLoaded', () => {
  let savedTheme = 'light';
  try {
    savedTheme = localStorage.getItem('theme') || 'light';
  } catch (error) {
    console.error('Failed to retrieve theme from localStorage:', error);
  }
  document.documentElement.setAttribute('data-theme', savedTheme);
  renderPosts(CONFIG.POSTS);
});