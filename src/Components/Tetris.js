import React, { useState } from "react";
// components
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";
import { checkCollision } from "../gameHelper";
 import { StyledTetris, StyledTetrisWrapper } from "./Styles/StyledTetris";

 
 // creating the stage;
 import { createStage } from "../gameHelper";
 import {useInterval} from "../Hoooks/useInterval"
 // custom hoooks
 import { usePlayer } from "../Hoooks/usePlayer";
 import { useStage } from "../Hoooks/useStage";
 
 const Tetris=()=>{
     
    
    console.log("re-render");

    
    const [dropTime,setDropTime]=useState(null);
    const [gameOver,setGameOver]=useState(false)

    const [player,updatePlayerPos,resetPlayer,PlayerRotate]=usePlayer();
    
    
     
    
    
    const [stage,setStage]=useStage(player,resetPlayer)
    
    
    // moving the player;
    const movePlayer = dir =>{
        if(!checkCollision(player,stage,{x:dir,y:0}))
            updatePlayerPos({x:dir,y:0})
    }

    const startGame =()=>{
        console.log('hello');
                setDropTime(500)
                setStage(createStage());
                resetPlayer();
                setGameOver(false)
    }



    
    const drop =()=>{
      
        
        if(!checkCollision(player,stage,{x:0,y:1}))
        updatePlayerPos({x:0,y:1,collided:false})
    else {
        if(player.pos.y<1)
            {
                console.log("game over");
                setGameOver(true);
                setDropTime(null);
            }

            updatePlayerPos({x:0,y:0,collided:true})
        
    }
    
    
    }

    const keyUp = ({ keyCode }) => {
        if (!gameOver) {
            if (keyCode === 40) {
                setDropTime(500);
            }
        }
    };
    

    const dropPlayer =()=>{
        setDropTime(null)
                drop();
    }

    const move=({keyCode})=>{
            if(!gameOver)
            {
                if(keyCode===37)
                    movePlayer(-1);
                else if(keyCode===39)
                    movePlayer(1);
                else if(keyCode===40)
                    dropPlayer();
                else if(keyCode===38){
                    PlayerRotate(stage,1);
                }
            }
    }

    useInterval(()=>{
        drop()
    },dropTime)
    

    return(
    <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e=>move(e)} onKeyUp={keyUp}>
        <StyledTetris>
        <Stage stage={stage} />

        <aside>
            {
                gameOver?(<Display gameOver={gameOver} text="Game Over"></Display>):(
            
            <div className="info">
                <Display text="Score"/>
                <Display text="Rows"/>
                <Display text="Level"/>
            </div>
            )}
            <StartButton callback={startGame}/>
        </aside>


        </StyledTetris>
    </StyledTetrisWrapper>
    
)
}


export default Tetris;