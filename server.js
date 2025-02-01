const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const app = express();

mongoose.connect('mongodb://localhost:27017/blogDB', { useNewUrlParser: true, useUnifiedTopology: true });

const blogSchema = new mongoose.Schema({
    title: String,
    content: String,
    background: String
});

const Blog = mongoose.model('Blog', blogSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

app.post('/create-blog', upload.single('background'), (req, res) => {
    const { title, content } = req.body;
    const background = req.file ? `/uploads/${req.file.filename}` : '';
    const newBlog = new Blog({ title, content, background });
    newBlog.save((err) => {
        if (err) {
            res.send({ success: false });
        } else {
            res.send({ success: true });
        }
    });
});

app.post('/update-blog/:id', upload.single('background'), (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const background = req.file ? `/uploads/${req.file.filename}` : '';
    Blog.findByIdAndUpdate(id, { title, content, background }, (err) => {
        if (err) {
            res.send({ success: false });
        } else {
            res.send({ success: true });
        }
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'blog.html'));
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
