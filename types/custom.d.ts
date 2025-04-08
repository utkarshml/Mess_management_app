
export interface Meal {
    $collectionId: string;
    $createdAt: string;
    $databaseId: string;
    $id: string;
    messOwner: MessOwner;
    $permissions: string[];
    $updatedAt: string;
    attendance: string[];
    description: string;
    end_time: Date;
    meal_type: MealType;
    price: number;
    start_time: Date;
  }

 export interface User {
    $id: string;
    name: string;
    email: string;
    labels: ("student" | "messOwner")[];
}
export interface MessOwner {
    $id: string;
    name: string;
    email: string;
    labels: ("student" | "messOwner")[];
    Mess: string;
    place: string;
    meals: Meal[];
    phone : number
    students: Student[];
    warden: string;
    address : string;
    business_hours: string;
    capacity: number;

}
  export interface MessMeal {
      $collectionId: string;
      $createdAt: string;
      $databaseId: string;
      $id: string;
      $permissions: string[];
      $updatedAt: string;
      end_time: string;
      meal_type: string;
      mess_owner_email: string;
      price: number;
  }
  
  export interface AuthContextType {
      user: User | null;
      loading: boolean;
      logout: () => void;
      userData?: Student| MessOwner | null;
      login: (email: string, password: string) => Promise<void>;
      appwrite: AppwriteAuth;
      meal : Meal[];
  }
  export interface wallet {
    student : Student
    wallet_money : number
  }
  export interface Attendace {
    student: Student;
    meals: Meal;
  }
  export interface Student {
      messOwener: MessOwner;
      $id: string;
      branch: string;
      hostel : string;
      email: string;
      roll_number: string;
      student_name: string;
      status: active | inactive;
      wallet: wallet;
      attendance: Attendace[]
  }
  
export  type MealType = 'breakfast' | 'lunch' | 'snacks' | 'dinner';

  