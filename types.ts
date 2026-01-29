
export interface CarModel {
  id: string;
  name: string;
  engines: EngineOption[];
}

export interface EngineOption {
  id: string;
  name: string;
  viscosity: string;
  capacityWithFilter: string;
  capacityWithoutFilter: string;
  apiGrade: string;
  tips?: string | string[]; 
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  models: CarModel[];
}

// New type for the Maintenance Log feature
export interface MaintenanceLog {
  id: string;
  date: string; // Stored as ISO string, but displayed as Jalali
  kilometer: number;
  services: string[];
  notes?: string;
}
