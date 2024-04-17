export class Offre {
    idStage!: number;
    typeStage!: string;
    description!: string;
    nbStagiaire!: number;
    competence!: string;
    userLiked!: boolean; // Property to track if the current user has liked this offer
    userDisliked!: boolean; // Property to track if the current user has disliked this offer
}
