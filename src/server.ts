import app from "./index";
const PORT = 3000;

// app.listen(PORT, () => {
//     console.log('Express server listening on port ' + PORT);
// })

app.listen(PORT, '0.0.0.0', (err) => {
    if (err) {
      console.log(err);
    }
  
    console.info('>>> 🌎 Open http://0.0.0.0:%s/ in your browser.', PORT);
  });