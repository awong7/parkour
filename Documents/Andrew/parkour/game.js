const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false,
        }
    },
    scene: [MenuScene, GameScene]
};

const game = new Phaser.Game(config);
let selectedDifficulty = 'medium';

// EASY STAGES - More forgiving platforms, wider spacing
const EASY_STAGES = [
    { platforms: [{ x: 600, y: 580, w: 4, h: 0.8 }, { x: 750, y: 480, w: 1, h: 0.3 }], walls: [], spawn: { x: 100, y: 450 }, finish: { x: 1100, y: 440 } },
    { platforms: [{ x: 600, y: 580, w: 4, h: 0.8 }, { x: 350, y: 480, w: 1, h: 0.3 }, { x: 600, y: 420, w: 1, h: 0.3 }, { x: 850, y: 480, w: 1, h: 0.3 }], walls: [], spawn: { x: 100, y: 450 }, finish: { x: 1100, y: 440 } },
    { platforms: [{ x: 600, y: 580, w: 4, h: 0.8 }, { x: 300, y: 450, w: 1, h: 0.3 }, { x: 600, y: 380, w: 1, h: 0.3 }, { x: 900, y: 450, w: 1, h: 0.3 }], walls: [{ x: 50, y: 350, h: 2 }, { x: 1150, y: 350, h: 2 }], spawn: { x: 100, y: 450 }, finish: { x: 1100, y: 410 } },
    { platforms: [{ x: 600, y: 580, w: 4, h: 0.8 }, { x: 300, y: 480, w: 1, h: 0.3 }, { x: 600, y: 380, w: 1, h: 0.3 }, { x: 900, y: 480, w: 1, h: 0.3 }], walls: [], spawn: { x: 100, y: 450 }, finish: { x: 1100, y: 440 } },
    { platforms: [{ x: 600, y: 580, w: 4, h: 0.8 }, { x: 250, y: 500, w: 0.8, h: 0.3 }, { x: 450, y: 420, w: 0.8, h: 0.3 }, { x: 750, y: 340, w: 0.8, h: 0.3 }, { x: 950, y: 420, w: 0.8, h: 0.3 }, { x: 1100, y: 500, w: 0.8, h: 0.3 }], walls: [], spawn: { x: 100, y: 450 }, finish: { x: 1100, y: 460 } },
    { platforms: [{ x: 600, y: 580, w: 4, h: 0.8 }, { x: 300, y: 500, w: 0.8, h: 0.3 }, { x: 450, y: 430, w: 0.8, h: 0.3 }, { x: 600, y: 360, w: 0.8, h: 0.3 }, { x: 750, y: 430, w: 0.8, h: 0.3 }, { x: 900, y: 500, w: 0.8, h: 0.3 }], walls: [], spawn: { x: 100, y: 450 }, finish: { x: 1100, y: 460 } },
    { platforms: [{ x: 600, y: 580, w: 4, h: 0.8 }, { x: 200, y: 500, w: 0.9, h: 0.3 }, { x: 600, y: 380, w: 0.9, h: 0.3 }, { x: 1000, y: 500, w: 0.9, h: 0.3 }], walls: [{ x: 80, y: 320, h: 2.2 }, { x: 1120, y: 320, h: 2.2 }], spawn: { x: 100, y: 450 }, finish: { x: 1100, y: 460 } },
    { platforms: [{ x: 600, y: 580, w: 4, h: 0.8 }, { x: 250, y: 500, w: 0.6, h: 0.3 }, { x: 380, y: 460, w: 0.6, h: 0.3 }, { x: 510, y: 460, w: 0.6, h: 0.3 }, { x: 640, y: 460, w: 0.6, h: 0.3 }, { x: 770, y: 460, w: 0.6, h: 0.3 }, { x: 900, y: 460, w: 0.6, h: 0.3 }, { x: 1050, y: 500, w: 0.6, h: 0.3 }], walls: [], spawn: { x: 100, y: 450 }, finish: { x: 1100, y: 460 } },
    { platforms: [{ x: 600, y: 580, w: 4, h: 0.8 }, { x: 250, y: 520, w: 0.8, h: 0.3 }, { x: 350, y: 470, w: 0.8, h: 0.3 }, { x: 450, y: 420, w: 0.8, h: 0.3 }, { x: 550, y: 370, w: 0.8, h: 0.3 }, { x: 650, y: 320, w: 0.8, h: 0.3 }, { x: 750, y: 370, w: 0.8, h: 0.3 }, { x: 850, y: 420, w: 0.8, h: 0.3 }, { x: 950, y: 470, w: 0.8, h: 0.3 }, { x: 1050, y: 520, w: 0.8, h: 0.3 }], walls: [], spawn: { x: 100, y: 450 }, finish: { x: 1100, y: 480 } },
    { platforms: [{ x: 600, y: 580, w: 4, h: 0.8 }, { x: 600, y: 380, w: 0.8, h: 0.3 }], walls: [{ x: 100, y: 400, h: 1.8 }, { x: 500, y: 350, h: 1.5 }, { x: 700, y: 350, h: 1.5 }, { x: 1100, y: 400, h: 1.8 }], spawn: { x: 100, y: 450 }, finish: { x: 600, y: 340 } },
    { platforms: [{ x: 600, y: 580, w: 4, h: 0.8 }, { x: 300, y: 480, w: 0.7, h: 0.3 }, { x: 450, y: 400, w: 0.7, h: 0.3 }, { x: 600, y: 320, w: 0.7, h: 0.3 }, { x: 750, y: 400, w: 0.7, h: 0.3 }, { x: 900, y: 480, w: 0.7, h: 0.3 }], walls: [], spawn: { x: 100, y: 450 }, finish: { x: 1100, y: 440 } },
    { platforms: [{ x: 600, y: 580, w: 4, h: 0.8 }, { x: 250, y: 500, w: 0.5, h: 0.3 }, { x: 350, y: 450, w: 0.5, h: 0.3 }, { x: 450, y: 400, w: 0.5, h: 0.3 }, { x: 550, y: 350, w: 0.5, h: 0.3 }, { x: 650, y: 300, w: 0.5, h: 0.3 }, { x: 750, y: 350, w: 0.5, h: 0.3 }, { x: 850, y: 400, w: 0.5, h: 0.3 }, { x: 950, y: 450, w: 0.5, h: 0.3 }, { x: 1050, y: 500, w: 0.5, h: 0.3 }], walls: [], spawn: { x: 100, y: 450 }, finish: { x: 1100, y: 460 } },
    { platforms: [{ x: 600, y: 580, w: 4, h: 0.8 }, { x: 600, y: 350, w: 0.8, h: 0.3 }], walls: [{ x: 100, y: 370, h: 2.1 }, { x: 250, y: 300, h: 1.6 }, { x: 450, y: 320, h: 1.4 }, { x: 750, y: 320, h: 1.4 }, { x: 950, y: 300, h: 1.6 }, { x: 1100, y: 370, h: 2.1 }], spawn: { x: 100, y: 450 }, finish: { x: 600, y: 310 } },
    { platforms: [{ x: 600, y: 580, w: 4, h: 0.8 }, { x: 300, y: 480, w: 0.6, h: 0.3 }, { x: 500, y: 420, w: 0.6, h: 0.3 }, { x: 700, y: 360, w: 0.6, h: 0.3 }, { x: 900, y: 420, w: 0.6, h: 0.3 }, { x: 1100, y: 480, w: 0.6, h: 0.3 }], walls: [], spawn: { x: 100, y: 450 }, finish: { x: 1100, y: 440 } },
    { platforms: [{ x: 600, y: 580, w: 4, h: 0.8 }, { x: 300, y: 500, w: 0.8, h: 0.3 }, { x: 300, y: 410, w: 0.8, h: 0.3 }, { x: 300, y: 320, w: 0.8, h: 0.3 }, { x: 600, y: 270, w: 0.8, h: 0.3 }, { x: 900, y: 320, w: 0.8, h: 0.3 }, { x: 900, y: 410, w: 0.8, h: 0.3 }, { x: 900, y: 500, w: 0.8, h: 0.3 }], walls: [], spawn: { x: 100, y: 450 }, finish: { x: 900, y: 280 } },
    { platforms: [{ x: 600, y: 580, w: 4, h: 0.8 }, { x: 150, y: 480, w: 0.7, h: 0.3 }, { x: 450, y: 360, w: 0.7, h: 0.3 }, { x: 750, y: 300, w: 0.7, h: 0.3 }, { x: 950, y: 360, w: 0.7, h: 0.3 }], walls: [{ x: 80, y: 350, h: 2.2 }, { x: 300, y: 280, h: 1.6 }, { x: 600, y: 200, h: 1.2 }, { x: 900, y: 280, h: 1.6 }, { x: 1120, y: 350, h: 2.2 }], spawn: { x: 100, y: 450 }, finish: { x: 750, y: 260 } },
    { platforms: [{ x: 600, y: 580, w: 4, h: 0.8 }, { x: 200, y: 520, w: 0.7, h: 0.3 }, { x: 350, y: 440, w: 0.7, h: 0.3 }, { x: 500, y: 360, w: 0.7, h: 0.3 }, { x: 700, y: 300, w: 0.7, h: 0.3 }, { x: 850, y: 360, w: 0.7, h: 0.3 }, { x: 1000, y: 440, w: 0.7, h: 0.3 }, { x: 1100, y: 520, w: 0.7, h: 0.3 }], walls: [{ x: 600, y: 180, h: 1.2 }], spawn: { x: 100, y: 450 }, finish: { x: 1100, y: 480 } },
    { platforms: [{ x: 600, y: 580, w: 4, h: 0.8 }, { x: 200, y: 510, w: 0.6, h: 0.3 }, { x: 350, y: 430, w: 0.6, h: 0.3 }, { x: 500, y: 350, w: 0.6, h: 0.3 }, { x: 650, y: 280, w: 0.6, h: 0.3 }, { x: 800, y: 350, w: 0.6, h: 0.3 }, { x: 950, y: 430, w: 0.6, h: 0.3 }, { x: 1100, y: 510, w: 0.6, h: 0.3 }], walls: [{ x: 100, y: 350, h: 1.8 }, { x: 1100, y: 350, h: 1.8 }], spawn: { x: 100, y: 450 }, finish: { x: 1100, y: 470 } },
];

