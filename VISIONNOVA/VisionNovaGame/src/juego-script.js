var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
  preload: preload,
  create: create,
  update: update
}
};

let gameOver = false;
let player;
let cursors;
let puedeMover = true;
let carros;
let moveCooldown = 0;



var game = new Phaser.Game(config);

function preload() {

    //Tiles
    this.load.image('grass', 'assets/tiles/grass.png');
    this.load.image('callev', 'assets/tiles/callev.jpg');
    this.load.image('calleh', 'assets/tiles/calleh.jpg');
    this.load.image('cruce', 'assets/tiles/cruce.jpg');
    this.load.image('esquinaID', 'assets/tiles/esquinaid.jpg');
    this.load.image('esquinaII', 'assets/tiles/esquinaii.jpg');
    this.load.image('esquinaSD', 'assets/tiles/esquinasd.jpg');
    this.load.image('esquinaSI', 'assets/tiles/esquinasi.jpg');
    this.load.image('CArriba', 'assets/tiles/CArriba.jpg');
    this.load.image('invisible', 'assets/tiles/invisible.png');


    //Sprites
    this.load.image('barricada', 'assets/sprites/barricada.png');
    this.load.image('carL', 'assets/sprites/carIZ.png');
    this.load.image('carU', 'assets/sprites/carUp.png');
    this.load.image('carR', 'assets/sprites/carRight.png');
    this.load.image('carD', 'assets/sprites/carDown.png');
    this.load.image('semaforo', 'assets/sprites/semaforo.png');
    this.load.image('basura', 'assets/sprites/botebasura.png');
    this.load.image('coladera', 'assets/sprites/coladera.png');
    this.load.image('alertSound', 'assets/sprites/soundalert.png');
    this.load.image('meta','assets/sprites/meta.png');
    this.load.image('tesi','assets/sprites/tesi.png');


    this.load.spritesheet('dude', 'assets/sprites/dude.png', { frameWidth: 32, frameHeight: 48 });

    //Audios
    this.load.audio('2casiD', 'assets/audio/2CasD.opus');
    this.load.audio('4casiA', 'assets/audio/siga hacia arriba 4 casillas.opus');
    this.load.audio('3casiD', 'assets/audio/3 casillas a la derecha.opus');
    this.load.audio('S3casiD', 'assets/audio/Semaforo a continuación a la derecha 3 casillas.opus');
    this.load.audio('alto', 'assets/audio/alto.opus');
    this.load.audio('4casiD', 'assets/audio/sigue a la derecha 4 casillas.opus');
    this.load.audio('6casiA', 'assets/audio/semaforo a continuación en 6 casillas.opus');
    this.load.audio('1casiA', 'assets/audio/avanza una casilla mas hacia arriba y llegara a su destino.opus');
    this.load.audio('win', 'assets/audio/felicidades completaste la experiencia vision nova.opus');
    this.load.audio('lose', 'assets/audio/fallaste visionnova.opus');
    
}

