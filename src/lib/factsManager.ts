export interface WarFact {
  id: string;
  date: string;
  event: string;
  location: string;
  category: string;
  victims: string;
  perpetrator: string;
  details: string;
  sources: string;
}

const parseCSVLine = (line: string): string[] => {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
};

const parseFactsFromCSV = (csvContent: string): WarFact[] => {
  const lines = csvContent.split('\n').filter(line => line.trim());
  const facts: WarFact[] = [];
  
  // Skip header row
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    
    if (values.length >= 8) {
      facts.push({
        id: `fact-${i}`,
        date: values[0] || '',
        event: values[1] || '',
        location: values[2] || '',
        category: values[3] || '',
        victims: values[4] || '',
        perpetrator: values[5] || '',
        details: values[6] || '',
        sources: values[7] || ''
      });
    }
  }
  
  return facts;
};

export interface YearGroup {
  year: string;
  facts: WarFact[];
  summary: {
    totalEvents: number;
    categories: string[];
    victimInfo: string;
  };
}

export const loadWarFacts = async (): Promise<WarFact[]> => {
  try {
    const response = await fetch('/syria_facts_2011-2024.csv');
    
    if (!response.ok) {
      console.error('Failed to load war facts CSV');
      return [];
    }
    
    const csvContent = await response.text();
    return parseFactsFromCSV(csvContent);
  } catch (error) {
    console.error('Error loading war facts:', error);
    return [];
  }
};

export const groupFactsByYear = (facts: WarFact[]): YearGroup[] => {
  const yearMap = new Map<string, WarFact[]>();
  
  facts.forEach(fact => {
    const year = fact.date.split('-')[0] || fact.date.substring(0, 4);
    if (!yearMap.has(year)) {
      yearMap.set(year, []);
    }
    yearMap.get(year)?.push(fact);
  });
  
  const yearGroups: YearGroup[] = Array.from(yearMap.entries()).map(([year, facts]) => {
    const categories = [...new Set(facts.map(f => f.category).filter(Boolean))];
    
    return {
      year,
      facts: facts.sort((a, b) => b.date.localeCompare(a.date)),
      summary: {
        totalEvents: facts.length,
        categories,
        victimInfo: facts.filter(f => f.victims).length > 0 
          ? `${facts.filter(f => f.victims).length} dokumentierte Vorfälle mit Opfern`
          : ''
      }
    };
  });
  
  return yearGroups.sort((a, b) => b.year.localeCompare(a.year));
};