// MEDIUM STAGES - Balanced difficulty
const MEDIUM_STAGES = [
    { platforms: [{ x: 600, y: 580, w: 4, h: 0.8 }, { x: 750, y: 480, w: 0.8, h: 0.3 }], walls: [], spawn: { x: 100, y: 450 }, finish: { x: 1100, y: 440 } },
    { platforms: [{ x: 600, y: 580, w: 4, h: 0.8 }, { x: 400, y: 450, w: 0.8, h: 0.3 }, { x: 700, y: 400, w: 0.8, h: 0.3 }, { x: 1000, y: 450, w: 0.8, h: 0.3 }], walls: [], spawn: { x: 100, y: 450 }, finish: { x: 1100, y: 410 } },
    { platforms: [{ x: 600, y: 580, w: 4, h: 0.8 }, { x: 300, y: 380, w: 0.8, h: 0.3 }, { x: 900, y: 380, w: 0.8, h: 0.3 }], walls: [{ x: 50, y: 380, h: 2 }, { x: 1150, y: 380, h: 2 }], spawn: { x: 100, y: 450 }, finish: { x: 1100, y: 340 } },
    { platforms: [{ x: 600, y: 580, w: 4, h: 0.8 }, { x: 300, y: 450, w: 0.8, h: 0.3 }, { x: 600, y: 350, w: 0.8, h: 0.3 }, { x: 900, y: 450, w: 0.8, h: 0.3 }], walls: [], spawn: { x: 100, y: 450 }, finish: { x: 1050, y: 410 } },
    { platforms: [{ x: 600, y: 580, w: 4, h: 0.8 }, { x: 250, y: 480, w: 0.7, h: 0.3 }, { x: 450, y: 380, w: 0.7, h: 0.3 }, { x: 750, y: 300, w: 0.7, h: 0.3 }, { x: 950, y: 380, w: 0.7, h: 0.3 }, { x: 1100, y: 480, w: 0.7, h: 0.3 }], walls: [{ x: 600, y: 200, h: 1.5 }], spawn: { x: 100, y: 450 }, finish: { x: 1100, y: 440 } },
    { platforms: [{ x: 600, y: 580, w: 4, h: 0.8 }, { x: 300, y: 500, w: 0.6, h: 0.3 }, { x: 450, y: 420, w: 0.6, h: 0.3 }, { x: 600, y: 340, w: 0.6, h: 0.3 }, { x: 750, y: 420, w: 0.6, h: 0.3 }, { x: 900, y: 500, w: 0.6, h: 0.3 }, { x: 1100, y: 500, w: 0.6, h: 0.3 }], walls: [], spawn: { x: 100, y: 450 }, finish: { x: 1100, y: 460 } },
    { platforms: [{ x: 600, y: 580, w: 4, h: 0.8 }, { x: 200, y: 480, w: 0.7, h: 0.3 }, { x: 600, y: 350, w: 0.7, h: 0.3 }, { x: 1000, y: 480, w: 0.7, h: 0.3 }], walls: [{ x: 80, y: 280, h: 2 }, { x: 1120, y: 280, h: 2 }], spawn: { x: 100, y: 450 }, finish: { x: 1100, y: 440 } },
    { platforms: [{ x: 600, y: 580, w: 4, h: 0.8 }, { x: 250, y: 480, w: 0.5, h: 0.3 }, { x: 380, y: 480, w: 0.5, h: 0.3 }, { x: 510, y: 480, w: 0.5, h: 0.3 }, { x: 640, y: 480, w: 0.5, h: 0.3 }, { x: 770, y: 480, w: 0.5, h: 0.3 }, { x: 900, y: 480, w: 0.5, h: 0.3 }, { x: 1050, y: 480, w: 0.5, h: 0.3 }], walls: [], spawn: { x: 100, y: 450 }, finish: { x: 1100, y: 440 } },
    { platforms: [{ x: 600, y: 580, w: 4, h: 0.8 }, { x: 250, y: 520, w: 0.7, h: 0.3 }, { x: 350, y: 460, w: 0.7, h: 0.3 }, { x: 450, y: 400, w: 0.7, h: 0.3 }, { x: 550, y: 340, w: 0.7, h: 0.3 }, { x: 650, y: 280, w: 0.7, h: 0.3 }, { x: 750, y: 340, w: 0.7, h: 0.3 }, { x: 850, y: 400, w: 0.7, h: 0.3 }, { x: 950, y: 460, w: 0.7, h: 0.3 }, { x: 1050, y: 520, w: 0.7, h: 0.3 }], walls: [], spawn: { x: 100, y: 450 }, finish: { x: 1100, y: 480 } },
    { platforms: [{ x: 600, y: 580, w: 4, h: 0.8 }, { x: 600, y: 350, w: 0.7, h: 0.3 }], walls: [{ x: 80, y: 400, h: 1.8 }, { x: 1120, y: 400, h: 1.8 }], spawn: { x: 100, y: 450 }, finish: { x: 600, y: 310 } },
    { platforms: [{ x: 600, y: 580, w: 4, h: 0.8 }, { x: 300, y: 480, w: 0.6, h: 0.3 }, { x: 450, y: 380, w: 0.6, h: 0.3 }, { x: 600, y: 280, w: 0.6, h: 0.3 }, { x: 750, y: 380, w: 0.6, h: 0.3 }, { x: 900, y: 480, w: 0.6, h: 0.3 }, { x: 1050, y: 380, w: 0.6, h: 0.3 }], walls: [], spawn: { x: 100, y: 450 }, finish: { x: 1050, y: 340 } },
    { platforms: [{ x: 600, y: 580, w: 4, h: 0.8 }, { x: 250, y: 500, w: 0.4, h: 0.3 }, { x: 350, y: 440, w: 0.4, h: 0.3 }, { x: 450, y: 380, w: 0.4, h: 0.3 }, { x: 550, y: 320, w: 0.4, h: 0.3 }, { x: 650, y: 260, w: 0.4, h: 0.3 }, { x: 750, y: 320, w: 0.4, h: 0.3 }, { x: 850, y: 380, w: 0.4, h: 0.3 }, { x: 950, y: 440, w: 0.4, h: 0.3 }, { x: 1050, y: 500, w: 0.4, h: 0.3 }], walls: [], spawn: { x: 100, y: 450 }, finish: { x: 1100, y: 460 } },
    { platforms: [{ x: 600, y: 580, w: 4, h: 0.8 }, { x: 600, y: 300, w: 0.8, h: 0.3 }], walls: [{ x: 100, y: 350, h: 2 }, { x: 300, y: 250, h: 1.5 }, { x: 500, y: 350, h: 2 }, { x: 700, y: 250, h: 1.5 }, { x: 900, y: 350, h: 2 }, { x: 1100, y: 250, h: 1.5 }], spawn: { x: 150, y: 450 }, finish: { x: 1100, y: 260 } },
    { platforms: [{ x: 600, y: 580, w: 4, h: 0.8 }, { x: 300, y: 500, w: 0.5, h: 0.3 }, { x: 500, y: 450, w: 0.5, h: 0.3 }, { x: 700, y: 400, w: 0.5, h: 0.3 }, { x: 900, y: 450, w: 0.5, h: 0.3 }, { x: 1100, y: 500, w: 0.5, h: 0.3 }], walls: [], spawn: { x: 100, y: 450 }, finish: { x: 1100, y: 460 } },
    { platforms: [{ x: 600, y: 580, w: 4, h: 0.8 }, { x: 300, y: 500, w: 0.8, h: 0.3 }, { x: 300, y: 400, w: 0.8, h: 0.3 }, { x: 300, y: 300, w: 0.8, h: 0.3 }, { x: 300, y: 200, w: 0.8, h: 0.3 }, { x: 600, y: 250, w: 0.8, h: 0.3 }, { x: 900, y: 200, w: 0.8, h: 0.3 }, { x: 900, y: 300, w: 0.8, h: 0.3 }, { x: 900, y: 400, w: 0.8, h: 0.3 }, { x: 900, y: 500, w: 0.8, h: 0.3 }], walls: [], spawn: { x: 100, y: 450 }, finish: { x: 900, y: 160 } },
    { platforms: [{ x: 600, y: 580, w: 4, h: 0.8 }, { x: 150, y: 400, w: 0.6, h: 0.3 }, { x: 600, y: 250, w: 0.6, h: 0.3 }, { x: 1050, y: 400, w: 0.6, h: 0.3 }], walls: [{ x: 80, y: 300, h: 2.5 }, { x: 300, y: 300, h: 2 }, { x: 500, y: 200, h: 1.5 }, { x: 700, y: 200, h: 1.5 }, { x: 900, y: 300, h: 2 }, { x: 1120, y: 300, h: 2.5 }], spawn: { x: 100, y: 450 }, finish: { x: 600, y: 210 } },
    { platforms: [{ x: 600, y: 580, w: 4, h: 0.8 }, { x: 200, y: 500, w: 0.6, h: 0.3 }, { x: 350, y: 420, w: 0.6, h: 0.3 }, { x: 500, y: 340, w: 0.6, h: 0.3 }, { x: 700, y: 280, w: 0.6, h: 0.3 }, { x: 900, y: 340, w: 0.6, h: 0.3 }, { x: 1050, y: 420, w: 0.6, h: 0.3 }, { x: 1100, y: 500, w: 0.6, h: 0.3 }], walls: [{ x: 600, y: 150, h: 1.2 }], spawn: { x: 100, y: 450 }, finish: { x: 1100, y: 380 } },
    { platforms: [{ x: 600, y: 580, w: 4, h: 0.8 }, { x: 200, y: 500, w: 0.5, h: 0.3 }, { x: 350, y: 420, w: 0.5, h: 0.3 }, { x: 500, y: 340, w: 0.5, h: 0.3 }, { x: 650, y: 260, w: 0.5, h: 0.3 }, { x: 750, y: 340, w: 0.5, h: 0.3 }, { x: 850, y: 420, w: 0.5, h: 0.3 }, { x: 1000, y: 340, w: 0.5, h: 0.3 }, { x: 1100, y: 420, w: 0.5, h: 0.3 }], walls: [{ x: 80, y: 350, h: 2 }, { x: 250, y: 250, h: 1.5 }, { x: 450, y: 200, h: 1.2 }, { x: 750, y: 180, h: 1.2 }, { x: 950, y: 200, h: 1.2 }, { x: 1120, y: 350, h: 2 }], spawn: { x: 100, y: 450 }, finish: { x: 1100, y: 380 } },
];

