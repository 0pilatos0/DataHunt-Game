import Canvas from "../Core/Canvas.js";
import Drawable from "../Core/Drawable.js";
import Sprite from "../Core/Drawables/Sprite.js";
import GameObject from "../Core/GameObject.js";
import Quest from "../Quests/Quest.js";

export default class Player extends GameObject {
    //input = []
    playerID;
    questList;

    constructor(position, size, playerID) {
        super(new Sprite(position, size, './Player/Player.png'));
        this.playerID = playerID;
        this.questList = Quest.loadQuests(this.#getQuests());
        // window.addEventListener('keydown', (e) => {
        //     if(this.input.indexOf(e.key) == -1){
        //         this.input.push(e.key);
        //     }
        // })

        // window.addEventListener('keyup', (e) => {
        //     if(this.input.indexOf(e.key) > -1){
        //         this.input.splice(this.input.indexOf(e.key), 1);
        //     }
        // })
    }

    Draw(ctx){
        super.Draw(ctx)
    }

    Update(){
        super.Update()
        // let speed = 100
        // if(this.input.indexOf('w') > -1){
        //     this.drawable.position.Y -= speed * window.deltaTime;
        // }
        // if(this.input.indexOf('a') > -1){
        //     this.drawable.position.X -= speed * window.deltaTime;
        // }
        // if(this.input.indexOf('s') > -1){
        //     this.drawable.position.Y += speed * window.deltaTime;
        // }
        // if(this.input.indexOf('d') > -1){
        //     this.drawable.position.X += speed * window.deltaTime;
        // }
    }

    #getQuests(){


        //TODO quest troep uit de database trekken


        let testQuests =

            [
                {
                    "QuestID": 0,
                    "QuestListener": 1,
                    "Amount": 1,
                    "Progress": 0,
                    "QuestName": "Test Quest",
                    "QuestDescription": "Kill {Amount} pig"
                },
                {
                    "QuestID": 1,
                    "QuestListener": 1,
                    "Amount": 1,
                    "Progress": 0,
                    "QuestName": "Test Quest",
                    "QuestDescription": "Kill {Amount} pig"
                }
            ];

        return testQuests;
    }
}