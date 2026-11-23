import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail, Phone, MapPin, Menu, X, ExternalLink, Code2, Cpu, GraduationCap, BriefcaseBusiness, Sparkles, ChevronRight, LockKeyhole, Plus, Pencil, Trash2, LogOut, Save } from "lucide-react";
import { api, getToken } from "./api";

const fallbackProfile = {
  name: "Viknesh S", role: "MCA Student | Aspiring Full-Stack Developer",
  summary: "I am an MCA student and B.Sc. Computer Science graduate interested in web development and building useful technology solutions. I enjoy learning new tools, developing responsive interfaces, and working on practical projects.",
  email: "vikneshs2424@gmail.com", phone: "+91 7530070933", location: "Tamil Nadu, India",
  github: "", linkedin: "", photo: "/profile.jpg", resume: "",
  skills: ["C", "HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB", "IoT", "Git"]
};
const fallbackProjects = [
  { _id:"temple", title:"Smart Visitors Limit Management System for Temples", category:"IoT", date:"February 2025", description:"An IoT-based visitor management system that monitors the number of people entering and exiting a temple and helps maintain the permitted capacity.", technologies:["ESP8266","IR Sensors","Servo Motor","Buzzer"], highlights:["Real-time visitor counting","Automatic gate control using a servo motor","Buzzer alert when the visitor limit is reached"], featured:true },
  { _id:"weather", title:"Weather Forecast App", category:"Web Development", date:"October 2023", description:"A weather application that uses the OpenWeather API to retrieve and display current weather information.", technologies:["HTML","CSS","JavaScript","OpenWeather API"], highlights:["Displays temperature and weather conditions","Shows location-based weather information","Handles API data and updates"], featured:true }
];

