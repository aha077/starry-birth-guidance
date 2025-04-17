
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Forecast } from "../utils/forecastUtils";

interface ForecastCardProps {
  forecast: Forecast;
  title: string;
}

export function ForecastCard({ forecast, title }: ForecastCardProps) {
  return (
    <Card className="cosmic-card">
      <CardHeader>
        <CardTitle className="font-display text-xl">{title}</CardTitle>
        <CardDescription>
          Прогноз и рекомендации
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="daily" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="daily">Сегодня</TabsTrigger>
            <TabsTrigger value="weekly">На неделю</TabsTrigger>
          </TabsList>
          
          <TabsContent value="daily" className="pt-4 space-y-4">
            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-medium text-primary mb-2">Общее</h3>
                <p className="text-sm">{forecast.daily.general}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-primary mb-2">Любовь</h3>
                <p className="text-sm">{forecast.daily.love}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-primary mb-2">Карьера</h3>
                <p className="text-sm">{forecast.daily.career}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-primary mb-2">Здоровье</h3>
                <p className="text-sm">{forecast.daily.health}</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="weekly" className="pt-4 space-y-4">
            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-medium text-primary mb-2">Общее на неделю</h3>
                <p className="text-sm">{forecast.weekly.general}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-primary mb-2">Любовь</h3>
                <p className="text-sm">{forecast.weekly.love}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-primary mb-2">Карьера</h3>
                <p className="text-sm">{forecast.weekly.career}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-primary mb-2">Здоровье</h3>
                <p className="text-sm">{forecast.weekly.health}</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 p-3 bg-secondary/30 rounded-lg">
          <h3 className="text-sm font-medium mb-2">Счастливые числа и цвета</h3>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="text-xs text-muted-foreground">Числа:</span>
              <p className="font-medium">{forecast.lucky.numbers.join(', ')}</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">День:</span>
              <p className="font-medium">{forecast.lucky.day}</p>
            </div>
            <div className="col-span-2">
              <span className="text-xs text-muted-foreground">Цвет:</span>
              <p className="font-medium">{forecast.lucky.color}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
