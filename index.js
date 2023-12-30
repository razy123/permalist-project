import express from "express";
import bodyParser from "body-parser";
import pg from 'pg';

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database:"permalist",
  password : "insha123",
  port : 5432


}

);

const app = express();
const port = 3000;

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [
  { id: 1, title: "Buy milk" },
  { id: 2, title: "Finish homework" },
];

async function getItems(){
  const result =await db.query("SELECT * FROM items");
  items = result.rows;
}

app.get("/", async (req, res) => {
  const item = await getItems();
  console.log(item);
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", (req, res) => {
  const item = req.body.newItem;
  db.query("INSERT INTO items(title) VALUES($1)",[item]);
  items.push({ title: item });
  res.redirect("/");
});

app.post("/edit", (req, res) => {
 

  // const result = db.query("")

 
  
});

app.post("/delete", (req, res) => {
 
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
