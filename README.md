Welcome to my game!

The Star Wars 2d 8-bit first person shooter. It's the game you want, the game you need, the game that tickles your nostalgia while chellenging your reflexes. Ok, it's not that great, but it works! Everything here is done with DOM and jQuery, with no other plug-ins.

The game begins with a basic HTML boiler plate with no elements other than a start button. All elements that are necessary to make this game work are dynamically added once that start button is pushed. In the backend, there are javascript event listeners for the start button and enemies. There are also objects that track the game's progress (gameController), the difficulties and parameters of the levels (uninventively called 'levelData'), and empty objects that are ready to track the scores of the players (playerOne and playerTwo).

When the button is clicked, javascript functions generate a scoreboard in the upper left and start spawning enemy tie fighters. The spawns are calculated based off of three parameters: how fast the enemies move, how often they spawn, and how many enemies spawn at a time. These parameters are all pre-defined in the levelData object. The spawn function then takes this data, generates random locations, and spawns each enemy in that random location, which is reshuffled with every spawn.

If the player clicks an enemy, the enemy is killed. When it is killed, the act of killing it checks to see if it is the last enemy. If it is the last enemy, the game registers that as the last enemy being killed, the level is complete and the player moves to the next level. When the next level starts, the nextLevel function is called again and reads the parameters for the next level from the levelData object. The next level begins with these new parameters and the next level begins. The cycle then continues.

So what happens if the player does not kill all the tiefights? Well, the tiefighters hit the player. When the enemy hit the player, the health is docked 20 points and an event is triggered to see if the player is dead. If the player still has health, the levels continue until the player dies. If the players health is 0, then the player dies. Womp womp woooomp.

No worries though, because if the first player dies, the second player is cued to begin on the first level. The playerController function recognizes that the first player died and stores the first player's level and score to the playerOne object for later use. The playerController then renders the first player's "game over", and resets the gameController object so the second player can go. The second player then goes through the same flow, with their results being stored in the playerTwo object. The playerController function then compares the two player object and returns the winner with the two comparitive scores.

For demonstration purposes, this current version is designed to be impossible to beat at level 5.
