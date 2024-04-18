import { User } from "./User";

export enum StatutReclamation {
    EnAttente = 'EN_ATTENTE',
    EnCours = 'EN_COURS',
    Resolue = 'RESOLUE',
  }
  
  export interface Reclamation {
    idReclamation: number;
    dateCreation: Date;
    description: string;
    statutReclamation: StatutReclamation;  // Make sure to import StatutReclamation
 user: User;
  }
  export interface ReclamationWithUser {
    idReclamation: number;
    dateCreation: Date;
    description: string;
    statutReclamation: StatutReclamation;  // Make sure to import StatutReclamation
 iduser: number;
 firstname: string;
 lastname: string;
 email: string;
  }
  export class AddReclamationRequest {
    description: string;
    userId: number;
    // Autres propriétés de réclamation nécessaires
  
    constructor(description: string, userId: number) {
      this.description = description;
      this.userId = userId;
      // Initialiser d'autres propriétés si nécessaire
    }
  }
  
  