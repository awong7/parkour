# Parkour Game - 18 Stages × 3 Difficulties

A 2D parkour platformer game with 18 progressively challenging levels in **3 difficulty modes**, built with Phaser 3 and web technologies.

## Features

- **3 Difficulty Modes**: Easy, Medium, and Hard (54 total stages!)
- **18 Stages Per Difficulty**: From beginner to expert challenges
- **Double Jump**: Jump twice in mid-air
- **Wall Running**: Run along walls to reach higher platforms
- **Dashing**: Perform quick dashes with cooldown
- **Sliding**: Maintain momentum while airborne
- **Physics-based movement**: Realistic gravity and momentum
- **Stage Progression**: Green finish zones advance to the next stage

## How to Run

1. Open `index.html` in a web browser
2. The game runs directly in browser—no build tools needed!

## Controls

- **Arrow Keys** or **WASD**: Move left/right
- **Space**: Jump (press again for double jump, or near wall for wall-jump)
- **Shift**: Dash / Slide

## Difficulty Modes

### 🟢 EASY
- Wider platforms for easier jumping
- Larger gaps between platforms
- More forgiving wall-run challenges
- Fewer precision requirements
- **Best for**: Learning mechanics, casual play

### 🟡 MEDIUM (Default)
- Balanced difficulty curve
- Standard gap sizes
- Mix of wall runs and platforming
- Moderate precision needed
- **Best for**: Regular players, skill building

### 🔴 HARD
- Narrow platforms requiring precision
- Large gaps that need skillful execution
- Complex wall-run sequences
- Tight platforming sections
- **Best for**: Experienced players, speedrunning

## 18 Stages Per Difficulty

| Stages | Challenge Type |
|--------|----------------|
| 1-3 | Tutorial phase - learn individual mechanics |
| 4-6 | Early intermediate - combine mechanics |
| 7-9 | Mid-level - elevation changes and patterns |
| 10-12 | Advanced - precision and tight spaces |
| 13-15 | Expert - multiple wall runs, vertical challenges |
| 16-18 | Master - all mechanics combined, ultimate challenge |

## Game Mechanics

### Double Jump
Jump once from ground, then again in mid-air. Perfect for reaching distant platforms.

### Wall Run
Approach a wall and you'll stick to it. Jump away to perform a wall jump—great for bouncing between walls.

### Dash
Press Shift for an instant speed boost. Has cooldown between uses. Time it right to cross gaps or build momentum.

### Sliding
Press Shift while airborne to slide. Reduces friction and maintains velocity—useful for tight platforming.

## Tips for Gameplay

- **Stages 1-6**: Learn each mechanic individually
- **Stages 7-12**: Combine mechanics for complex solutions
- **Stages 13-18**: Master-level precision and timing
- **Fall Recovery**: Falling resets you to the stage start—no penalty!
- **Green Zones**: Reach the green finish zone to advance

## Tips for Development

- Add new stages to the `STAGES` array in `game.js`
- Adjust `gravity: { y: 300 }` for different physics feel
- Modify jump velocity (`-300`) to change jump height
- Change dash power (currently `500`) for different speed
- Use platform scaling (first number = width, second = height)

## Technical Stack

- **Phaser 3**: 2D game framework
- **HTML5 Canvas**: Graphics rendering
- **Vanilla JavaScript**: Game logic
- **No dependencies**: Runs in any modern browser
