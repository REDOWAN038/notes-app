const app = require("./app")
const { port } = require("./secret")

app.listen(port, async () => {
    try {
        console.log(`server is listening at http://localhost:${port}`)
    } catch (error) {
        console.log(error);
    }
})