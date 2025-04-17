
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { ZodiacSign } from "../utils/zodiacUtils";
import { getElementColorClass } from "../utils/zodiacUtils";

interface ZodiacCardProps {
  sign: ZodiacSign;
}

export function ZodiacCard({ sign }: ZodiacCardProps) {
  const elementColorClass = getElementColorClass(sign);
  
  return (
    <Card className="cosmic-card overflow-hidden">
      <div className={`h-2 ${elementColorClass} w-full`} />
      <CardHeader className="pt-4">
        <div className="flex items-center justify-between">
          <CardTitle className="font-display text-xl">{sign.name}</CardTitle>
          <span className="zodiac-icon">{sign.symbol}</span>
        </div>
        <CardDescription>
          {sign.dates}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Стихия:</span>
            <span className="font-medium">{sign.element}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Планета:</span>
            <span className="font-medium">{sign.planet}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        {sign.traits.map((trait, index) => (
          <span 
            key={index} 
            className="inline-block px-2 py-1 text-xs bg-muted/50 rounded-full"
          >
            {trait}
          </span>
        ))}
      </CardFooter>
    </Card>
  );
}
