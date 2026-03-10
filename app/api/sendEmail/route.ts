import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
const escapeHtml = (s: string) =>
    s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');


const returnEmailHTML = (params: Record<string, string>): string => {
    const rows = Object.entries(params)
        .filter(([, value]) => value && value.trim().length)
        .map(([key, value]) => {
            const safeVal = escapeHtml(value).replace(/\r?\n/g, '<br />');
            return `
        <tr>
          <td style="padding:6px 10px;font-weight:600;vertical-align:top;white-space:nowrap">${key}</td>
          <td style="padding:6px 10px;vertical-align:top">${safeVal}</td>
        </tr>`;
        })
        .join('');

    return `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.55;font-size:14px">
      <table style="border-collapse:collapse;border-spacing:0;width:100%;max-width:720px">
        <tbody>
          ${rows || `<tr><td style="padding:6px 10px;color:#666">No details provided.</td></tr>`}
        </tbody>
      </table>
    </div>
  `.trim();
};


const sendEmail = async (senderEmail: string, subject: string, html: string) => {
    const DEFAULT_MAIL_TO = process.env.MAIL_TO ?? 'anro@anro.gr';

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
        },
    });

    const info = await transporter.sendMail({
        from: `${process.env.GMAIL_USER}`,
        replyTo: ['thanasiskokkinhs@gmail.com'],
        to: [senderEmail],
        subject: subject,
        html,
    });
}

export const POST = async (req: Request): Promise<NextResponse> =>
{
    try {
        const { email, subject, message, phone, name } = await req.json();

        const emailBody = returnEmailHTML({
            Name: name || '',
            Email: email || '',
            Phone: phone || '',
            Subject: subject || '',
            Message: message || '',
        });

        await sendEmail(email, subject, emailBody);

        return NextResponse.json({success:true, data: null, msg: null});
    }catch(error)
    {
        console.error("Error in sendEmail: ", error);
        return NextResponse.json({success:false, data: null, msg: 'Unknown error'});
    }

}