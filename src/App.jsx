import React, { useState, useEffect, useRef } from 'react';

// ICONS - Using SVG for icons to avoid external dependencies
const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
);

const TerminalIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
);

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-github"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const LinktreeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M14.7 14.3 12 11.6 9.3 14.3l-2.1-2.1L12 7.4l4.8 4.8-2.1 2.1zM12 22a2.99 2.99 0 0 1-2.1-.9L4.4 15.6a1 1 0 0 1 0-1.4l7.6-7.6a1 1 0 0 1 1.4 0l7.6 7.6a1 1 0 0 1 0 1.4l-5.5 5.5A2.99 2.99 0 0 1 12 22z"></path></svg>
);

const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);


// MOCK DATA - Replace with your own information
const portfolioData = {
  name: "Sikander Khan",
  username: "sikander",
  title: "Senior Software Engineer",
  about: "I am a Software Engineer with over 4+ years of experience working with Python (Django/Flask), Golang, ReactJS, and PostgreSQL. With a passion for innovation and an adaptable mindset, I am dedicated to creating outstanding products that positively impact end users.",
  skills: {
    "Programming languages": ["Python", "Golang (Go)", "JavaScript"],
    "Frameworks": ["Django Rest Framework (DRF)", "Django", "Flask", "Node.js"],
    "Database": ["PostgreSQL", "Mysql", "ElasticSearch"],
    "Tools": ["Git", "GitHub", "Celery", "Linux", "Docker", "JIRA", "Postman", "Vim"],
    "Other": ["REST APIs", "AWS", "TDD", "GitHub Actions", "Heroku", "Microservice Architecture"],
    "Soft Skills": ["Communication", "Leadership", "Quick Learner", "Team Player", "Adaptive Mindset", "self-starter"]
  },
  projects: [
    {
      name: "Scalable Modular Features at Influencer.in",
      description: "Led the development of scalable modular features using Python (Django/DRF), PostgreSQL, ElasticSearch, and AWS, contributing to a 20% revenue increase and a 30% reduction in sales cycles.",
      stack: ["Python", "Django", "DRF", "PostgreSQL", "ElasticSearch", "AWS"],
      repo: "#"
    },
    {
      name: "VPC Feature at Nutanix",
      description: "Developed VPC feature using Microservice architecture with SSH, Linux, and Python (Flask). Implemented Figma UI design with ReactJS and utilized Docker containers for deployment.",
      stack: ["Python", "Flask", "ReactJS", "Docker", "Microservices"],
      repo: "#"
    },
    {
      name: "CRM System at Velocity Enterprise",
      description: "Designed and developed a CRM using Python (Django), driving a 30% increase in business growth.",
      stack: ["Python", "Django"],
      repo: "#"
    }
  ],
  experience: [
    {
      company: "Influencer.in (Social Beats)",
      role: "Senior Software Engineer",
      period: "June 2022 - Present",
      description: [
          "Led the development of scalable modular features using Python (Django/DRF), PostgreSQL, ElasticSearch, and AWS, contributing to a 20% revenue increase and a 30% reduction in sales cycles.",
          "Optimized product/servers and API response time using efficient PostgreSQL queries, ElasticSearch, and AWS services, enhancing overall system performance by 70% and resulting in a 30% reduction in operational costs.",
          "Conducted regular code reviews, providing constructive feedback to team members, and ensuring high code quality.",
          "Proactively identified and resolved critical system issues/bugs through efficient troubleshooting and debugging skills."
      ]
    },
    {
      company: "Nutanix",
      role: "Full-Stack Software Engineer (Contract)",
      period: "May 2021 - June 2022",
      description: [
          "Developed VPC feature using Microservice architecture using SSH, Linux, and Python (Flask).",
          "Implemented Figma UI design with ReactJS and utilized Docker containers for deployment.",
          "Worked with Unix shell and Vim editor for efficient development. Followed best coding practices such as TDD."
      ]
    },
    {
      company: "Velocity Enterprise",
      role: "Full-Stack Python Developer",
      period: "April 2020 - May 2021",
      description: [
        "Designed and developed a CRM using Python (Django), driving a 30% increase in business growth."
      ]
    }
  ],
  education: [
    {
      institution: "St. Xavier's College, Mumbai",
      degree: "Bachelor's of Vocation (Software Development)",
      period: "",
      details: "C.G.P.A: 3.76/4 (94%)"
    }
  ],
  socials: {
    github: "https://github.com/sikander27",
    linkedin: "https://www.linkedin.com/in/sikanderkhan/",
    linktree: "https://sikander27.github.io"
  }
};

