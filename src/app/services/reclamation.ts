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
  firstname:string,
  lastname :string,
  email:string,
 iduser:number;
  }
  