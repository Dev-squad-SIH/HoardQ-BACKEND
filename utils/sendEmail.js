const nodemailer=require('nodemailer');

const sendEmail=async(options)=>{
   
   const transporter=nodemailer.createTransport({
       service:process.env.SMTP_SERVICE,
       port:465,
       secure:true,
       auth:{
           user:process.env.SMTP_MAIL,
           pass:process.env,SMTP_PASS
       }
   })

   const mailOptions={
       from:'singhalshankar@gmail.com',
       to:options.email,
       subject:options.subject,
       text:options.message
   }
   await transporter.sendMail(mailOptions,(err)=>{
       if(err){
           console.log(err);
       }
   });
}

module.exports=sendEmail;