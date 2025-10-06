import { Heart, Users, Zap, GraduationCap, LucideIcon } from "lucide-react";

export interface Project {
  id: string;
  category: string;
  title: string;
  description: string;
  type: 'humanitarian' | 'major';
  goal: number;
  raised: number;
  progress: number;
  icon: LucideIcon;
  image: string;
  imageSource?: string;
  stats?: Array<{
    number: string;
    label: string;
  }>;
}

// Icon mapping for CSV data
const iconMap: Record<string, LucideIcon> = {
  Heart: Heart,
  Users: Users,
  Zap: Zap,
  GraduationCap: GraduationCap,
};

// Helper function to parse CSV line with proper quote handling
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

// Parse CSV data into projects
export function parseProjectsFromCSV(csvContent: string): Project[] {
  const lines = csvContent.trim().split('\n');
  const headers = parseCSVLine(lines[0]);
  
  return lines.slice(1).map(line => {
    const values = parseCSVLine(line);
    const project: any = {};
    
    headers.forEach((header, index) => {
      project[header] = values[index];
    });
    
    // Process stats if they exist
    const stats = [];
    if (project.stats1_number && project.stats1_label) {
      stats.push({ number: project.stats1_number, label: project.stats1_label });
    }
    if (project.stats2_number && project.stats2_label) {
      stats.push({ number: project.stats2_number, label: project.stats2_label });
    }
    if (project.stats3_number && project.stats3_label) {
      stats.push({ number: project.stats3_number, label: project.stats3_label });
    }
    
    return {
      id: project.id,
      category: project.category,
      title: project.title,
      description: project.description,
      type: project.type as 'humanitarian' | 'major',
      goal: parseInt(project.goal) || 0,
      raised: parseInt(project.raised) || 0,
      progress: parseInt(project.progress) || 0,
      icon: iconMap[project.icon] || Heart,
      image: project.image,
      imageSource: project.imageSource,
      stats: stats.length > 0 ? stats : undefined,
    };
  });
}

// Default projects (fallback when CSV is not available)
export const defaultProjects: Project[] = [
  {
    id: "patenschaft",
    category: "Humanitär",
    title: "Waisenkind Patenschaft - Ein Jahr Essen und Bildung",
    description: "Finanzierung von Lebensunterhalt und Bildungskosten eines Waisenkindes in Syrien. Durch direkte Kommunikation mit unseren lokalen Partnern können wir für maximale Transparenz sorgen und sicherstellen, das das Geld an die richtigen Stellen kommt.",
    type: "humanitarian",
    goal: 0,
    raised: 0,
    progress: 0,
    icon: Heart,
    image: "/images/children.jpg"
  },
  {
    id: "gehalt",
    category: "Humanitär", 
    title: "Monatsgehalt an Familie in Not schenken",
    description: "JA! Tatsächlich sind die Gehälter in Syrien sehr niedrig, trotz neulicher Erhöhung seit Dezember 2024. Die Waren und Grundnahrungsmittel aber nicht. Mit einer Summe <100 € können Sie eine Familie in Not für einen Monat enorm unterstützen.",
    type: "humanitarian",
    goal: 0,
    raised: 0,
    progress: 0,
    icon: Heart,
    image: "/images/gehalt.jpg"
  },
  {
    id: "brunnen",
    category: "Humanitär",
    title: "Anschaffung Trinkwasserbrunnen für Dorf",
    description: "Anschaffung und Installation eines Trinkwasserbrunnens für ein kleines Dorf, besonders wichtig für die extreme Hitze aufgrund vom Klimawandel und Mangel an Trinkmöglichkeiten in Syrien.",
    type: "humanitarian",
    goal: 0,
    raised: 0,
    progress: 0,
    icon: Users,
    image: "/images/water.jpg"
  },
  {
    id: "solar",
    category: "Energie & Bildung",
    title: "Der El-Asafir Gemeinschaftsinfrastruktur",
    description: "250 kW Solarsystem für ländliche Schule und Gemeinschaft. 10.000+ Menschen erhalten stabile Elektrizität.",
    type: "major",
    goal: 0,
    raised: 0,
    progress: 0,
    icon: Zap,
    image: "/images/pv-sys.jpg",
    stats: [
      { number: "10.000", label: "Menschen mit Strom versorgen" },
      { number: "500+", label: "Schüler mit Strom versorgen" },
      { number: ">50", label: "landwirtschaftliche Betriebe mit Strom versorgen" }
    ]
  },
  {
    id: "hospital",
    category: "Gesundheit",
    title: "Douma National Hospital Renovierung",
    description: "Wiederaufbau eines Krankenhauses für 1 Million Patienten jährlich. Medizinische Geräte und Solarsystem inklusive.",
    type: "major",
    goal: 0,
    raised: 0,
    progress: 0,
    icon: Heart,
    image: "/images/douma-hospital-after.jpg",
    stats: [
      { number: "1 Mio+", label: "Patienten/Jahr" },
      { number: "100%", label: "Notwendig" },
      { number: "100%", label: "Nachhaltig" }
    ]
  },
  {
    id: "schools",
    category: "Bildung",
    title: "Renovierung von 5 Schulen in Douma",
    description: "Sanierung von 5 Schulen für 3.000+ Schüler mit modernen Klassenzimmern und sicheren Standards.",
    type: "major",
    goal: 0,  
    raised: 0,
    progress: 0,
    icon: GraduationCap,
    image: "/images/schule.jpg",
    stats: [
      { number: "3000+", label: "Schüler" },
      { number: "5", label: "Schulen" },
      { number: "100%", label: "Zukunftssicher" }
    ]
  }
];

// Load projects from CSV or return defaults
export async function loadProjects(language: string = 'de'): Promise<Project[]> {
  try {
    const csvFile = language === 'de' ? '/projects-template.csv' : `/projects-template-${language}.csv`;
    const response = await fetch(csvFile);
    if (!response.ok) {
      console.log(`CSV file ${csvFile} not found, using default projects`);
      return defaultProjects;
    }
    const csvContent = await response.text();
    return parseProjectsFromCSV(csvContent);
  } catch (error) {
    console.log(`Error loading CSV ${language}, using default projects:`, error);
    return defaultProjects;
  }
}