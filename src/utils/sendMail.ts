import * as nodemailer from 'nodemailer'

export async function sendmail(email : string, token :string) {
   let link = "http://localhost:4000/graphql?query=mutation{verify(token:\""+`${token}`+"\")}"
   console.log(link)
   let transporter = nodemailer.createTransport({
      host: "in-v3.mailjet.com",
      port: 465,
      secure: true, 
      auth: {
         user: '87708404ba97d6af868c71520e613c0c', 
         pass: 'b1aa18c9b4532cc86ae8aa88e3660485',
      }
   });

    await transporter.sendMail({
      from: '"Fidia" <inakujoel16@gmail.com>', 
      to: `${email}`,
      subject: "Verify your Email",  // 
      html: `<a href="${link}">link</a>`,
   }, (err, info)=>{
      if(err)console.error(err)
      console.log(info)
   });
}

