import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Section from '@/components/section';
import ContactButton from '@/components/contactButton';
import type { ReactElement } from 'react';

import avatar from '@/public/images/profile.jpg';
import { formatList, getDate } from '@/lib/utils';
import { get } from '@vercel/edge-config';

const updatedAt = getDate();

type Metadata = {
  title: string;
  description: string;
  metadataBase: string;
};

console.log(process.env)

export const metadata: Metadata = {
  title: 'Sherod Taylor — Engineering Team Lead at Bloomberg',
  description:
    "Hi, I'm Sherod Taylor — an Engineering Team Lead based in New York with deep technical experience and strong project management skills.",
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL || '',
};


const Home: React.FC<{}> = async ({ }): Promise<ReactElement>  => {
  const edge = await get<{
    available: string;
    location: string;
  }>('portfolio');

  if (!edge) {
    throw new Error('Failed to fetch Edge config');
  }

  return (
    <>
      <Section>
        <Image
          src={avatar}
          width={128}
          height={128}
          alt="A photo of Sherod Taylor."
          className="mt-0 h-36 w-36 rounded-full"
          priority
          placeholder="blur"
        />
        <div className="flex flex-col gap-4">
          <h1>
            Platform Engineering Team Lead @ Bloomberg with deep technical experience.
          </h1>
          <div className="grid">
            <small>Last updated {updatedAt}.</small>
            <small>Currently in {edge.location}.</small>
            <small>© {new Date().getFullYear()} Sherod Taylor.</small>
          </div>
        </div>
      </Section>
      <Section title="Work Experience">
        <p>
          I currently serve as a Team Lead Engineering at{' '}
          <Link href="https://www.bloomberg.com/">Bloomberg</Link>. I am a Full stack developer and architect split between golang reactjs typescript and python.
        </p>
        <p>
          Prior to that, I worked as a Software Engineer at{' '}
          <Link href="https://www.itbit.com/">itBit</Link> and{' '}
          <Link href="https://www.paxos.com/">Paxos</Link>. I used various technologies including Node.js, Python, Golang, Kotlin, React, and AWS, to name a few.
        </p>
        <p>
          Early in my career, I was a Software Engineer at{' '}
          <Link href="https://www.madison-reed.com/">Madison Reed</Link>, where I developed a fully custom CMS with Angular, MongoDB, and stylus that allowed us to focus on getting more features completed instead of having to build new landing pages.
        </p>
      </Section>
      <Section title="Availability">
        <p>
          I'm open to exploring new opportunities. If you're interested, please get in touch.
        </p>
        <ContactButton />
      </Section>
    </>
  );
};

export default Home;
