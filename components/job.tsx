import React from 'react'
import Image from 'next/image'
import bloombergLogo from '/public/images/logos/bloomberg.png';
import paxosLogo from '/public/images/logos/paxos.png';
import madisonReedLogo from '/public/images/logos/madison-reed.png';

const JobHistory = () => {
    const jobs = [
        {
            logo: bloombergLogo,
            title: 'Software Engineering Team Lead',
            company: 'Bloomberg',
            period: 'Mar 2023 - Present',
            location: 'New York, United States',
            description: 'Leading a team of engineers, developing tools and managing a centralized API platform at Bloomberg.',
            skills: ['Jira', 'Product Development', 'Architectural Design', 'Microservices', 'People Management', 'Project Management', 'React.js', 'Leadership', 'Management', 'Golang']
        },
        {
            logo: bloombergLogo,
            title: 'Senior Software Engineer',
            company: 'Bloomberg',
            period: 'Aug 2018 - Jun 2023',
            location: 'Greater New York City Area',
            description: 'Full-stack developer and architect at Bloomberg, driving end-to-end software development and implementing scalable systems.',
            skills: ['Jira', 'Architectural Design', 'JavaScript', 'Node.js', 'Project Management', 'Software Development', 'React.js', 'Golang']
        },
        {
            logo: paxosLogo,
            title: 'Software Engineer',
            company: 'Paxos',
            period: 'May 2015 - Aug 2018',
            location: 'Greater New York City Area',
            description: 'Contributed to the growth of Paxos as a major Bitcoin exchange through the implementation of robust applications and system frameworks.',
            skills: ['JavaScript', 'Node.js', 'Start-ups', 'Databases', 'React.js', 'Amazon Web Services (AWS)', 'Golang']
        },
        {
            logo: madisonReedLogo,
            title: 'Software Engineer',
            company: 'Madison Reed',
            period: 'Sep 2013 - May 2015',
            location: 'San Francisco Bay Area',
            description: 'Played a pivotal role in enhancing the operational efficiency of Madison Reed by developing custom software solutions and enhancing the order process.',
            skills: ['JavaScript', 'Software Development', 'HTML', 'SQL']
        },
    ];

    return (
        <div>
            {jobs.map((job, index) => (
                <div key={index} className='my-12'>
                    <div className='flex items-center'>
                        <Image src={job.logo} alt={`${job.company} logo`} width={100} height={100} className=" flex-none select-none mt-6 mb-1 mr-5 h-8 w-8 rounded-full" />
                        <div className='flex-none'>
                            <h3 className='leading-tight'>{job.title}</h3>
                            <h4 className='leading-tight'>{job.company}</h4>
                            <small className='leading-tight'>{job.location}</small>
                            <br/>
                            <small className='leading-tight'>{job.period}</small>
                        </div>
                    <br/>
                    </div>
                    <p>{job.description}</p>
                    {/* <h4>Skills</h4> */}
                    {/* <ul> {job.skills.map((skill, skillIndex) => (
                            <li key={skillIndex}>{skill}</li>
                        ))}
                    </ul> */}
                </div>
            ))}
        </div>
    )
}

export default JobHistory;
