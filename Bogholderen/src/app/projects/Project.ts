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
  customerId: number;
  employeeId: number;

}
