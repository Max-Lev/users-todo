import { patchState, signalState } from "@ngrx/signals";
import { User } from "../../shared/models/users-response.model";

export type ExpansionPanel = {
    activeUser: Record<number, User>,
    users?: {
        user: User,
        openPanels: number[],
        closedPanels: number[]
    }[]
}

export const ExpansionPanelState = signalState<ExpansionPanel>({
    activeUser: {}

});


// export function updateActiveUser(activePanel: number, user: User) {
//     const currentUsers = ExpansionPanelState.activeUser();
//     // const updatedUsers = { ...currentUsers };
//     debugger;
//     // delete updatedUsers[user.id];
//     Object.entries(currentUsers).forEach((_user, index) => {
//         if (Number(_user[1].id) === user.id) {
//             debugger;
//             delete currentUsers[+_user[0]];
//         }
//     });
//     console.log('currentUsers', currentUsers)
//     debugger

//     patchState(ExpansionPanelState, {
//         activeUser: {
//             ...currentUsers,
//             [activePanel]: { ...user }
//         }
//     });

// }