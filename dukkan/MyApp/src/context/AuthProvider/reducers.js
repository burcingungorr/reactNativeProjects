

export default function redurcers(state,action){
    switch (action.type) {
        case "SET_USER":
            const {user} = action.payload
            return {...state,user}
          
    
        default:
            return state;
    }
}