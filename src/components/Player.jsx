import { useState } from 'react';

export default function Player({ initialName, symbol, isActive, onChangeName }) {

    const [ isEditing, setIsEditing ] = useState(false);

    const [ playerName, setPlayerName ] = useState(initialName);

    function editingHandler() {
        //NOTE: UPDATING STATE FROM PREVIOUS STATE VALUE - BEST PRACTICES
        //setIsEditing(!editing); schedules updates. not instant. perhaps 1 or 2 ms but not instant.For example, if you copy and paste this line, you may not get the expected result.
        //the below 2 lines of code will depend on the current state, so what you expect(first line to true, second line to false) would not actually happen.
        //setIsEditing(!editing) => expect true = if current state is false, - this line schedules a state update to true.
        //setIsEditing(!editing) => expect false = if current state is false, - this line schedules a state update to true.
        
        setIsEditing((editing) => !editing) //this function gets executed immediately. State will be updated.
    }

    function handleChange(event){
        setPlayerName(event.target.value);
        if (isEditing) {
            onChangeName(symbol, playerName);
        }
        
    }


    return (
        <li className={isActive ? 'active' : undefined}> 
            <span className="player">
                {!isEditing ? <span className="player-name">{playerName}</span> : <input type="text" defaultValue={playerName} required onChange={handleChange}/>}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={editingHandler}>{ isEditing ? 'Save' : 'Edit'}</button>
        </li>
    )
}