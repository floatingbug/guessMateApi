const {store} = require("./stores/store");
const {createApi} = require("./createApi");
const api = createApi({store});
const http = require("http");
const server = http.createServer(api);
const port = process.env.PORT || 3000;

server.listen(3000, () => {
    console.log("Server listen on port: ", port)
});
