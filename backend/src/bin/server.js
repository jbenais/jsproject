const app = require('../app')

const PORT_NUMBER = 8888;

app.listen(PORT_NUMBER, () => {
    console.log(`Server is running on port ${PORT_NUMBER}`);
});