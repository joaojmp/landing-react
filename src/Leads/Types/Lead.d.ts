import { Landing } from "../../Landings/Types/Landing";

export type Lead = {
    id: number;
    data: string;
    landing_id: number;
    landing: Landing;
}
