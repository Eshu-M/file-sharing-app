import { EmailTemplate } from '../../../components/email-templete';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const response=await req.json();
  try {
    const data = await resend.emails.send({
      from: 'esham@resend.dev',
      to: ['eshambehredin20@gmail.com'],
      subject: response?.userName+" Shared a file with you",
      react: EmailTemplate({ response }),
    });

    return Response.json(data);
  } catch (error) {
    console.log("Error sending email:", error);
    return Response.json({ error });
  }
}