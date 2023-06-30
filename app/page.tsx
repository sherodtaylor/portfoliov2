import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Section from '@/components/section';
import ContactButton from '@/components/contactButton';
import type { ReactElement } from 'react';

import avatar from '@/public/images/profile.jpg';
import { formatList, getDate } from '@/lib/utils';
import { get } from '@vercel/edge-config';

import JobHistory from '@/components/job';

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
      <Section title="Work">
        <JobHistory />
      </Section>
      <Section title="Projects">
        <p>
          Hiraya skincare website built and designed by me with <Link href="https://webflow.com/">Webflow</Link> CMS.
        </p>
        <br/>
        <div className="collage">
          <div className="large-media-card c-goods">
            <div className="browser-box">
              <div className="bb-titlebar">
                <div className="tb-title text-secondary">Hiraya</div>
              </div>
              <a href="https://livehiraya.com" target="_blank" className="bb-content"></a>
            </div>
          </div>
        </div>
      </Section>
      <Section title="Availability">
        <p>
          I'm also open to joining boards and advisory roles. If you're interested, please get in touch.        
        </p>
        <ContactButton />
      </Section>
    </>
  );
};

export default Home;