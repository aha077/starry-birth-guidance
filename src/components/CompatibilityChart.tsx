
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { ZodiacSign } from "../utils/zodiacUtils";
import { CompatibilityScore, getCompatibilityScore } from "../utils/compatibilityUtils";

interface CompatibilityChartProps {
  sign1: ZodiacSign;
  sign2: ZodiacSign;
}

export function CompatibilityChart({ sign1, sign2 }: CompatibilityChartProps) {
  const compatibility: CompatibilityScore = getCompatibilityScore(sign1, sign2);

  const getTypeColorClass = (type: string): string => {
    switch (type) {
      case 'excellent': return 'text-emerald-400';
      case 'good': return 'text-sky-400';
      case 'neutral': return 'text-amber-400';
      case 'challenging': return 'text-rose-400';
      default: return '';
    }
  };

  const getProgressColor = (score: number): string => {
    if (score >= 5) return 'bg-emerald-500';
    if (score >= 4) return 'bg-sky-500';
    if (score >= 3) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  const typeColorClass = getTypeColorClass(compatibility.type);

  return (
    <Card className="cosmic-card">
      <CardHeader className="pb-2">
        <CardTitle className="font-display text-xl">Совместимость</CardTitle>
        <CardDescription>
          <span className={`font-medium ${typeColorClass}`}>
            {compatibility.type === 'excellent' && 'Отличная'}
            {compatibility.type === 'good' && 'Хорошая'}
            {compatibility.type === 'neutral' && 'Нейтральная'}
            {compatibility.type === 'challenging' && 'Сложная'}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{compatibility.description}</p>
        
        <div className="space-y-3">
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Общая</span>
              <span>{compatibility.overall}/5</span>
            </div>
            <Progress value={compatibility.overall * 20} className={`h-2 ${getProgressColor(compatibility.overall)}`} />
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Романтика</span>
              <span>{compatibility.romance}/5</span>
            </div>
            <Progress value={compatibility.romance * 20} className={`h-2 ${getProgressColor(compatibility.romance)}`} />
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Дружба</span>
              <span>{compatibility.friendship}/5</span>
            </div>
            <Progress value={compatibility.friendship * 20} className={`h-2 ${getProgressColor(compatibility.friendship)}`} />
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Коммуникация</span>
              <span>{compatibility.communication}/5</span>
            </div>
            <Progress value={compatibility.communication * 20} className={`h-2 ${getProgressColor(compatibility.communication)}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
