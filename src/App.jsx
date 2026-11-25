import { useEffect, useMemo, useState } from 'react';
import { LayoutDashboard, CalendarDays, StickyNote, Sparkles, ChevronLeft, ChevronRight, Brain, Bot, Search, MessageSquare, BookOpen, Zap, CheckCircle2, Clock3, TrendingUp, Flag, Save } from 'lucide-react';

const plan = {
'2026-11-24':['Comprendre l’architecture d’un LLM','Découvrir les composants d’un grand modèle de langage et le rôle des Transformers.','Fondations LLM'],
'2026-11-25':['Tokenization, Tokens et Attention','Étudier la tokenisation, les embeddings et le mécanisme d’attention.','Fondations LLM'],
'2026-11-26':['AutoTokenizer et AutoModel','Charger un tokenizer et un modèle pré-entraîné avec Hugging Face.','Hugging Face'],
'2026-11-27':['Pipelines Hugging Face','Tester la classification de texte et l’analyse de sentiment.','Hugging Face'],
'2026-11-28':['Génération de texte et résumé','Expérimenter les pipelines text-generation et summarization.','Hugging Face'],
'2026-11-29':['Introduction au fine-tuning','Comprendre les données, les epochs, le learning rate et l’entraînement.','LLM'],
'2026-11-30':['Mini-projet NLP et révision','Assembler les notions apprises dans un notebook Python documenté.','Pratique'],
'2026-12-01':['Comprendre les embeddings','Découvrir comment un texte est représenté sous forme de vecteur.','Embeddings'],
'2026-12-02':['Découvrir Sentence Transformers','Charger un modèle Sentence Transformers et explorer son usage.','Embeddings'],
'2026-12-03':['Générer des embeddings','Transformer plusieurs phrases en vecteurs avec Python.','Embeddings'],
'2026-12-04':['Similarité cosinus','Comprendre et calculer la similarité entre deux vecteurs.','Embeddings'],
'2026-12-05':['Comparer des textes','Mesurer la proximité sémantique entre différentes phrases.','Pratique'],
'2026-12-06':['Recherche sémantique','Créer une recherche simple basée sur les embeddings.','Mini-projet'],
'2026-12-07':['Révision des embeddings','Revoir les concepts et documenter le moteur de recherche.','Révision'],
'2026-12-08':['Introduction au Prompt Engineering','Comprendre la structure d’un prompt et les bonnes pratiques.','Prompting'],
'2026-12-09':['Zero-shot et Few-shot','Comparer les prompts sans exemple et avec exemples.','Prompting'],
'2026-12-10':['Rôles des messages','Étudier System, User et Assistant dans une conversation LLM.','Prompting'],
'2026-12-11':['Paramètres de génération','Expérimenter Temperature, Max Tokens et Context Window.','LLM'],
'2026-12-12':['Modèles instruct','Découvrir les modèles adaptés au suivi d’instructions.','LLM'],
'2026-12-13':['Sorties structurées JSON','Demander et valider des réponses structurées.','Pratique'],
'2026-12-14':['Créer un assistant simple','Construire un assistant qui suit des instructions précises.','Mini-projet'],
'2026-12-15':['Architecture RAG','Comprendre ingestion, retrieval, contexte et génération.','RAG'],
'2026-12-16':['Chunking et Text Splitting','Découper des documents en segments pertinents.','RAG'],
'2026-12-17':['Bases vectorielles','Comprendre le stockage et l’indexation des vecteurs.','RAG'],
'2026-12-18':['Vector Search','Étudier la recherche par similarité et ses limites.','RAG'],
'2026-12-19':['Pipeline d’indexation','Charger, découper et vectoriser des documents.','Pratique'],
'2026-12-20':['Recherche contextuelle','Récupérer les passages pertinents pour une question.','Pratique'],
'2026-12-21':['Premier système RAG','Assembler retrieval et génération dans un prototype.','Mini-projet'],
'2026-12-22':['Découvrir FastAPI','Créer un projet et comprendre routes et structure.','FastAPI'],
'2026-12-23':['Endpoints GET et POST','Créer des routes et manipuler les requêtes HTTP.','FastAPI'],
'2026-12-24':['Validation avec Pydantic','Définir des schémas et valider les entrées API.','FastAPI'],
'2026-12-25':['Intégrer Hugging Face','Charger un modèle dans une application FastAPI.','Intégration IA'],
'2026-12-26':['Endpoint de génération','Exposer une fonctionnalité de génération via une API.','Intégration IA'],
'2026-12-27':['Connecter le pipeline RAG','Relier la recherche documentaire à l’API.','RAG + API'],
'2026-12-28':['Tester avec Swagger et Postman','Vérifier les endpoints, les erreurs et les réponses.','Tests API'],
'2026-12-29':['Architecture du mini-projet','Définir les composants, les dossiers et le workflow IA.','Projet final'],
'2026-12-30':['Implémentation et tests','Finaliser le workflow et tester les cas principaux.','Projet final'],
'2026-12-31':['Finalisation et bilan','Documenter le projet, préparer GitHub et faire le bilan.','Projet final']
};
const roadmap=[['LLM & Transformers','Comprendre les modèles de langage',Brain],['Hugging Face','Tokenizers, pipelines et modèles',Bot],['Embeddings & recherche','Similarité sémantique',Search],['Prompt Engineering','Concevoir des prompts efficaces',MessageSquare],['RAG','Question-réponse sur documents',BookOpen],['FastAPI & mini-projet','Exposer ton modèle via une API',Zap]];
const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}};
const dateKey=(y,m,d)=>`${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
export default function App(){
 const [month,setMonth]=useState(10),[selected,setSelected]=useState('2026-11-24');
 const [done,setDone]=useState(()=>read('focusai-done',[])),[checks,setChecks]=useState(()=>read('focusai-checks',{})),[notes,setNotes]=useState(()=>read('focusai-notes',{})),[note,setNote]=useState('');
 useEffect(()=>localStorage.setItem('focusai-done',JSON.stringify(done)),[done]);
 useEffect(()=>localStorage.setItem('focusai-checks',JSON.stringify(checks)),[checks]);
 useEffect(()=>localStorage.setItem('focusai-notes',JSON.stringify(notes)),[notes]);
 useEffect(()=>setNote(notes[selected]||''),[selected]);
 const task=plan[selected], completed=done.filter(d=>plan[d]).length, percent=Math.round(completed/38*100), currentChecks=checks[selected]||{};
 const monthName=month===10?'Novembre':'Décembre', first=(new Date(2026,month,1).getDay()+6)%7, count=new Date(2026,month+1,0).getDate();
 const cells=Array.from({length:42},(_,i)=>{const day=i-first+1;return day>0&&day<=count?day:null});
 const toggleDone=()=>setDone(v=>v.includes(selected)?v.filter(x=>x!==selected):[...v,selected]);
 const toggleCheck=(id,value)=>setChecks(v=>({...v,[selected]:{...(v[selected]||{}),[id]:value}}));
 const formatted=new Intl.DateTimeFormat('fr-FR',{weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(new Date(selected+'T12:00:00'));
 return <div className="app"><aside className="sidebar"><a className="brand" href="#top"><span className="logo"><Sparkles size={19}/></span>FocusAI</a><div className="side-label">ESPACE PERSONNEL</div><nav><a className="active" href="#top"><LayoutDashboard size={17}/> Tableau de bord</a><a href="#calendar"><CalendarDays size={17}/> Mon calendrier</a><a href="#notes"><StickyNote size={17}/> Mes notes</a></nav><div className="side-note"><small>Ton rythme quotidien</small><strong>2 h / jour</strong><small>La régularité construit l’expertise. Un pas à la fois.</small></div></aside>
 <main id="top"><header><div><span className="eyebrow">TON ESPACE D’APPRENTISSAGE</span><h1>Bonjour, bienvenue dans ton espace <Sparkles size={21}/></h1><p>Chaque petite étape te rapproche de ton objectif IA.</p></div><div className="avatar">AI</div></header>
 <section className="hero"><div><span className="hero-tag">NOVEMBRE — DÉCEMBRE 2026</span><h2>Construis tes compétences en IA.</h2><p>Des fondations LLM jusqu’à ton premier microservice IA avec FastAPI. Avance à ton rythme et célèbre chaque progrès.</p></div><div className="time"><strong>2:00</strong><span>HEURES PAR JOUR</span></div></section>
 <section className="stats"><article><span>Jours validés <CheckCircle2/></span><strong>{completed} / 38</strong><small>Journées d’apprentissage</small></article><article><span>Progression <TrendingUp/></span><strong>{percent}%</strong><div className="progress"><i style={{width:`${percent}%`}}/></div></article><article><span>Temps investi <Clock3/></span><strong>{completed*2} h</strong><small>Base de 2 h par jour</small></article><article><span>Objectif final <Flag/></span><strong>31 déc.</strong><small>Mini-projet IA terminé</small></article></section>
 <div className="layout"><section className="panel" id="calendar"><div className="panel-head"><div><h3>Calendrier d’apprentissage</h3><small>Sélectionne une journée pour voir son objectif.</small></div><div className="month"><button onClick={()=>setMonth(10)} disabled={month===10}><ChevronLeft/></button><b>{monthName} 2026</b><button onClick={()=>setMonth(11)} disabled={month===11}><ChevronRight/></button></div></div><div className="weekdays">{['LUN','MAR','MER','JEU','VEN','SAM','DIM'].map(x=><span key={x}>{x}</span>)}</div><div className="calendar">{cells.map((day,i)=>{if(!day)return <div className="empty" key={i}/>;const key=dateKey(2026,month,day);return <button key={key} onClick={()=>setSelected(key)} className={`day ${selected===key?'selected':''} ${done.includes(key)?'done':''}`}><span>{day}</span>{plan[key]&&<i/>}</button>})}</div><div className="legend"><span>● Objectif planifié</span><span>✓ Journée terminée</span></div></section>
 <div className="right"><section className="panel"><div className="panel-head"><div><h3>Objectif du jour</h3><small>{formatted}</small></div><span className="pill">2 heures</span></div>{task?<><h2 className="task-title">{task[0]}</h2><p className="description">{task[1]}</p><div className="pills"><span className="pill">{task[2]}</span><span className="pill green">Théorie + pratique</span></div><div className="checks">{[['learn','45 min · Apprentissage / cours'],['practice','60 min · Pratique Python'],['review','15 min · Révision / notes']].map(([id,label])=><label key={id}><input type="checkbox" checked={!!currentChecks[id]} onChange={e=>toggleCheck(id,e.target.checked)}/>{label}</label>)}</div><button className={`primary ${done.includes(selected)?'finished':''}`} onClick={toggleDone}>{done.includes(selected)?'✓ Journée terminée — annuler':'✓ Marquer la journée terminée'}</button></>:<p>Aucun objectif planifié pour cette date.</p>}</section>
 <section className="panel"><div className="panel-head"><h3>Ton parcours IA</h3><span className="pill">6 étapes</span></div>{roadmap.map(([title,desc,Icon])=><div className="roadmap" key={title}><span><Icon size={17}/></span><div><b>{title}</b><small>{desc}</small></div></div>)}</section>
 <section className="panel" id="notes"><div className="panel-head"><h3>Notes du jour</h3><span className="pill">Personnel</span></div><textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="Qu’as-tu appris aujourd’hui ? Qu’est-ce qui reste à revoir ?"/><button className="save" onClick={()=>setNotes(v=>({...v,[selected]:note}))}><Save size={15}/> Enregistrer mes notes</button></section></div></div><footer>FOCUSAI · Ton apprentissage, ton rythme · Données sauvegardées dans ce navigateur.</footer></main></div>
}
