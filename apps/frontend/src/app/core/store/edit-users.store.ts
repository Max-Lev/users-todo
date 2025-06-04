import { signalState } from "@ngrx/signals";
import { User } from "../../shared/models/users-response.model";

export type ExpansionPanel = {
    activePanel: number;
    activeUser: Record<number, User>
}

// export type ExpansionPanelInitial = {
//     activePanel: 0;
//     activeUser: Record<number, User>
// }

export const ExpansionPanelState = signalState<ExpansionPanel>({
    activePanel: -1,
    activeUser: {}

});


