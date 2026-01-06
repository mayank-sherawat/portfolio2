"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  ArrowDown,
  Globe,
  Clock,
  Phone,
  ChevronUp,
  Terminal,
  Code,
  Database,
  Cpu,
  User,
  Layers,
  Briefcase,
  ShieldCheck,
  Star,
  Wrench,
  Sparkles,
  Menu,
  X
} from 'lucide-react';

// --- TYPES ---
interface Profile {
  name: string;
  role: string;
  subRole?: string;
  location: string;
  email: string;
  phone: string;
  socials: {
    github: string;
    linkedin: string;
  };
  contact: {
    phone: string;
    email: string;
    linkedin: string;
    github: string;
  };
  bio: string;
}

interface SkillCategory {
  category: string;
  items: string[];
  icon: React.ReactNode;
}

interface Job {
  company: string;
  role: string;
  period: string;
  location: string;
  points: string[];
}

interface Project {
  title: string;
  category: string;
  year: string;
  tech: string;
  desc: string;
  points: string[];
  link: string;
  images?: string[];
}

interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  score: string;
}

interface CertificationItem {
  name: string;
  issuer: string;
}

// --- DATA FROM RESUME ---
const PROFILE: Profile = {
  name: "MAYANK SHERAWAT",
  role: "COMPUTER SCIENCE ENGINEER & FULL STACK DEVELOPER",
  subRole: "& FULL STACK DEVELOPER",
  location: "Faridabad, India",
  email: "mayanksherawat21@gmail.com",
  phone: "+91 7027004234",
  socials: {
    github: "github.com/mayank-sherawat",
    linkedin: "linkedin.com/in/mayank-sherawat"
  },
  contact: {
    phone: "+91 7027004234",
    email: "mayanksherawat21@gmail.com",
    linkedin: "linkedin.com/in/mayank-sherawat",
    github: "github.com/mayank-sherawat"
  },
  bio: "High-performing Computer Science Engineer with global academic exposure from Korea University. Combines strong theoretical foundations with practical expertise in Next.js,TypeScript and Database Management (SQL/NoSQL). Proven track record of delivering enterprise-level solutions during internship at Escorts Kubota and developing complex personal projects. adept at solving algorithmic challenges and adapting to new technologies."
};

// Separated Data Structures
const TECHNICAL_SKILLS: SkillCategory[] = [
  { category: "Programming Languages", items: ["JavaScript", "TypeScript", "C", "SQL"], icon: <Terminal size={24} /> },
  { category: "Technologies", items: ["HTML5", "CSS3", "Tailwind CSS", "React.js", "Node.js", "Express.js", "Next.js"], icon: <Code size={24} /> },
  { category: "Databases", items: ["MySQL", "MongoDB", "PostgreSQL"], icon: <Database size={24} /> },
];

const TOOLS = [
  "GitHub",
  "VS Code",
  "MongoDB Compass",
  "Postman"
];

const SOFT_SKILLS = [
  "Analytical Thinking",
  "Collaboration",
  "Adaptability",
  "Time Management",
  "Communication"
];

const EXPERIENCE: Job[] = [
  {
    company: "Escorts Kubota Ltd",
    role: "Full Stack Developer Intern",
    period: "Aug 2025 – Present",
    location: "Faridabad, India",
    points: [
      "Working on an Employee Timeline Management System using Next.js, Node.js, Express, TypeScript, and Tailwind CSS to streamline workforce tracking and internal data management.",
      "Designing and integrating RESTful APIs and interactive UI components to improve system scalability, performance, and user experience.",
      "Contributing to an AI-driven Autonomous Tractor project by performing data labeling and timeline preparation to enhance training dataset quality for machine learning models."
    ]
  }
];

