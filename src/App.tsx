import { Github, Mail, Phone, ChevronDown, ExternalLink, Code, Briefcase, GraduationCap, Award, Zap, Users, Target, Rocket, Calendar, BookOpen, TrendingUp, Cpu, Database, Smartphone, Linkedin } from 'lucide-react';
import { useState, useEffect } from 'react';
import BlogAdmin from './components/BlogAdmin';

function App() {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [showBlogAdmin, setShowBlogAdmin] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleProject = (index: number) => {
    setActiveProject(activeProject === index ? null : index);
  };

  if (showBlogAdmin) {
    return <BlogAdmin onBack={() => setShowBlogAdmin(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
          src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1920&h=1080&fit=crop" 
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
        <div className="absolute inset-0 bg-slate-900/80"></div>
      </div>

      {/* Header/Navigation */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-slate-900/95 backdrop-blur-lg shadow-2xl' : 'bg-transparent'}`}>
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center md:hidden">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">MYN</span>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <div className={`w-6 h-0.5 bg-white mb-1 transition-transform ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-white mb-1 transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-white transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
            </button>
          </div>
          <ul className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-8 mt-4 md:mt-0`}>
            {['Profil', 'Compétences', 'Projets', 'Expérience', 'CV', 'Contact'].map((item, index) => (
              <li key={index}>
                {item === 'CV' ? (
                  <a 
                    href="/cv1.pdf" 
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMenuOpen(false)} 
                    className="block hover:text-blue-400 transition-all duration-300 hover:scale-105 font-medium"
                  >
                    {item}
                  </a>
                ) : (
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    onClick={() => setIsMenuOpen(false)} 
                    className="block hover:text-blue-400 transition-all duration-300 hover:scale-105 font-medium"
                  >
                    {item}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="profil" className="pt-24 md:pt-32 pb-20 px-4 md:px-6 relative overflow-hidden">
        {/* Hero Background */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop" 
            alt="Space background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/70"></div>
        </div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-conic from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-full blur-3xl animate-spin" style={{animationDuration: '20s'}}></div>
        </div>
        <div className="container mx-auto text-center relative z-10">
          <div className="w-48 h-48.5 md:w-72 md:h-72.5 mx-auto mb-8 relative group">
            <div className="w-full h-full rounded-full overflow-hidden  shadow-2xl group-hover:scale-105 transition-transform duration-300 ">
      
              <img
                src="foto.jpg"
                alt="Mamath Yacine Niang"
                className="w-full h-full object-cover"
              />
            </div>



            
            <div className="absolute -inset-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20 blur-lg group-hover:opacity-30 transition-opacity"></div>
          </div>
          
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Mamath Yacine Niang
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Élève ingénieur généraliste à l'École Centrale Casablanca
              <br />
              <span className="text-blue-400 font-semibold">Passionné par l'innovation technologique</span>
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <a href="mailto:niangmamathyacine@gmail.com" className="group flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                <Mail size={20} className="group-hover:animate-bounce" />
                <span className="font-semibold">Me Contacter</span>
              </a>
              <a href="https://github.com/niangmamath" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center gap-3 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                <Github size={20} className="group-hover:rotate-12 transition-transform" />
                <span className="font-semibold">GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/mamath-yacine-n-12048a320/" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center gap-3 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                <Linkedin size={20} className="group-hover:rotate-12 transition-transform" />
                <span className="font-semibold">Linkedin</span>
              </a>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { icon: <Code size={24} />, value: '5+', label: 'Projets' },
                { icon: <Briefcase size={24} />, value: '3+', label: 'Expériences' },
                { icon: <GraduationCap size={24} />, value: 'ECC', label: 'École Centrale' },
                { icon: <Award size={24} />, value: '2028', label: 'Diplômation' }
              ].map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <div className="text-blue-400 mb-2 flex justify-center">{stat.icon}</div>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="compétences" className="py-20 relative overflow-hidden">
        {/* Skills Background */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop" 
           
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-indigo-900/80"></div>
        </div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-400 rounded-full blur-3xl animate-bounce" style={{animationDuration: '3s'}}></div>
            <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-indigo-400 rounded-full blur-3xl animate-bounce delay-1000" style={{animationDuration: '4s'}}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400 rounded-full blur-3xl animate-pulse" style={{animationDuration: '2s'}}></div>
          </div>
          {/* Tech pattern overlay */}
          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-12 gap-4 h-full">
              {Array.from({length: 144}).map((_, i) => (
                <div key={i} className="bg-white/10 rounded animate-pulse" style={{animationDelay: `${i * 0.1}s`}}></div>
              ))}
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Compétences Techniques
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Une expertise diversifiée en développement et gestion de projet
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { skill: "Programmation en Python", icon: <Code size={24} />, level: 90 },
              { skill: "Développement web (HTML, CSS, JavaScript)", icon: <Zap size={24} />, level: 85 },
              { skill: "Gestion de projet", icon: <Users size={24} />, level: 85 },
              { skill: "Programmation orienté objet", icon: <Target size={24} />, level: 80 },
              { skill: "Bon sens de l'organisation", icon: <Briefcase size={24} />, level: 90 },
              { skill: "Machine learning et IA Gen", icon: <Rocket size={24} />, level: 80 }
            ].map((item, index) => (
              <div key={index} className="group bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                <div className="flex items-center mb-4">
                  <div className="text-blue-400 mr-3 group-hover:scale-110 transition-transform">{item.icon}</div>
                  <h3 className="text-lg font-semibold">{item.skill}</h3>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${item.level}%` }}
                  ></div>
                </div>
                <div className="text-right text-sm text-gray-300">{item.level}%</div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Projects Section */}
      <section id="projets" className="py-20 relative">
        {/* Projects Background */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1920&h=1080&fit=crop" 
            alt="Code background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-purple-900/80"></div>
        </div>
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-32 h-32 bg-purple-400 rounded-lg blur-2xl animate-float"></div>
            <div className="absolute top-32 right-20 w-24 h-24 bg-pink-400 rounded-lg blur-2xl animate-float delay-1000"></div>
            <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-violet-400 rounded-lg blur-2xl animate-float delay-2000"></div>
            <div className="absolute bottom-32 right-1/3 w-28 h-28 bg-fuchsia-400 rounded-lg blur-2xl animate-float delay-3000"></div>
          </div>
          {/* Project cards pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-6 gap-8 p-8 h-full">
              {Array.from({length: 24}).map((_, i) => (
                <div key={i} className="bg-white/10 rounded-xl aspect-square animate-pulse" style={{animationDelay: `${i * 0.2}s`}}></div>
              ))}
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent">
             Projets innovants
            </h2>
            <p className="text-xl text-white max-w-2xl mx-auto">
              Des solutions créatives pour des défis technologiques
              complexes
            </p>
          </div>
          
          <div className="space-y-6">
            {[
              {
                title: "Projet de TIPE (2023-2024)",
                description: "Ce projet porte sur l'étude comparative de deux générations de boissons énergétiques destinées aux sportifs. L'objectif est de déterminer l'impact des modifications de composition de ces boissons sur la performance sportive.",
                image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop",
                tags: ["Recherche", "Analyse", "Performance"]
              },
              {
                title: "Projet Learning By Doing - Hybridia-Enr",
                description: "Dans le cadre de notre première année à l'École Centrale Casablanca, nous avons réalisé un projet sur le thème de l'énergie et de l'environnement. Intitulé Hybridia-Enr, ce projet aborde la problématique de l'intermittence des énergies renouvelables.",
                image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=400&fit=crop",
                tags: ["Énergie", "Environnement", "Innovation"]
              },
              {
                title: "Coding Week - Prédiction Cancer",
                description: "Ce projet, réalisé sur une semaine, avait pour objectif d'appliquer le machine learning dans le domaine de la santé. Nous avons développé une application capable de prédire le cancer du col de l'utérus.",
                image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
                tags: ["Machine Learning", "Santé", "IA"]
              }
            ].map((project, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-white/20 transition-all duration-300 transform hover:scale-[1.02] shadow-xl hover:shadow-2xl">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <button
                      onClick={() => toggleProject(index)}
                      className="w-full text-left group"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl md:text-2xl font-bold group-hover:text-blue-400 transition-colors">{project.title}</h3>
                        <ChevronDown
                          className={`transform transition-transform ml-4 flex-shrink-0 ${activeProject === index ? 'rotate-180' : ''} group-hover:text-blue-400`}
                          size={24}
                        />
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </button>
                    <div className={`transition-all duration-300 overflow-hidden ${activeProject === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <p className="text-gray-300 leading-relaxed">{project.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>       

      {/* Experience Section */}
      <section id="expérience" className="py-20 relative overflow-hidden">
        {/* Experience Background */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=1080&fit=crop" 
            alt="Business background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-emerald-900/80"></div>
        </div>
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-15">
            <div className="absolute top-1/4 left-1/6 w-48 h-48 bg-emerald-400 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-2/3 right-1/6 w-64 h-64 bg-teal-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-green-400 rounded-full blur-3xl animate-pulse delay-2000"></div>
          </div>
          {/* Timeline pattern */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-emerald-400/20 to-transparent"></div>
          <div className="absolute inset-0 opacity-5">
            {Array.from({length: 8}).map((_, i) => (
              <div key={i} className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-emerald-400 rounded-full animate-pulse" 
                   style={{top: `${20 + i * 10}%`, animationDelay: `${i * 0.5}s`}}></div>
            ))}
          </div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent">
              Expérience Professionnelle
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Un parcours riche en leadership et innovation
            </p>
          </div>
          
          <div className="space-y-8">
            {[
              {
                title: "Stagiaire",
                period: "Juin–Août 2025",
                organization: "Association Amal Biladi",
                description: "Gestion et optimisation du site web (Magento), développement de fonctionnalités interactives et amélioration des performances techniques.",
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
                type: "Stage"
              },
              {
                title: "Président du gouvernement scolaire",
                period: "2018",
                organization: "Collège de Gainte Kaye",
                description: "J'ai appris à diriger et à gérer des personnes ayant des parcours et des points de vue différents.",
                image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop",
                type: "Leadership"
              },
              {
                title: "Chargé de la communication",
                period: "2019",
                organization: "Gouvernement scolaire",
                description: "J'ai pu développer mes compétences en communication et en relations interpersonnelles.",
                image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
                type: "Communication"
              },
              {
                title: "Président",
                period: "Depuis 2019",
                organization: "Association AND LIGUEYEUL BAYE NIASS",
                description: "Nous menons des activités sociales telles que des journées d'assainissement et organisons des cérémonies religieuses.",
                image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop",
                type: "Associatif"
              }
            ].map((exp, index) => (
              <div key={index} className="group bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-white/20 transition-all duration-300 transform hover:scale-[1.02] shadow-xl hover:shadow-2xl">
                <div className="md:flex">
                  <div className="md:w-1/4">
                    <img 
                      src={exp.image} 
                      alt={exp.title}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-3/4 p-6">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 rounded-full text-sm font-medium">
                        {exp.type}
                      </span>
                      <span className="text-gray-400 text-sm">{exp.period}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{exp.title}</h3>
                    <p className="text-blue-400 font-semibold mb-3">{exp.organization}</p>
                    <p className="text-gray-300 leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative overflow-hidden">
        {/* Contact Background */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1516387938699-a93567ec168e?w=1920&h=1080&fit=crop" 
            alt="Communication background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-orange-900/80"></div>
        </div>
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-56 h-56 bg-orange-400 rounded-full blur-3xl animate-ping" style={{animationDuration: '3s'}}></div>
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-red-400 rounded-full blur-3xl animate-ping delay-1000" style={{animationDuration: '4s'}}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-400 rounded-full blur-3xl animate-ping delay-2000" style={{animationDuration: '5s'}}></div>
          </div>
          {/* Communication waves */}
          <div className="absolute inset-0 opacity-10">
            {Array.from({length: 5}).map((_, i) => (
              <div key={i} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-orange-400/30 rounded-full animate-ping"
                   style={{
                     width: `${200 + i * 100}px`,
                     height: `${200 + i * 100}px`,
                     animationDelay: `${i * 0.5}s`,
                     animationDuration: '3s'
                   }}></div>
            ))}
          </div>
        </div>
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              Restons en Contact
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Prêt à collaborer sur des projets innovants
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <a href="mailto:niangmamathyacine@gmail.com" className="group bg-white/10 backdrop-blur-sm p-8 rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
              <div className="text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                <Mail size={32} className="mx-auto" />
              </div>
              <h3 className="text-xl font-bold mb-2">Email</h3>
              <p className="text-gray-300 break-all">niangmamathyacine@gmail.com</p>
            </a>
            
            <a href="https://github.com/niangmamath" target="_blank" rel="noopener noreferrer" className="group bg-white/10 backdrop-blur-sm p-8 rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
              <div className="text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                <Github size={32} className="mx-auto" />
              </div>
              <h3 className="text-xl font-bold mb-2">GitHub</h3>
              <p className="text-gray-300">github.com/niangmamath</p>
            </a>
            
            <a href="https://www.linkedin.com/in/mamath-yacine-n-12048a320/" target="_blank" rel="noopener noreferrer" className="group bg-white/10 backdrop-blur-sm p-8 rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
              <div className="text-blue-500 mb-4 group-hover:scale-110 transition-transform">
                <Linkedin size={32} className="mx-auto" />
              </div>
              <h3 className="text-xl font-bold mb-2">LinkedIn</h3>
              <p className="text-gray-300">www.linkedin.com/in/mamath-yacine-n-12048a320/</p>
            </a>
            
            <a href="tel:+2120783346308" className="group bg-white/10 backdrop-blur-sm p-8 rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
              <div className="text-green-400 mb-4 group-hover:scale-110 transition-transform">
                <Phone size={32} className="mx-auto" />
              </div>
              <h3 className="text-xl font-bold mb-2">Téléphone</h3>
              <p className="text-gray-300">+212 0783346308</p>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 backdrop-blur-sm py-8 text-center border-t border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-conic from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-spin" style={{animationDuration: '30s'}}></div>
        </div>
        <div className="container mx-auto px-4">
          <p className="text-gray-400 mb-4">© 2025 Mamath Yacine Niang. Tous droits réservés.</p>
          <p className="text-sm text-gray-500">Conçu avec passion pour l'innovation</p>
        </div>
      </footer>
    </div>
  );
}

export default App;