// --- ANIMATION COMPONENTS ---
const AnimatedTitle = ({ title }) => {
  const [displayText, setDisplayText] = useState('');
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  useEffect(() => {
    let interval = null;
    let iteration = 0;
    
    clearInterval(interval);
    
    interval = setInterval(() => {
      setDisplayText(
        title
          .split("")
          .map((letter, index) => {
            if(index < iteration) {
              return title[index];
            }
          
            return letters[Math.floor(Math.random() * 26)]
          })
          .join("")
      );
      
      if(iteration >= title.length){ 
        clearInterval(interval);
      }
      
      iteration += 1 / 3;
    }, 40);

    return () => clearInterval(interval);
  }, [title]);

  return (
    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tighter">
      {displayText}
    </h2>
  );
};

const GlowStyle = () => (
  <style>{`
    .glow-card::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(
            300px circle at var(--mouse-x) var(--mouse-y),
            rgba(22, 163, 74, 0.15),
            transparent 80%
        );
        border-radius: inherit;
        opacity: 0;
        transition: opacity 0.2s;
        z-index: 0;
    }
    .dark .glow-card::before {
        background: radial-gradient(
            300px circle at var(--mouse-x) var(--mouse-y),
            rgba(34, 197, 94, 0.2),
            transparent 80%
        );
    }
    .glow-card:hover::before {
        opacity: 1;
    }
  `}</style>
);

// --- GAME & MODAL COMPONENTS ---

const VideoModal = ({ youtubeId, onClose }) => {
    if (!youtubeId) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-slate-100 dark:bg-slate-900 rounded-xl shadow-2xl p-2 relative w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute -top-3 -right-3 bg-slate-200 dark:bg-slate-700 rounded-full p-1 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200">
                    <XIcon />
                </button>
                <div className="aspect-video">
                    <iframe
                        className="w-full h-full rounded-lg"
                        src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
};


const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);

    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    const winner = calculateWinner(board);
    const isDraw = !winner && board.every(Boolean);

    const handleClick = (i) => {
        if (winner || board[i]) return;
        const newBoard = board.slice();
        newBoard[i] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXNext);
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
    };

    let status;
    if (winner) {
        status = `Winner: ${winner}`;
    } else if (isDraw) {
        status = "It's a Draw!";
    } else {
        status = `Next player: ${isXNext ? 'X' : 'O'}`;
    }

    return (
        <div className="flex flex-col items-center gap-4">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Tic-Tac-Toe</h3>
            <div className="text-lg text-slate-600 dark:text-slate-400">{status}</div>
            <div className="grid grid-cols-3 gap-2">
                {board.map((value, i) => (
                    <button
                        key={i}
                        className="w-20 h-20 bg-slate-200 dark:bg-slate-700 rounded-lg text-4xl font-bold flex items-center justify-center text-slate-800 dark:text-slate-200"
                        onClick={() => handleClick(i)}
                    >
                        {value}
                    </button>
                ))}
            </div>
            <button
                onClick={resetGame}
                className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
            >
                Reset Game
            </button>
        </div>
    );
};

