
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
  tips?: string | string[]; // Changed to allow array of strings for multiple tips
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  models: CarModel[];
}

export interface OilRecommendation {
  viscosity: string;
  capacity: string;
  api: string;
  additionalInfo?: string;
}
