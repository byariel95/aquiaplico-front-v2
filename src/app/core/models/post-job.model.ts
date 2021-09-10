export interface jobModel {
  title: string;
  industry: string;
  departament: string;
  description: string;
  remotly: boolean;
  recurrent: boolean;
  benefits: string;
  companyId: string;
  status?: boolean;
  location: locationModel;
  jobDetails: jobDetailsModel;
}

export interface locationModel {
  address: string;
}

export interface jobDetailsModel {
  skills: string[];
  salary: SalaryModel;
  vacancies: number;
  requirements: string;
  hiringType: string;
}

export interface SalaryModel {
  type: string;
  periot: string;
  currency: string;
  maxSalary: number;
  minSalary: number;
}
