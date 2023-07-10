import contactTypes from '@/lib/contact';
import { parseError } from '@/lib/error';
import { res } from '@/lib/response';
import { getDate } from '@/lib/utils';
import sendgrid, { ResponseError } from '@sendgrid/mail'

sendgrid.setApiKey(process.env.SENDGRID_API_KEY || '');

type ContactRequest = {
  name?: string;
  email?: string;
  message?: string;
  type?: string;
};

export const POST = async (req: Request): Promise<Response> => {
  console.log(process.env)
  const { name, email, message, type } = (await req.json()) as ContactRequest;
  const origin = new URL(req.headers.get('origin') ?? '').href;
  const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? '').href;
  if (origin !== siteUrl) {
    console.log(`siteurl: ${siteUrl}, origin: ${origin}`)
    return res(401, { message: 'Unauthorized' });
  }

  if (!process.env.COMLINK_PASSPHRASE) {
    return res(500, { message: 'No Comlink passphrase provided' });
  }

  if (!process.env.POSTMARK_SERVER_API_TOKEN) {
    return res(500, { message: 'No Postmark API token provided' });
  }

  if (!process.env.EMAIL_ADDRESS) {
    return res(500, { message: 'No email address provided' });
  }

  if (!name) {
    return res(400, { message: 'Missing name field' });
  }

  if (!email) {
    return res(400, { message: 'Missing email field' });
  }

  if (!message) {
    return res(400, { message: 'Missing message field' });
  }

  if (!type) {
    return res(400, { message: 'Missing type field' });
  }

  const typeLabel = contactTypes.find(
    (contactType) => contactType.value === type
  )?.label;

  try {
    const [response] =  await sendgrid.send({
      to: "sherodtaylor@gmail.com", // Your email where you'll receive emails
      from: "sherodtaylor@gmail.com", // your website email address here
      subject: `Message from ${name}`,
      replyTo: email,
      mailSettings: {
        footer: {
          enable: true,
          text: `Sent on ${getDate()}`
        }
      },
      html: `<div>I would like to ${typeLabel?.toLowerCase() ?? 'do something'}</div>`
    });


    return res(response.statusCode, { message: response.body});
  } catch (error: unknown){
    if (error instanceof ResponseError) {
      return res(error.code, { message: error.message });
    }

    return res(500, {message: "internal error"})
  }
};

