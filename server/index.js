const express = require('express')
const app = express()
var cors = require('cors')
const axios = require('axios')
const fs = require('fs')
app.use(cors())
app.use(express.json())
const hostC = 'http://localhost:3030/Category/query?'
const hostE = 'http://localhost:3030/Events/query?'
const hostL = 'http://localhost:3030/Location/query?'

const cat_data = `query=PREFIX+rdf%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0APREFIX+rdfs%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0APREFIX+myp%3A+%3Chttp%3A%2F%2Fwww.semanticweb.org%2Fsuhas%2Fontologies%2F2022%2F10%2Funtitled-ontology-17%23%3E%0APREFIX+xsd%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23%3E%0ASELECT+%3Fid%3Fcat%0AWHERE+%7B%0A++++%3Fsubject+myp%3Ahas_ID+%3Fid+.%0A++++%3Fsubject+myp%3Ahas_Name+%3Fcat+.%0A%7D`
const loc_data = `query=PREFIX+rdf%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0APREFIX+rdfs%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0APREFIX+myp%3A+%3Chttp%3A%2F%2Fwww.semanticweb.org%2Fsuhas%2Fontologies%2F2022%2F10%2Funtitled-ontology-13%23%3E%0APREFIX+xsd%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23%3E%0ASELECT+%3Fid+%3Fplace%0AWHERE+%7B%0A++%3Fsubject+myp%3Ahas_ID+%3Fid.%0A++%3Fsubject+myp%3Ain_City+%3Fplace.%0A%7D`

