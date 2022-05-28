export interface Project {
  id: number;
  projectName: string;
  note: string;
  startDate: Date;
  deadlineDate: Date;
  startDateString: string;
  deadlineDateString: string;
  estimatedHours: number;
  hourPrice: number;
  projectPrice: number;
  hoursSpend: number;
  addressLine1: string;
  addressLine2: string;
  country: string;
  city: string;
  zipCode: string;



}
