
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, User, Users } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface BirthDateFormProps {
  onCalculate: (date1: Date, date2: Date | null) => void;
}

export function BirthDateForm({ onCalculate }: BirthDateFormProps) {
  const [isCoupleMode, setIsCoupleMode] = useState(false);
  const [person1Date, setPerson1Date] = useState<Date | undefined>(undefined);
  const [person2Date, setPerson2Date] = useState<Date | undefined>(undefined);
  const [person1Name, setPerson1Name] = useState("");
  const [person2Name, setPerson2Name] = useState("");

  const handleCalculate = () => {
    if (!person1Date) return;
    onCalculate(person1Date, isCoupleMode && person2Date ? person2Date : null);
  };

  return (
    <Card className="cosmic-card">
      <CardHeader>
        <CardTitle className="font-display text-xl">Узнать свой гороскоп</CardTitle>
        <CardDescription>
          Введите даты рождения для получения астрологического прогноза
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {!isCoupleMode ? <User size={18} /> : <Users size={18} />}
            <span>{!isCoupleMode ? "Индивидуальный" : "Для пары"}</span>
          </div>
          <Switch 
            checked={isCoupleMode} 
            onCheckedChange={setIsCoupleMode} 
          />
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>
              {isCoupleMode ? "Имя первого человека (опционально)" : "Ваше имя (опционально)"}
            </Label>
            <Input 
              placeholder={isCoupleMode ? "Александр" : "Ваше имя"} 
              value={person1Name}
              onChange={(e) => setPerson1Name(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label>
              {isCoupleMode ? "Дата рождения первого человека" : "Ваша дата рождения"}
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {person1Date ? (
                    format(person1Date, "dd.MM.yyyy")
                  ) : (
                    <span>Выберите дату</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={person1Date}
                  onSelect={setPerson1Date}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          {isCoupleMode && (
            <>
              <div className="space-y-2">
                <Label>Имя второго человека (опционально)</Label>
                <Input 
                  placeholder="Анна" 
                  value={person2Name}
                  onChange={(e) => setPerson2Name(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Дата рождения второго человека</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {person2Date ? (
                        format(person2Date, "dd.MM.yyyy")
                      ) : (
                        <span>Выберите дату</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={person2Date}
                      onSelect={setPerson2Date}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleCalculate}
          disabled={!person1Date || (isCoupleMode && !person2Date)}
        >
          Рассчитать
        </Button>
      </CardFooter>
    </Card>
  );
}
