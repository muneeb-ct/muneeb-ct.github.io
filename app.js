document.getElementById('create-blog-btn').addEventListener('click', function() {
    document.getElementById('create-blog-modal').style.display = 'block';
});

document.getElementById('create-blog-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(document.getElementById('create-blog-form'));
    fetch('/create-blog', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const title = formData.get('blog-title');
            const content = formData.get('blog-content');
            const background = formData.get('blog-background').name;
            const blogPage = document.getElementById('blog-page');
            const blogElement = document.createElement('div');
            blogElement.className = 'blog';
            blogElement.style.backgroundImage = `url(/uploads/${background})`;
            blogElement.style.backgroundSize = 'cover';
            blogElement.style.padding = '20px';
            blogElement.style.borderRadius = '8px';
            blogElement.style.marginBottom = '20px';
            blogElement.innerHTML = `<h3>${title}</h3><div class="blog-content"><p>${content}</p></div>`;
            blogPage.insertBefore(blogElement, blogPage.firstChild); // Insert new blog at the top
            document.getElementById('create-blog-modal').style.display = 'none';
            document.getElementById('create-blog-form').reset();
        } else {
            alert('Failed to create blog');
        }
    });
});

document.getElementById('create-blog-modal').addEventListener('click', function(event) {
    if (event.target === this) {
        this.style.display = 'none';
    }
});

document.getElementById('your-blogs-btn').addEventListener('click', function() {
    const isLoggedIn = false; // Replace with actual login check
    if (isLoggedIn) {
        window.location.href = 'userblogs.html';
    } else {
        alert('Sign in to view your blogs');
        window.location.href = 'signin.html';
    }
});

document.getElementById('edit-blog-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const blogId = document.getElementById('blog-id').value;
    const formData = new FormData(document.getElementById('edit-blog-form'));
    fetch(`/update-blog/${blogId}`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Blog updated successfully');
        } else {
            alert('Failed to update blog');
        }
    });
});
