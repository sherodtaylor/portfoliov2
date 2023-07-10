import contactTypes from '@/lib/contact';
import { parseError } from '@/lib/error';
import { res } from '@/lib/response';
import { getDate } from '@/lib/utils';
import sendgrid from '@sendgrid/mail';

type ContactRequest = {
  name?: string;
  email?: string;
  message?: string;
  type?: string;
};

export const POST = async (req: Request): Promise<Response> => {
  console.log(process.env);
  const { name, email, message, type } = (await req.json()) as ContactRequest;
  const origin = new URL(req.headers.get('origin') ?? '').href;
  const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? '').href;

  sendgrid.setApiKey(process.env.SENDGRID_API_KEY ?? '');

  if (origin !== siteUrl) {
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
    const [response] = await sendgrid.send({
      to: process.env.EMAIL_ADDRESS, // Your email where you'll receive emails
      from: process.env.EMAIL_ADDRESS,
      subject: `Urgent: Website Contact from ${name}`,
      replyTo: email,
      mailSettings: {
        footer: {
          enable: true,
          text: `Sent on ${getDate()}`,
        },
      },
      html: `
      <div>
        <p>
          I would like to ${typeLabel?.toLowerCase() ?? 'do something'}
        </p>
        <p>${message}</p>
      </div>
      `,
    });

    const data = (await response.body) as { message: string };

    return res(response.statusCode, { message: 'Successfully sent email' });
  } catch (error: any) {
    console.log(error.response.body.errors);
    return res(500, { message: error.message });
  }
};
