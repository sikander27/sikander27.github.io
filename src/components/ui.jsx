import React, { useState, useEffect, useRef } from 'react';
import { portfolioData } from './data';
import { GithubIcon, LinkedinIcon, LinktreeIcon } from './icons';

export const Section = ({ id, title, children }) => (
  <section id={id} className="mb-16 scroll-mt-16 md:scroll-mt-24">
    <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-200">{title}</h2>
    {children}
  </section>
);

export const About = () => (
  <Section id="about" title="About">
    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
      {portfolioData.about}
    </p>
  </Section>
);

export const Skills = () => (
  <Section id="skills" title="Skills">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Object.entries(portfolioData.skills).map(([category, skillsList]) => (
        <div key={category}>
          <h3 className="text-lg font-semibold mb-3 text-slate-700 dark:text-slate-300">{category}</h3>
          <ul className="flex flex-wrap gap-2">
            {skillsList.map((skill, index) => (
              <li key={index} className="bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm font-medium px-3 py-1 rounded-md">
                {skill}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </Section>
);

export const ProjectCard = ({ project, onVideoSelect }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const descRef = useRef(null);
    const [isLong, setIsLong] = useState(false);

    useEffect(() => {
        if (descRef.current) {
            setIsLong(descRef.current.scrollHeight > descRef.current.clientHeight);
        }
    }, [project.description]);

    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
        <div
            onMouseMove={handleMouseMove}
            className="glow-card h-full relative bg-slate-100 dark:bg-slate-800/50 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
        >
            <div className="p-6 relative z-10 flex flex-col h-full">
                <div>
                    <h3 className="font-bold text-lg mb-2 text-slate-800 dark:text-slate-200">{project.name}</h3>
                    <p ref={descRef} className={`text-slate-600 dark:text-slate-400 mb-2 text-sm transition-all duration-300 ${!isExpanded && 'line-clamp-3'}`}>
                        {project.description}
                    </p>
                    {isLong && (
                         <button onClick={() => setIsExpanded(!isExpanded)} className="text-teal-500 text-sm font-semibold mb-4">
                            {isExpanded ? 'See Less' : 'See More'}
                        </button>
                    )}
                </div>
                
                <div className="mt-auto pt-4">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.stack.map((tech, i) => (
                            <span key={i} className="bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                {tech}
                            </span>
                        ))}
                    </div>
                    <div className="flex items-center gap-4">
                        {project.link ? (
                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-teal-500 hover:text-teal-600 dark:hover:text-teal-400 font-semibold text-sm">Live Demo</a>
                        ) : project.youtubeId ? (
                            <button onClick={() => onVideoSelect(project.youtubeId)} className="text-teal-500 hover:text-teal-600 dark:hover:text-teal-400 font-semibold text-sm">Video Demo</button>
                        ) : null}
                        <a href={project.repo} target="_blank" rel="noopener noreferrer" className="text-teal-500 hover:text-teal-600 dark:hover:text-teal-400 font-semibold text-sm">GitHub</a>
                    </div>
                </div>
            </div>
        </div>
    );
};


export const Projects = ({ onVideoSelect }) => {
    return (
        <Section id="projects" title="Projects">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolioData.projects.map((project, index) => (
                    <ProjectCard key={index} project={project} onVideoSelect={onVideoSelect} />
                ))}
            </div>
        </Section>
    );
};

export const Games = ({ onGameSelect }) => {
    const games = [
        { id: 'tic-tac-toe', name: 'Tic-Tac-Toe', description: 'The classic game of X\'s and O\'s. Challenge a friend or yourself.' },
        { id: 'snake', name: 'Snake', description: 'Navigate the snake to eat the food and grow longer. Don\'t hit the walls or yourself!' },
    ];
    
    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
        <Section id="games" title="Games">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {games.map((game) => (
                    <div
                        key={game.id}
                        onMouseMove={handleMouseMove}
                        className="glow-card relative bg-slate-100 dark:bg-slate-800/50 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer"
                        onClick={() => onGameSelect(game)}
                    >
                        <div className="p-6 relative z-10">
                            <h3 className="font-bold text-lg mb-2 text-slate-800 dark:text-slate-200">{game.name}</h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">{game.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
};

export const ExperienceCard = ({ job }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const listRef = useRef(null);
    const [isLong, setIsLong] = useState(false);

    useEffect(() => {
        if (listRef.current) {
            setIsLong(listRef.current.scrollHeight > 70); 
        }
    }, [job.description]);

    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-teal-500 text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 dark:bg-slate-700 dark:border-slate-800">
                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="12" height="10"><path fillRule="nonzero" d="M10.422 1.257 4.655 7.025 2.553 4.923A.916.916 0 0 0 1.257 6.22l2.75 2.75a.916.916 0 0 0 1.296 0l6.415-6.416a.916.916 0 0 0-1.296-1.296Z"/></svg>
            </div>
            <div onMouseMove={handleMouseMove} className="glow-card w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700 shadow relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex items-center justify-between space-x-2 mb-1">
                        <h3 className="font-bold text-slate-800 dark:text-slate-200">{job.role}</h3>
                        <time className="font-caveat font-medium text-sm text-teal-600 dark:text-teal-400">{job.period}</time>
                    </div>
                    <div className="text-slate-500 dark:text-slate-400 font-semibold mb-2">{job.company}</div>
                    <div ref={listRef} className={`transition-all duration-300 ${!isExpanded ? 'max-h-20 overflow-hidden' : 'max-h-96'}`}>
                        <ul className="list-disc list-inside space-y-1 text-slate-500 dark:text-slate-400 text-sm">
                            {job.description.map((point, index) => (
                                <li key={index}>{point}</li>
                            ))}
                        </ul>
                    </div>
                     {isLong && (
                        <button onClick={() => setIsExpanded(!isExpanded)} className="text-teal-500 text-xs font-semibold mt-2">
                            {isExpanded ? 'See Less' : 'See More'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export const Experience = () => (
  <Section id="experience" title="Experience">
    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent dark:before:via-slate-700">
      {portfolioData.experience.map((job, index) => (
        <ExperienceCard key={index} job={job} />
      ))}
    </div>
  </Section>
);

export const Education = () => (
  <Section id="education" title="Education">
    <div className="space-y-4">
      {portfolioData.education.map((edu, index) => (
        <div key={index} className="bg-slate-100 dark:bg-slate-800/50 p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">{edu.institution}</h3>
              <p className="text-slate-600 dark:text-slate-400">{edu.degree}</p>
              {edu.details && <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{edu.details}</p>}
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-500 flex-shrink-0">{edu.period}</p>
          </div>
        </div>
      ))}
    </div>
  </Section>
);

export const Footer = () => (
  <footer className="py-8 text-center text-slate-500 dark:text-slate-400 text-sm">
    <div className="flex justify-center gap-6 mb-4">
        <a href={portfolioData.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-teal-500 transition-colors"><GithubIcon /></a>
        <a href={portfolioData.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-teal-500 transition-colors"><LinkedinIcon /></a>
        <a href={portfolioData.socials.linktree} target="_blank" rel="noopener noreferrer" className="hover:text-teal-500 transition-colors"><LinktreeIcon /></a>
    </div>
    <p>Designed & Built by {portfolioData.name}.</p>
    <p>Built with React & Tailwind CSS.</p>
  </footer>
);
