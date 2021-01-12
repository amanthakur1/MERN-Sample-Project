const  express      = require       ('express'       );
const  router       = express.Router(                );
const  mongoose     = require       ('mongoose'      );
const  Form         = mongoose.model("Form"          );
const {SENDMAILKEY} = require       ('../config/keys');

// email ----nodemailer
const nodemailer        = require('nodemailer'                   );
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(sendgridTransport({
    auth : {
        api_key : SENDMAILKEY
    }
}))

// // email ----nodemailer


router.post('/submit',(req,res)=>{
    let {name,email,phone,dob} = req.body;
    console.log(req.body);
    if(!name || !email || !phone || !dob){
        return res.status(422).json({error: "Please fill all the Fields..."});
    }   



    name = name.replace(/^\s+|\s+$/g, '');

    const userdob = new Date(dob);
    const date= new Date();
    const curDate = `${date.getFullYear()}`+ `-${date.getMonth() + 1}` + `-${date.getDate()}`

    if(date.getFullYear() - userdob.getFullYear() < 18) return res.json({error:"Underage"});

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!emailRegex.test(email)) return res.json({error:"Invalid email"});
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if(!phoneRegex.test(phone)) return res.json({error:"Invalid Phone"});


    // return res.json({
    //     all: "ok",
    //     name    
    // });

    const newform = new Form({
        name,
        email,
        phone,
        dob
    })
    newform.save()
    .then(newform=>{
        transporter.sendMail({
            to:newform.email,
            from:"ac247453@gmail.com",
            subject:"Form Submission Successful",
            html:"<h1>Form Submission Successful</h1>"
        });
                
        return res.json({message:"Form Submission Successful"});
    })
    .catch(err=>{
        console.log(err);
    })
    
});


router.get('/allforms',(req,res)=>{
    Form.find()
    .then(forms=>{
        return res.json({forms});
    })
    .catch(err=>{
        console.log(err);
    })
})

module.exports = router;