function create() {

    this.sound.volume = 50; // Ajustar de nuevo a 10 si no funciona

    // Fondo
    for (let y = 0; y < 18; y++) {
        for (let x = 0; x < 25; x++) {
            this.add.image(x * 32, y * 32, 'grass').setOrigin(0);
        }
    }

        //Ocultar jugador y controles al inicio
    puedeMover = false;
    player = this.physics.add.sprite(400, 300, 'personaje');
    player.setVisible(false);

    
    this.bienvenidaContainer = this.add.container(400, 300).setDepth(20).setVisible(true);

    let bienvenidaFondo = this.add.rectangle(0, 0, 500, 250, 0x000000, 0.8);
    let bienvenidaTexto = this.add.text(0, -40, '¡Bienvenido a la experiencia Visión Nova!\nPresiona ESPACIO para comenzar', {
        fontSize: '24px',
        color: '#ffffff',
        fontFamily: 'Arial',
        align: 'center'
    }).setOrigin(0.5);

    this.bienvenidaContainer.add([bienvenidaFondo, bienvenidaTexto]);

    this.input.keyboard.once('keydown-SPACE', () => {
        this.bienvenidaContainer.setVisible(false);
        player.setVisible(true);
        puedeMover = true;
    });

    // Calles
    colocarCalleHorizontal.call(this, 0, 16, 5, 'calleh');
    this.add.image(4 * 32, 16 * 32, 'esquinaID').setOrigin(0);
    colocarCalleVertical.call(this, 4, 13, 3, 'callev');
    this.add.image(4 * 32, 12 * 32, 'cruce').setOrigin(0);
    colocarCalleHorizontal.call(this, 0, 12, 4, 'calleh');
    colocarCalleVertical.call(this, 4, 7, 5, 'callev');
    this.add.image(4 * 32, 7 * 32, 'esquinaSD').setOrigin(0); 
    colocarCalleHorizontal.call(this, 0, 7, 4, 'calleh');
    colocarCalleHorizontal.call(this, 5, 9, 4, 'calleh');
    colocarCalleHorizontal.call(this, 5, 12, 4, 'calleh');
    colocarCalleVertical.call(this, 9, 0, 18, 'callev');
    this.add.image(9 * 32, 12 * 32, 'esquinaID').setOrigin(0);  
    colocarCalleHorizontal.call(this, 9, 12, 16, 'calleh');
    colocarCalleHorizontal.call(this, 0, 1, 25, 'calleh');
    this.add.image(9 * 32, 1 * 32, 'cruce').setOrigin(0);
    colocarCalleVertical.call(this, 14, 2, 16, 'callev');
    colocarCalleHorizontal.call(this, 0, 3, 25, 'calleh');
    this.add.image(14 * 32, 3 * 32, 'cruce').setOrigin(0);
    this.add.image(9 * 32, 3 * 32, 'cruce').setOrigin(0);
    colocarCalleVertical.call(this, 18, 0, 18, 'callev');
    colocarCalleVertical.call(this, 22, 0, 18, 'callev');
    this.add.image(18 * 32, 3 * 32, 'cruce').setOrigin(0);
    this.add.image(18 * 32, 12 * 32, 'cruce').setOrigin(0);
    this.add.image(22 * 32, 3 * 32, 'cruce').setOrigin(0);
    this.add.image(22 * 32, 12 * 32, 'cruce').setOrigin(0);
    this.add.image(22 * 32, 1 * 32, 'cruce').setOrigin(0);
    this.add.image(18 * 32, 1 * 32, 'cruce').setOrigin(0);
    this.add.image(14 * 32, 1 * 32, 'CArriba').setOrigin(0);
    this.add.image(9 * 32, 12 * 32, 'cruce').setOrigin(0);
    this.add.image(9 * 32, 9 * 32, 'esquinaID').setOrigin(0);

    
    
    // Obstáculos
    const obstaculos = this.physics.add.staticGroup();
    obstaculos.create(3.5 * 32, 9.5 * 32, 'barricada').setOrigin(0);
    obstaculos.create(13.5 * 32, 14 * 32, 'barricada').setOrigin(0);
    obstaculos.create(2.5 * 32, 12.2 * 32, 'coladera').setOrigin(0);
    obstaculos.create(10 * 32, 1.2 * 32, 'coladera').setOrigin(0);
    obstaculos.create(16 * 32, 11.5 * 32, 'basura').setOrigin(0);


  // Carros sin gravedad
carros = this.physics.add.group();

for (let i = 0; i < 2; i++) {
    let car = carros.create(8.6 * 32, (5 + i * 3) * 32, 'carD').setOrigin(0);
    car.setVelocityY(40 + i * 20);
    car.body.setAllowGravity(false);
    car.setImmovable(true);
}

const posicionesCarrosHorizontales = [
    { x: 22 * 32, y: 2.5 * 32 },
];

posicionesCarrosHorizontales.forEach((pos, index) => {
    let car = carros.create(pos.x, pos.y, 'carL').setOrigin(0);
    car.setVelocityX(-50 - index * 20); // Hacia la izquierda con velocidades distintas
    car.body.setAllowGravity(false);
    car.setImmovable(true);
});

const posicionesCarrosUp = [
    { x: 22 * 32, y: 16 * 32 },
    { x: 18 * 32, y: 16 * 32 },
];

posicionesCarrosUp.forEach((pos, i) => {
    let car = carros.create(pos.x, pos.y, 'carU').setOrigin(0);
    car.setVelocityY(-50 - i * 10); // velocidad negativa para subir
    car.body.setAllowGravity(false);
    car.setImmovable(true);
});

    // Meta
    meta = this.physics.add.staticImage(14 * 32, -0.1 * 32, 'meta').setOrigin(0);
    tesi = this.physics.add.staticImage(1 * 32, 14.5 * 32, 'tesi').setOrigin(0);

    //Semaforos
    semaforo = this.physics.add.staticImage(7.5 * 32, 10 * 32, 'semaforo').setOrigin(0);
    semaforo = this.physics.add.staticImage(13 * 32, 2 * 32, 'semaforo').setOrigin(0);

    // Jugador
    player = this.physics.add.sprite(10, 500, 'dude');
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    // Controles
    cursors = this.input.keyboard.createCursorKeys();

    // Colisiones
    this.physics.add.collider(player, obstaculos, onColision, null, this);
    this.physics.add.collider(player, carros, onColision, null, this);
    this.physics.add.collider(player, semaforo, onSemaforo, null, this);
    this.physics.add.overlap(player, meta, () => onGanar.call(this), null, this);

    //Puntos de control
    puntosControl = this.physics.add.staticGroup();
    puntosControl.create(2 * 32, 16 * 32, 'invisible').setSize(32, 32).setOrigin(0);
    puntosControl.create(4 * 32, 16 * 32, 'invisible').setSize(32, 32).setOrigin(0);
    puntosControl.create(4 * 32, 12 * 32, 'invisible').setSize(32, 32).setOrigin(0);
    puntosControl.create(7 * 32, 12 * 32, 'invisible').setSize(32, 32).setOrigin(0);
    puntosControl.create(10 * 32, 12 * 32, 'invisible').setSize(32, 32).setOrigin(0);
    puntosControl.create(14 * 32, 12 * 32, 'invisible').setSize(32, 32).setOrigin(0);
    puntosControl.create(14 * 32, 5 * 32, 'invisible').setSize(32, 32).setOrigin(0);
    puntosControl.create(14 * 32, 2 * 32, 'invisible').setSize(32, 32).setOrigin(0);
   

    this.physics.add.overlap(player, puntosControl, reproducirAudio, null, this);
    // Contenedor de mensaje "Ganaste"
    this.winContainer = this.add.container(400, 300).setDepth(10).setVisible(false);

    let bg = this.add.rectangle(0, 0, 400, 200, 0x000000, 0.7);
    let text = this.add.text(0, 0, '¡Ganaste!\n¡Adquiere tus VisionNova!', {
        fontSize: '32px',
        color: '#ffffff',
        fontFamily: 'Arial'
    }).setOrigin(0.5);

    this.winContainer.add([bg, text]);

    //Contenedor Perdiste
    this.loseContainer = this.add.container(400, 300).setDepth(10).setVisible(false);

    let loseBg = this.add.rectangle(0, 0, 400, 200, 0xff0000, 0.7);
    let loseText = this.add.text(0, 0, '¡Perdiste!\nIntenta de nuevo', {
    fontSize: '32px',
    color: '#ffffff',
    fontFamily: 'Arial'
    })  .setOrigin(0.5);

    this.loseContainer.add([loseBg, loseText]);
}


