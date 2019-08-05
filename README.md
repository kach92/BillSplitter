# BillSplitter
GA Project 2

# Reversi

![ALT TEXT](https://res.cloudinary.com/kach92/image/upload/v1564994560/Blitt_zddb0w.png)

## Basic Rules and Objectives
Each reversi piece has a black side and a white side. On your turn, you place one piece on the board with your color facing up. You must place the piece so that an opponent's piece, or a row of opponent's pieces, is flanked by your pieces. All of the opponent's pieces between your pieces are then turned over to become your color. Objective of the game is to own more pieces than your opponent when the game is over. The game is over when neither player has a move. Usually, this means the board is full. 

## Modes
- Single Player (Player against Bot)
- 2 Players (Player against Player)
- Demo (Bot against Bot)

## Technologies Used
Only using basic HTML, CSS and Javascript

## Approach Taken
I basically start by creating the board, and then did the algorithm for a 2 player game to work when click on the board. Then I proceed to adding additional functions like able to play with AI, and a demo mode to show the game where the AI will play against itseelf. The AI is programmed to take the move where it can change the most tiles to it's own colors.

Then only I proceed to do debugging on the codes as well as decorating the game with CSS, so that the game looks more interactive (Ask for players name, rainbow rotating color on players turn, highlights when player/AI placed a tile, 3D like buttons to press, Winning display etc). Then I proceed to add functions such as algorithm to detect no more moves, check who wins, a setting button, a display to show last moves etc.

My algorithm for the whole game is designed so that I do not hard code any number, so that it will be flexible for me to increase the board size later.

## Unsolved Problems
So far I do not have any bugs, but further functions that I can add would be a confirmation screen when user chose to quite or restart the game, an undo button for player to go back to his last move, a function for player to choose larger board sizes.
