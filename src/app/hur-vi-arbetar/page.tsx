export default function HurViArbetarPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Hur vi arbetar</h1>
        <p className="text-lg mb-4">
          På denna sida granskar vi aktuella nyheter och rykten med hjälp av modern AI-teknik och noggrann faktakontroll. Vårt mål är att ge dig som läsare en tydlig och opartisk bild av vad som är sant, falskt eller osäkert i nyhetsflödet.
        </p>
        <ul className="list-disc pl-6 mb-4 text-base text-gray-800">
          <li className="mb-2">Vi samlar in nyheter och rykten från flera välkända svenska nyhetskällor via öppna RSS-flöden.</li>
          <li className="mb-2">Varje artikel analyseras av AI, som söker efter information om ämnet i andra oberoende källor.</li>
          <li className="mb-2">AI:n sammanfattar vad som är känt om ämnet och bedömer om nyheten/ryktet är faktamässigt korrekt, överdrivet eller saknar stöd.</li>
          <li className="mb-2">Varje artikel får en tydlig faktakoll-procentsats (1–100%) som visar hur sann eller osann AI:n bedömer att informationen är.</li>
          <li className="mb-2">Innan en artikel publiceras på startsidan granskas den av en mänsklig redaktör.</li>
        </ul>
        <p className="text-base text-gray-700 mb-2">
          Vi strävar efter att alltid ange källor och att vara transparenta med vår metod. Vår ambition är att hjälpa dig som läsare att snabbt förstå vad som är bekräftat, vad som är rykten och vad som kan vara missvisande i nyhetsflödet.
        </p>
        <p className="text-base text-gray-700">
          Om du har frågor eller synpunkter på vårt arbete är du alltid välkommen att kontakta oss.
        </p>
      </div>
    </div>
  );
} 