const SnakeGame = () => {
    const boardSize = 20;
    const initialSnake = [{ x: 10, y: 10 }];
    const initialFood = { x: 15, y: 15 };

    const [snake, setSnake] = useState(initialSnake);
    const [food, setFood] = useState(initialFood);
    const [direction, setDirection] = useState({ x: 0, y: -1 }); // Start moving up
    const [speed, setSpeed] = useState(200);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);

    const generateFood = () => {
        const newFood = {
            x: Math.floor(Math.random() * boardSize),
            y: Math.floor(Math.random() * boardSize),
        };
        if (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
            return generateFood();
        }
        return newFood;
    };
    
    const resetGame = () => {
        setSnake(initialSnake);
        setFood(initialFood);
        setDirection({ x: 0, y: -1 });
        setGameOver(false);
        setScore(0);
        setSpeed(200);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            let newDirection;
            switch (e.key) {
                case 'ArrowUp': newDirection = { x: 0, y: -1 }; break;
                case 'ArrowDown': newDirection = { x: 0, y: 1 }; break;
                case 'ArrowLeft': newDirection = { x: -1, y: 0 }; break;
                case 'ArrowRight': newDirection = { x: 1, y: 0 }; break;
                default: return;
            }
            if (direction.x !== -newDirection.x || direction.y !== -newDirection.y) {
                setDirection(newDirection);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [direction]);

    useEffect(() => {
        if (gameOver) return;

        const gameInterval = setInterval(() => {
            setSnake(prevSnake => {
                const newSnake = [...prevSnake];
                const head = { x: newSnake[0].x + direction.x, y: newSnake[0].y + direction.y };

                if (head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize) {
                    setGameOver(true);
                    return prevSnake;
                }
                
                for (let i = 1; i < newSnake.length; i++) {
                    if (head.x === newSnake[i].x && head.y === newSnake[i].y) {
                        setGameOver(true);
                        return prevSnake;
                    }
                }

                newSnake.unshift(head);

                if (head.x === food.x && head.y === food.y) {
                    setFood(generateFood());
                    setScore(s => s + 1);
                    setSpeed(s => Math.max(50, s * 0.95));
                } else {
                    newSnake.pop();
                }
                
                return newSnake;
            });
        }, speed);

        return () => clearInterval(gameInterval);
    }, [snake, direction, food, gameOver, speed]);

    return (
        <div className="flex flex-col items-center gap-2">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Snake Game</h3>
            <div className="text-lg text-slate-600 dark:text-slate-400">Score: {score}</div>
            <div className="grid p-2 bg-slate-300 dark:bg-slate-800 rounded-lg" style={{ gridTemplateColumns: `repeat(${boardSize}, 1fr)` }}>
                {Array.from({ length: boardSize * boardSize }).map((_, i) => {
                    const x = i % boardSize;
                    const y = Math.floor(i / boardSize);
                    const isSnake = snake.some(seg => seg.x === x && seg.y === y);
                    const isSnakeHead = isSnake && snake[0].x === x && snake[0].y === y;
                    const isFood = food.x === x && food.y === y;
                    return (
                        <div
                            key={i}
                            className={`w-4 h-4 rounded-sm ${
                                isSnakeHead ? 'bg-green-500' :
                                isSnake ? 'bg-green-400' :
                                isFood ? 'bg-red-500' :
                                'bg-slate-200 dark:bg-slate-700'
                            }`}
                        />
                    );
                })}
            </div>
            {gameOver && (
                <div className="mt-4 flex flex-col items-center gap-2">
                    <div className="text-2xl font-bold text-red-500">Game Over</div>
                    <button onClick={resetGame} className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600">
                        Play Again
                    </button>
                </div>
            )}
        </div>
    );
};

const GameModal = ({ game, onClose }) => {
    if (!game) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-100 dark:bg-slate-900 rounded-xl shadow-2xl p-6 relative max-w-lg w-full">
                <button onClick={onClose} className="absolute top-3 right-3 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200">
                    <XIcon />
                </button>
                {game.id === 'tic-tac-toe' && <TicTacToe />}
                {game.id === 'snake' && <SnakeGame />}
            </div>
        </div>
    );
};


// UI COMPONENTS
const Section = ({ id, title, children }) => (
  <section id={id} className="mb-16 scroll-mt-16 md:scroll-mt-24">
    <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-200">{title}</h2>
    {children}
  </section>
);

const About = () => (
  <Section id="about" title="About">
    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
      {portfolioData.about}
    </p>
  </Section>
);

