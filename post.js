function getPostIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const postId = params.get('id');
  return postId ? parseInt(postId, 10) : null;
}

function renderPost(post) {
  if (!post) {
    document.getElementById('post-content').innerHTML = '<p>Post not found.</p>';
    return;
  }

  document.getElementById('post-title').textContent = post.title;
  document.getElementById('post-content').innerHTML = `
    <h2>${post.title}</h2>
    <p class="post-date">${post.date}</p>
    <p class="post-summary">${post.summary}</p>
    <div class="post-body">${post.content}</div>
  `;
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

document.addEventListener('DOMContentLoaded', () => {
  let savedTheme = 'light';
  try {
    savedTheme = localStorage.getItem('theme') || 'light';
  } catch (error) {
    console.error('Failed to retrieve theme from localStorage:', error);
  }
  document.documentElement.setAttribute('data-theme', savedTheme);

  const postId = getPostIdFromUrl();
  const post = CONFIG.POSTS[postId];
  renderPost(post);
});