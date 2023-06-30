import React from 'react'
import Image from 'next/image'

const JobHistory = () => {
    const jobs = [
        {
            title: 'Software Engineering Team Lead',
            company: 'Bloomberg',
            period: 'Mar 2023 - Present',
            location: 'New York, United States',
            description: [
                'Leading a team of 5 engineers to empower developers in Bloomberg with intuitive tools for efficient and reliable infrastructure development.',
                'Building a centralized api platform to simplify operations on managed infrastructure.',
                'Defined product strategy and effectively managed stakeholders to align with company objectives.',
                'Communicated project scope effectively, ensuring adherence to set deadlines.',
                'Spearheaded cross-team quarterly initiatives and projects, promoting cross-functional collaboration.'
            ],
            skills: ['Jira', 'Product Development', 'Architectural Design', 'Microservices', 'People Management', 'Project Management', 'React.js', 'Leadership', 'Management', 'Golang']
        },
        // rest of the job objects...
    ];

    return (
        <div>
            {jobs.map((job, index) => (
                <div key={index}>
                    {/* <Image src={job.logo} alt={`${job.company} logo`} width={100} height={100} /> */}
                    <h3>{job.title}</h3>
                    <h4>{job.company}</h4>
                    <small>{job.location}</small>
                    <br/>
                    <small>{job.period}</small>
                    <ul>
                        {job.description.map((desc, descIndex) => (
                            <li key={descIndex}>{desc}</li>
                        ))}
                    </ul>
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
