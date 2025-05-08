import Link from "next/link";
import NewsCard from "../components/NewsCard";

const mockNews = [
  {
    id: 1,
    title: "Nya riktlinjer för elbilar i Sverige",
    summary: "Regeringen har presenterat nya riktlinjer för elbilar som påverkar både konsumenter och tillverkare.",
    status: "AI-granskad, väntar på mänsklig godkännande",
    image: "/news1.jpg",
    date: "2024-06-10"
  },
  {
    id: 2,
    title: "Rykte: Skolorna kan öppna tidigare efter sommaren",
    summary: "Ett rykte sprids om att skolorna kan komma att öppna redan i början av augusti.",
    status: "AI-granskad, väntar på mänsklig godkännande",
    image: "/news2.jpg",
    date: "2024-06-09"
  },
  {
    id: 3,
    title: "Ny forskning: Svenskarna äter mer vegetariskt",
    summary: "En ny undersökning visar att svenskarnas intresse för vegetarisk mat har ökat markant under de senaste åren.",
    status: "AI-granskad, väntar på mänsklig godkännande",
    image: "/news3.jpg",
    date: "2024-06-08"
  },
  {
    id: 4,
    title: "Digitaliseringen av sjukvården fortsätter",
    summary: "Region Stockholm presenterar nya digitala tjänster för att förbättra vårdkontakten.",
    status: "AI-granskad, väntar på mänsklig godkännande",
    image: "/news4.jpg",
    date: "2024-06-07"
  },
  {
    id: 5,
    title: "Ny kulturfestival planeras i Göteborg",
    summary: "Göteborgs stad presenterar planer på en ny årlig kulturfestival som ska locka både lokala och internationella besökare.",
    status: "AI-granskad, väntar på mänsklig godkännande",
    image: "/news5.jpg",
    date: "2024-06-06"
  }
];

export default function Home() {
  const [featured, ...rest] = mockNews;
  return (
    <div className="min-h-screen bg-white text-gray-900 px-4 py-8 flex flex-col">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Aktuella nyheter & rykten</h1>
        <span className="rounded-full bg-purple-100 text-purple-700 px-4 py-1 text-sm font-medium">Svenska</span>
      </header>
      {/* Featured Article */}
      <Link href={`/article/${featured.id}`} className="group block max-w-4xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-xl p-6 md:p-8 transition-transform hover:scale-[1.02] hover:shadow-2xl border border-purple-100">
          <div className="flex-shrink-0 w-full md:w-72 h-48 md:h-56 bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center mb-4 md:mb-0 md:mr-8">
            <img src={featured.image} alt="" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
          </div>
          <div className="flex flex-col justify-between flex-1">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-2 text-gray-900 group-hover:text-purple-700 transition-colors">{featured.title}</h2>
            <p className="text-base md:text-lg text-gray-700 mb-2 line-clamp-4 md:line-clamp-6">{featured.summary}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-gray-400">{featured.date}</span>
              <span className="text-xs rounded-full bg-purple-50 text-purple-700 px-3 py-1 font-medium w-fit">{featured.status}</span>
            </div>
          </div>
        </div>
      </Link>
      {/* Grid of Other Articles */}
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto w-full">
        {rest.map((news) => (
          <Link key={news.id} href={`/article/${news.id}`} className="block h-full">
            <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col h-full border border-gray-100 hover:shadow-lg hover:border-purple-200 transition space-y-4">
              <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
                <img src={news.image} alt="" className="object-cover w-full h-full" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{news.title}</h3>
              <span className="block text-xs text-gray-400">{news.date}</span>
            </div>
          </Link>
        ))}
      </main>
    </div>
  );
}
