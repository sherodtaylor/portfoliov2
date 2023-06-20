import './globals.css';
import clsx from 'clsx';
import { Analytics } from '@vercel/analytics/react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import ContactForm from '@/components/contactForm';
import { sans, serif } from '@/lib/fonts';
import ThemeSwitcher from '@/components/themeSwitcher';
import { Tooltip, TooltipProvider } from '@/components/tooltip';
import Link from '@/components/link';
import Image from '@/components/image';
import ScrollAreaProvider from '@/components/scrollArea';
import AnchorHighlightProvider from '@/components/anchorHighlightProvider';
import { Toaster } from '@/components/toaster';
import { toJsonLd } from '@/lib/utils';
import ContactIcon from '@/components/contactIcon';
import type { FC, ReactNode } from 'react';
import type { Person } from 'schema-dts';

type RootLayoutProps = {
  children: ReactNode;
};


console.log(process.env)
const profileJsonLd = toJsonLd<Person>({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Hayden Bleasel',
  jobTitle: 'Chief Product Officer',
  url: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? '/').href,
  sameAs: [
    'https://twitter.com/sherodtaylor.eth',
    'https://www.instagram.com/sherodtaylor/',
    'https://github.com/sherodtaylor/',
    'https://www.linkedin.com/in/sherodtaylor',
  ],
  image: new URL(
    '/images/profile.jpg',
    process.env.NEXT_PUBLIC_SITE_URL ?? '/'
  ).href,
  alumniOf: 'General Assembly',
  birthPlace: {
    '@type': 'Place',
    name: 'Seattle, Washington',
  },
  familyName: 'Taylor',
  description:
    '',
  gender: 'Male',
  givenName: 'Hayden',
  worksFor: {
    '@type': 'Corporation',
    name: 'Bloomberg LP',
  },
  workLocation: {
    '@type': 'Place',
    name: 'New York, NY',
  },
  knowsLanguage: 'English',
  knowsAbout: [
    'Product Design',
    'People Management',
    'Product Management',
    'React',
    'Golang',
    'Python',
    'GraphQL',
    'API Driven Development',
    'TypeScript',
  ],
  nationality: {
    '@type': 'Country',
    name: 'USA',
  },
});

const socialLinks = [
  {
    href: 'https://twitter.com/sherodtaylor',
    name: 'Twitter',
    image: '/images/social/twitter.svg',
  },
  {
    href: 'https://github.com/sherodtaylor',
    name: 'GitHub',
    image: '/images/social/github.svg',
  },
  {
    href: 'https://www.linkedin.com/in/sherodtaylor/',
    name: 'LinkedIn',
    image: '/images/social/linkedin.svg',
  },
];

const RootLayout: FC<RootLayoutProps> = ({ children }) => (
  <html lang="en">
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>

    </head>

    <body
      className={clsx(
        sans.variable,
        serif.variable,
        'bg-white font-sans dark:bg-neutral-950'
      )}
    >
      <AnchorHighlightProvider>
        <ScrollAreaProvider className="h-screen">
          <TooltipProvider>
            <main className="prose prose-neutral mx-4 my-24 grid gap-16 dark:prose-invert sm:m-[11%] lg:m-[180px]">
              {children}
              <div className="bottom-4 right-4 flex flex-row gap-1">
                {socialLinks.map((link) => (
                  <Tooltip content={link.name} key={link.name}>
                    <Link
                      href={link.href}
                      className={clsx(
                        'rounded p-2',
                        'text-neutral-500 dark:text-neutral-400',
                        'hover:bg-neutral-100 dark:hover:bg-neutral-800'
                      )}
                      aria-label={link.name}
                    >
                      <Image
                        src={link.image}
                        width={30}
                        height={30}
                        alt={link.name}
                        className={clsx(
                          'm-0 h-6 w-6 object-contain',
                          link.name === 'GitHub' &&
                            'dark:brightness-0 dark:invert'
                        )}
                      />
                    </Link>
                  </Tooltip>
                ))}

                <hr className="m-2 border-neutral-300 dark:border-neutral-700" />
                <div>
                  <Tooltip content="Get in touch">
                    <div>
                      <ContactIcon />
                    </div>
                  </Tooltip>
                </div>
                <ThemeSwitcher />
              </div>
            </main>
          </TooltipProvider>
        </ScrollAreaProvider>
      </AnchorHighlightProvider>
      <Analytics />
      <Toaster />
      <ContactForm />
      {/* eslint-disable-next-line react/no-danger, @typescript-eslint/naming-convention */}
      <div dangerouslySetInnerHTML={{ __html: profileJsonLd }} />
    </body>
  </html>
);

export default RootLayout;