const Skills = () => (
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

const ProjectCard = ({ project, onVideoSelect }) => {
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


const Projects = ({ onVideoSelect }) => {
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

const Games = ({ onGameSelect }) => {
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

const ExperienceCard = ({ job }) => {
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

const Experience = () => (
  <Section id="experience" title="Experience">
    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent dark:before:via-slate-700">
      {portfolioData.experience.map((job, index) => (
        <ExperienceCard key={index} job={job} />
      ))}
    </div>
  </Section>
);

const Education = () => (
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

const Footer = () => (
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


// TERMINAL COMPONENT
const Terminal = ({ onExit, onLaunchGame }) => {
  const [history, setHistory] = useState([
    { type: 'info', text: `Welcome to ${portfolioData.name}'s Terminal Portfolio` },
    { type: 'info', text: "Type 'help' to see available commands." },
  ]);
  const [input, setInput] = useState('');
  const [cwd, setCwd] = useState('~');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const inputRef = useRef(null);
  const endOfHistoryRef = useRef(null);

  const user = portfolioData.username;
  const host = "portfolio";
  const prompt = `${user}@${host}:${cwd}$ `;

  // Simulated file system
  const fileSystem = {
    '~': {
      type: 'dir',
      children: {
        'about': { type: 'dir', children: { 'README.md': { type: 'file', content: portfolioData.about } } },
        'skills': { type: 'dir', children: { 'skills.json': { type: 'file', content: JSON.stringify(portfolioData.skills, null, 2) } } },
        'projects': { type: 'dir', children: { 'projects.json': { type: 'file', content: JSON.stringify(portfolioData.projects, null, 2) } } },
        'games': { type: 'dir', children: { 'tic-tac-toe': { type: 'executable' }, 'snake': { type: 'executable' } } },
        'experience': { type: 'dir', children: { 'experience.md': { type: 'file', content: portfolioData.experience.map(e => `[${e.period}] ${e.role} @ ${e.company}\n${e.description.map(d => ` - ${d}`).join('\n')}`).join('\n\n') } } },
        'education': { type: 'dir', children: { 'education.md': { type: 'file', content: portfolioData.education.map(e => `[${e.period}] ${e.degree}\n${e.institution}`).join('\n\n') } } },
        'socials.txt': { type: 'file', content: `GitHub: ${portfolioData.socials.github}\nLinkedIn: ${portfolioData.socials.linkedin}\nLinktree: ${portfolioData.socials.linktree}` },
      }
    }
  };
  
  // START: --- Filesystem Logic ---
  const getPathParts = (path, currentCwd) => {
      let CwdParts = currentCwd === '~' ? [] : currentCwd.substring(2).split('/').filter(Boolean);
      
      if (path.startsWith('~/')) {
          CwdParts = [];
          path = path.substring(2);
      } else if (path === '~' || path === '/') {
          return [];
      }
      
      const relativeParts = path.split('/').filter(p => p && p !== '.');
      
      for (const part of relativeParts) {
          if (part === '..') {
              CwdParts.pop();
          } else {
              CwdParts.push(part);
          }
      }
      return CwdParts;
  }
  
  const getNodeFromPathParts = (parts) => {
      let currentNode = fileSystem['~'];
      for (const part of parts) {
          if (currentNode && currentNode.type === 'dir' && currentNode.children[part]) {
              currentNode = currentNode.children[part];
          } else {
              return null;
          }
      }
      return currentNode;
  };
  // END: --- Filesystem Logic ---

  const commands = {
    help: () => [
      { type: 'info', text: 'Available commands:' },
      { type: 'list', text: '  ls [path]         - List directory contents' },
      { type: 'list', text: '  cd [path]         - Change directory' },
      { type: 'list', text: '  cat [file]        - Display file content' },
      { type: 'list', text: '  play [game]       - Launch a game (e.g., play snake)' },
      { type: 'list', text: '  pwd               - Print working directory' },
      { type: 'list', text: '  whoami            - Print current user' },
      { type: 'list', text: '  date              - Display the current date' },
      { type: 'list', text: '  clear             - Clear the terminal' },
      { type: 'list', text: '  gui               - Switch to the UI version' },
      { type: 'list', text: '  exit              - Close the terminal' },
    ],
    ls: (args) => {
        const path = args[0] || '.';
        const targetPathParts = getPathParts(path, cwd);
        const targetNode = getNodeFromPathParts(targetPathParts);
        
        if (targetNode && targetNode.type === 'dir') {
            return Object.entries(targetNode.children).map(([name, node]) => ({
                type: node.type === 'executable' ? 'executable' : node.type,
                text: name,
            }));
        }
        return [{ type: 'error', text: `ls: cannot access '${path}': No such file or directory` }];
    },
    cd: (args) => {
        const path = args[0];
        if (!path || path === '~' || path === '/') {
            setCwd('~');
            return [];
        }
        
        const targetPathParts = getPathParts(path, cwd);
        const targetNode = getNodeFromPathParts(targetPathParts);

        if (targetNode && targetNode.type === 'dir') {
            if (targetPathParts.length === 0) {
                setCwd('~');
            } else {
                setCwd(`~/${targetPathParts.join('/')}`);
            }
        } else {
            return [{ type: 'error', text: `cd: no such file or directory: ${path}` }];
        }
        return [];
    },
    cat: (args) => {
        const fileName = args[0];
        if (!fileName) return [{ type: 'error', text: 'usage: cat [file]' }];
        
        const targetPathParts = getPathParts(fileName, cwd);
        const fileNode = getNodeFromPathParts(targetPathParts);

        if (fileNode && fileNode.type === 'file') {
            return [{ type: 'content', text: fileNode.content }];
        }
        if (fileNode && fileNode.type === 'dir') {
            return [{ type: 'error', text: `cat: ${fileName}: Is a directory` }];
        }
        return [{ type: 'error', text: `cat: ${fileName}: No such file or directory` }];
    },
    play: (args) => {
        const gameName = args[0];
        const validGames = ['tic-tac-toe', 'snake'];
        if (!gameName) return [{ type: 'error', text: 'usage: play [game_name]. Try "play snake".' }];
        if (!validGames.includes(gameName)) return [{ type: 'error', text: `play: game not found: ${gameName}` }];
        
        onLaunchGame({ id: gameName, name: gameName });
        return [{ type: 'info', text: `Launching ${gameName}...` }];
    },
    pwd: () => [{ type: 'info', text: cwd.replace('~', `/home/${user}`) }],
    whoami: () => [{ type: 'info', text: user }],
    date: () => [{ type: 'info', text: new Date().toString() }],
    clear: () => { setHistory([]); return []; },
    gui: () => { onExit(); return [{ type: 'info', text: 'Switching to GUI mode...' }]; },
    exit: () => { onExit(); return [{ type: 'info', text: 'Goodbye!' }]; },
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
        e.preventDefault();
        const newIndex = Math.max(0, historyIndex - 1);
        if (commandHistory[newIndex]) {
            setInput(commandHistory[newIndex]);
            setHistoryIndex(newIndex);
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        const newIndex = Math.min(commandHistory.length, historyIndex + 1);
        setInput(commandHistory[newIndex] || '');
        setHistoryIndex(newIndex);
    } else if (e.key === 'Tab') {
        e.preventDefault();
        const parts = input.split(' ');
        const toComplete = parts[parts.length - 1];
        
        const currentPathParts = getPathParts('.', cwd);
        const currentNode = getNodeFromPathParts(currentPathParts);
        if (!currentNode || currentNode.type !== 'dir') return;

        const childrenNames = Object.keys(currentNode.children);
        const matches = childrenNames.filter(name => name.startsWith(toComplete));

        if (matches.length === 1) {
            const match = matches[0];
            const node = currentNode.children[match];
            const completed = parts.slice(0, -1).join(' ') + (parts.length > 1 ? ' ' : '') + match + (node.type === 'dir' ? '/' : ' ');
            setInput(completed);
        } else if (matches.length > 1) {
            setHistory(prev => [...prev, { type: 'command', text: input, prompt }, { type: 'info', text: matches.join('  ') }]);
        }
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    const newDisplayHistory = [...history, { type: 'command', text: trimmedInput, prompt }];
    
    if (trimmedInput) {
        const newCommandHistory = [...commandHistory, trimmedInput];
        setCommandHistory(newCommandHistory);
        setHistoryIndex(newCommandHistory.length);

        const parts = trimmedInput.split(' ');
        const command = parts[0].toLowerCase();
        const args = parts.slice(1);

        if (commands[command]) {
            const output = commands[command](args);
            setHistory([...newDisplayHistory, ...output]);
        } else {
            setHistory([...newDisplayHistory, { type: 'error', text: `command not found: ${command}` }]);
        }
    } else {
        setHistory(newDisplayHistory);
    }
    setInput('');
  };

  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => { endOfHistoryRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [history]);

  return (
    <div className="fixed inset-0 bg-[#1a202c] text-white font-mono p-4 overflow-y-auto" onClick={() => inputRef.current?.focus()}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col">
        <div className="flex-shrink-0">
            <div className="flex items-center text-green-400 pt-4 mb-2">
                <span className="text-lg mr-2">&lt;&gt;</span>
                <h1 className="text-lg">{portfolioData.name} - Terminal Portfolio</h1>
            </div>
            <div className="w-full h-px bg-green-400 mb-4"></div>
        </div>
        <div className="flex-grow overflow-y-auto">
            <div id="terminal-content">
                {history.map((line, index) => (
                    <div key={index} className="mb-1 whitespace-pre-wrap">
                        {line.type === 'command' && <span className="text-green-400">{line.prompt}</span>}
                        {line.type === 'error' && <span className="text-red-400">Error: </span>}
                        {line.type === 'dir' && <span className="text-blue-400">{line.text}</span>}
                        {line.type === 'executable' && <span className="text-green-400">{line.text}</span>}
                        {line.type !== 'dir' && line.type !== 'executable' && <span>{line.text}</span>}
                    </div>
                ))}
                <form onSubmit={handleFormSubmit}>
                    <div className="flex items-center">
                        <span className="text-green-400">{prompt}</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onKeyDown={handleKeyDown}
                            onChange={(e) => setInput(e.target.value)}
                            className="bg-transparent border-none text-white w-full focus:outline-none pl-2"
                            autoComplete="off" autoCapitalize="off" autoCorrect="off"
                        />
                    </div>
                </form>
            </div>
            <div ref={endOfHistoryRef} />
        </div>
      </div>
    </div>
  );
};


// MAIN APP COMPONENT
export default function App() {
  const [isTerminalView, setIsTerminalView] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeGame, setActiveGame] = useState(null);
  const [activeVideoId, setActiveVideoId] = useState(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  
  const toggleView = () => setIsTerminalView(!isTerminalView);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    document.getElementById(targetId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  const handleLaunchGame = (game) => {
    setIsTerminalView(false);
    setActiveGame(game);
  }

  if (isTerminalView) {
    return <Terminal onExit={() => setIsTerminalView(false)} onLaunchGame={handleLaunchGame} />;
  }

  return (
    <>
      <GlowStyle />
      <GameModal game={activeGame} onClose={() => setActiveGame(null)} />
      <VideoModal youtubeId={activeVideoId} onClose={() => setActiveVideoId(null)} />
      <div className="bg-slate-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          
          <header className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white/80 dark:bg-slate-900/80">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex justify-between items-center py-4">
              <h1 className="text-xl font-bold text-slate-800 dark:text-slate-200">{portfolioData.name}</h1>
              <div className="flex items-center gap-4">
                <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
                  <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="hover:text-teal-500 dark:hover:text-teal-400">About</a>
                  <a href="#skills" onClick={(e) => handleNavClick(e, 'skills')} className="hover:text-teal-500 dark:hover:text-teal-400">Skills</a>
                  <a href="#projects" onClick={(e) => handleNavClick(e, 'projects')} className="hover:text-teal-500 dark:hover:text-teal-400">Projects</a>
                  <a href="#games" onClick={(e) => handleNavClick(e, 'games')} className="hover:text-teal-500 dark:hover:text-teal-400">Games</a>
                  <a href="#experience" onClick={(e) => handleNavClick(e, 'experience')} className="hover:text-teal-500 dark:hover:text-teal-400">Experience</a>
                  <a href="#education" onClick={(e) => handleNavClick(e, 'education')} className="hover:text-teal-500 dark:hover:text-teal-400">Education</a>
                </nav>
                <button onClick={toggleTheme} className="text-slate-600 dark:text-slate-300 hover:text-teal-500 dark:hover:text-teal-400">
                  {isDarkMode ? <SunIcon /> : <MoonIcon />}
                </button>
                <button onClick={toggleView} className="text-slate-600 dark:text-slate-300 hover:text-teal-500 dark:hover:text-teal-400" title="Switch to Terminal View">
                  <TerminalIcon />
                </button>
              </div>
            </div>
          </header>

          <main className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-24">
            <div className="mb-16">
              <AnimatedTitle title={portfolioData.title} />
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">Crafting digital experiences, one line of code at a time.</p>
            </div>
            
            <About />
            <Skills />
            <Projects onVideoSelect={setActiveVideoId} />
            <Games onGameSelect={setActiveGame} />
            <Experience />
            <Education />
          </main>
          
          <Footer />
        </div>
      </div>
    </>
  );
}