// HARD STAGES - Challenging difficulty
const HARD_STAGES = [
    { platforms: [{ x: 600, y: 580, w: 4, h: 0.8 }, { x: 850, y: 480, w: 0.6, h: 0.3 }], walls: [], spawn: { x: 100, y: 450 }, finish: { x: 1100, y: 440 } },
    { platforms: [{ x: 600, y: 580, w: 4, h: 0.8 }, { x: 350, y: 450, w: 0.6, h: 0.3 }, { x: 650, y: 380, w: 0.6, h: 0.3 }, { x: 950, y: 450, w: 0.6, h: 0.3 }], walls: [], spawn: { x: 100, y: 450 }, finish: { x: 1100, y: 410 } },
    { platforms: [{ x: 600, y: 580, w: 4, h: 0.8 }, { x: 250, y: 350, w: 0.6, h: 0.3 }, { x: 950, y: 350, w: 0.6, h: 0.3 }], walls: [{ x: 50, y: 300, h: 2.3 }, { x: 1150, y: 300, h: 2.3 }], spawn: { x: 100, y: 450 }, finish: { x: 1100, y: 310 } },
    { platforms: [{ x: 600, y: 580, w: 4, h: 0.8 }, { x: 250, y: 420, w: 0.6, h: 0.3 }, { x: 550, y: 320, w: 0.6, h: 0.3 }, { x: 950, y: 420, w: 0.6, h: 0.3 }], walls: [], spawn: { x: 100, y: 450 }, finish: { x: 1100, y: 380 } },
    { platforms: [{ x: 600, y: 580, w: 4, h: 0.8 }, { x: 200, y: 460, w: 0.6, h: 0.3 }, { x: 400, y: 360, w: 0.6, h: 0.3 }, { x: 700, y: 280, w: 0.6, h: 0.3 }, { x: 1000, y: 360, w: 0.6, h: 0.3 }, { x: 1100, y: 460, w: 0.6, h: 0.3 }], walls: [{ x: 600, y: 180, h: 1.3 }], spawn: { x: 100, y: 450 }, finish: { x: 1100, y: 420 } },
    { platforms: [{ x: 600, y: 580, w: 4, h: 0.8 }, { x: 280, y: 480, w: 0.5, h: 0.3 }, { x: 420, y: 400, w: 0.5, h: 0.3 }, { x: 600, y: 320, w: 0.5, h: 0.3 }, { x: 780, y: 400, w: 0.5, h: 0.3 }, { x: 920, y: 480, w: 0.5, h: 0.3 }], walls: [], spawn: { x: 100, y: 450 }, finish: { x: 1100, y: 440 } },
    { platforms: [{ x: 600, y: 580, w: 4, h: 0.8 }, { x: 150, y: 450, w: 0.6, h: 0.3 }, { x: 550, y: 320, w: 0.6, h: 0.3 }, { x: 1050, y: 450, w: 0.6, h: 0.3 }], walls: [{ x: 80, y: 250, h: 2.2 }, { x: 1120, y: 250, h: 2.2 }], spawn: { x: 100, y: 450 }, finish: { x: 1100, y: 410 } },
    { platforms: [{ x: 600, y: 580, w: 4, h: 0.8 }, { x: 200, y: 480, w: 0.4, h: 0.3 }, { x: 320, y: 480, w: 0.4, h: 0.3 }, { x: 440, y: 480, w: 0.4, h: 0.3 }, { x: 560, y: 480, w: 0.4, h: 0.3 }, { x: 680, y: 480, w: 0.4, h: 0.3 }, { x: 800, y: 480, w: 0.4, h: 0.3 }, { x: 920, y: 480, w: 0.4, h: 0.3 }, { x: 1040, y: 480, w: 0.4, h: 0.3 }], walls: [], spawn: { x: 100, y: 450 }, finish: { x: 1100, y: 440 } },
    { platforms: [{ x: 600, y: 580, w: 4, h: 0.8 }, { x: 250, y: 520, w: 0.6, h: 0.3 }, { x: 350, y: 460, w: 0.6, h: 0.3 }, { x: 450, y: 400, w: 0.6, h: 0.3 }, { x: 550, y: 340, w: 0.6, h: 0.3 }, { x: 650, y: 280, w: 0.6, h: 0.3 }, { x: 750, y: 340, w: 0.6, h: 0.3 }, { x: 850, y: 400, w: 0.6, h: 0.3 }, { x: 950, y: 460, w: 0.6, h: 0.3 }, { x: 1050, y: 520, w: 0.6, h: 0.3 }], walls: [], spawn: { x: 100, y: 450 }, finish: { x: 1100, y: 480 } },
    { platforms: [{ x: 600, y: 580, w: 4, h: 0.8 }, { x: 600, y: 320, w: 0.6, h: 0.3 }], walls: [{ x: 80, y: 380, h: 2 }, { x: 1120, y: 380, h: 2 }], spawn: { x: 100, y: 450 }, finish: { x: 600, y: 280 } },
    { platforms: [{ x: 600, y: 580, w: 4, h: 0.8 }, { x: 280, y: 470, w: 0.5, h: 0.3 }, { x: 420, y: 370, w: 0.5, h: 0.3 }, { x: 600, y: 270, w: 0.5, h: 0.3 }, { x: 780, y: 370, w: 0.5, h: 0.3 }, { x: 920, y: 470, w: 0.5, h: 0.3 }], walls: [], spawn: { x: 100, y: 450 }, finish: { x: 1100, y: 430 } },
    { platforms: [{ x: 600, y: 580, w: 4, h: 0.8 }, { x: 250, y: 480, w: 0.35, h: 0.3 }, { x: 350, y: 420, w: 0.35, h: 0.3 }, { x: 450, y: 360, w: 0.35, h: 0.3 }, { x: 550, y: 300, w: 0.35, h: 0.3 }, { x: 650, y: 240, w: 0.35, h: 0.3 }, { x: 750, y: 300, w: 0.35, h: 0.3 }, { x: 850, y: 360, w: 0.35, h: 0.3 }, { x: 950, y: 420, w: 0.35, h: 0.3 }, { x: 1050, y: 480, w: 0.35, h: 0.3 }], walls: [], spawn: { x: 100, y: 450 }, finish: { x: 1100, y: 440 } },
    { platforms: [{ x: 600, y: 580, w: 4, h: 0.8 }, { x: 550, y: 300, w: 0.6, h: 0.3 }], walls: [{ x: 80, y: 320, h: 2.2 }, { x: 250, y: 220, h: 1.4 }, { x: 450, y: 300, h: 1.8 }, { x: 750, y: 300, h: 1.8 }, { x: 950, y: 220, h: 1.4 }, { x: 1120, y: 320, h: 2.2 }], spawn: { x: 100, y: 450 }, finish: { x: 550, y: 260 } },
    { platforms: [{ x: 600, y: 580, w: 4, h: 0.8 }, { x: 300, y: 480, w: 0.4, h: 0.3 }, { x: 500, y: 420, w: 0.4, h: 0.3 }, { x: 700, y: 360, w: 0.4, h: 0.3 }, { x: 900, y: 420, w: 0.4, h: 0.3 }, { x: 1100, y: 480, w: 0.4, h: 0.3 }], walls: [], spawn: { x: 100, y: 450 }, finish: { x: 1100, y: 440 } },
    { platforms: [{ x: 600, y: 580, w: 4, h: 0.8 }, { x: 300, y: 480, w: 0.7, h: 0.3 }, { x: 300, y: 380, w: 0.7, h: 0.3 }, { x: 300, y: 280, w: 0.7, h: 0.3 }, { x: 300, y: 180, w: 0.7, h: 0.3 }, { x: 600, y: 230, w: 0.7, h: 0.3 }, { x: 900, y: 180, w: 0.7, h: 0.3 }, { x: 900, y: 280, w: 0.7, h: 0.3 }, { x: 900, y: 380, w: 0.7, h: 0.3 }, { x: 900, y: 480, w: 0.7, h: 0.3 }], walls: [], spawn: { x: 100, y: 450 }, finish: { x: 900, y: 140 } },
    { platforms: [{ x: 600, y: 580, w: 4, h: 0.8 }, { x: 100, y: 380, w: 0.5, h: 0.3 }, { x: 550, y: 250, w: 0.5, h: 0.3 }, { x: 1100, y: 380, w: 0.5, h: 0.3 }], walls: [{ x: 80, y: 280, h: 2.4 }, { x: 300, y: 260, h: 1.7 }, { x: 500, y: 180, h: 1.4 }, { x: 700, y: 180, h: 1.4 }, { x: 900, y: 260, h: 1.7 }, { x: 1120, y: 280, h: 2.4 }], spawn: { x: 100, y: 450 }, finish: { x: 550, y: 210 } },
    { platforms: [{ x: 600, y: 580, w: 4, h: 0.8 }, { x: 180, y: 480, w: 0.5, h: 0.3 }, { x: 320, y: 400, w: 0.5, h: 0.3 }, { x: 480, y: 320, w: 0.5, h: 0.3 }, { x: 680, y: 260, w: 0.5, h: 0.3 }, { x: 880, y: 320, w: 0.5, h: 0.3 }, { x: 1020, y: 400, w: 0.5, h: 0.3 }, { x: 1100, y: 480, w: 0.5, h: 0.3 }], walls: [{ x: 600, y: 140, h: 1.1 }], spawn: { x: 100, y: 450 }, finish: { x: 1100, y: 440 } },
    { platforms: [{ x: 600, y: 580, w: 4, h: 0.8 }, { x: 180, y: 480, w: 0.4, h: 0.3 }, { x: 320, y: 400, w: 0.4, h: 0.3 }, { x: 480, y: 320, w: 0.4, h: 0.3 }, { x: 620, y: 240, w: 0.4, h: 0.3 }, { x: 760, y: 320, w: 0.4, h: 0.3 }, { x: 880, y: 400, w: 0.4, h: 0.3 }, { x: 1020, y: 320, w: 0.4, h: 0.3 }, { x: 1100, y: 400, w: 0.4, h: 0.3 }], walls: [{ x: 80, y: 330, h: 1.9 }, { x: 200, y: 220, h: 1.4 }, { x: 400, y: 180, h: 1.1 }, { x: 800, y: 180, h: 1.1 }, { x: 1000, y: 220, h: 1.4 }, { x: 1120, y: 330, h: 1.9 }], spawn: { x: 100, y: 450 }, finish: { x: 1100, y: 360 } },
];

