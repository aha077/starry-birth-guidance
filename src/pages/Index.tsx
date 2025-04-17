
import { useState } from "react";
import { StarField } from "../components/StarField";
import { BirthDateForm } from "../components/BirthDateForm";
import { ZodiacCard } from "../components/ZodiacCard";
import { CompatibilityChart } from "../components/CompatibilityChart";
import { ForecastCard } from "../components/ForecastCard";
import { getZodiacSign, ZodiacSign } from "../utils/zodiacUtils";
import { generateForecast, generateCoupleForecast, Forecast } from "../utils/forecastUtils";
import { Moon, Sparkles, Star } from "lucide-react";

const Index = () => {
  const [person1Sign, setPerson1Sign] = useState<ZodiacSign | null>(null);
  const [person2Sign, setPerson2Sign] = useState<ZodiacSign | null>(null);
  const [forecast, setForecast] = useState<Forecast | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [isCoupleMode, setIsCoupleMode] = useState(false);
  
  const handleCalculate = (date1: Date, date2: Date | null) => {
    // Get zodiac signs
    const sign1 = getZodiacSign(date1.getMonth() + 1, date1.getDate());
    setPerson1Sign(sign1);
    
    const isCouple = !!date2;
    setIsCoupleMode(isCouple);
    
    if (isCouple && date2) {
      const sign2 = getZodiacSign(date2.getMonth() + 1, date2.getDate());
      setPerson2Sign(sign2);
      setForecast(generateCoupleForecast(sign1, sign2));
    } else {
      setPerson2Sign(null);
      setForecast(generateForecast(sign1));
    }
    
    setShowResults(true);
  };
  
  return (
    <div className="min-h-screen pb-12">
      {/* Background Effects */}
      <StarField />
      
      {/* Header */}
      <header className="pt-12 pb-6 px-4 text-center">
        <div className="inline-flex items-center gap-2 mb-2">
          <Star className="h-6 w-6 text-primary" />
          <h1 className="text-3xl md:text-4xl font-display">Астрологический прогноз</h1>
          <Star className="h-6 w-6 text-primary" />
        </div>
        <p className="max-w-md mx-auto text-sm text-muted-foreground">
          Узнайте свой гороскоп и совместимость с партнером на основе астрологии
        </p>
      </header>
      
      <main className="container px-4 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Form Section */}
          <section className="md:col-span-1">
            <BirthDateForm onCalculate={handleCalculate} />
            
            {/* Decorative Elements */}
            <div className="relative hidden md:block mt-6">
              <div className="absolute -left-12 top-8 glow-animation">
                <Moon className="h-12 w-12 opacity-40 text-indigo-300" />
              </div>
              <div className="absolute right-6 top-20 float-animation">
                <Sparkles className="h-8 w-8 opacity-40 text-amber-300" />
              </div>
            </div>
          </section>
          
          {/* Results Section */}
          {showResults && person1Sign && forecast && (
            <section className="md:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Person 1 Zodiac */}
                <ZodiacCard sign={person1Sign} />
                
                {/* Person 2 Zodiac (if couple) */}
                {isCoupleMode && person2Sign && <ZodiacCard sign={person2Sign} />}
                
                {/* Compatibility (if couple) */}
                {isCoupleMode && person2Sign && (
                  <div className="col-span-1 md:col-span-2">
                    <CompatibilityChart sign1={person1Sign} sign2={person2Sign} />
                  </div>
                )}
              </div>
              
              {/* Forecast */}
              <ForecastCard 
                forecast={forecast} 
                title={isCoupleMode ? "Прогноз для пары" : "Ваш прогноз"} 
              />
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