function SectionTitle({ eyebrow, title, text }) {
  return <div className="section-title"><span className="eyebrow"><span className="eyebrow-mark" aria-hidden="true">✦</span>{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>;
}
function App() {
  const [profile,setProfile] = useState(fallbackProfile);
  const [projects,setProjects] = useState(fallbackProjects);
  const [selected,setSelected] = useState(null);
  const [menu,setMenu] = useState(false);
  const [activeSection,setActiveSection] = useState(location.hash.slice(1)||"home");
  const [route,setRoute] = useState(location.pathname);
  const [loading,setLoading] = useState(true);
  useEffect(() => {
    Promise.all([api("/profile"),api("/projects")]).then(([p,pr]) => {setProfile(p);setProjects(pr)}).catch(()=>{}).finally(()=>setLoading(false));
    const onPop=()=>{setRoute(location.pathname);if(location.hash)setActiveSection(location.hash.slice(1))}; addEventListener("popstate",onPop); return ()=>removeEventListener("popstate",onPop);
  },[]);
  useEffect(() => {
    const revealItems=[...document.querySelectorAll(".section-wrap:not(.hero) > .section-title, .section-wrap:not(.hero) > :not(.section-title)")];
    revealItems.forEach(item=>item.classList.add("scroll-reveal"));
    if(!("IntersectionObserver" in window)){revealItems.forEach(item=>item.classList.add("is-visible"));document.documentElement.classList.add("motion-ready");return}
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target)}
    }),{threshold:.14,rootMargin:"0px 0px -35px 0px"});
    revealItems.forEach(item=>observer.observe(item));
    requestAnimationFrame(()=>document.documentElement.classList.add("motion-ready"));
    return ()=>{observer.disconnect();document.documentElement.classList.remove("motion-ready")};
  },[]);
  const goAdmin=()=>{history.pushState({}, "", "/admin");setRoute("/admin");setMenu(false)};
  const goHome=()=>{history.pushState({}, "", "/#home");setRoute("/");setActiveSection("home");setMenu(false)};
  const activateSection=id=>{
    setActiveSection(id);setMenu(false);
    const panel=document.getElementById(id);
    if(panel){panel.classList.remove("section-activated");requestAnimationFrame(()=>panel.classList.add("section-activated"));window.setTimeout(()=>panel.classList.remove("section-activated"),900)}
  };
  if(route.startsWith("/admin")) return <Admin onExit={goHome} />;
  const nav=["About","Skills","Education","Experience","Projects","Contact"];
  return <div className="app-shell">
    <header className="navbar"><a className="brand" href="#home" onClick={goHome}><span className="brand-mark">S.</span><span>VIKNESH<span className="brand-dot">.</span></span></a>
      <nav className={menu?"nav-links open":"nav-links"}>{nav.map(n=>{const id=n.toLowerCase();return <a key={n} className={activeSection===id?"active":""} href={`#${id}`} onClick={()=>activateSection(id)}>{n}</a>})}</nav>
      <a className="nav-cta" href="#contact">Let's talk <ArrowUpRight size={16}/></a>
      <button className="menu-toggle" onClick={()=>setMenu(!menu)} aria-label="Toggle menu">{menu?<X/>:<Menu/>}</button>
    </header>
    <main>
      <section className="hero section-wrap" id="home">
        <div className="hero-copy"><motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:.6}} className="availability"><span className="pulse"></span> OPEN TO LEARNING & OPPORTUNITIES</motion.div>
          <motion.h1 initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{delay:.12,duration:.7}}>Building ideas<br/>into <span className="gradient-text">digital reality.</span></motion.h1>
          <motion.p className="hero-lead" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.3}}>I'm <strong>{profile.name}</strong> — {profile.role}. I create clean, responsive web experiences and enjoy turning practical problems into useful solutions.</motion.p>
          <div className="hero-actions"><a className="button primary" href="#projects">Explore my work <ArrowUpRight size={17}/></a><a className="button secondary" href="#contact">Get in touch</a></div>
          <div className="hero-social">{profile.github&&<a href={profile.github} target="_blank" rel="noreferrer"><Github size={18}/> GitHub</a>}{profile.linkedin&&<a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18}/> LinkedIn</a>}<span><MapPin size={16}/>{profile.location}</span></div>
        </div>
        <motion.div className="hero-visual" initial={{opacity:0,scale:.92}} animate={{opacity:1,scale:1}} transition={{delay:.2,duration:.8}} onPointerMove={e=>{if(e.pointerType!=="mouse")return;const r=e.currentTarget.getBoundingClientRect();e.currentTarget.style.setProperty("--tilt-x",`${((e.clientY-r.top)/r.height-.5)*-8}deg`);e.currentTarget.style.setProperty("--tilt-y",`${((e.clientX-r.left)/r.width-.5)*10}deg`)}} onPointerLeave={e=>{e.currentTarget.style.setProperty("--tilt-x","0deg");e.currentTarget.style.setProperty("--tilt-y","0deg")}}>
          <div className="hero-particles" aria-hidden="true">{Array.from({length:18},(_,i)=><i key={i} style={{left:`${(i*47+11)%100}%`,top:`${(i*67+8)%100}%`,animationDelay:`-${(i%7)*.7}s`}} />)}</div>
          <div className="orbit orbit-one"></div><div className="orbit orbit-two"></div><div className="photo-frame"><img src={profile.photo && profile.photo !== "/profile.jpg" ? profile.photo : "/viknesh-anime-character.png"} alt="Full-height anime portrait of Viknesh" onError={e=>{e.currentTarget.style.display="none";e.currentTarget.nextSibling.style.display="grid"}}/><div className="photo-fallback"><Code2 size={66}/><span>YOUR PHOTO</span><small>Set a portrait path in profile settings</small></div></div>
          <div className="float-card card-code"><Code2 size={17}/><span>Clean code</span></div><div className="float-card card-idea"><Sparkles size={17}/><span>Curious mind</span></div><div className="hero-glow"></div>
        </motion.div>
        <a href="#about" className="scroll-hint">SCROLL TO EXPLORE <span></span></a>
      </section>
      <section className="section-wrap about-section" id="about"><SectionTitle eyebrow="GET TO KNOW ME" title="A little about me" text="Curiosity, consistency, and a passion for building things that matter."/>
        <div className="about-grid"><div className="about-main glass"><span className="big-quote">“</span><p>{profile.summary}</p><div className="about-stats"><div><strong>MCA</strong><span>Currently pursuing</span></div><div><strong>7.5</strong><span>UG CGPA</span></div><div><strong>3 mo.</strong><span>Web internship</span></div></div></div>
          <div className="about-side"><div className="info-card"><GraduationCap/><div><strong>Education</strong><span>Master of Computer Applications</span></div></div><div className="info-card"><Code2/><div><strong>Focus</strong><span>Frontend & Full-Stack Development</span></div></div><div className="info-card"><Cpu/><div><strong>Interest</strong><span>Web technologies & IoT</span></div></div></div></div>
      </section>
      <section className="section-wrap" id="skills"><SectionTitle eyebrow="WHAT I WORK WITH" title="Skills & technologies" text="Tools and technologies I'm learning and using to bring ideas to life."/>
        <div className="skills-grid">{(profile.skills||fallbackProfile.skills).map((s,i)=><div className="skill-chip" key={s}><span className="skill-index">0{i+1}</span><span>{s}</span><span className="skill-dot"></span></div>)}</div>
      </section>
      <section className="section-wrap" id="education"><SectionTitle eyebrow="MY JOURNEY" title="Education" text="The academic path that shaped my technical foundation."/>
        <div className="timeline"><div className="timeline-item"><span className="timeline-dot"></span><span className="timeline-date">AUG 2026 — PRESENT</span><h3>Master of Computer Applications (MCA)</h3><p>Kongu Engineering College</p><span className="timeline-tag">Currently pursuing</span></div><div className="timeline-item"><span className="timeline-dot"></span><span className="timeline-date">AUG 2022 — 2025</span><h3>B.Sc. Computer Science</h3><p>Kongu Arts and Science College, Erode</p><span className="timeline-tag">CGPA: 7.5</span></div><div className="timeline-item"><span className="timeline-dot"></span><span className="timeline-date">SCHOOL EDUCATION</span><h3>Vivekanantha Matric Hr. Sec. School</h3><p>Vellode</p><span className="timeline-tag">HSC: 7.4 · SSLC: 7.2</span></div></div>
      </section>
      <section className="section-wrap" id="experience"><SectionTitle eyebrow="WHERE I'VE LEARNED" title="Experience" text="Practical exposure to building responsive web interfaces."/>
        <div className="experience-card glass"><div className="experience-icon"><BriefcaseBusiness/></div><div className="experience-content"><div className="experience-top"><div><span className="timeline-date">NOV 2024 — JAN 2025</span><h3>Web Development Intern</h3></div><span className="experience-length">3 MONTHS</span></div><p>Worked with HTML, CSS, and JavaScript to support small web applications and improve responsive user interfaces.</p><ul><li>Assisted in developing small web applications.</li><li>Worked on UI components and responsive layouts for different devices.</li><li>Learned collaborative development practices using Git and version control.</li></ul></div></div>
      </section>
      <section className="section-wrap" id="projects"><SectionTitle eyebrow="SELECTED WORK" title="Projects I've built" text="A few practical projects that reflect my interest in solving real-world problems."/>
        <div className="projects-grid">{projects.map((p,i)=><motion.button type="button" className="project-card glass" key={p._id||p.title} onClick={()=>setSelected(p)} whileHover={{y:-7}} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.08}}><div className="project-top"><span className="project-category">{p.category}</span><span className="project-arrow"><ArrowUpRight/></span></div><span className="project-number">0{i+1}</span><h3>{p.title}</h3><p>{p.description}</p><div className="tag-list">{(p.technologies||[]).slice(0,4).map(t=><span key={t}>{t}</span>)}</div><span className="view-details">VIEW PROJECT DETAILS <ChevronRight size={15}/></span></motion.button>)}</div>
      </section>
      <section className="section-wrap achievements"><div className="achievement-panel"><div><span className="eyebrow">BEYOND THE CLASSROOM</span><h2>Always learning.<br/><span className="gradient-text">Always building.</span></h2></div><div className="achievement-list"><p><Sparkles/> Participated in a hackathon and presented a student success and career guidance prototype.</p><p><Sparkles/> Active member of the National Service Scheme (NSS).</p><p><Sparkles/> Learning full-stack development and C++ fundamentals.</p></div></div></section>
      <section className="section-wrap contact-section" id="contact"><SectionTitle eyebrow="LET'S CONNECT" title="Have an idea in mind?" text="I'm always interested in learning, collaborating, and discussing new opportunities."/>
        <div className="contact-card glass"><div><h3>Let's build something<br/><span className="gradient-text">meaningful together.</span></h3><p>Feel free to reach out for a conversation or collaboration.</p></div><div className="contact-links"><a href={`mailto:${profile.email}`}><Mail/>{profile.email}<ArrowUpRight/></a><a href={`tel:${profile.phone}`}><Phone/>{profile.phone}<ArrowUpRight/></a></div></div>
      </section>
    </main>
    <footer className="footer"><a className="brand" href="#home"><span className="brand-mark">S.</span><span>VIKNESH<span className="brand-dot">.</span></span></a><span>Designed & built with curiosity · © {new Date().getFullYear()} Viknesh S</span><button className="admin-link" onClick={goAdmin}><LockKeyhole size={14}/> Admin</button></footer>
    <AnimatePresence>{selected&&<motion.div className="modal-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setSelected(null)}><motion.div className="project-modal glass" initial={{y:25,scale:.96}} animate={{y:0,scale:1}} exit={{y:20,scale:.96}} onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>setSelected(null)}><X/></button><span className="eyebrow">{selected.category} · {selected.date}</span><h2>{selected.title}</h2><p>{selected.description}</p><h4>Key highlights</h4><ul>{(selected.highlights||[]).map(x=><li key={x}>{x}</li>)}</ul><h4>Technologies</h4><div className="tag-list">{(selected.technologies||[]).map(x=><span key={x}>{x}</span>)}</div><div className="modal-links">{selected.github&&<a href={selected.github} target="_blank" rel="noreferrer"><Github/> GitHub</a>}{selected.demo&&<a href={selected.demo} target="_blank" rel="noreferrer"><ExternalLink/> Live demo</a>}</div></motion.div></motion.div>}</AnimatePresence>
  </div>;
}

