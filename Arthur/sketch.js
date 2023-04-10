
//declarar as variaveis:
//hunter(sprite e img),
//os monstros
//boss





// if(monstro1Vida ===0 && monstro2Vida ===0 ){ // //estado do jogo = 1 
// } //&& satisfazer todas as condições 
//monstro2 tirar vida e destruir 
//implementar uma maneira dele ganhar vida 
//dica: vida pode ser um coração gerado aleatório

var gameState = 0;

var hunter,hunterImg;

var monstro1,monstro1Img;
var monstro2,monstro2Img;
var monstro3,monstro3Img;

var boss,bossImg;

var selva,selvaImg
var cidade,cidadeImg;

var osso,ossoImg
var ossoGroup;

var machado,machadoImg;
var machadoGroup;
var machado2,machado2Img
var machadoGroup2;

var peixe,peixeImg;
var peixeGroup;

var fogo,fogoImg;
var fogoGroup;

var vida = 2;
var vidaMonstro1 = 2;
var vidaMonstro2 = 2;
var vidaMonstro3 = 2;

var coracao,coracaoImg;



function preload() {
    //carrega as imagens dentro das variaveis 
    hunterImg = loadImage("./imagens/soldado.png");
    monstro1Img = loadImage("./imagens/monstro1.png");
    monstro2Img =loadImage("./imagens/monstro2.png");
    monstro3Img = loadImage("./imagens/monstro3.png");
    bossImg = loadImage("./imagens/boss.jpg");
    selvaImg = loadImage("./imagens/selva.jpg");
    cidadeImg = loadImage("./imagens/cidade.jpg");
    ossoImg = loadImage("./imagens/osso.png");
    machadoImg = loadImage("./imagens/machado.png");
    peixeImg = loadImage("./imagens/peixe.png");
    fogoImg = loadImage("./imagens/fogo.png");
    machado2 = loadImage("./imagens/machado2.png");
    coracaoImg = loadImage("./imagens/coracao.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);//adaptatividade
    //criar um sprite para ser plano de fundo
    //criar os sprites dos personagens e posiciona-los
    //o personagem aparece o tempo todo? //boss = invisivel
    selva = createSprite(600,250,windowWidth,windowHeight)
    selva.addImage(selvaImg);
    selva.scale = 0.35;
    
    cidade =createSprite(600,250,windowWidth,windowHeight);
    cidade.addImage(cidadeImg);
    cidade.scale = 0.47;

    coracao = createSprite(1400,random(50,500));
    coracao.addImage(coracaoImg);
    coracao.scale = 0.1;

    hunter = createSprite(750,350)
    hunter.addImage(hunterImg);
    hunter.scale = 0.2

    boss = createSprite(790,240);
    boss.addImage(bossImg);
    boss.scale = 0.5
    boss.visible = false;

    monstro1 = createSprite(1435,50)
    monstro1.addImage(monstro1Img);
    monstro1.scale = 0.2;

    monstro2 = createSprite(50,450);
    monstro2.addImage(monstro2Img);
    monstro2.scale = 0.2

    monstro3 = createSprite(1425,500);
    monstro3.addImage(monstro3Img)
    monstro3.scale = 0.2;
    monstro3.visible = false;

    //ossoGroup = createGroup();
    ossoGroup = new Group();
    machadoGroup = new Group();
    peixeGroup =new Group();
    fogoGroup = new Group();
}


function draw() {

    background("black");
    

    drawSprites();

    if(keyDown(UP_ARROW)){
        hunter.position.y -= 7;
    }

    if(keyDown(DOWN_ARROW)){
        hunter.position.y += 7;
    }

    if(keyDown(LEFT_ARROW)){
        hunter.position.x -= 7;
    }

    if(keyDown(RIGHT_ARROW)){
        hunter.position.x += 7;
    }



    textSize(20);
    text("Vida:" + vida, 500, 50);
    console.log(vida);

    //cenario da selva
    if(gameState === 0){

        selva.visible = true;
        cidade.visible = false;
    
        monstro1.visible = true;

        monstro2.visible  = true;

        ossoCaveira();
        jogarPeixe();
        jogarMachado();
        
        if(ossoGroup.isTouching(hunter)){
        vida = vida -1;
        osso.destroy();
        }

        if(peixeGroup.isTouching(hunter)){
            vida = vida -1;
            peixe.destroy();

        }

        if(machadoGroup.isTouching(monstro1)){
            vidaMonstro1 = vidaMonstro1 -1
            machado.destroy();
        }

        if(vidaMonstro1 === 0){
            monstro1.destroy();
            
        
        }

        if(machadoGroup.isTouching(monstro2)){
            vidaMonstro2 = vidaMonstro2 -1
            machado.destroy();
        }

        if(vidaMonstro2 === 0){
            monstro2.destroy();
            osso.destroy();
        }

        if(vidaMonstro1 === 0 && vidaMonstro2 === 0){
            gameState = 1;
        }

        if(hunter.isTouching(coracao)){
            vida = vida + 1;
            coracao.destroy();
        }
    
    }



    //cenario da cidade
    if(gameState === 1){
        selva.visible = false;
        cidade.visible = true;
        monstro1.visible= false;
        monstro2.visible = false;
        monstro3.visible = true;
        jogarFogo();
        jogarMachado();

        if(fogoGroup.isTouching(hunter)){
            vida = vida -1;
            fogo.destroy();

        }

        if(machadoGroup.isTouching(monstro3)){
            vidaMonstro3 = vidaMonstro3 -1
            machado.destroy();
        }

        if(vidaMonstro3 === 0){
            monstro3.destroy();
        }

        if(vidaMonstro3 === 0){
            boss.visible = true;
            fogo.destroy();
        }
    }
    
}


function ossoCaveira(){
    if(frameCount % 100 === 0 ){

        osso = createSprite(monstro2.position.x,monstro2.position.y);
        osso.addImage(ossoImg);
        osso.scale =0.1
        osso.velocity.y = -2.0;
        osso.velocity.x = 30;
        osso.lifetime = 200;

        monstro2.position.y = random(50,500);

        ossoGroup.add(osso);

    }
}   

function jogarMachado(){
    if(frameCount % 10 === 0 ){

        machado = createSprite(hunter.position.x,hunter.position.y);
        machado.addImage(machadoImg);
        machado.scale =0.1
        machado.velocity.x = 50.5;
        machado.lifetime = 200;

        machadoGroup.add(machado);
    }
}

function jogarPeixe(){
    if(frameCount % 100 === 0 ){

        peixe = createSprite(monstro1.position.x,monstro1.position.y);
        peixe.addImage(peixeImg);
        peixe.scale =0.1
        peixe.velocity.x = -15.5;
        peixe.lifetime = 200;

        monstro1.position.y = random(50,500)
        

        peixeGroup.add(peixe);
    }
}

function jogarFogo(){
    if(frameCount % 50 === 0 ){

        fogo = createSprite(monstro3.position.x,monstro3.position.y);
        fogo.addImage(fogoImg);
        fogo.scale =0.1
        fogo.velocity.x = -20.5;
        fogo.lifetime = 200;

        monstro3.position.y = random(50,500)

        fogoGroup.add(fogo);

        
    }
}


//fazer "armas" dos demais monstros //ajustar as posições //ajustar cenário