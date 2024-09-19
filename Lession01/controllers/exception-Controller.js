exports.error = (req, res, next) => {
    // res.send('<h1>404 Page not found</h1>');
    // console.log('ERROR');
    res.render('404', { pageTitle: "Page not found" });
}