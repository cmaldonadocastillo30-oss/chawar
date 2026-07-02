import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Heart,
  MapPin,
  Phone,
  MessageCircle,
  Dog,
  Cat,
  Home as HomeIcon,
  Footprints,
  Sparkles,
  ShieldCheck,
  Clock,
  Send,
  Star,
  Quote,
} from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const PHONE_RAW = "722641477";
const PHONE_DISPLAY = "722 64 14 77";
const WHATSAPP_MESSAGE = "Hola Cristina, me gustaria consultarte sobre el cuidado de mi mascota.";
const WHATSAPP_URL = `https://wa.me/34${PHONE_RAW}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
const HERO_IMG =
  "https://customer-assets.emergentagent.com/job_furry-friends-care-20/artifacts/ihhavp3p_WhatsApp%20Image%202026-06-30%20at%2010.14.33%20AM.jpeg";
const ABOUT_IMG =
  "https://customer-assets.emergentagent.com/job_furry-friends-care-20/artifacts/wfksxte4_WhatsApp%20Image%202026-07-01%20at%2012.54.01%20PM%20%282%29.jpeg";
const WALK_IMG =
  "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=80";
const HOME_IMG =
  "https://images.unsplash.com/photo-1546377791-2e01b4449bf0?auto=format&fit=crop&w=1200&q=80";

const NavLink = ({ href, children, testId }) => (
  <a
    href={href}
    data-testid={testId}
    className="text-sm font-semibold text-[#3D405B]/80 hover:text-[#E07A5F] transition-colors"
  >
    {children}
  </a>
);

const SectionTitle = ({ eyebrow, title, subtitle, align = "center" }) => (
  <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
    {eyebrow && (
      <span className="font-handwriting text-[#E07A5F] text-3xl md:text-4xl inline-block -rotate-2">
        {eyebrow}
      </span>
    )}
    <h2 className="font-heading font-extrabold text-3xl md:text-5xl leading-tight mt-2 text-[#3D405B]">
      {title}
    </h2>
    {subtitle && (
      <p className="mt-4 text-[#686D8B] text-base md:text-lg leading-relaxed">
        {subtitle}
      </p>
    )}
  </div>
);

const SEED_REVIEWS = [
  {
    id: "seed-1",
    name: "Lucía G.",
    pet: "Con Nala, labradora de 4 años",
    rating: 5,
    text:
      "Cristina cuidó de Nala una semana entera mientras estábamos fuera. Nos mandaba fotos y vídeos todos los días, y cuando volvimos Nala estaba feliz y súper tranquila. Se nota que le encantan los animales.",
  },
  {
    id: "seed-2",
    name: "Javier M.",
    pet: "Con Simba, gato persa",
    rating: 5,
    text:
      "Necesitaba a alguien de confianza para las visitas a casa y con Simba (que es tímido) fue todo un acierto. En dos días ya se dejaba mimar. Muy responsable y siempre puntual.",
  },
  {
    id: "seed-3",
    name: "María y Pablo",
    pet: "Con Trufa y Coco",
    rating: 5,
    text:
      "Los paseos con Cristina son otra cosa. Vuelven cansados, contentos y sin tirones. Además nos escribe para contarnos cómo ha ido. La recomendamos totalmente.",
  },
  {
    id: "seed-4",
    name: "Elena R.",
    pet: "Con Milo, cachorro de border",
    rating: 5,
    text:
      "Milo es un torbellino y Cristina tiene una paciencia enorme. Nos ayudó con las rutinas de paseo cuando yo trabajaba muchas horas. 10/10.",
  },
];

const Landing = () => {
  const [reviews, setReviews] = useState([]);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [rForm, setRForm] = useState({ name: "", pet: "", rating: 5, text: "" });
  const [rSubmitting, setRSubmitting] = useState(false);

  const loadReviews = async () => {
    try {
      const { data } = await axios.get(`${API}/reviews`);
      setReviews(Array.isArray(data) ? data : []);
    } catch (e) {
      // Silent: seed reviews still show
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const submitReview = async (e) => {
    e.preventDefault();
    if (!rForm.name.trim() || !rForm.text.trim() || rForm.text.trim().length < 10) {
      toast.error("Escribe tu nombre y una reseña de al menos 10 caracteres.");
      return;
    }
    setRSubmitting(true);
    try {
      await axios.post(`${API}/reviews`, {
        name: rForm.name.trim(),
        pet: rForm.pet.trim() || null,
        rating: Number(rForm.rating) || 5,
        text: rForm.text.trim(),
      });
      toast.success("¡Gracias por tu reseña! Ya aparece en la web 🐾");
      setRForm({ name: "", pet: "", rating: 5, text: "" });
      setReviewOpen(false);
      loadReviews();
    } catch (err) {
      const detail =
        err?.response?.data?.detail || "No se pudo enviar la reseña.";
      toast.error(typeof detail === "string" ? detail : "Error al enviar.");
    } finally {
      setRSubmitting(false);
    }
  };

  const allReviews = [
    ...reviews.map((r) => ({
      id: r.id,
      name: r.name,
      pet: r.pet || "",
      rating: r.rating || 5,
      text: r.text,
    })),
    ...SEED_REVIEWS,
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#3D405B]">
      {/* Header */}
      <header
        data-testid="site-header"
        className="sticky top-0 z-50 bg-[#FAF7F2]/85 backdrop-blur-md border-b border-[#E8E1D5]/60"
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <a href="#top" data-testid="brand-link" className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-full bg-[#E07A5F] text-white grid place-items-center shadow-sm">
              <Heart size={18} fill="white" />
            </span>
            <span className="font-heading font-extrabold text-lg tracking-tight">
              Cristina <span className="text-[#E07A5F]">PetCare</span>
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-8">
            <NavLink href="#servicios" testId="nav-services-link">Servicios</NavLink>
            <NavLink href="#sobre-mi" testId="nav-about-link">Sobre mí</NavLink>
            <NavLink href="#zona" testId="nav-zone-link">Zona</NavLink>
            <NavLink href="#resenas" testId="nav-reviews-link">Reseñas</NavLink>
            <NavLink href="#contacto" testId="nav-contact-link">Contacto</NavLink>
          </nav>
          <a
            data-testid="header-whatsapp-btn"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-[#81B29A] hover:bg-[#6D9A83] text-white text-sm font-bold px-4 py-2.5 rounded-full shadow-sm transition-all active:scale-95"
          >
            <MessageCircle size={16} />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden">
        <div className="absolute inset-0 paw-pattern pointer-events-none" aria-hidden />
        <div className="max-w-6xl mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-20 md:pb-32 grid md:grid-cols-2 gap-12 md:gap-16 items-center relative">
          <div className="animate-fade-up">
            <span className="font-handwriting text-[#E07A5F] text-3xl md:text-4xl inline-block -rotate-2">
              ¡Como si fueran míos!
            </span>
            <h1
              data-testid="hero-title"
              className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mt-2 text-[#3D405B]"
            >
              Cuidado y cariño para tus mascotas en{" "}
              <span className="text-[#E07A5F]">Granada</span>.
            </h1>
            <p className="mt-6 text-base md:text-lg text-[#686D8B] leading-relaxed max-w-lg">
              Soy Cristina, tengo 21 años y llevo más de{" "}
              <b className="text-[#3D405B]">15 años</b> conviviendo con animales:
              3 perros y 1 gato en casa. Ofrezco cuidado a domicilio y paseos con
              atención personalizada.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                data-testid="hero-whatsapp-btn"
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#E07A5F] hover:bg-[#D1664A] text-white font-bold px-6 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all active:scale-95"
              >
                <MessageCircle size={18} />
                Escríbeme por WhatsApp
              </a>
              <a
                data-testid="hero-contact-link"
                href="#contacto"
                className="inline-flex items-center gap-2 border-2 border-[#3D405B]/15 hover:border-[#E07A5F] text-[#3D405B] font-bold px-6 py-3.5 rounded-full transition-all"
              >
                Ver servicios
              </a>
            </div>

            <div className="mt-10 flex items-center gap-6 text-sm text-[#686D8B]">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-[#81B29A]" />
                <span>Persona de confianza</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-[#81B29A]" />
                <span>Flexible en horarios</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-[#F2CC8F]/60 blur-2xl" aria-hidden />
            <div className="absolute -bottom-6 -right-8 w-40 h-40 rounded-full bg-[#81B29A]/30 blur-3xl" aria-hidden />
            <img
              data-testid="hero-image"
              src={HERO_IMG}
              alt="Cristina cuidando a un perro"
              className="relative w-full h-[420px] md:h-[540px] object-cover object-top blob-shape shadow-xl animate-floaty"
            />
            <div className="absolute -bottom-4 left-4 md:left-8 bg-white rounded-2xl shadow-lg border border-[#E8E1D5] px-4 py-3 flex items-center gap-3">
              <div className="flex -space-x-2">
                <span className="w-9 h-9 rounded-full bg-[#E07A5F]/15 grid place-items-center border-2 border-white">
                  <Dog size={16} className="text-[#E07A5F]" />
                </span>
                <span className="w-9 h-9 rounded-full bg-[#81B29A]/15 grid place-items-center border-2 border-white">
                  <Cat size={16} className="text-[#81B29A]" />
                </span>
              </div>
              <div>
                <p className="font-heading font-extrabold text-sm leading-none">15+ años</p>
                <p className="text-xs text-[#686D8B] mt-1">con animales</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="sobre-mi" className="py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="order-2 md:order-1 relative">
            <img
              data-testid="about-image"
              src={ABOUT_IMG}
              alt="Cristina con su gato en brazos"
              className="w-full h-[380px] md:h-[480px] object-cover object-top blob-shape-2 shadow-xl"
            />
            <div className="absolute -top-4 -right-4 bg-[#F2CC8F] text-[#3D405B] font-heading font-extrabold px-4 py-2 rounded-full shadow-md rotate-3">
              🐾 A tu ritmo
            </div>
          </div>
          <div className="order-1 md:order-2">
            <SectionTitle
              align="left"
              eyebrow="Sobre mí"
              title="Hola, soy Cristina. Cuidar animales es lo que más me llena."
              subtitle="Vivo en Cúllar Vega (El Ventorillo) con mis 3 perros y mi gato. Desde pequeña he estado rodeada de animales y sé lo importante que es dejar a tu mascota en manos de alguien de confianza. Cada rutina, cada mimo y cada paseo se hacen con cariño de verdad."
            />
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { icon: <Dog size={22} className="text-[#E07A5F]" />, num: "3", label: "perros" },
                { icon: <Cat size={22} className="text-[#81B29A]" />, num: "1", label: "gato" },
                { icon: <Heart size={22} className="text-[#E07A5F]" />, num: "15+", label: "años" },
              ].map((s, i) => (
                <div
                  key={i}
                  data-testid={`about-stat-${i}`}
                  className="bg-white rounded-2xl p-5 border border-[#E8E1D5] shadow-sm text-center"
                >
                  <div className="w-10 h-10 rounded-full bg-[#FDF6ED] mx-auto grid place-items-center">
                    {s.icon}
                  </div>
                  <p className="font-heading font-black text-2xl mt-3">{s.num}</p>
                  <p className="text-xs text-[#686D8B] uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="servicios" className="py-20 md:py-32 bg-[#FDF6ED]">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <SectionTitle
            eyebrow="Mis servicios"
            title="Cuidados hechos con mimo"
            subtitle="Servicios pensados para que tu mascota esté tranquila y feliz cuando tú no puedas estar."
          />

          <div className="mt-14 grid md:grid-cols-2 gap-8 md:gap-10">
            {/* Home care */}
            <article
              data-testid="service-home-card"
              className="bg-white rounded-[2rem] overflow-hidden border border-[#E8E1D5]/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-transform"
            >
              <div className="h-56 overflow-hidden">
                <img src={HOME_IMG} alt="Cuidado a domicilio" className="w-full h-full object-cover" />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-[#E07A5F]/15 grid place-items-center">
                    <HomeIcon size={18} className="text-[#E07A5F]" />
                  </span>
                  <h3 className="font-heading font-extrabold text-2xl">Cuidado a domicilio</h3>
                </div>
                <p className="mt-4 text-[#686D8B] leading-relaxed">
                  Visito a tu peludo en su hogar: comida, agua, mimos, juegos y limpieza
                  de arenero o zonas. Mantengo su rutina para que esté tranquilo y feliz.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-[#3D405B]/80">
                  <li className="flex items-center gap-2"><Sparkles size={14} className="text-[#81B29A]" /> Alimentación e hidratación</li>
                  <li className="flex items-center gap-2"><Sparkles size={14} className="text-[#81B29A]" /> Compañía y juego</li>
                  <li className="flex items-center gap-2"><Sparkles size={14} className="text-[#81B29A]" /> Fotos y mensajes durante la visita</li>
                </ul>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-sm bg-[#F2CC8F]/50 text-[#3D405B] font-semibold px-3 py-1.5 rounded-full">
                    Precio: a consultar
                  </span>
                  <a
                    data-testid="service-home-cta"
                    href="#contacto"
                    className="inline-flex items-center gap-2 text-[#E07A5F] font-bold hover:underline"
                  >
                    Reservar <Send size={14} />
                  </a>
                </div>
              </div>
            </article>

            {/* Dog walking */}
            <article
              data-testid="service-walk-card"
              className="bg-white rounded-[2rem] overflow-hidden border border-[#E8E1D5]/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-transform"
            >
              <div className="h-56 overflow-hidden">
                <img src={WALK_IMG} alt="Paseo de perros" className="w-full h-full object-cover" />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-[#81B29A]/20 grid place-items-center">
                    <Footprints size={18} className="text-[#81B29A]" />
                  </span>
                  <h3 className="font-heading font-extrabold text-2xl">Paseo de perros</h3>
                </div>
                <p className="mt-4 text-[#686D8B] leading-relaxed">
                  Paseos adaptados al carácter y energía de tu perro. Salidas tranquilas o
                  más activas: lo importante es que disfrute y vuelva feliz a casa.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-[#3D405B]/80">
                  <li className="flex items-center gap-2"><Sparkles size={14} className="text-[#E07A5F]" /> Paseos individuales</li>
                  <li className="flex items-center gap-2"><Sparkles size={14} className="text-[#E07A5F]" /> Ritmo adaptado a la edad</li>
                  <li className="flex items-center gap-2"><Sparkles size={14} className="text-[#E07A5F]" /> Refuerzo positivo</li>
                </ul>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-sm bg-[#F2CC8F]/50 text-[#3D405B] font-semibold px-3 py-1.5 rounded-full">
                    Precio: a consultar
                  </span>
                  <a
                    data-testid="service-walk-cta"
                    href="#contacto"
                    className="inline-flex items-center gap-2 text-[#E07A5F] font-bold hover:underline"
                  >
                    Reservar <Send size={14} />
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section id="zona" className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <span className="font-handwriting text-[#E07A5F] text-3xl md:text-4xl inline-block -rotate-2">
            ¿Dónde llego?
          </span>
          <div className="mt-4 mx-auto w-16 h-16 rounded-full bg-[#FDF6ED] grid place-items-center">
            <MapPin size={28} className="text-[#E07A5F]" />
          </div>
          <h2 className="font-heading font-extrabold text-3xl md:text-5xl mt-4">
            Cúllar Vega y toda Granada
          </h2>
          <p className="mt-4 text-[#686D8B] text-base md:text-lg leading-relaxed">
            Vivo en <b className="text-[#3D405B]">Cúllar Vega (El Ventorillo)</b>,
            pero me desplazo por toda Granada sin problema. Cuéntame dónde estás y
            organizamos las visitas o paseos.
          </p>

          <div className="mt-10 grid sm:grid-cols-3 gap-4">
            {["Cúllar Vega", "Granada capital", "Zona metropolitana"].map((z) => (
              <div
                key={z}
                data-testid={`zone-${z}`}
                className="bg-white border border-[#E8E1D5] rounded-2xl px-5 py-4 font-semibold text-[#3D405B] shadow-sm"
              >
                {z}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="resenas" className="py-20 md:py-32 bg-[#FDF6ED]">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <SectionTitle
            eyebrow="Lo que dicen"
            title="Familias que ya confían en mí"
            subtitle="Estas son algunas experiencias de familias con las que he compartido paseos y visitas. Poco a poco iré añadiendo más."
          />

          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {allReviews.map((r, i) => (
              <article
                key={r.id || i}
                data-testid={`review-card-${i}`}
                className="bg-white rounded-[1.75rem] p-7 md:p-8 border border-[#E8E1D5]/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-transform flex flex-col"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: r.rating }).map((_, s) => (
                      <Star key={s} size={16} className="text-[#E07A5F] fill-[#E07A5F]" />
                    ))}
                  </div>
                  <Quote size={22} className="text-[#F2CC8F]" />
                </div>
                <p className="mt-4 text-[#3D405B]/90 leading-relaxed">
                  “{r.text}”
                </p>
                <div className="mt-6 pt-5 border-t border-[#E8E1D5] flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-[#E07A5F]/15 grid place-items-center font-heading font-black text-[#E07A5F]">
                    {r.name.charAt(0).toUpperCase()}
                  </span>
                  <div>
                    <p className="font-heading font-extrabold text-sm">{r.name}</p>
                    {r.pet && <p className="text-xs text-[#686D8B]">{r.pet}</p>}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center gap-3">
            <Button
              data-testid="open-review-dialog-btn"
              onClick={() => setReviewOpen(true)}
              className="h-12 px-8 rounded-full bg-[#E07A5F] hover:bg-[#D1664A] text-white font-bold shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              <Star size={16} className="mr-2 fill-white" />
              Deja tu reseña
            </Button>
            <p className="text-xs text-[#686D8B]">
              ¿Ya has confiado en mí? Comparte tu experiencia con otras familias.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contacto" className="py-20 md:py-32 bg-[#FDF6ED]/70">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <SectionTitle
            eyebrow="Hablemos"
            title="¿Nos ponemos en contacto?"
            subtitle="La forma más rápida es WhatsApp. También puedes llamarme directamente. Te contestaré lo antes posible."
          />

          <div className="mt-14 grid md:grid-cols-2 gap-6">
            <a
              data-testid="contact-whatsapp-card"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="group block bg-[#81B29A] hover:bg-[#6D9A83] text-white rounded-[1.75rem] p-8 shadow-md hover:shadow-xl transition-all active:scale-[0.99]"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-white/20 grid place-items-center group-hover:bg-white/30 transition-colors">
                  <MessageCircle size={26} />
                </div>
                <div>
                  <p className="text-white/85 text-sm font-semibold uppercase tracking-wider">WhatsApp</p>
                  <p className="font-heading font-extrabold text-2xl">{PHONE_DISPLAY}</p>
                </div>
              </div>
              <p className="mt-5 text-sm text-white/90">
                Toca aquí para abrir una conversación conmigo directamente.
              </p>
            </a>

            <a
              data-testid="contact-phone-card"
              href={`tel:+34${PHONE_RAW}`}
              className="group block bg-white rounded-[1.75rem] p-8 border border-[#E8E1D5] shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#E07A5F]/15 grid place-items-center group-hover:bg-[#E07A5F]/25 transition-colors">
                  <Phone size={26} className="text-[#E07A5F]" />
                </div>
                <div>
                  <p className="text-[#686D8B] text-sm font-semibold uppercase tracking-wider">Llámame</p>
                  <p className="font-heading font-extrabold text-2xl text-[#3D405B]">{PHONE_DISPLAY}</p>
                </div>
              </div>
              <p className="mt-5 text-sm text-[#686D8B]">
                Si lo prefieres, hablamos por teléfono sin compromiso.
              </p>
            </a>
          </div>

          <div className="mt-6 bg-white rounded-[1.75rem] p-6 border border-[#E8E1D5] shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#F2CC8F]/50 grid place-items-center shrink-0">
              <MapPin size={22} className="text-[#E07A5F]" />
            </div>
            <div>
              <p className="text-[#686D8B] text-sm font-semibold uppercase tracking-wider">Ubicación</p>
              <p className="font-heading font-extrabold text-lg text-[#3D405B]">
                Cúllar Vega · Me desplazo por toda Granada
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#3D405B] text-white/85 py-12">
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-3 gap-8 items-start">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-full bg-[#E07A5F] grid place-items-center">
                <Heart size={16} fill="white" />
              </span>
              <span className="font-heading font-extrabold text-lg text-white">
                Cristina PetCare
              </span>
            </div>
            <p className="mt-4 text-sm text-white/70 leading-relaxed">
              Cuidado personal y con cariño para tus mascotas en Granada.
              Cada peludo es único, y así lo trato.
            </p>
          </div>
          <div>
            <p className="font-heading font-extrabold text-white mb-3">Contacto</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={14} /> {PHONE_DISPLAY}
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} /> Cúllar Vega · Granada
              </li>
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  data-testid="footer-whatsapp-link"
                  className="inline-flex items-center gap-2 text-white hover:text-[#F2CC8F] transition-colors"
                >
                  <MessageCircle size={14} /> Escríbeme por WhatsApp
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-heading font-extrabold text-white mb-3">Explorar</p>
            <ul className="space-y-2 text-sm">
              <li><a href="#servicios" className="hover:text-[#F2CC8F]">Servicios</a></li>
              <li><a href="#sobre-mi" className="hover:text-[#F2CC8F]">Sobre mí</a></li>
              <li><a href="#zona" className="hover:text-[#F2CC8F]">Zona de cobertura</a></li>
              <li><a href="#resenas" className="hover:text-[#F2CC8F]">Reseñas</a></li>
              <li><a href="#contacto" className="hover:text-[#F2CC8F]">Contacto</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 md:px-12 mt-10 pt-6 border-t border-white/10 text-xs text-white/50 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} Cristina PetCare · Hecho con cariño 🐾</p>
          <p>Cúllar Vega · Granada</p>
        </div>
      </footer>

      {/* Review dialog */}
      <Dialog open={reviewOpen} onOpenChange={setReviewOpen}>
        <DialogContent
          data-testid="review-dialog"
          className="sm:max-w-lg rounded-[1.75rem] border-[#E8E1D5] bg-white"
        >
          <DialogHeader>
            <DialogTitle className="font-heading font-extrabold text-2xl text-[#3D405B]">
              Deja tu reseña
            </DialogTitle>
            <DialogDescription className="text-[#686D8B]">
              Cuéntanos tu experiencia con Cristina. Se publicará al momento en la web.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={submitReview} className="space-y-4 mt-2">
            <div>
              <Label className="font-semibold text-[#3D405B]">Puntuación</Label>
              <div
                className="mt-2 flex items-center gap-1"
                data-testid="review-rating"
                role="radiogroup"
                aria-label="Puntuación"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    data-testid={`review-star-${n}`}
                    aria-label={`${n} estrella${n > 1 ? "s" : ""}`}
                    aria-checked={rForm.rating === n}
                    role="radio"
                    onClick={() => setRForm((p) => ({ ...p, rating: n }))}
                    className="p-1 transition-transform hover:scale-110 active:scale-95"
                  >
                    <Star
                      size={30}
                      className={
                        n <= rForm.rating
                          ? "text-[#E07A5F] fill-[#E07A5F]"
                          : "text-[#E8E1D5]"
                      }
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="rname" className="font-semibold text-[#3D405B]">
                  Tu nombre
                </Label>
                <Input
                  id="rname"
                  data-testid="review-name"
                  value={rForm.name}
                  onChange={(e) => setRForm((p) => ({ ...p, name: e.target.value }))}
                  placeholder="Ej. Lucía G."
                  maxLength={80}
                  className="mt-2 h-11 rounded-2xl border-[#E8E1D5] focus-visible:ring-[#E07A5F]/40 bg-[#FAF7F2]"
                />
              </div>
              <div>
                <Label htmlFor="rpet" className="font-semibold text-[#3D405B]">
                  Tu mascota <span className="text-[#686D8B] font-normal">(opcional)</span>
                </Label>
                <Input
                  id="rpet"
                  data-testid="review-pet"
                  value={rForm.pet}
                  onChange={(e) => setRForm((p) => ({ ...p, pet: e.target.value }))}
                  placeholder="Ej. Con Nala, labradora"
                  maxLength={120}
                  className="mt-2 h-11 rounded-2xl border-[#E8E1D5] focus-visible:ring-[#E07A5F]/40 bg-[#FAF7F2]"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="rtext" className="font-semibold text-[#3D405B]">
                Tu reseña
              </Label>
              <Textarea
                id="rtext"
                data-testid="review-text"
                value={rForm.text}
                onChange={(e) => setRForm((p) => ({ ...p, text: e.target.value }))}
                placeholder="Cuéntanos cómo fue tu experiencia..."
                rows={5}
                maxLength={800}
                className="mt-2 rounded-2xl border-[#E8E1D5] focus-visible:ring-[#E07A5F]/40 bg-[#FAF7F2]"
              />
              <p className="text-xs text-[#686D8B] mt-1">
                {rForm.text.length}/800 · mínimo 10 caracteres
              </p>
            </div>

            <DialogFooter className="gap-2 sm:gap-2">
              <Button
                type="button"
                variant="outline"
                data-testid="review-cancel-btn"
                onClick={() => setReviewOpen(false)}
                className="h-11 rounded-full border-[#E8E1D5]"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                data-testid="review-submit-btn"
                disabled={rSubmitting}
                className="h-11 px-6 rounded-full bg-[#E07A5F] hover:bg-[#D1664A] text-white font-bold shadow-md hover:shadow-lg transition-all active:scale-95"
              >
                <Send size={14} className="mr-2" />
                {rSubmitting ? "Publicando..." : "Publicar reseña"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Landing;
