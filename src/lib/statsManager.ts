interface Stats {
  totalDonated: string;
  activeMembers: number;
  volunteers: number;
  partnerships: number;
  totalBeneficiaries: number;
  totalCost: number;
  projectCount: number;
  timespan: string;
}

export const getStats = async (): Promise<Stats> => {
  try {
    const response = await fetch('/stats-template.csv');
    if (!response.ok) {
      console.log('CSV file not found, using default stats');
      return getFallbackStats();
    }
    
    const csvContent = await response.text();
    
    // Check if we got HTML instead of CSV (common when CSV file doesn't exist)
    if (csvContent.includes('<!doctype html>') || csvContent.includes('<html')) {
      console.log('Got HTML instead of CSV, using default stats');
      return getFallbackStats();
    }
    
    const lines = csvContent.split('\n');
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    
    if (lines.length < 2) {
      return getFallbackStats();
    }
    
    const values = parseCSVLine(lines[1]);
    
    const stats: Stats = {
      totalDonated: values[0] || "300,000 €",
      activeMembers: parseInt(values[1]) || 10,
      volunteers: parseInt(values[2]) || 10,
      partnerships: parseInt(values[3]) || 1,
      totalBeneficiaries: parseInt(values[4]) || 2972,
      totalCost: parseInt(values[5]) || 300000,
      projectCount: parseInt(values[6]) || 7,
      timespan: values[7] || "2011-2024"
    };
    
    return stats;
  } catch (error) {
    console.log('Error loading stats CSV, using default stats:', error);
    return getFallbackStats();
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

const getFallbackStats = (): Stats => ({
  totalDonated: "300,000 €",
  activeMembers: 10,
  volunteers: 10,
  partnerships: 1,
  totalBeneficiaries: 2972,
  totalCost: 300000,
  projectCount: 7,
  timespan: "2011-2024"
});