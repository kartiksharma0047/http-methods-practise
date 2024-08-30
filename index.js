import express from 'express';

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
    console.log(req.body)
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
    if (ID > Data.length) {
        res.status(404).send("User Id in not absent in data");
    }else{
        res.send(Data)
    }
});

app.put("/updateUser", (req, res) => {
    const myData = req.body;

    Data.forEach((element) => {
        if (element.Id === Number(myData.Id)) {
            if (myData.Name && myData.Name.length > 0) {
                element.Name = myData.Name;
            }
            if (Number(myData.Age) > 0) {
                element.Age = Number(myData.Age);
            }
        }
    });
    res.send(Data);
});

app.listen(port, hostname, () => console.log("Server started at port " + port));
