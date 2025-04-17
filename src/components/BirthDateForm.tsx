
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, User, Users } from "lucide-react";
import { format, parse, isValid } from "date-fns";
import { cn } from "@/lib/utils";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface BirthDateFormProps {
  onCalculate: (date1: Date, date2: Date | null) => void;
}

export function BirthDateForm({ onCalculate }: BirthDateFormProps) {
  const [isCoupleMode, setIsCoupleMode] = useState(false);
  const [person1Date, setPerson1Date] = useState<Date | undefined>(undefined);
  const [person2Date, setPerson2Date] = useState<Date | undefined>(undefined);
  const [person1Name, setPerson1Name] = useState("");
  const [person2Name, setPerson2Name] = useState("");
  const [person1DateInput, setPerson1DateInput] = useState("");
  const [person2DateInput, setPerson2DateInput] = useState("");
  const [person1CalendarOpen, setPerson1CalendarOpen] = useState(false);
  const [person2CalendarOpen, setPerson2CalendarOpen] = useState(false);

  const handleCalculate = () => {
    if (!person1Date) return;
    onCalculate(person1Date, isCoupleMode && person2Date ? person2Date : null);
  };

  const parseDate = (dateString: string): Date | undefined => {
    if (!dateString) return undefined;
    
    // Try parsing in format DD.MM.YYYY
    const parsed = parse(dateString, "dd.MM.yyyy", new Date());
    if (isValid(parsed)) return parsed;
    
    // If first format fails, try alternative formats
    const formats = ["dd/MM/yyyy", "yyyy-MM-dd", "MM/dd/yyyy"];
    
    for (const fmt of formats) {
      const attemptParse = parse(dateString, fmt, new Date());
      if (isValid(attemptParse)) return attemptParse;
    }
    
    return undefined;
  };

  const handlePerson1DateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPerson1DateInput(value);
    
    const parsedDate = parseDate(value);
    if (parsedDate) {
      setPerson1Date(parsedDate);
    }
  };

  const handlePerson2DateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPerson2DateInput(value);
    
    const parsedDate = parseDate(value);
    if (parsedDate) {
      setPerson2Date(parsedDate);
    }
  };

  const updatePerson1Date = (date: Date | undefined) => {
    setPerson1Date(date);
    if (date) {
      setPerson1DateInput(format(date, "dd.MM.yyyy"));
    }
    setPerson1CalendarOpen(false);
  };

  const updatePerson2Date = (date: Date | undefined) => {
    setPerson2Date(date);
    if (date) {
      setPerson2DateInput(format(date, "dd.MM.yyyy"));
    }
    setPerson2CalendarOpen(false);
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
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  placeholder="дд.мм.гггг"
                  value={person1DateInput}
                  onChange={handlePerson1DateInput}
                />
              </div>
              <Popover open={person1CalendarOpen} onOpenChange={setPerson1CalendarOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="px-2">
                    <CalendarIcon className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={person1Date}
                    onSelect={updatePerson1Date}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
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
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      placeholder="дд.мм.гггг"
                      value={person2DateInput}
                      onChange={handlePerson2DateInput}
                    />
                  </div>
                  <Popover open={person2CalendarOpen} onOpenChange={setPerson2CalendarOpen}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="px-2">
                        <CalendarIcon className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <Calendar
                        mode="single"
                        selected={person2Date}
                        onSelect={updatePerson2Date}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
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
