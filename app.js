const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
const blogposts = [
  {
    id: 1,
    title: ' "The Count of Monte Cristo" by Alexandre Dumas',
    content: "We will be discussing Alexandre Duma's renowned adventure story, The Count of Monte Cristo, today. It is still incredibly well-liked today and is one of my favorite books. For a synopsis and the reasons you ought to read this great book next, continue reading! Even if there are many parallels, there are also many differences. Dumas was able to transform the idea into a masterpiece by expanding on it greatly. The Count of Mount Cristo is a fantastic adventure novel, and I heartily suggest it to anybody who enjoys classic literature but is unsure which to pick up.",
    },
  {
    id: 2,
    title: ' "1984" by George Orwell',
    content: "In the book, George Orwell voiced his views and rage towards communism with all of his wit. Reading the novel isn't all that engaging. Orwell shows us the revulsion of food, vomit, and washbasins in several sections. I forced myself to finish the first half of the book, but the pace picks up when Winston meets Julia, then it stops altogether in the chapter when Winston studies literature critical of the party. It's a terrifying experience to finish. I was made to feel sorry for Winston by his account of his agony. Ultimately, we feel Winston and the Oceanian people's suffering rather than being enthralled with the protagonist's personal life or bravery.",
    },
];

app.get('/', (req, res) => {
  res.render('index', { blogposts: blogposts });
});

app.get('/create-blogpost', (req, res) => {
  res.render('create-blogpost');
});

app.post('/add-blogpost', (req, res) => {
  const newBlogpost = {
    id: blogposts.length + 1,
    title: req.body.title,
    content: req.body.content,
    };
  blogposts.push(newBlogpost);
  res.redirect('/');
}); 

app.get('/blogpost/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const blogpost = blogposts.find((post) => post.id === postId);
  res.render('blogpost', { blogpost });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
