const express = require('express');
const app = express();

const port = process.env.PORT || 8080;
app.get('/', require('./routes'));



app.listen(port, () => {
    console.log(`Web server is listening at port ${port}`);
});
