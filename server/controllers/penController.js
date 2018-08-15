module.exports = {
    searchCdn(req, res) {
        res.status(200)
    },
    getPen(req, res) {
        // check for pen_id from request
        if(!req.params.penId) {
            res.sendStatus(400)
            return
        }

        const dbConn = req.app.get('db')
        const { penId } = req.params
        // retreive pen and its dependencies from db
        dbConn.get_pen([penId])
            .then( dbResponse => {
                // console.log(dbResponse)
                let pen = dbResponse[0]
                // restructure pen object for consistency
                pen.scripts = {
                    html: {
                        html_tag_class: pen.html_tag_class,
                        head_tag: pen.head_tag
                    },
                    css: pen.css_stylesheet,
                    js: pen.js_script
                }
                // remove unneeded
                delete pen.html_tag_class
                delete pen.head_tag
                delete pen.css_stylesheet
                delete pen.js_script
                
                res.send(pen).status(200)
            })
            .catch( err => {
                console.error(err)
                res.sendStatus(500)
            })
        res.status(200)
    },
    postPen(req, res) {
        // Setting db Connection to variable
        const dbConn = req.app.get('db')
        // Destructure variables off of body
        const { user_id, name, forked, html, css, js, scripts } = req.body
        const html_script = scripts.html
        const css_stylesheet = scripts.css
        const js_script = scripts.js
        const { html_tag_class, head_tag } = html_script
        // Create Pen from variables
        dbConn.post_pen([user_id, name, forked, html, css, js])
            .then( dbResponse => {
                // setting the pen_id from the newly created row to a a variable
                const { pen_id } = dbResponse[0]
                // check to see if the request from the client contains any html settings content
                if(html_tag_class || head_tag) {
                    //Adding the content if it exists
                    dbConn.post_html_scripts([pen_id, html_tag_class, head_tag])
                        .catch( err => {
                            console.error(err)
                            res.sendStatus(500)
                        })
                }
                // check to see if the request from the client contains any css settings content
                if(css_stylesheet[0]) {
                    //Adding the content if it exists
                    for(let i = 0; i < css_stylesheet.length; i++) {
                        dbConn.post_css_stylesheet([pen_id, css_stylesheet[i]])
                            .catch( err => {
                                console.error(err)
                                res.sendStatus(500)
                            }) 
                    }
                }
                // check to see if the request from the client contains any javascript settings content
                if(js_script[0]) {
                    //Adding the content if it exists
                    for(let i = 0; i < js_script.length; i++) {
                        dbConn.post_js_scripts([pen_id, js_script[i]])
                            .catch( err => {
                                console.error(err)
                                res.sendStatus(500)
                            })
                    }
                }

                res.sendStatus(201)
            })
            .catch( err => {
                console.error(err)
                res.sendStatus(500)
            })
    },
    updatePen(req, res) {
        res.status(200)
    },
    deletePen(req, res) {
        res.status(200)
    }
}