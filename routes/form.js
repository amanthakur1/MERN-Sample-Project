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

    try {
        let {name,email,phone,dob} = req.body;
        console.log(req.body);
        if(!name || !email || !phone || !dob){
            return res.status(422).json({error: "Please fill all the Fields..."});
        }   


        // -----------------------Striping Whitespaces---------------------------------------------------------
        name = name.replace(/^\s+|\s+$/g, '');

        // -------------------------DOB CHECHKER----------------------------------------------------------------
        const udob = new Date(dob);
        const userdob = (
            `${(udob.getDate() < 10 ? '0':'') + udob.getDate()  }` +
            `/${(udob.getMonth()+1 < 10 ? '0':'') +(udob.getMonth()+1)  }` +
            `/${udob.getFullYear()}`
        );
        const date= new Date();
        const curDate = `${date.getFullYear()}`+ `/${date.getMonth() + 1}` + `/${date.getDate()}`;
        const dobRegex = /(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/;
        // console.log(userdob,curDate);
        if(!dobRegex.test(userdob)) return res.json({error : "Invalid Date Of Birth Format..."});

        if(date.getFullYear() - udob.getFullYear() < 18) return res.json({error:"You must be 18 or above..."});

        //----------------------- EMAIL CHECK --------------------------------------------------------------
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!emailRegex.test(email)) return res.json({error:"Invalid Email..."});
        
        //----------------------- PHONE CHECK --------------------------------------------------------------
        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        if(!phoneRegex.test(phone)) return res.json({error:"Invalid Phone..."});


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
    }
    catch(err){
        return  res.json({error:"Something Went Wrong..."});
    }
    
});


router.get('/allforms',(req,res)=>{
    Form.find()
    .then(forms=>{
        return res.json({forms});
    })
    .catch(err=>{
        res.json({message:"Form Submission Successful"});
    })
})

module.exports = router;