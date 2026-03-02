import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  ShieldAlert, 
  BookOpen, 
  Play, 
  Pause, 
  Volume2, 
  Newspaper, 
  School, 
  User, 
  Info,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Radio
} from 'lucide-react';
import { geminiService, Story, NewsItem } from './services/geminiService';
import { cn } from './lib/utils';

// --- Components ---

const Navbar = ({ onNavigate }: { onNavigate: (page: string) => void }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-brand-gray-medium shadow-sm">
    <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
      <div 
        className="flex items-center gap-2 cursor-pointer group" 
        onClick={() => onNavigate('home')}
      >
        <div className="w-8 h-8 bg-brand-cnn-red flex items-center justify-center text-white font-black text-xl">
          P
        </div>
        <span className="text-2xl font-black tracking-tighter text-brand-dark">Pet é top</span>
      </div>
      
      <div className="hidden md:flex items-center gap-6">
        {[
          { id: 'awareness', label: 'Conscientização', color: 'hover:text-brand-cnn-red' },
          { id: 'solutions', label: 'Soluções', color: 'hover:text-brand-google-blue' },
          { id: 'news', label: 'Notícias', color: 'hover:text-brand-google-green' },
          { id: 'storybook', label: 'Storybook', color: 'hover:text-brand-google-yellow' }
        ].map((item) => (
          <button 
            key={item.id}
            onClick={() => {
              onNavigate('home');
              setTimeout(() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' }), 100);
            }} 
            className={cn("text-sm font-bold transition-colors uppercase tracking-tight text-stone-600", item.color)}
          >
            {item.label}
          </button>
        ))}
        <div className="w-px h-4 bg-brand-gray-medium mx-2" />
        <button 
          onClick={() => onNavigate('copyright')} 
          className="text-sm font-bold text-brand-cnn-red hover:underline uppercase tracking-tight"
        >
          Direitos
        </button>
      </div>

      <button className="md:hidden p-2 text-stone-600">
        <Newspaper size={24} />
      </button>
    </div>
  </nav>
);

const Hero = () => (
  <section className="pt-32 pb-20 px-4 border-b border-brand-gray-medium">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center gap-2 mb-6">
          <div className="w-3 h-3 bg-brand-cnn-red" />
          <span className="text-xs font-black uppercase tracking-widest text-brand-cnn-red">
            Destaque do Dia
          </span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black leading-none mb-8 tracking-tighter text-brand-dark">
          Proteja quem te ama <br />
          <span className="text-brand-cnn-red">sem falar uma palavra.</span>
        </h1>
        
        <p className="max-w-3xl text-xl md:text-2xl text-stone-600 font-medium mb-12 leading-tight">
          Aprenda, denuncie e transforme a vida de milhares de animais com informação e ação direta.
        </p>
        
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={() => document.getElementById('awareness')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-brand-cnn-red text-white font-black text-lg hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            COMO AJUDAR <ArrowRight size={20} />
          </button>
          <button 
            onClick={() => document.getElementById('storybook')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-white border border-brand-gray-medium text-brand-dark font-black text-lg hover:bg-brand-gray-light transition-colors"
          >
            VER HISTÓRIAS
          </button>
        </div>
      </motion.div>
    </div>
  </section>
);

const AwarenessSection = () => {
  const solutions = [
    {
      icon: <User className="text-brand-google-blue" />,
      title: "No Cotidiano",
      color: "bg-white border border-brand-gray-medium",
      description: "Denuncie maus-tratos ao 190, ofereça água e comida para animais de rua e considere a adoção responsável.",
      tips: ["Mantenha contatos de ONGs locais", "Sempre tenha um pote de água na calçada", "Eduque vizinhos sobre posse responsável"]
    },
    {
      icon: <School className="text-brand-google-red" />,
      title: "Na Escola",
      color: "bg-white border border-brand-gray-medium",
      description: "Promova gincanas de arrecadação de ração, palestras com veterinários e projetos de artes sobre o respeito animal.",
      tips: ["Crie um clube de proteção animal", "Organize visitas a abrigos", "Inclua o tema em redações e debates"]
    }
  ];

  return (
    <section id="awareness" className="py-20 bg-brand-gray-light">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="w-12 h-1 bg-brand-cnn-red mb-6" />
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight text-brand-dark">
              O que são maus-tratos?
            </h2>
            <p className="text-lg text-stone-600 mb-10 leading-relaxed font-medium">
              Maus-tratos não é apenas agressão física. Abandonar, manter preso em correntes curtas, negar água, comida ou assistência médica também são crimes previstos na Lei 9.605/98.
            </p>
            <div className="p-6 border-l-4 border-brand-google-red bg-white shadow-sm">
              <div className="flex gap-4">
                <ShieldAlert className="text-brand-google-red shrink-0" size={32} />
                <div>
                  <h4 className="text-xl font-black mb-1">É CRIME GRAVE!</h4>
                  <p className="text-stone-600 text-base leading-snug">A pena para maus-tratos a cães e gatos é de 2 a 5 anos de reclusão, multa e proibição da guarda.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {solutions.map((s, i) => (
              <div 
                key={i}
                className={cn("p-8 shadow-sm", s.color)}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-brand-gray-light flex items-center justify-center">
                    {s.icon}
                  </div>
                  <h3 className="text-2xl font-black">{s.title}</h3>
                </div>
                <p className="text-stone-600 text-lg mb-6 leading-relaxed font-medium">{s.description}</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {s.tips.map((tip, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm font-bold text-stone-500">
                      <div className="w-1.5 h-1.5 bg-brand-gray-medium" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const PracticalSolutions = () => {
  const [activeTab, setActiveTab] = useState('cotidiano');

  const dailyChecklist = [
    "Água fresca disponível 24h",
    "Alimentação de qualidade 2x ao dia",
    "Passeios diários (com guia e coleira)",
    "Ambiente limpo e protegido do sol/chuva",
    "Carinho e atenção (saúde mental do pet)",
    "Vacinação e vermifugação em dia"
  ];

  const schoolSteps = [
    { step: "01", title: "Eduque", desc: "Compartilhe o que aprendeu sobre leis de proteção animal com seus colegas." },
    { step: "02", title: "Mobilize", desc: "Sugira uma campanha de doação para abrigos locais para toda a escola." },
    { step: "03", title: "Observe", desc: "Fique atento a animais no entorno da escola e reporte situações de risco." },
    { step: "04", title: "Crie", desc: "Desenvolva cartazes educativos para os murais da escola." }
  ];

  return (
    <section id="solutions" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12">
          <div className="w-12 h-1 bg-brand-google-blue mb-6" />
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-brand-dark">
            Soluções Práticas
          </h2>
          <p className="text-lg text-stone-600 font-medium max-w-2xl">
            Pequenas atitudes geram grandes mudanças. Escolha onde você quer agir hoje.
          </p>
        </div>

        <div className="flex border-b border-brand-gray-medium mb-12">
          {[
            { id: 'cotidiano', label: 'Cotidiano', color: 'border-brand-google-blue text-brand-google-blue' },
            { id: 'escola', label: 'Escola', color: 'border-brand-google-red text-brand-google-red' },
            { id: 'denuncia', label: 'Denunciar', color: 'border-brand-google-yellow text-brand-google-yellow' }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-8 py-4 text-sm font-black uppercase tracking-widest transition-all border-b-4",
                activeTab === tab.id ? tab.color : "border-transparent text-stone-400 hover:text-stone-600"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'cotidiano' && (
            <motion.div 
              key="cotidiano"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              <div className="bg-brand-gray-light p-8 border border-brand-gray-medium">
                <h3 className="text-2xl font-black mb-8 flex items-center gap-3 text-brand-google-blue">
                  Checklist Nota 10
                </h3>
                <div className="space-y-4">
                  {dailyChecklist.map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-white border border-brand-gray-medium">
                      <div className="w-2 h-2 bg-brand-google-blue" />
                      <span className="text-lg font-bold text-stone-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6">
                <div className="p-8 bg-brand-google-blue text-white">
                  <h4 className="text-xl font-black mb-2 uppercase tracking-widest">Dica de Ouro</h4>
                  <p className="text-lg font-medium">Identifique seu pet com uma plaquinha na coleira. Isso salva vidas!</p>
                </div>
                <div className="p-8 bg-brand-google-red text-white">
                  <h4 className="text-xl font-black mb-2 uppercase tracking-widest">Atenção</h4>
                  <p className="text-lg font-medium">Chocolate e uvas são veneno para cães. Cuidado!</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'escola' && (
            <motion.div 
              key="escola"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-brand-gray-light p-8 md:p-12 border border-brand-gray-medium"
            >
              <div className="max-w-4xl">
                <h3 className="text-3xl font-black mb-12 text-brand-google-red">Ideias de Projetos e Como Fazê-los</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {schoolSteps.map((s, i) => (
                    <div key={i} className="group">
                      <span className="text-4xl font-black text-brand-google-red/20 block mb-2">{s.step}</span>
                      <h4 className="text-xl font-black mb-2 text-brand-dark">{s.title}</h4>
                      <p className="text-stone-600 text-lg leading-relaxed font-medium">{s.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-12 p-8 bg-white border-l-8 border-brand-google-yellow">
                  <h4 className="text-xl font-black mb-4 text-brand-dark uppercase tracking-widest">Projetos Sugeridos</h4>
                  <ul className="space-y-4 text-lg font-medium text-stone-700">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-brand-google-yellow mt-2 shrink-0" />
                      <div>
                        <span className="font-black">Mural Artístico:</span>
                        <p className="text-base text-stone-600">Crie um mural com desenhos e fotos de pets resgatados para sensibilizar a escola.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-brand-google-yellow mt-2 shrink-0" />
                      <div>
                        <span className="font-black">Palestras de Alunos:</span>
                        <p className="text-base text-stone-600">Organize apresentações curtas nas salas de aula sobre como identificar maus-tratos.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-brand-google-yellow mt-2 shrink-0" />
                      <div>
                        <span className="font-black">Peça Teatral:</span>
                        <p className="text-base text-stone-600">Encene uma peça curta sobre o resgate de um animal e a importância da adoção responsável.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-brand-google-yellow mt-2 shrink-0" />
                      <div>
                        <span className="font-black">Livros e Cartazes:</span>
                        <p className="text-base text-stone-600">Crie pequenos livros de histórias e espalhe cartazes informativos com leis e contatos de denúncia pela escola.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'denuncia' && (
            <motion.div 
              key="denuncia"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              <div className="lg:col-span-2 bg-brand-gray-light p-8 md:p-12 border border-brand-gray-medium">
                <h3 className="text-3xl font-black mb-12 text-brand-dark">Como Denunciar</h3>
                <div className="space-y-8">
                  {[
                    { n: 1, t: "Reúna Provas", d: "Fotos, vídeos e relatos de testemunhas são fundamentais." },
                    { n: 2, t: "Identifique o Local", d: "Anote o endereço exato e pontos de referência." },
                    { n: 3, t: "Escolha o Canal", d: "Ligue 190 (Polícia Militar) ou use a Delegacia Eletrônica (DEPA)." }
                  ].map((item) => (
                    <div key={item.n} className="flex gap-6">
                      <div className="w-10 h-10 bg-brand-dark text-white flex items-center justify-center shrink-0 font-black text-lg">{item.n}</div>
                      <div>
                        <h4 className="text-xl font-black mb-1 text-brand-dark">{item.t}</h4>
                        <p className="text-stone-600 text-lg font-medium">{item.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div className="p-8 bg-brand-dark text-white">
                  <h4 className="text-lg font-black mb-6 text-brand-google-yellow uppercase tracking-widest">Telefones</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-white/10 pb-2">
                      <span className="text-sm font-bold text-white/60">PM</span>
                      <span className="text-2xl font-black text-brand-google-yellow">190</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/10 pb-2">
                      <span className="text-sm font-bold text-white/60">DISQUE</span>
                      <span className="text-2xl font-black text-brand-google-yellow">181</span>
                    </div>
                  </div>
                </div>
                <div className="p-8 bg-brand-google-yellow text-brand-dark">
                  <h4 className="text-lg font-black mb-2 uppercase tracking-widest">Anônimo</h4>
                  <p className="text-base font-bold">Você não precisa se identificar para salvar uma vida.</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const NewsSection = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    geminiService.getNews().then(data => {
      setNews(data);
      setLoading(false);
    });
  }, []);

  return (
    <section id="news" className="py-20 bg-white border-y border-brand-gray-medium">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-12 bg-brand-cnn-red flex items-center justify-center text-white">
            <Radio size={24} className="animate-pulse" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-brand-dark">
            RADAR <span className="text-brand-cnn-red">PET</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-brand-gray-medium">
          {loading ? (
            Array(6).fill(0).map((_, i) => (
              <div key={i} className="h-64 bg-brand-gray-light animate-pulse border-r border-b border-brand-gray-medium" />
            ))
          ) : (
            news.map((item, i) => (
              <motion.a
                key={i}
                href={item.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="p-8 border-r border-b border-brand-gray-medium hover:bg-brand-gray-light transition-colors group cursor-pointer block"
              >
                <div className="text-xs font-black text-brand-cnn-red uppercase tracking-widest mb-4">
                  {item.date} • {item.source}
                </div>
                <h3 className="text-2xl font-black mb-4 leading-tight group-hover:underline decoration-brand-cnn-red decoration-2 underline-offset-4">
                  {item.title}
                </h3>
                <p className="text-stone-600 text-base leading-relaxed line-clamp-3 font-medium">
                  {item.summary}
                </p>
                {item.url && (
                  <div className="mt-6 flex items-center gap-1 text-xs font-black text-brand-cnn-red uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    Ler reportagem completa <ArrowRight size={14} />
                  </div>
                )}
              </motion.a>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

const Storybook = () => {
  const [story, setStory] = useState<Story | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [audio, setAudio] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const loadStory = async () => {
    setLoading(true);
    setStory(null);
    setImage(null);
    setAudio(null);
    try {
      const newStory = await geminiService.generateStory();
      setStory(newStory);
      
      const [imgUrl, audioData] = await Promise.all([
        geminiService.generateIllustration(newStory.illustrationPrompt),
        geminiService.generateAudio(newStory.content)
      ]);
      
      setImage(imgUrl || null);
      setAudio(audioData || null);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStory();
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <section id="storybook" className="py-20 bg-brand-gray-light border-b border-brand-gray-medium">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-12 bg-brand-google-blue flex items-center justify-center text-white">
            <BookOpen size={24} />
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-brand-dark">
            PET'S <span className="text-brand-google-blue">STORYBOOK</span>
          </h2>
        </div>

        <div className="bg-white border border-brand-gray-medium p-8 md:p-12 shadow-sm">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="w-12 h-12 border-4 border-brand-google-blue border-t-transparent rounded-full animate-spin mb-6" />
                <h3 className="text-2xl font-black mb-2">Gerando História...</h3>
                <p className="text-stone-500 font-medium">Aguarde enquanto a IA cria uma nova aventura.</p>
              </motion.div>
            ) : story ? (
              <motion.div 
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
              >
                <div className="order-2 lg:order-1">
                  <h3 className="text-3xl md:text-4xl font-black mb-8 leading-tight text-brand-dark">
                    {story.title}
                  </h3>
                  <div className="text-lg text-stone-600 leading-relaxed mb-10 font-medium space-y-4">
                    {story.content.split('\n').map((p, i) => <p key={i}>{p}</p>)}
                  </div>
                  
                  <div className="flex flex-wrap gap-4 items-center">
                    {audio && (
                      <button 
                        onClick={toggleAudio}
                        className="flex items-center gap-2 px-6 py-3 bg-brand-google-blue text-white font-black text-sm uppercase tracking-widest hover:bg-blue-600 transition-colors"
                      >
                        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                        {isPlaying ? "Pausar" : "Ouvir"}
                        <audio 
                          ref={audioRef} 
                          src={`data:audio/mp3;base64,${audio}`} 
                          onEnded={() => setIsPlaying(false)}
                        />
                      </button>
                    )}
                    <button 
                      onClick={loadStory}
                      className="px-6 py-3 bg-white border border-brand-gray-medium text-brand-dark font-black text-sm uppercase tracking-widest hover:bg-brand-gray-light transition-colors"
                    >
                      Nova História
                    </button>
                  </div>
                </div>
                
                <div className="order-1 lg:order-2">
                  <div className="aspect-square bg-brand-gray-light border border-brand-gray-medium overflow-hidden">
                    {image ? (
                      <img 
                        src={image} 
                        alt={story.title} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Sparkles className="text-brand-gray-medium animate-pulse" size={48} />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const CopyrightPage = () => (
  <div className="pt-32 pb-20 px-4 bg-brand-gray-light min-h-screen">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-5xl mx-auto"
    >
      <div className="bg-white p-8 md:p-16 border border-brand-gray-medium shadow-sm">
        <div className="w-12 h-1 bg-brand-cnn-red mb-8" />
        <h1 className="text-5xl md:text-7xl font-black mb-12 leading-none text-brand-dark tracking-tighter">
          Direitos & Atualizações
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <section>
            <h2 className="text-2xl font-black mb-6 text-brand-cnn-red uppercase tracking-widest">
              Direitos Autorais
            </h2>
            <div className="space-y-4 text-lg text-stone-600 leading-relaxed font-medium">
              <p>
                Todo o conteúdo textual e visual deste site é de propriedade intelectual de <span className="text-brand-dark font-black">Michel Lucas F. Nascimento</span> ou gerado via IA sob sua curadoria.
              </p>
              <p className="p-4 bg-brand-gray-light border-l-4 border-brand-cnn-red italic">
                "O uso educacional é encorajado, desde que a fonte seja citada."
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black mb-6 text-brand-google-blue uppercase tracking-widest">
              Boas Práticas
            </h2>
            <ul className="space-y-3">
              {[
                "Respeito mútuo em todos os canais",
                "Verificação antes de compartilhar",
                "Uso responsável das ferramentas de IA",
                "Foco total no bem-estar animal"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-base font-bold text-stone-700">
                  <div className="w-2 h-2 bg-brand-google-blue" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-20 pt-12 border-t border-brand-gray-medium">
          <h2 className="text-3xl font-black mb-10 text-brand-dark">Futuras Atualizações</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "Comunidade", desc: "Espaço para compartilhar histórias de resgate.", color: "border-brand-google-blue" },
              { title: "Mapa de Apoio", desc: "Clínicas populares e abrigos parceiros.", color: "border-brand-google-red" },
              { title: "Gamificação", desc: "Conquistas para alunos protetores.", color: "border-brand-google-yellow" },
              { title: "Podcast Pet", desc: "Entrevistas com especialistas.", color: "border-brand-google-green" }
            ].map((item, i) => (
              <div key={i} className={cn("p-6 border-l-4 bg-brand-gray-light", item.color)}>
                <h4 className="text-lg font-black mb-1">{item.title}</h4>
                <p className="text-stone-600 font-medium text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  </div>
);

const Footer = () => (
  <footer className="py-12 bg-brand-dark text-white">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-6 h-6 bg-brand-cnn-red" />
            <span className="text-xl font-black tracking-tighter">Pet é top</span>
          </div>
          <p className="text-stone-400 max-w-sm text-base font-medium">
            Educando corações e mentes para um mundo onde todo animal seja respeitado e amado.
          </p>
        </div>
        <div className="flex md:justify-end gap-6">
          <div className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-brand-cnn-red transition-colors cursor-pointer">
            <Heart size={18} />
          </div>
          <div className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-brand-google-blue transition-colors cursor-pointer">
            <Radio size={18} />
          </div>
          <div className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-brand-google-yellow hover:text-brand-dark transition-colors cursor-pointer">
            <ShieldAlert size={18} />
          </div>
        </div>
      </div>
      <div className="pt-8 border-t border-white/10 text-stone-500 font-bold uppercase tracking-widest text-[10px] flex flex-col md:flex-row justify-between gap-4">
        <span>© {new Date().getFullYear()} Pet é top. Todos os direitos reservados à Michel Lucas F. Nascimento</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Termos</a>
          <a href="#" className="hover:text-white transition-colors">Privacidade</a>
          <a href="#" className="hover:text-white transition-colors">Contato</a>
        </div>
      </div>
    </div>
  </footer>
);

// --- Main App ---

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="min-h-screen">
      <Navbar onNavigate={setCurrentPage} />
      
      <AnimatePresence mode="wait">
        {currentPage === 'home' ? (
          <motion.main 
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Hero />
            <AwarenessSection />
            <PracticalSolutions />
            <NewsSection />
            <Storybook />
          </motion.main>
        ) : (
          <motion.main 
            key="copyright"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <CopyrightPage />
          </motion.main>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
