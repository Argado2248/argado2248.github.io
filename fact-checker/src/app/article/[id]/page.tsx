import { notFound } from "next/navigation";

const mockNews = [
  {
    id: 1,
    title: "Nya riktlinjer för elbilar i Sverige",
    summary: "Regeringen har presenterat nya riktlinjer för elbilar som påverkar både konsumenter och tillverkare.",
    content: "De nya riktlinjerna innebär bland annat ökade subventioner för elbilar, krav på laddinfrastruktur och nya miljömål för tillverkare. Flera experter har kommenterat att detta kan påskynda omställningen till eldrivna fordon i Sverige. Analysen visar att detta kan leda till en ökning av elbilsförsäljningen med upp till 40% under de kommande två åren. Miljöorganisationer har välkomnat beslutet men efterlyser ytterligare åtgärder för att nå klimatmålen.",
    status: "AI-granskad, väntar på mänsklig godkännande",
    image: "/news1.jpg",
    date: "2024-06-10"
  },
  {
    id: 2,
    title: "Rykte: Skolorna kan öppna tidigare efter sommaren",
    summary: "Ett rykte sprids om att skolorna kan komma att öppna redan i början av augusti.",
    content: "Enligt obekräftade källor diskuteras det inom utbildningsdepartementet om att tidigarelägga skolstarten för att kompensera för förlorad undervisningstid. Inget officiellt beslut har dock fattats ännu. Föräldrar och lärare är delade i frågan, där vissa ser det som en möjlighet att kompensera för pandemins påverkan medan andra oroar sig för elevernas sommarlov. Skolans rektor har uttalat sig om att de behöver minst fyra veckors förberedelse om beslutet fattas.",
    status: "AI-granskad, väntar på mänsklig godkännande",
    image: "/news2.jpg",
    date: "2024-06-09"
  },
  {
    id: 3,
    title: "Ny forskning: Svenskarna äter mer vegetariskt",
    summary: "En ny undersökning visar att svenskarnas intresse för vegetarisk mat har ökat markant under de senaste åren.",
    content: "En omfattande undersökning från Livsmedelsverket visar att över 30% av svenskarna nu äter vegetarisk mat minst en gång i veckan. Detta är en ökning med 15% jämfört med förra året. Trenden är särskilt tydlig bland unga vuxna, där nästan hälften regelbundet väljer vegetariska alternativ. Restaurangbranschen har svarat på trenden genom att utöka sina vegetariska menyer, och flera nya vegetariska restauranger har öppnat i de större städerna. Miljöexperter ser detta som en positiv utveckling för klimatmålen.",
    status: "AI-granskad, väntar på mänsklig godkännande",
    image: "/news3.jpg",
    date: "2024-06-08"
  },
  {
    id: 4,
    title: "Digitaliseringen av sjukvården fortsätter",
    summary: "Region Stockholm presenterar nya digitala tjänster för att förbättra vårdkontakten.",
    content: "Region Stockholm har lanserat en ny digital plattform som ska göra det enklare för patienter att boka tider och kommunicera med vårdpersonal. Systemet, som har utvecklats under de senaste två åren, inkluderar funktioner för videomöten, digitala journaler och automatiska påminnelser. Trots initiala tekniska problem har systemet nu börjat användas av över 100 vårdcentraler i regionen. Patientorganisationer har välkomnat initiativet men efterlyser bättre stöd för äldre och digitalt utsatta grupper. En utvärdering kommer att genomföras efter sex månaders drift.",
    status: "AI-granskad, väntar på mänsklig godkännande",
    image: "/news4.jpg",
    date: "2024-06-07"
  },
  {
    id: 5,
    title: "Ny kulturfestival planeras i Göteborg",
    summary: "Göteborgs stad presenterar planer på en ny årlig kulturfestival som ska locka både lokala och internationella besökare.",
    content: "Den nya festivalen, som planeras att hållas i augusti 2025, kommer att omfatta musik, konst, teater och gastronomi. Arrangörerna räknar med att locka över 100 000 besökare under festivalens tio dagar. Flera kända artister och konstnärer har redan bekräftat sitt deltagande. Festivalen kommer att spridas över flera platser i centrala Göteborg, med fokus på att visa upp stadens unika kulturarv och moderna utveckling. Lokala företagare ser möjligheter i den förväntade besökarströmmen, men vissa invånare har uttryckt oro över eventuella störningar i vardagslivet.",
    status: "AI-granskad, väntar på mänsklig godkännande",
    image: "/news5.jpg",
    date: "2024-06-06"
  }
];

export default function ArticlePage({ params }: { params: { id: string } }) {
  const article = mockNews.find((n) => n.id === Number(params.id));
  if (!article) return notFound();

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-8 mt-8">
      <div className="flex flex-col sm:flex-row gap-6 mb-6">
        <div className="flex-shrink-0 w-full sm:w-56 h-40 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
          <img src={article.image} alt="" className="object-cover w-full h-full" />
        </div>
        <div className="flex flex-col justify-between flex-1">
          <h1 className="text-2xl font-bold mb-2">{article.title}</h1>
          <span className="text-xs text-gray-400 mb-2">{article.date}</span>
          <span className="text-xs rounded-full bg-purple-50 text-purple-700 px-3 py-1 font-medium mb-2 w-fit">{article.status}</span>
        </div>
      </div>
      <p className="text-gray-700 text-lg leading-relaxed mb-4">{article.summary}</p>
      <div className="text-gray-800 text-base leading-relaxed whitespace-pre-line">
        {article.content}
      </div>
    </div>
  );
} 