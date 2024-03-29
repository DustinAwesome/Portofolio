const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Article = require("./db").Article;
const read = require("node-readability");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/css/bootstrap.css", express.static("node_modules/bootstrap/dist/css/bootstrap.css"));

app.set("port", process.env.PORT || 3000);

app.get("/articles", (req, res, next) => {
    Article.all((err, articles) => {
        if (err) return next(err);
        res.format({
            html: () => {
                res.render("articles.ejs", { articles: articles });
            },
            json: () => {
                res.send(articles);
            }
        });
    });
});

app.get("/articles/:id", (req, res, next) => {
    const id = req.params.id;
    Article.find(id, (err, article) => {
        if (err) 
          return next(err);
        if(article)
          res.send(article);
        else
          res.send(404);
        });
});

app.delete("/articles/:id", (req, res, next) => {
    const id = req.params.id;
    Article.delete(id, (err) => {
        if (err) return next(err);
        res.send({ message: "Deleted" });
    });
});

app.post("/articles", (req, res, next) => {
    const url = req.body.url;

    read(url, (err, result) => {
        if (err || !result)
            return res.status(500).send("Error downloading article");
        Article.create(
            { title: result.title, content: result.content },
            (err, article) => {
                if (err) return next(err);
                res.send("OK");
            }
        );
    });
});

app.listen(app.get("port"), () => {
    console.log("App started on port", app.get("port"));
});
