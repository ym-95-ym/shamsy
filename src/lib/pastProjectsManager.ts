interface PastProject {
  id: number;
  title: string;
  category: string;
  location: string;
  year: string;
  description: string;
  beneficiaries: string;
  challenges: string;
  impact: string;
  status: string;
  image: string;
  imageSource?: string;
}

export const getPastProjects = async (language: string = 'de'): Promise<PastProject[]> => {
  try {
    const csvFile = language === 'de' ? '/past-projects-template.csv' : `/past-projects-template-${language}.csv`;
    const response = await fetch(csvFile);
    if (!response.ok) {
      console.log(`CSV file ${csvFile} not found, using default past projects`);
      return getFallbackPastProjects();
    }
    const csvContent = await response.text();
    
    // Check if we got HTML instead of CSV (common when CSV file doesn't exist)
    if (csvContent.includes('<!doctype html>') || csvContent.includes('<html')) {
      console.log('Got HTML instead of CSV, using default past projects');
      return getFallbackPastProjects();
    }
    
    const lines = csvContent.split('\n');
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    
    const projects: PastProject[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      const values = parseCSVLine(line);
      if (values.length >= headers.length) {
        const project: PastProject = {
          id: parseInt(values[0]) || i,
          title: values[1] || '',
          category: values[2] || '',
          location: values[3] || '',
          year: values[4] || '',
          description: values[5] || '',
          beneficiaries: values[6] || '',
          challenges: values[7] || '',
          impact: values[8] || '',
          status: values[9] || '',
          image: values[10] || '/images/help.jpg',
          imageSource: values[11] || ''
        };
        projects.push(project);
      }
    }
    
    return projects.length > 0 ? projects : getFallbackPastProjects();
  } catch (error) {
    console.log(`Error loading past projects CSV ${language}, using default projects:`, error);
    return getFallbackPastProjects();
  }
};

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

const getFallbackPastProjects = (): PastProject[] => [
  {
    id: 1,
    title: "Schulen renoviert und ausgestattet",
    category: "Bildung",
    location: "Der El-Asafir, Rural Damaskus",
    year: "2022-2024",
    description: "Die Wiedereröffnung einer kriegsbeschädigten Schule wurde durch die Mobilisierung von Freiwilligen, die Reparatur der Infrastruktur und die Wiederherstellung sicherer Lernräume ermöglicht. Gemeinsam gaben wir Kindern ihre Zukunft zurück – einen Ort, an dem Hoffnung und Bildung wieder gedeihen können.",
    beneficiaries: "400 Schüler",
    challenges: "Beschaffung von Materialien, Transport in unsichere Gebiete, Koordination mit lokalen Partnern unter Geheimhaltung",
    impact: "Bessere Lernbedingungen für eine ganze Generation",
    status: "Erfolgreich abgeschlossen",
    image: "/images/kindergruppe.jpg"
  },
  {
    id: 2,
    title: "15 Notunterkünfte gebaut",
    category: "Unterkünfte",
    location: "Eastern Ghouta",
    year: "2011-2024",
    description: "15 widerstandsfähige Unterkünfte wurden für Familien errichtet, die durch den Krieg im ländlichen Damaskus ihr Zuhause verloren haben – von der Planung über den Bau bis hin zur vollständigen Ausstattung. Gemeinsam mit unseren lokalen Partner NGOs sorgte unser transparentes Auswahlverfahren dafür, dass die Hilfe die Familien erreichte, die sie am dringendsten benötigten.",
    beneficiaries: "120 Familien",
    challenges: "Materialtransport unter Kriegsbedingungen, Sicherheit der Bauteams, Geheimhaltung vor dem Regime",
    impact: "Über 500 Menschen erhielten sicheren Wohnraum",
    status: "Erfolgreich abgeschlossen",
    image: "/images/hero-destruction.jpg"
  },
  {
    id: 3,
    title: "Medizinische Operationen ermöglicht",
    category: "Gesundheit",
    location: "Verschiedene Krankenhäuser",
    year: "2011-2024",
    description: "Lebensverändernde Operationen und medizinische Eingriffe für bedürftige Patienten und Kinder wurden finanziert und koordiniert – einschließlich der Bereitstellung von spezialisierten Hörgeräten für Kriegsbetroffene. Gemeinsam schenkten wir Menschen ihre Gesundheit und Lebensqualität zurück, die durch den Krieg verloren gegangen waren.",
    beneficiaries: "Menschen in Not",
    challenges: "Suche nach bedürftigen Patienten in Kriegszeiten, Koordination mit Ärzten und Krankenhäuser, Anschaffung medizinischer Geräte",
    impact: "Menschenleben gerettet, Neue Möglichkeiten geschaffen",
    status: "Erfolgreich abgeschlossen",
    image: "/images/operation.jpg"
  },
  {
    id: 4,
    title: "Essen und Kleidung für alle",
    category: "Humanitär",
    location: "Damascus und Umgebung",
    year: "2011-2024",
    description: "Winterhilfe, Kleidung und Nahrungsmittel erreichten vertriebene Familien, während Jugendliche und Frauen durch IT- und Sprachworkshops neue Perspektiven erhielten. Gemeinsam schafften wir nicht nur Überlebenshilfe, sondern auch Wege in eine selbstbestimmte Zukunft.",
    beneficiaries: "Menschen die mit Nichts fliehen mussten, Kinder, Frauen",
    challenges: "Materialtransport unter Kriegsbedingungen und von Deutschland nach Syrien, Geheimhaltung vor dem Regime",
    impact: "Überlebenssicherung und neue Perspektiven",
    status: "laufend",
    image: "/images/kindergruppe.jpg"
  },
  {
    id: 5,
    title: "Medikamente bereitgestellt",
    category: "Humanitär",
    location: "Damascus und Umgebung",
    year: "2011-2024",
    description: "Beschaffung und Lieferung von Medikamenten und kritischen Diagnostikgeräten zur Verbesserung der Notfall- und Spezialversorgung. Sichere Lieferung und Schulung des Krankenhauspersonals in Douma wurden gewährleistet – damit lebensrettende Hilfe dort ankommt, wo sie am dringendsten gebraucht wird.",
    beneficiaries: "Menschen in Not und Kriegsbetroffene",
    challenges: "Materialtransport unter Kriegsbedingungen und von Deutschland nach Syrien, Geheimhaltung vor dem Regime",
    impact: "Lebensrettende medizinische Versorgung sichergestellt",
    status: "Erfolgreich abgeschlossen",
    image: "/images/help.jpg"
  }
];