function Admin({onExit}) {
  const [token,setToken]=useState(getToken());
  const [email,setEmail]=useState("vikneshs2424@gmail.com"),[password,setPassword]=useState("");
  const [projects,setProjects]=useState([]),[profile,setProfile]=useState(fallbackProfile);
  const [tab,setTab]=useState("projects"),[editing,setEditing]=useState(null),[message,setMessage]=useState("");
  const [form,setForm]=useState({title:"",category:"Web Development",date:"",description:"",technologies:"",highlights:"",github:"",demo:""});
  const [profileForm,setProfileForm]=useState(fallbackProfile);
  const [busy,setBusy]=useState(false);
  const refresh=async()=>{const [p,pr]=await Promise.all([api("/profile"),api("/projects")]);setProfile(p);setProfileForm({...p,skills:(p.skills||[]).join(", ")});setProjects(pr)};
  useEffect(()=>{if(token)refresh().catch(e=>setMessage(e.message))},[token]);
  const login=async e=>{e.preventDefault();setBusy(true);setMessage("");try{const d=await api("/auth/login",{method:"POST",body:JSON.stringify({email,password})});localStorage.setItem("portfolio_token",d.token);setToken(d.token)}catch(e){setMessage(e.message)}finally{setBusy(false)}};
  const logout=()=>{localStorage.removeItem("portfolio_token");setToken(null)};
  const startNew=()=>{setEditing("new");setForm({title:"",category:"Web Development",date:"",description:"",technologies:"",highlights:"",github:"",demo:""})};
  const startEdit=p=>{setEditing(p._id);setForm({...p,technologies:(p.technologies||[]).join(", "),highlights:(p.highlights||[]).join("\n")})};
  const saveProject=async e=>{e.preventDefault();setBusy(true);try{const body={...form,technologies:form.technologies.split(",").map(x=>x.trim()).filter(Boolean),highlights:form.highlights.split("\n").map(x=>x.trim()).filter(Boolean)};if(editing==="new")await api("/projects",{method:"POST",body:JSON.stringify(body)});else await api(`/projects/${editing}`,{method:"PUT",body:JSON.stringify(body)});setEditing(null);await refresh();setMessage("Project saved successfully.")}catch(e){setMessage(e.message)}finally{setBusy(false)}};
  const deleteProject=async id=>{if(!confirm("Delete this project?"))return;try{await api(`/projects/${id}`,{method:"DELETE"});await refresh();setMessage("Project deleted.")}catch(e){setMessage(e.message)}};
  const saveProfile=async e=>{e.preventDefault();setBusy(true);try{const body={...profileForm,skills:String(profileForm.skills).split(",").map(x=>x.trim()).filter(Boolean)};await api("/profile",{method:"PUT",body:JSON.stringify(body)});await refresh();setMessage("Profile updated.")}catch(e){setMessage(e.message)}finally{setBusy(false)}};
  if(!token)return <div className="admin-page"><div className="login-card glass"><button className="back-home" onClick={onExit}>← Back to portfolio</button><div className="brand-mark">S.</div><span className="eyebrow">PRIVATE AREA</span><h1>Admin sign in</h1><p>Sign in to manage your portfolio content.</p><form onSubmit={login}><label>Email address<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></label><label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required/></label><button className="button primary full" disabled={busy}>{busy?"Signing in...":"Sign in"} <ArrowUpRight size={16}/></button></form>{message&&<p className="form-message">{message}</p>}<small>Set your admin credentials in server/.env before first start.</small></div></div>;
  return <div className="admin-page"><div className="admin-shell"><header className="admin-header"><div><span className="eyebrow">PORTFOLIO CONTROL</span><h1>Welcome back.</h1></div><div className="admin-actions"><button className="button secondary" onClick={onExit}>View site</button><button className="button secondary" onClick={logout}><LogOut size={16}/> Sign out</button></div></header>
    <div className="admin-tabs"><button className={tab==="projects"?"active":""} onClick={()=>{setTab("projects");setEditing(null)}}>Projects</button><button className={tab==="profile"?"active":""} onClick={()=>{setTab("profile");setEditing(null)}}>Profile settings</button></div>
    {message&&<p className="admin-message">{message}</p>}
    {tab==="projects"&&<div className="admin-content"><div className="admin-section-head"><div><h2>Manage projects</h2><p>Add, edit, or remove portfolio projects.</p></div><button className="button primary" onClick={startNew}><Plus size={17}/> Add project</button></div>
      {editing!==null&&<form className="edit-form glass" onSubmit={saveProject}><h3>{editing==="new"?"Add a project":"Edit project"}</h3><div className="form-grid"><label>Project title<input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required/></label><label>Category<input value={form.category} onChange={e=>setForm({...form,category:e.target.value})}/></label><label>Date<input value={form.date} onChange={e=>setForm({...form,date:e.target.value})}/></label><label>Technologies (comma separated)<input value={form.technologies} onChange={e=>setForm({...form,technologies:e.target.value})}/></label><label className="wide">Description<textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})} required/></label><label className="wide">Highlights (one per line)<textarea value={form.highlights} onChange={e=>setForm({...form,highlights:e.target.value})}/></label><label>GitHub URL<input value={form.github} onChange={e=>setForm({...form,github:e.target.value})}/></label><label>Live demo URL<input value={form.demo} onChange={e=>setForm({...form,demo:e.target.value})}/></label></div><div className="form-buttons"><button className="button primary" disabled={busy}><Save size={16}/> Save project</button><button type="button" className="button secondary" onClick={()=>setEditing(null)}>Cancel</button></div></form>}
      <div className="admin-project-list">{projects.map(p=><div className="admin-project glass" key={p._id}><div><span className="project-category">{p.category}</span><h3>{p.title}</h3><p>{p.description}</p></div><div className="admin-row-actions"><button onClick={()=>startEdit(p)} aria-label="Edit"><Pencil/></button><button onClick={()=>deleteProject(p._id)} aria-label="Delete"><Trash2/></button></div></div>)}</div>
    </div>}
    {tab==="profile"&&<form className="edit-form glass profile-form" onSubmit={saveProfile}><h2>Profile settings</h2><p>Update the information displayed on your public portfolio.</p><div className="form-grid">{[["name","Full name"],["role","Professional title"],["email","Email"],["phone","Phone"],["location","Location"],["photo","Photo path (example: /profile.jpg)"],["github","GitHub URL"],["linkedin","LinkedIn URL"],["resume","Resume URL or path"]].map(([k,l])=><label key={k}>{l}<input value={profileForm[k]||""} onChange={e=>setProfileForm({...profileForm,[k]:e.target.value})}/></label>)}<label className="wide">About / summary<textarea value={profileForm.summary||""} onChange={e=>setProfileForm({...profileForm,summary:e.target.value})}/></label><label className="wide">Skills (comma separated)<textarea value={profileForm.skills||""} onChange={e=>setProfileForm({...profileForm,skills:e.target.value})}/></label></div><button className="button primary" disabled={busy}><Save size={16}/> Save profile</button></form>}
  </div></div>;
}
export default App;
