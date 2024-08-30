import express from 'express';
import url from 'url';

const app = express();
const port = 4000;
const hostname = "127.0.0.1";
app.use(express.json());

let Data = [
    { Id: 1, Name: "kartik", Age: 22 },
    { Id: 2, Name: "Rohan", Age: 23 },
    { Id: 3, Name: "Mohan", Age: 24 },
    { Id: 4, Name: "Sohan", Age: 25 },
    { Id: 5, Name: "Lochan", Age: 26 }
];

app.get("/", (req, res) => {
    res.send(Data);
});

app.post("/newUser", (req, res) => {
    const newData = req.body;
    Data = [...Data, newData];
    res.status(201).send(Data);
});

app.delete("/deleteUser/:id", (req, res) => {
    const ID = Number(req.params.id);
    Data.forEach((element, index) => {
        if (element.Id == ID) {
            Data.splice(index, 1);
        }
    });
    res.send(Data);
});

app.put("/updateUser", (req, res) => {
    const myUrl = url.parse(req.url, true);
    const urlId = Number(myUrl.query.userId);
    const urlName = myUrl.query.userName;
    const urlAge = Number(myUrl.query.userAge);

    Data.forEach((element) => {
        if (element.Id === urlId) {
            if (urlName && urlName.length > 0) {
                element.Name = urlName;
            }
            if (urlAge > 0) {
                element.Age = urlAge;
            }
        }
    });
    res.send(Data);
});

app.listen(port, hostname, () => console.log("Server started at port " + port));
