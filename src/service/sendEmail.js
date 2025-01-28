import nodemailer from "nodemailer";





export const sendEmail = async(to,subject,html, attachments=[])=>{

 

const transporter = nodemailer.createTransport({
service: "gmail",
  auth: {
    user: process.env.emailSender,
    pass: process.env.password,
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"Hammad 👻" <${process.env.emailSender}>`,
    to:to? to:"tareka772@gmail.com", 
    subject:subject? subject:"hi", 
   
    html: html? html:"hello", 
    attachments
  });


}

await main()
}