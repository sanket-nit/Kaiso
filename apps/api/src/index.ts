import express from "express";

const app = express();

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello")
})

app.post('/signup', (req, res) => {
  const {username, email, password} = req.body;
  if(!username || !email || !password) {
    return res.status(400).send({
      message: 'All fields required'
    })
  }
  console.log(username, email, password);
  res.send({
    status: 'success'
  })
})

app.post('/signin', (req, res) => {
  const {email, password} = req.body;
  if(!email || !password) {
    return res.status(400).send({
      message: 'All fields required'
    })
  }
  console.log(email, password);
  res.send({
    status: 'success'
  })
})

app.post('/create-room', (req, res) => {
  
})

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