function update(time, delta) {
   
    //Controles
    if (!puedeMover || gameOver) return;

    const speed = 32;

    if (moveCooldown > 0) {
        moveCooldown -= delta;
        return;
    }

    if (cursors.left.isDown) {
        player.x -= speed;
        player.anims.play('left', true);
        moveCooldown = 200;
    } else if (cursors.right.isDown) {
        player.x += speed;
        player.anims.play('right', true);
        moveCooldown = 200;
    } else if (cursors.up.isDown) {
        player.y -= speed;
        player.anims.play('turn', true);
        moveCooldown = 200;
    } else if (cursors.down.isDown) {
        player.y += speed;
        player.anims.play('turn', true);
        moveCooldown = 200;
    } else {
        player.anims.play('turn');
    }

    // Movimiento de carros
    carros.children.iterate((car) => {
    if (car.texture.key === 'carD' && car.y > 600) {
        car.y = -32;
    }
    if (car.texture.key === 'carL' && car.x < -64) {
        car.x = 800;
    }
    if (car.texture.key === 'carU' && car.y < -64) {
        car.y = 600;
    }
});
}

function onColision() {
    gameOver = true;
    player.setTint(0xff0000);
    player.anims.stop();
    mostrarPerdiste.call(this);
}

function onSemaforo() {
    if (!puedeMover) {
        this.physics.pause();
        player.setTint(0xff0000);
    }
}

function onGanar() {
    gameOver = true;
    player.setTint(0x00ff00);
    player.anims.stop();
    this.sound.play('win');

    // Mostrar contenedor
    this.winContainer.setVisible(true);
    this.physics.pause();
}

function colocarCalleHorizontal(iniX, iniY, cantidad, claveSprite) {
    for (let i = 0; i < cantidad; i++) {
        this.add.image((iniX + i) * 32, iniY * 32, claveSprite).setOrigin(0);
    }
}

function colocarCalleVertical(iniX, iniY, cantidad, claveSprite) {
    for (let i = 0; i < cantidad; i++) {
        this.add.image(iniX * 32, (iniY + i) * 32, claveSprite).setOrigin(0);
    }
}

function reproducirAudio(jugador, punto) {
    
    if (punto.activado) return; 

    punto.activado = true;
    const x = punto.x;
    const y = punto.y;

    if (x === 2 * 32 && y === 16 * 32) {
        this.sound.play('3casiD');
    } else if (x === 4 * 32 && y === 16 * 32) {
        this.sound.play('4casiA');
    }  else if (x === 4 * 32 && y === 12 * 32) {
        this.sound.play('S3casiD');
    } else if (x === 7 * 32 && y === 12 * 32) {
        this.sound.play('alto');
    } else if (x === 10 * 32 && y === 12 * 32) {
        this.sound.play('4casiD');
    } else if (x === 14 * 32 && y === 12 * 32) {
        this.sound.play('6casiA');
    } else if (x === 14 * 32 && y === 5 * 32) {
        this.sound.play('alto');
    } else if (x === 14 * 32 && y === 2 * 32) {
        this.sound.play('1casiA');
    }
}

function mostrarPerdiste() {
    if (this.loseContainer.visible) return;
    this.sound.stopAll();  
    this.loseContainer.setVisible(true);
    this.sound.play('lose', { volume: 1 });
}