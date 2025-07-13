import React, { useState, useEffect, useRef } from 'react';
import { portfolioData } from './data';

export const Terminal = ({ onExit, onLaunchGame }) => {
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