class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        this.add.text(600, 100, 'PARKOUR GAME', {
            fontSize: '48px',
            fill: '#fff',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.add.text(600, 200, 'Select Difficulty', {
            fontSize: '32px',
            fill: '#aaa',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Easy button
        let easyButton = this.add.rectangle(300, 350, 150, 80, 0x44aa44);
        easyButton.setInteractive({ useHandCursor: true });
        easyButton.on('pointerdown', () => {
            selectedDifficulty = 'easy';
            this.scene.start('GameScene');
        });
        this.add.text(300, 350, 'EASY', {
            fontSize: '28px',
            fill: '#fff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Medium button
        let mediumButton = this.add.rectangle(600, 350, 150, 80, 0xffaa44);
        mediumButton.setInteractive({ useHandCursor: true });
        mediumButton.on('pointerdown', () => {
            selectedDifficulty = 'medium';
            this.scene.start('GameScene');
        });
        this.add.text(600, 350, 'MEDIUM', {
            fontSize: '28px',
            fill: '#fff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Hard button
        let hardButton = this.add.rectangle(900, 350, 150, 80, 0xdd4444);
        hardButton.setInteractive({ useHandCursor: true });
        hardButton.on('pointerdown', () => {
            selectedDifficulty = 'hard';
            this.scene.start('GameScene');
        });
        this.add.text(900, 350, 'HARD', {
            fontSize: '28px',
            fill: '#fff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        this.add.text(600, 500, 'Arrow Keys / WASD - Move | Space - Jump | Shift - Dash/Slide', {
            fontSize: '16px',
            fill: '#888',
            fontFamily: 'Arial'
        }).setOrigin(0.5);
    }
}

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
    }

    create() {
        let STAGES;
        if (selectedDifficulty === 'easy') {
            STAGES = EASY_STAGES;
        } else if (selectedDifficulty === 'hard') {
            STAGES = HARD_STAGES;
        } else {
            STAGES = MEDIUM_STAGES;
        }

        this.STAGES = STAGES;
        this.currentStage = 1;

        // Initialize variables
        cursors = this.input.keyboard.createCursorKeys();
        direction = 1;
        canDoubleJump = true;
        isOnGround = false;
        isOnWall = false;
        wallSide = null;
        canDash = true;
        dashCooldown = 0;
        dashDuration = 0;
        isDashing = false;
        isSliding = false;
        slideDuration = 0;

        // Create player textures and animations
        this.createPlayerTextures();
        this.createPlayerAnimations();

        // Load first stage
        loadStage(this, STAGES, 1);

        // Create player
        player = this.physics.add.sprite(STAGES[0].spawn.x, STAGES[0].spawn.y, 'idle');
        player.setBounce(0);
        player.setCollideWorldBounds(false);
        player.setDrag(0.99);
        player.play('idle');

        this.physics.add.collider(player, platforms, () => {
            isOnGround = true;
            canDoubleJump = true;
            canDash = true;
        });

        this.physics.add.collider(player, wallGroup, handleWallCollision);
        this.physics.add.overlap(player, finishZone, () => this.handleFinish());

        stageText = this.add.text(16, 16, '', {
            fontSize: '32px',
            fill: '#fff',
            fontFamily: 'Arial'
        });
        this.updateStageText();

        // Input
        this.input.keyboard.on('keydown-W', () => cursors.up.isDown = true);
        this.input.keyboard.on('keyup-W', () => cursors.up.isDown = false);
        this.input.keyboard.on('keydown-A', () => cursors.left.isDown = true);
        this.input.keyboard.on('keyup-A', () => cursors.left.isDown = false);
        this.input.keyboard.on('keydown-D', () => cursors.right.isDown = true);
        this.input.keyboard.on('keyup-D', () => cursors.right.isDown = false);
        this.input.keyboard.on('keydown-SPACE', () => this.handleJump());
        this.input.keyboard.on('keydown-SHIFT', () => this.handleDash());
    }

    createPlayerTextures() {
        // Idle pose
        let idleGraphics = this.make.graphics({ x: 0, y: 0, add: false });
        idleGraphics.fillStyle(0xff6b9d, 1);
        idleGraphics.fillRect(2, 0, 16, 20);
        idleGraphics.fillRect(4, 20, 4, 20);
        idleGraphics.fillRect(12, 20, 4, 20);
        idleGraphics.generateTexture('idle', 20, 40);
        idleGraphics.destroy();

        // Running frame 1
        let run1Graphics = this.make.graphics({ x: 0, y: 0, add: false });
        run1Graphics.fillStyle(0xff6b9d, 1);
        run1Graphics.fillRect(2, 2, 16, 18);
        run1Graphics.fillRect(3, 20, 5, 18);
        run1Graphics.fillRect(12, 20, 5, 18);
        run1Graphics.generateTexture('run1', 20, 40);
        run1Graphics.destroy();

        // Running frame 2
        let run2Graphics = this.make.graphics({ x: 0, y: 0, add: false });
        run2Graphics.fillStyle(0xff6b9d, 1);
        run2Graphics.fillRect(2, 2, 16, 18);
        run2Graphics.fillRect(2, 20, 5, 18);
        run2Graphics.fillRect(13, 20, 5, 18);
        run2Graphics.generateTexture('run2', 20, 40);
        run2Graphics.destroy();

        // Jump pose
        let jumpGraphics = this.make.graphics({ x: 0, y: 0, add: false });
        jumpGraphics.fillStyle(0xff9900, 1);
        jumpGraphics.fillRect(2, 0, 16, 20);
        jumpGraphics.fillRect(4, 20, 3, 15);
        jumpGraphics.fillRect(13, 20, 3, 15);
        jumpGraphics.generateTexture('jump', 20, 40);
        jumpGraphics.destroy();

        // Fall pose
        let fallGraphics = this.make.graphics({ x: 0, y: 0, add: false });
        fallGraphics.fillStyle(0xffaa00, 1);
        fallGraphics.fillRect(2, 5, 16, 18);
        fallGraphics.fillRect(4, 23, 4, 13);
        fallGraphics.fillRect(12, 23, 4, 13);
        fallGraphics.generateTexture('fall', 20, 40);
        fallGraphics.destroy();

        // Wall run pose
        let wallGraphics = this.make.graphics({ x: 0, y: 0, add: false });
        wallGraphics.fillStyle(0x00ddff, 1);
        wallGraphics.fillRect(4, 8, 14, 18);
        wallGraphics.fillRect(3, 26, 6, 12);
        wallGraphics.fillRect(11, 26, 6, 12);
        wallGraphics.generateTexture('wall', 20, 40);
        wallGraphics.destroy();

        // Dash pose
        let dashGraphics = this.make.graphics({ x: 0, y: 0, add: false });
        dashGraphics.fillStyle(0xffff00, 1);
        dashGraphics.fillRect(1, 12, 18, 16);
        dashGraphics.fillRect(0, 28, 7, 8);
        dashGraphics.fillRect(13, 28, 7, 8);
        dashGraphics.generateTexture('dash', 20, 40);
        dashGraphics.destroy();
    }

    createPlayerAnimations() {
        // Idle animation (static)
        if (!this.anims.exists('idleAnim')) {
            this.anims.create({
                key: 'idleAnim',
                frames: this.anims.generateFrameNames('idle', { start: 0, end: 0 }),
                frameRate: 10,
                repeat: -1
            });
        }

        // Running animation
        if (!this.anims.exists('runAnim')) {
            this.anims.create({
                key: 'runAnim',
                frames: [
                    { key: 'run1' },
                    { key: 'run2' }
                ],
                frameRate: 10,
                repeat: -1
            });
        }

        // Jump animation
        if (!this.anims.exists('jumpAnim')) {
            this.anims.create({
                key: 'jumpAnim',
                frames: [{ key: 'jump' }],
                frameRate: 10,
                repeat: 0
            });
        }

        // Fall animation
        if (!this.anims.exists('fallAnim')) {
            this.anims.create({
                key: 'fallAnim',
                frames: [{ key: 'fall' }],
                frameRate: 10,
                repeat: 0
            });
        }

        // Wall run animation
        if (!this.anims.exists('wallAnim')) {
            this.anims.create({
                key: 'wallAnim',
                frames: [{ key: 'wall' }],
                frameRate: 10,
                repeat: 0
            });
        }

        // Dash animation
        if (!this.anims.exists('dashAnim')) {
            this.anims.create({
                key: 'dashAnim',
                frames: [{ key: 'dash' }],
                frameRate: 10,
                repeat: 0
            });
        }
    }

    handleJump() {
        if (isOnGround) {
            player.setVelocityY(-300);
            isOnGround = false;
        } else if (canDoubleJump) {
            player.setVelocityY(-300);
            canDoubleJump = false;
        } else if (isOnWall) {
            player.setVelocityY(-250);
            player.setVelocityX(-wallSide * 200);
            isOnWall = false;
        }
    }

    handleDash() {
        if (canDash && !isDashing) {
            isDashing = true;
            dashDuration = 10;
            canDash = false;
            dashCooldown = 30;
            player.setVelocityX(direction * 500);
        }
        if (!isOnGround) {
            isSliding = true;
            slideDuration = 15;
        }
    }

    handleFinish() {
        if (this.currentStage < this.STAGES.length) {
            this.currentStage++;
            loadStage(this, this.STAGES, this.currentStage);
            const stage = this.STAGES[this.currentStage - 1];
            player.setPosition(stage.spawn.x, stage.spawn.y);
            player.setVelocity(0, 0);
            canDoubleJump = true;
            canDash = true;
            this.updateStageText();
        } else {
            stageText.setText('COMPLETED ALL STAGES!');
        }
    }

    updateStageText() {
        stageText.setText(`${selectedDifficulty.toUpperCase()} - Stage ${this.currentStage}/${this.STAGES.length}`);
    }

    update() {
        const stage = this.STAGES[this.currentStage - 1];

        if (player.y > 650) {
            player.setPosition(stage.spawn.x, stage.spawn.y);
            player.setVelocity(0, 0);
            canDoubleJump = true;
            canDash = true;
        }

        isOnGround = false;
        isOnWall = false;

        // Handle movement input
        let isMoving = false;
        if (cursors.left.isDown || cursors.right.isDown) {
            let moveSpeed = isSliding ? 150 : 200;
            if (cursors.left.isDown) {
                player.setVelocityX(-moveSpeed);
                direction = -1;
                isMoving = true;
            }
            if (cursors.right.isDown) {
                player.setVelocityX(moveSpeed);
                direction = 1;
                isMoving = true;
            }
        } else {
            player.setVelocityX(player.body.velocity.x * 0.9);
        }

        // Flip sprite based on direction
        player.setFlipX(direction === -1);

        // Handle animation states
        if (isDashing) {
            player.play('dashAnim', true);
            dashDuration--;
            if (dashDuration <= 0) {
                isDashing = false;
            }
        } else if (isOnWall) {
            player.play('wallAnim', true);
        } else if (isOnGround) {
            if (isMoving) {
                player.play('runAnim', true);
            } else {
                player.play('idleAnim', true);
            }
        } else {
            if (player.body.velocity.y < -50) {
                player.play('jumpAnim', true);
            } else {
                player.play('fallAnim', true);
            }
        }

        if (dashCooldown > 0) {
            dashCooldown--;
        }

        if (isSliding) {
            slideDuration--;
            if (slideDuration <= 0) {
                isSliding = false;
            }
        }

        if (player.x < 0) player.setPosition(0, player.y);
        if (player.x > 1200) player.setPosition(1200, player.y);
    }
}

function handleWallCollision(p, w) {
    if (p.body.velocity.y > 0) {
        isOnGround = true;
        canDoubleJump = true;
        canDash = true;
        return;
    }

    if (p.x < w.x) {
        wallSide = 1;
    } else {
        wallSide = -1;
    }

    isOnWall = true;
    p.setVelocityY(Math.min(p.body.velocity.y, 50));
    canDoubleJump = true;
}

function loadStage(scene, STAGES, stageNum) {
    const stage = STAGES[stageNum - 1];

    if (platforms) platforms.clear(true, true);
    if (wallGroup) wallGroup.clear(true, true);
    if (finishZone) finishZone.clear(true, true);

    platforms = scene.physics.add.staticGroup();

    let platformGraphics = scene.make.graphics({ x: 0, y: 0, add: false });
    platformGraphics.fillStyle(0x4a9eff, 1);
    platformGraphics.fillRect(0, 0, 100, 30);
    platformGraphics.generateTexture('platform', 100, 30);
    platformGraphics.destroy();

    stage.platforms.forEach(p => {
        let platform = platforms.create(p.x, p.y, 'platform');
        platform.setScale(p.w, p.h);
        platform.refreshBody();
    });

    wallGroup = scene.physics.add.staticGroup();

    let wallGraphics = scene.make.graphics({ x: 0, y: 0, add: false });
    wallGraphics.fillStyle(0x888888, 1);
    wallGraphics.fillRect(0, 0, 15, 150);
    wallGraphics.generateTexture('wall', 15, 150);
    wallGraphics.destroy();

    stage.walls.forEach(w => {
        let wall = wallGroup.create(w.x, w.y, 'wall');
        wall.setScale(1, w.h);
        wall.refreshBody();
    });

    finishZone = scene.physics.add.group();
    let finishGraphics = scene.make.graphics({ x: 0, y: 0, add: false });
    finishGraphics.fillStyle(0x00ff00, 0.5);
    finishGraphics.fillRect(0, 0, 80, 100);
    finishGraphics.generateTexture('finish', 80, 100);
    finishGraphics.destroy();

    let finish = finishZone.create(stage.finish.x, stage.finish.y, 'finish');
    finish.body.setAllowGravity(false);
}

let cursors;
let player;
let platforms;
let wallGroup;
let direction = 1;
let canDoubleJump = true;
let isOnGround = false;
let isOnWall = false;
let wallSide = null;
let canDash = true;
let dashCooldown = 0;
let dashDuration = 0;
let isDashing = false;
let isSliding = false;
let slideDuration = 0;
let stageText;
let finishZone;
