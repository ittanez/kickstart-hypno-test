
export interface TestResultRequest {
  email: string;
  score: number;
  category: string;
  description: string;
  senseDominant: string;
  timestamp: number;
}

export interface EmailResponse {
  status: string;
  message: string;
  data?: any;
  error?: string;
  score?: number;
  category?: string;
  description?: string;
  debug?: any;
}