const PROJECTS: Project[] = [
  {
    title: "Social House",
    category: "Social Media Platform",
    year: "Dec 2024 – Jan 2025",
    tech: "Next.js • Prisma • TypeScript • PostgreSQL • Tailwind CSS",
    desc: "A full-stack social media application where users can sign up, upload photos, manage their profile, browse a global feed, and view profiles of other users. Features secure authentication and cloud-based image storage.",
    points: [
      "Built a secure login & signup system using NextAuth Credentials with JWT-based session handling.",
      "Integrated Cloudinary for image uploads, implementing unique file naming, optimized upload flow, and public file delivery.",
      "Designed Profile, Feed, and Search tabs with smooth navigation and responsive UI using Tailwind CSS.",
      "Implemented dynamic user profiles, showing profile pictures, bio, and user-specific photo galleries.",
      "Developed a structured backend using Prisma ORM with strong relational mapping between Users and Photos.",
      "Added real-time UI updates after photo uploads and profile picture changes using client-side state syncing."
    ],
    // ADD YOUR IMAGE PATHS HERE
    link: "https://www.socialhouse.online",
    images: [
      "/projects/sh.png",
      "/projects/sh1.png",
      "/projects/sh2.png",
      "/projects/sh3.jpg",
    ]
  },
  {
    title: "Task Manager",
    category: "Productivity System",
    year: "Mar 2025 – Jul 2025",
    tech: "React.js • Tailwind CSS • Hooks",
    desc: "Interactive task management system enabling managers to assign and track employee tasks efficiently.",
    points: [
      "Enhanced frontend performance using React Hooks.",
      "Designed fully responsive interface ensuring seamless usability."
    ],
    link: "",
    images: [
      "/projects/task1.jpg",
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1000&auto=format&fit=crop" // Placeholder
    ]
  },
  {
    title: "DriveVault",
    category: "Cloud Storage Web App",
    year: "Aug 2025 – Sep 2025",
    tech: "Node.js • MongoDB • EJS • Supabase • Express",
    desc: "Full-stack cloud storage app with JWT authentication and Supabase integration.",
    points: [
      "Improved backend efficiency using optimized MongoDB queries.",
      "Reduced bugs by 60% through enhanced error handling and automated restarts."
    ],
    link: "",
    images: [
      "/projects/drive1.jpg",
      "https://images.unsplash.com/photo-1544197150-b99a580bbcbf?q=80&w=1000&auto=format&fit=crop" // Placeholder
    ]
  }
];

const EDUCATION = [
  {
    institution: "Chitkara University, Punjab",
    degree: "Bachelor of Engineering in Computer Science",
    period: "2021 – 2025",
    score: "8.76 CGPA"
  },
  {
    institution: "Korea University, South Korea",
    degree: "Exchange Semester",
    period: "2022",
    score: "Grade A"
  }
];

const CERTIFICATIONS = [
  "Developing Front-End Apps with React (IBM)",
  "Getting Started with Git and GitHub (IBM)",
  "Agile Project Management (Google)",
  "Python for Data Science, AI Development (IBM)",
  "Software Engineering Specialization (HKUST)"
];

// --- HOOKS ---
const useScrollReveal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  return { ref, isVisible };
};

const useTime = () => {
  const [time, setTime] = useState("");
  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);
  return time;
};

// --- COMPONENTS ---

