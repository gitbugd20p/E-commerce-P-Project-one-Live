/**
 * PROJECT: S-E-Commerce-Live
 * AUTHOR: [Md. Sabur]
 * LICENSE: GPL-3.0 (Educational Use Only)
 * * NOTE TO STUDENTS: Feel free to use this logic to learn.
 * NOTE TO SELLERS: Commercial resale is a violation of the license.
 */

//================================================
// If you find this helpful, please give it a ⭐ on GitHub!
//================================================

const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});

module.exports = app;
