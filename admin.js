let posts = { ...CONFIG.POSTS }; // Create a copy of the posts for admin editing

function renderPosts(posts) {
  const postList = document.getElementById('post-list');
  if (!postList) return;

  postList.innerHTML = '';
  Object.values(posts).forEach(post => {
    const postItem = document.createElement('li');
    postItem.className = 'post-item';
    postItem.innerHTML = `
      <h2 class="post-title">${post.title}</h2>
      <p class="post-date">${post.date}</p>
      <p class="post-summary">${post.summary}</p>
      <button onclick="editPost(${post.id})">Edit</button>
      <button onclick="deletePost(${post.id})">Delete</button>
    `;
    postList.appendChild(postItem);
  });
  document.getElementById('json-editor').value = JSON.stringify(posts, null, 2);
}

function addOrUpdatePost(event) {
  event.preventDefault();
  const id = document.getElementById('post-id').value;
  const title = document.getElementById('post-title').value;
  const date = document.getElementById('post-date').value;
  const summary = document.getElementById('post-summary').value;
  const content = document.getElementById('post-content').value;
  const tags = document.getElementById('post-tags').value.split(',').map(tag => tag.trim());
  const categories = document.getElementById('post-categories').value.split(',').map(category => category.trim());

  const post = {
    id: id || Object.keys(posts).length + 1,
    key: title.toLowerCase().replace(/\s+/g, '-'),
    title,
    date,
    summary,
    content,
    tags,
    categories
  };

  if (id) {
    posts[id] = post;
  } else {
    posts[post.id] = post;
  }

  renderPosts(posts);
  event.target.reset();
}

function editPost(id) {
  const post = posts[id];
  if (!post) return;

  document.getElementById('post-id').value = post.id;
  document.getElementById('post-title').value = post.title;
  document.getElementById('post-date').value = post.date;
  document.getElementById('post-summary').value = post.summary;
  document.getElementById('post-content').value = post.content;
  document.getElementById('post-tags').value = post.tags.join(', ');
  document.getElementById('post-categories').value = post.categories.join(', ');
}

function deletePost(id) {
  if (confirm('Are you sure you want to delete this post?')) {
    delete posts[id];
    renderPosts(posts);
  }
}

function updatePostsFromJson() {
  try {
    const newPosts = JSON.parse(document.getElementById('json-editor').value);
    posts = newPosts;
    renderPosts(posts);
  } catch (e) {
    alert('Invalid JSON');
  }
}

function login(event) {
  event.preventDefault();
  const password = document.getElementById('admin-password').value;
  if (password === CONFIG.ADMIN_PASSWORD) {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('admin-content').style.display = 'block';
    renderPosts(posts);
  } else {
    alert('Incorrect password');
  }
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
  renderPosts(posts);
});