// 1. Reveal Animation
const Reveal = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-1000 ease-[cubic-bezier(0.17,0.55,0.55,1)] transform ${isVisible
        ? 'opacity-100 translate-y-0 filter blur-0'
        : 'opacity-0 translate-y-12 filter blur-sm'
        }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// 2. Navbar with Mobile Menu
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 px-4 md:px-6 py-4 md:py-6 flex justify-between items-center mix-blend-difference text-white bg-transparent backdrop-blur-none">
        {/* Socials - Visible on all screens */}
        <div className="flex gap-4 md:gap-8 items-center">
          <a href={`https://${PROFILE.socials.github}`} target="_blank" rel="noopener noreferrer" className="hover:text-neutral-400 transition-colors transform hover:scale-110 duration-200">
            <Github className="w-6 h-6 md:w-8 md:h-8" />
          </a>
          <a href={`https://${PROFILE.socials.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-neutral-400 transition-colors transform hover:scale-110 duration-200">
            <Linkedin className="w-6 h-6 md:w-8 md:h-8" />
          </a>
          <a href={`mailto:${PROFILE.email}`} className="hover:text-neutral-400 transition-colors transform hover:scale-110 duration-200">
            <Mail className="w-6 h-6 md:w-8 md:h-8" />
          </a>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-widest">
          <a href="#about" className="hover:underline underline-offset-4">About</a>
          <a href="#expertise" className="hover:underline underline-offset-4">Expertise</a>
          <a href="#experience" className="hover:underline underline-offset-4">Experience</a>
          <a href="#work" className="hover:underline underline-offset-4">Work</a>
          <a href="#contact" className="hover:underline underline-offset-4">Contact</a>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden z-50 text-white focus:outline-none p-2" onClick={toggleMenu} aria-label="Toggle menu">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        {['About', 'Expertise', 'Experience', 'Work', 'Contact'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-3xl font-bold uppercase text-white tracking-widest hover:text-neutral-400 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            {item}
          </a>
        ))}
      </div>
    </>
  );
};

// 3. Scroll To Top
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-30 p-3 bg-white text-black hover:bg-neutral-200 rounded-full shadow-lg transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
    >
      <ChevronUp size={24} />
    </button>
  );
};

// 4. Marquee
const Marquee = () => (
  <div className="relative flex overflow-x-hidden bg-white text-black py-3 md:py-4 border-y border-black select-none">
    <div className="animate-marquee whitespace-nowrap flex items-center">
      {Array(8).fill(0).map((_, i) => (
        <span key={i} className="text-3xl md:text-6xl font-black uppercase mx-4 md:mx-8 tracking-tighter">
          Driven by Passion <span className="text-transparent stroke-text">Built with Code</span>
        </span>
      ))}
    </div>
    <div className="absolute top-3 md:top-4 animate-marquee2 whitespace-nowrap flex items-center">
      {Array(8).fill(0).map((_, i) => (
        <span key={i} className="text-3xl md:text-6xl font-black uppercase mx-4 md:mx-8 tracking-tighter">
          Driven by Passion <span className="text-transparent stroke-text">Built with Code</span>
        </span>
      ))}
    </div>
  </div>
);

// 5. Tilt Card Logic
const TiltCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Disable tilt on small screens/touch devices
    if (window.innerWidth < 768) return;

    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setTransform(`perspective(1000px) rotateX(${y * -5}deg) rotateY(${x * 5}deg) scale(1.01)`);
  };

  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)");
  };

  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className={`transition-transform duration-200 ease-out ${className}`} style={{ transform, transformStyle: 'preserve-3d' }}>
      {children}
    </div>
  );
};
// 6. Footer
const Footer = () => {
  const [time, setTime] = useState("");
  useEffect(() => {
    const updateTime = () => setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer id="contact" className="bg-black text-white pt-16 md:pt-20 pb-8 md:pb-10 px-4 md:px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 md:mb-20 gap-12 md:gap-0">
          <div className="max-w-xl w-full">
            <h2 className="text-4xl md:text-8xl font-bold mb-6 md:mb-8 leading-[0.9] tracking-tighter">
              LET'S WORK <br /><span className="text-neutral-500">TOGETHER</span>
            </h2>
            <div className="flex flex-col gap-4 md:gap-6 items-start">
              <a href={`mailto:${PROFILE.email}`} className="inline-flex items-center gap-2 md:gap-4 text-lg md:text-2xl border-b border-white pb-2 hover:text-neutral-400 hover:border-neutral-400 transition-colors break-all">
                {PROFILE.email} <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" />
              </a>
              <a href={`tel:${PROFILE.phone}`} className="inline-flex items-center gap-2 md:gap-4 text-lg md:text-2xl border-b border-white pb-2 hover:text-neutral-400 hover:border-neutral-400 transition-colors">
                <Phone className="w-5 h-5 md:w-6 md:h-6" /> {PROFILE.phone}
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 md:gap-12 text-sm uppercase tracking-wider text-neutral-400 w-full md:w-auto mt-0">
            <div className="flex flex-col gap-3 md:gap-4">
              <span className="text-white font-bold">Socials</span>
              <a href={`https://${PROFILE.socials.linkedin}`} className="hover:text-white transition-colors">LinkedIn</a>
              <a href={`https://${PROFILE.socials.github}`} className="hover:text-white transition-colors">GitHub</a>
            </div>
            <div className="flex flex-col gap-3 md:gap-4">
              <span className="text-white font-bold">Menu</span>
              <a href="#about" className="hover:text-white transition-colors">About</a>
              <a href="#experience" className="hover:text-white transition-colors">Experience</a>
              <a href="#work" className="hover:text-white transition-colors">Work</a>
              <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end border-t border-white/10 pt-6 md:pt-8 gap-6 md:gap-4">
          <div className="text-[15vw] md:text-[12rem] font-bold leading-none tracking-tighter opacity-20 select-none w-full text-center md:text-left">
            MAYANK
          </div>
          <div className="flex flex-col sm:flex-row justify-between w-full md:w-auto gap-4 md:gap-12 text-xs uppercase text-neutral-500 font-mono items-center md:items-end pb-2">
            <div className="flex items-center gap-2">
              <Clock size={12} /> <span>{time} IST</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe size={12} /> <span>{PROFILE.location}</span>
            </div>
            <div>© 2025 Edition</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function Portfolio() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen font-sans selection:bg-white selection:text-black overflow-x-hidden">
      <Navbar />
      <ScrollToTop />

      {/* HERO */}
      <section className="min-h-screen flex flex-col justify-end px-4 md:px-6 pb-8 md:pb-12 pt-28 md:pt-32 max-w-7xl mx-auto relative">
        <Reveal>
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black uppercase leading-[0.85] tracking-tighter mb-6 md:mb-8 WRAP-break-words">
            <span className="block">Mayank</span>
            <span className="block text-neutral-500">Sherawat</span>
          </h1>
        </Reveal>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-12 border-t border-white/20 pt-6 md:pt-8">
          <Reveal delay={200} className="w-full">
            {/* Optimized for responsiveness: uses standard sizing on mobile, VW on desktop */}
            <h2 className="text-xl sm:text-2xl md:text-[2.2vw] lg:text-[2.0vw] font-bold leading-tight text-neutral-200 whitespace-normal md:whitespace-nowrap overflow-visible">
              {PROFILE.role}
            </h2>
            <p className="text-base md:text-lg text-neutral-500 mt-3 md:mt-4 max-w-xl whitespace-normal leading-relaxed">
              Crafting scalable, immersive digital experiences with engineering precision.
            </p>
          </Reveal>

          <Reveal delay={400} className="self-end md:self-auto">
            <div className="hidden md:flex items-center gap-4 animate-bounce">
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                <ArrowDown size={20} />
              </div>
              <span className="text-sm uppercase tracking-widest">Scroll Down</span>
            </div>
          </Reveal>
        </div>
      </section>

      <Marquee />

      {/* ABOUT */}
      <section id="about" className="py-16 md:py-32 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          <div className="md:w-1/3">
            <Reveal>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                Engineering <br /> the Future.
              </h2>
            </Reveal>
          </div>
          <div className="md:w-2/3">
            <Reveal delay={200}>
              <p className="text-lg md:text-3xl leading-relaxed font-light text-neutral-200 mb-8 md:mb-12">
                {PROFILE.bio}
              </p>

              {/* EDUCATION GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 md:mb-12 border-t border-white/10 pt-6 md:pt-8">
                {EDUCATION.map((edu, idx) => (
                  <div key={idx}>
                    <h4 className="text-lg md:text-xl font-bold mb-2">{edu.institution}</h4>
                    <p className="text-neutral-400 text-sm md:text-base">{edu.degree}</p>
                    <div className="flex justify-between mt-2 text-sm font-mono text-neutral-500">
                      <span>{edu.period}</span>
                      <span>{edu.score}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* CERTIFICATIONS LIST */}
              <div className="border-t border-white/10 pt-6 md:pt-8">
                <h4 className="text-sm font-mono text-neutral-500 mb-4 md:mb-6 uppercase tracking-widest">Certifications</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  {CERTIFICATIONS.map((cert, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-neutral-300 text-sm md:text-base">
                      <span className="text-neutral-500 mt-1">▹</span> {cert}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* EXPERTISE / SKILLS */}
      <section id="expertise" className="py-16 md:py-32 px-4 md:px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h3 className="text-4xl font-mono text-neutral-500 mb-8 md:mb-16">SKILLS</h3>
          </Reveal>

          {/* 1. TECHNICAL SKILLS GRID */}
          <div className="mb-16 md:mb-24">
            <h4 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-neutral-300 uppercase tracking-widest border-l-4 border-white pl-4">Technical Stack</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {TECHNICAL_SKILLS.map((item, idx) => (
                <Reveal key={idx} delay={idx * 100} className="h-full">
                  <TiltCard className="h-full">
                    <div className="group border border-white/10 p-6 md:p-8 h-full bg-neutral-900/20 hover:bg-neutral-900/60 transition-all duration-500">
                      <div className="mb-6 text-neutral-400 group-hover:text-white transition-colors">
                        {item.icon}
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold mb-4 text-neutral-200 group-hover:text-white">{item.category}</h3>
                      <div className="flex flex-wrap gap-2">
                        {item.items.map((tech, tIdx) => (
                          <span key={tIdx} className="text-xs md:text-sm text-neutral-400 border border-white/10 px-2 py-1 rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>

          {/* 2. TOOLS SECTION */}
          <div className="mb-16 md:mb-24 pt-8 md:pt-12 border-t border-white/10">
            <Reveal delay={100}>
              <div className="flex items-center gap-3 mb-6 md:mb-8">
                <Wrench className="text-neutral-500" size={24} />
                <h4 className="text-xl md:text-2xl font-bold text-neutral-300 uppercase tracking-widest">Development Tools</h4>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
                {TOOLS.map((tool, idx) => (
                  <div key={idx} className="flex flex-col items-center justify-center p-6 md:p-8 border border-white/10 bg-neutral-900/40 hover:bg-white hover:text-black transition-all duration-300 text-center rounded-lg group h-24 md:h-32">
                    <span className="font-bold text-sm md:text-xl">{tool}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* 3. SOFT SKILLS SECTION */}
          <div className="pt-8 md:pt-12 border-t border-white/10">
            <Reveal delay={200}>
              <div className="flex flex-col gap-4 md:gap-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 md:p-3 bg-white/10 rounded-full"><Sparkles className="text-white w-5 h-5 md:w-7 md:h-7" /></div>
                  <h4 className="text-xl md:text-3xl font-bold text-white uppercase tracking-widest">Professional Skills</h4>
                </div>
                <div className="flex flex-wrap gap-2 md:gap-4">
                  {SOFT_SKILLS.map((skill, idx) => (
                    <span key={idx} className="px-4 py-2 md:px-6 md:py-4 border border-white/20 rounded-full text-sm md:text-lg font-medium text-neutral-300 hover:border-white hover:text-white hover:bg-white/5 transition-all cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* EXPERIENCE LIST */}
      <section id="experience" className="py-16 md:py-32 px-4 md:px-6 max-w-7xl mx-auto border-t border-white/10">
        <Reveal>
          <h3 className="text-4xl font-mono text-neutral-500 mb-8 md:mb-16">EXPERIENCE</h3>
        </Reveal>

        {EXPERIENCE.map((exp, idx) => (
          <Reveal key={idx}>
            <div className="flex flex-col md:flex-row justify-between items-start py-6 md:py-8 border-t border-white/10 hover:bg-neutral-900/30 transition-colors duration-300 p-2 md:p-4 rounded-lg">
              <div className="w-full md:w-1/3 mb-4 md:mb-0">
                <h3 className="text-xl md:text-2xl font-bold">{exp.company}</h3>
                <p className="text-neutral-500 mt-2 text-sm">{exp.location}</p>
                <div className="md:hidden mt-2 font-mono text-sm text-neutral-500">
                  {exp.period}
                </div>
              </div>
              <div className="w-full md:w-1/3 mb-4 md:mb-0">
                <h4 className="text-lg md:text-xl text-neutral-300 mb-4">{exp.role}</h4>
                <ul className="space-y-3 md:space-y-4">
                  {exp.points.map((point, pIdx) => (
                    <li key={pIdx} className="text-neutral-400 text-sm leading-relaxed flex items-start group">
                      <span className="mr-3 mt-1.5 w-1.5 h-1.5 bg-neutral-600 rounded-full shrink-0 group-hover:bg-white transition-colors"></span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="hidden md:block w-1/3 text-right font-mono text-sm text-neutral-500">
                {exp.period}
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      {/* WORK */}
      <section id="work" className="py-16 md:py-32 px-4 md:px-6 bg-white text-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12 md:mb-20">
            <Reveal>
              <h2 className="text-4xl md:text-7xl font-bold tracking-tighter">FEATURED <br /> PROJECTS</h2>
            </Reveal>
            <Reveal delay={200}>
              <div className="hidden md:block text-right">
                <p className="text-neutral-500 max-w-xs text-sm">
                  A selection of projects that showcase my passion for building robust and scalable applications.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="space-y-16 md:space-y-32">
            {PROJECTS.map((project, idx) => (
              <Reveal key={idx} className="group cursor-default">

                <div className="flex flex-col md:flex-row justify-between items-start border-t border-black/10 pt-4 md:pt-6">
                  <div className="max-w-2xl w-full">
                    <div className="flex flex-wrap items-baseline gap-3 mb-2">
                      <h3 className="text-2xl md:text-4xl font-bold">{project.title}</h3>

                      {/* Live Link with Arrow */}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm md:text-base font-medium text-neutral-500 hover:text-black transition-colors flex items-center gap-1 group/link translate-y--2px"
                        >
                          Live Link
                          <ArrowUpRight size={16} className="group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform" />
                        </a>
                      )}
                    </div>
                    {/* Added Tools Under Title - Styled clearly */}
                    <p className="text-neutral-800 text-[10px] md:text-xs font-bold font-mono mb-3 md:mb-4 uppercase tracking-widest border-b border-black/10 pb-2 inline-block">
                      {project.tech}
                    </p>
                    <p className="text-neutral-500 text-sm md:text-lg mb-3 md:mb-4">{project.category}</p>
                    <p className="text-neutral-600 text-sm md:text-base leading-relaxed mb-4 md:mb-6">{project.desc}</p>
                    <ul className="space-y-2 mb-6">
                      {project.points && project.points.map((point, pIdx) => (
                        <li key={pIdx} className="text-sm text-neutral-600 flex items-start">
                          <span className="mr-2 mt-1.5 w-1 h-1 bg-neutral-400 rounded-full shrink-0"></span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="hidden md:block text-right mt-4 md:mt-0">

                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* STYLES */}
      <style>{`
        .stroke-text {
          -webkit-text-stroke: 1px black;
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee2 {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee2 {
          animation: marquee2 40s linear infinite;
        }
      `}</style>
    </div>
  );
}