app.post('/getevents', async (req, res) => {
    let qloc = req.body.loc
    let qcat = req.body.cat

    console.log(qloc, qcat)

    qloc = '1026.0'
    qcat = '10'

    // let eve_data = `query=PREFIX+rdf%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0APREFIX+rdfs%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0APREFIX+myp%3A+%3Chttp%3A%2F%2Fwww.semanticweb.org%2Fsuhas%2Fontologies%2F2022%2F10%2Funtitled-ontology-9%23%3E%0APREFIX+xsd%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23%3E%0ASELECT+%3Fid+%3Fname+%3Fdes+%3Fday+%3Fmonth+%3Fyear+%3Fcost+%3Fstarttime+%3Fendtime+%3Femail+%3Fnum+%0AWHERE+%7B%0A++%3Fsubject+myp%3AhasID+%3Fid.%0A++%3Fsubject+myp%3Ahas_Desc+%3Fdes.%0A++%3Fsubject+myp%3Ahas_Day+%3Fday.%0A++%3Fsubject+myp%3Ahas_Month+%3Fmonth.%0A++%3Fsubject+myp%3Ahas_Year+%3Fyear.%0A++%3Fsubject+myp%3AhasCost+%3Fcost.%0A++%3Fsubject+myp%3AhasEndTime+%3Fendtime.%0A++%3Fsubject+myp%3AhasStartTime+%3Fstarttime.%0A++%3Fsubject+myp%3AhasMailID+%3Femail.%0A++%3Fsubject+myp%3AhasMobileNumber+%3Fnum.%0A++%3Fsubject+myp%3AhasName+%3Fname.%0A++%3Fsubject+myp%3Ahas_LocID+%3Flid.%0A++%3Fsubject+myp%3Ahas_CatID+%3Fcid.%0A++FILTER(%3Fcid+%3D+%22${qcat}%22%5E%5Exsd%3Astring).%0A++FILTER(%3Flid+%3D%22${qloc}%22%5E%5Exsd%3Astring).%0A%7D%0A`
    // console.log(eve_data);
    let eve_data = `query=PREFIX%20rdf%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0APREFIX%20rdfs%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0APREFIX%20myp%3A%20%3Chttp%3A%2F%2Fwww.semanticweb.org%2Fsuhas%2Fontologies%2F2022%2F10%2Funtitled-ontology-9%23%3E%0APREFIX%20xsd%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23%3E%0ASELECT%20%3Fid%20%3Fname%20%3Fdes%20%3Fday%20%3Fmonth%20%3Fyear%20%3Fcost%20%3Fstarttime%20%3Fendtime%20%3Femail%20%3Fnum%20%0AWHERE%20%7B%0A%20%20%3Fsubject%20myp%3AhasID%20%3Fid.%0A%20%20%3Fsubject%20myp%3Ahas_Desc%20%3Fdes.%0A%20%20%3Fsubject%20myp%3Ahas_Day%20%3Fday.%0A%20%20%3Fsubject%20myp%3Ahas_Month%20%3Fmonth.%0A%20%20%3Fsubject%20myp%3Ahas_Year%20%3Fyear.%0A%20%20%3Fsubject%20myp%3AhasCost%20%3Fcost.%0A%20%20%3Fsubject%20myp%3AhasEndTime%20%3Fendtime.%0A%20%20%3Fsubject%20myp%3AhasStartTime%20%3Fstarttime.%0A%20%20%3Fsubject%20myp%3AhasMailID%20%3Femail.%0A%20%20%3Fsubject%20myp%3AhasMobileNumber%20%3Fnum.%0A%20%20%3Fsubject%20myp%3AhasName%20%3Fname.%0A%20%20%3Fsubject%20myp%3Ahas_LocID%20%3Flid.%0A%20%20%3Fsubject%20myp%3Ahas_CatID%20%3Fcid.%0A%20%20FILTER(%3Flid%20%3D%222.0%22%5E%5Exsd%3Astring).%0A%7D`

    await axios.get(hostE + eve_data, {
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Accept': ' application/sparql-results+json',
            'Accept-Encoding': 'gzip deflate',
            'Accept-Language': 'en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
    }).then((response) => {
        const op = response.data.results.bindings
        // console.log(op)
        const eves = [];
        for (var i = 0; i < op.length; ++i) {
            const x = {
                id: op[i].id.value,
                name: op[i].name.value,
                des: op[i].des.value,
                day: op[i].day.value,
                month: op[i].month.value,
                year: op[i].year.value,
                cost: op[i].cost.value,
                starttime: op[i].starttime.value,
                endtime: op[i].endtime.value,
                email: op[i].email.value,
                num: op[i].num.value
            };
            eves.push(x)
        }
        console.log(eves)
        res.json({ eves })
    })
})
app.post('/getlocations', async (req, res) => {
    await axios.get(hostL + loc_data, {
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Accept': ' application/sparql-results+json',
            'Accept-Encoding': 'gzip deflate',
            'Accept-Language': 'en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
    }).then((response) => {
        const op = response.data.results.bindings;
        const locs = [];
        for (var i = 0; i < op.length; ++i) {
            const x = { id: op[i].id.value, place: op[i].place.value };
            locs.push(x)
        }
        // console.log(locs)
        res.json({ locs })
        return response.data;
    })
})
app.post('/getcategories', async (req, res) => {
    await axios.get(hostC + cat_data, {
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Accept': ' application/sparql-results+json',
            'Accept-Encoding': 'gzip deflate',
            'Accept-Language': 'en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
    }).then((response) => {
        const op = response.data.results.bindings;
        const cats = [];
        for (var i = 0; i < op.length; ++i) {
            const x = { id: op[i].id.value, category: op[i].cat.value };
            cats.push(x)
        }
        // console.log(cats)
        res.json({ cats })
        return response.data;
    })
})
app.post('/login', async (req, res) => {
    JSON.stringify(req.body)
    const name = req.body.uname;
    const password = req.body.pass;
    console.log(name, password)
    let ans = login(name, password)
    res.json(ans)
})
app.post('/register', async (req, res) => {
    JSON.stringify(req.body)
    const name = req.body.uname;
    const password = req.body.pass;
    const email = req.body.email;
    console.log(name, password)
    let ans = register(name, password, email)
    res.json(ans)
})
const register = (name, password, email) => {
    var filedata = fs.readFileSync('./data/users.json')
    var data = JSON.parse(filedata);
    var users = data.users;
    for (var i = 0; i < users.length; i++) {
        if (users[i].uname === name && users[i].pass === password) {
            return 'fail'
        }
    }

    data.users.push({ uname: name, pass: password, email: email });
    fs.writeFile("./data/users.json", JSON.stringify(data), err => {
        if (err) console.log("Error writing file:", err);
    });
    return 'success';
}

const login = (name, password) => {
    var filedata = fs.readFileSync('./data/users.json')
    var data = JSON.parse(filedata);
    var users = data.users;
    for (var i = 0; i < users.length; i++) {
        if (users[i].uname === name && users[i].pass === password) {
            return 'success'
        }
    }
    return 'fail'
}
const server = app.listen(5000, () => {
    console.log("listening on 5000 port")
})
async function resL() {
    const x = await axios.get(hostL + loc_data, {
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Accept': ' application/sparql-results+json',
            'Accept-Encoding': 'gzip deflate',
            'Accept-Language': 'en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
    }).then((response) => {
        return response.data;
    })

    return x;
};