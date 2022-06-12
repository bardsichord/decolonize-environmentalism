let canvas;
let bgForest, bgIce, bgBeach, bgFire, bgBanners; //background images
let BANNERS, CREDITS1, CREDITS2, FOREST, ICE, BEACH, FIRE; // the 5 'pages' of the canvas
let credits1, credits2; // two credits objects in corners
let bannerForest, bannerIce, bannerBeach, bannerFire; // four banner objects
let bubbles = []; // the array of 4 clickable bubbles on each page
let brd; // border size
let sgm; // segment length, one fifth of canvas excluding border
let bg; // canvas backgrtf color CSS property
let cStroke; // main stroke color
let backbutton; // the button to go back to start
let sidebarTitle, sidebarText, sidebarRef, sidebarURL; //html elements to modify
let fontName, fontRole; //fonts
let xml;
let validStates = ['forest', 'ice', 'beach', 'fire'];

function preload() {
  bgForest = loadImage('Images/bgForest.jpg');
  bgIce = loadImage('Images/bgIce.jpg');
  bgBeach = loadImage('Images/bgBeach.jpg');
  bgFire = loadImage('Images/bgFire.jpg');
  bgBanners = loadImage('Images/bgBanners.jpg');
  fontName = loadFont('Fonts/Header.otf');
  fontRole = loadFont('Fonts/Paragraph.ttf');
  xml = loadXML('texts.xml');
}
// 
// -------------------------------------------------
// 
// 
// --------------------setup------------------------
//     
function setup() {
  canvas = createCanvas(windowHeight, windowHeight);
  canvas.parent('canvas-holder');
  bg = select('#bgcolor');
  bg.style('background:#232321');
  
  for (i=0; i < 4; i++) {
    bubbles[i] = new Bubble();
  }
   
  brd = 5
  sgm = (height - (brd * 2)) / 5
  cStroke = color(234, 213, 144);
  
  backbutton = select('#header');
  backbutton.mousePressed(backtoStart);
  
  BANNERS = true;
  CREDITS1 = false;
  CREDITS2 = false;
  FOREST = false;
  ICE = false;
  BEACH = false;
  FIRE = false;
  
  sidebarTitle = select('#sidebar-title');
  sidebarText = select('#sidebar-text');
  sidebarRef = select('#sidebar-ref');
  sidebarURL = select('#sidebar-url');
  
  credits1 = new Credits (0, 0, 0, 1, 1, 0, 0, 1, 0);
  credits2 = new Credits (5, 5, 5, 4, 4, 5, 9, 5, 1);
  
  bannerForest = new Banner (171, 219, 180, 0, 1, 0, 3, 3, 0, 1, 0, 1, 3, 0);
  bannerIce = new Banner (225, 180, 225, 0, 3, 0, 5, 5, 0, 3, 0, 3, 5, 0);
  bannerBeach = new Banner (139, 135, 102, 0, 5, 2, 5, 5, 2, 5, 0, 5, 7, 5);
  bannerFire = new Banner (202, 179, 150, 2, 5, 4, 5, 5, 4, 5, 2, 7, 9, 5);
  
  noLoop();
}
// 
// -------------------------------------------------
// 
// 
// --------------------draw-------------------------
// 
function draw() {
  background(0, 0);
  //canvas in BANNERS state
  if(BANNERS === true) {
    image(bgBanners, coord(0), coord(0), sgm * 5, sgm * 5);
        
    bannerForest.place();
    bannerIce.place();
    bannerBeach.place();
    bannerFire.place();
    credits1.place();
    credits2.place();
  }
  //canvas in FOREST state
  else if (BANNERS === false &&
           FOREST === true) {
    image(bgForest, coord(0), coord(0), sgm * 5, sgm * 5);
    bg.style('background:#243B18');
    
    bubbles[0].place(coord(1), coord(3), 'forest');
    bubbles[1].place(coord(2.5), coord(1), 'forest');
    bubbles[2].place(coord(4), coord(1.5), 'forest');
    bubbles[3].place(coord(3), coord(4), 'forest');
    
    bubbles[0].showTitle();       
  }
  //canvas in ICE state
  else if (BANNERS === false &&
           ICE === true) {
    image(bgIce, coord(0), coord(0), sgm * 5, sgm * 5);
    bg.style('background:#4A2C56');
    
    bubbles[0].place(coord(2), coord(1), 'ice');
    bubbles[1].place(coord(4), coord(2), 'ice');
    bubbles[2].place(coord(3), coord(4.5), 'ice');
    bubbles[3].place(coord(1), coord(4), 'ice');
    
    bubbles[0].showTitle();
    
  }
  //canvas in BEACH state
  else if (BANNERS === false &&
           BEACH === true) {
    image(bgBeach, coord(0), coord(0), sgm * 5, sgm * 5);
    bg.style('background:#294C6B');
    
    bubbles[0].place(coord(0.5), coord(1), 'beach');
    bubbles[1].place(coord(3.5), coord(0.5), 'beach');
    bubbles[2].place(coord(4), coord(4.5), 'beach');
    bubbles[3].place(coord(1.5), coord(3.5), 'beach');
    
    bubbles[0].showTitle();
    
  }
  //canvas in FIRE state
  else if (BANNERS === false &&
           FIRE === true) {
    image(bgFire, coord(0), coord(0), sgm * 5, sgm * 5);
    bg.style('background:#852816');
    
    bubbles[0].place(coord(1), coord(1), 'fire');
    bubbles[1].place(coord(4), coord(1.5), 'fire');
    bubbles[2].place(coord(3.5), coord(3.5), 'fire');
    bubbles[3].place(coord(1.5), coord(4.5), 'fire');
    
    bubbles[0].showTitle();
    
  }
  else if (BANNERS === false &&
           CREDITS1 === true) {
    bg.style('background:#172920');
    push();
    fill(68, 202, 133)
    square(coord(0), coord(0), sgm * 5)
    pop();
    
    credits1.showText();
  }
  else if (BANNERS === false &&
           CREDITS2 === true) {
    bg.style('background:#351D0C');
    push();
    fill(208, 85, 46);
    square(coord(0), coord(0), sgm * 5);
    pop();
    
    credits2.showText();  
  }
  else {
    image(bgBanners, coord(0), coord(0), sgm * 5, sgm * 5);
    bg.style('background:#42423C');
  }
  //outline of art area
  push();
  strokeWeight(3);
  strokeCap(ROUND);
  strokeJoin(ROUND);
  stroke(234, 213, 144);
  noFill();
  square(coord(0), coord(0), sgm * 5)
  pop();
}
// 
// -------------------------------------------------
// 
// 
// ----------------class-Credits--------------------
// 
class Credits {
  constructor(x1, y1, x2, y2, x3, y3, m1, m2, index) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.x3 = x3;
    this.y3 = y3;
    this.m1 = m1;
    this.m2 = m2;
    this.index = index;
  }
  hovering() {
    if (this.m1 === 0) {
      if(
        mouseX > coord(this.m1) &&
        mouseX < brd + coord(this.m2) - mouseY &&
        mouseY > coord(this.m1) &&
        mouseY < brd + coord(this.m2) - mouseX
      ) {
      return true;
      }
      else {
      return false;
      }
    }
    else {
      if(
        mouseX > brd + coord(this.m1) - mouseY &&
        mouseX < coord(this.m2) &&
        mouseY > brd + coord(this.m1) - mouseX &&
        mouseY < coord(this.m2)
        ) {
        return true;
      }
      else {
        return false;
      } 
    }
  }
  cornerTint() {
    if (mouseOnCanvas() === true &&
        this.hovering() === false &&
       mouseIsPressed === true) {
      return 255;
    }
    else if(this.hovering() === true) {
      return 0;
    }
    else {
      return 100;
    }
  }
  place() {
    let cornercolor;
    if(mouseOnCanvas() === true &&
       mouseIsPressed === true) {
      cornercolor = color(0, this.cornerTint());
    }
    else {
      cornercolor = color(255, this.cornerTint());    
    }
    strokeWeight(3);
    strokeCap(ROUND);
    strokeJoin(ROUND);
    stroke(cStroke);
    fill(cornercolor);
    triangle(coord(this.x1), coord(this.y1), coord(this.x2), coord(this.y2), coord(this.x3), coord(this.y3)); 
  }
  ready() {
    if (this.hovering() === true) {
      return true;
    }
    else {
      return false;
    }
  }
  showText() {
    let credits = xml.getChildren('credits');
    let name = credits[this.index].getString('name');
    let role = credits[this.index].getString('role');
    let socials = credits[this.index].getString('socials');
    let blurb = credits[this.index].getContent();
    
    sidebarText.style('display: block');
    sidebarRef.style('display: block');
    sidebarText.html(blurb);
    sidebarRef.html(socials);
    
    push();
    textFont(fontName);
    fill(255);
    textSize(60);
    textAlign(CENTER, TOP);
    noStroke();
    if (name === "Bards Myrick") {
      text(name, coord(1), coord(1.5), sgm * 3, sgm * 2);
    }
    else {
      text(name, coord(1), coord(1), sgm * 3, sgm * 2);
    }
    pop();
    
    push();
    textFont(fontRole);
    fill(255);
    textSize(30);
    textAlign(CENTER, TOP);
    noStroke();
    text(role, coord(1), coord(3), sgm * 3, sgm * 2);
    pop();
  }
}
// 
// ----------------class-Banner--------------------
// 
class Banner {
  constructor(cR, cG, cB, x1, y1, x2, y2, x3, y3, x4, y4, m1, m2, m3) {
    this.cR = cR;
    this.cG = cG;
    this.cB = cB;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.x3 = x3;
    this.y3 = y3;
    this.x4 = x4;
    this.y4 = y4;
    this.m1 = m1;
    this.m2 = m2;
    this.m3 = m3;
  }
  hovering() {
    if(this.m3 === 0) {
      if(
        mouseX > brd + coord(this.m1) - mouseY &&
        mouseX < brd + coord(this.m2) - mouseY &&
        mouseX > coord(this.m3) &&
        mouseY > brd + coord(this.m1) - mouseX &&
        mouseY < brd + coord(this.m2) - mouseX &&
        mouseY > coord(this.m3)
      ) {
        return true;
      }
      else {
        return false;
      }
    }
    else {
      if(
        mouseX > brd + coord(this.m1) - mouseY &&
        mouseX < brd + coord(this.m2) - mouseY &&
        mouseX < coord(this.m3) &&
        mouseY > brd + coord(this.m1) - mouseX &&
        mouseY < brd + coord(this.m2) - mouseX &&
        mouseY < coord(this.m3)
      ) {
        return true;
      }
      else {
        return false;
      }
    }
  }
  bannerTint() {
    if (mouseOnCanvas() === true &&
        this.hovering() === false &&
       mouseIsPressed === true) {
      return 255;
    }
    else if(this.hovering() === true) {
      return 0;
    }
    else {
      return 100;
    }
  }
  place() {
    let bannercolor;
    if(mouseOnCanvas() === true &&
       mouseIsPressed === true) {
      bannercolor = color(0, this.bannerTint());
    }
    else {
      bannercolor = color(this.cR, this.cG, this.cB, this.bannerTint());    
    }
    strokeWeight(3);
    strokeCap(ROUND);
    strokeJoin(ROUND);
    stroke(cStroke);
    fill(bannercolor);
    quad(coord(this.x1), coord(this.y1), coord(this.x2), coord(this.y2), coord(this.x3), coord(this.y3), coord(this.x4), coord(this.y4))
  }
  ready() {
    if (this.hovering() === true) {
      return true;
    }
    else {
      return false;
    }
  }
}
// 
// ----------------class-Bubble--------------------
// 
class Bubble {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.state = 'forest';
    this.radius = 30;
    this.bubbleColor = color(255, 20);
  }
  place(x, y, state) {
    this.x = x;
    this.y = y;
    this.state = state;
    fill(this.bubbleColor);
    strokeWeight(2);
    stroke(255);
    ellipse(this.x, this.y, this.radius * 2);    
  }
  showTitle() {
    if (validStates.indexOf(this.state) === -1) {
      sidebarTitle.style('display: none');
      sidebarText.style('display: none');
      sidebarRef.style('display: none');
      sidebarURL.style('display: none');
      return
    }
    else {
    let page = xml.getChildren(this.state)[0];
    let title = page.getString('title');
    sidebarTitle.style('display: block');
    sidebarTitle.html(title);
    }
  }
  hovering(x, y) {
    let d = dist(x, y, this.x, this.y)
    if (d < this.radius) {
      this.bubbleColor = color(255, 100);
      return true;
    }
    else {
      this.bubbleColor = color(255, 20);
      return false;
    }    
  }
  showText(value) {
    if (validStates.indexOf(this.state) === -1) {
      sidebarTitle.style('display: none');
      sidebarText.style('display: none');
      sidebarRef.style('display: none');
      sidebarURL.style('display: none');
      return
    }
    else {
      let page = xml.getChildren(this.state)[0];
      let sections = page.getChildren('section')
      let blurb = sections[value].getContent();
      let ref = sections[value].getString('reference');
      let url = sections[value].getString('url');
      
      if (ref === "coming soon!") {
        sidebarURL.attribute('target', '_self');
      }
      else {
        sidebarURL.attribute('target', '_blank');
      }
      sidebarText.style('display: block');
      sidebarURL.style('display: block');
      sidebarRef.style('display: none');
      sidebarText.html(blurb);
      sidebarURL.attribute('href', url);
      sidebarURL.html(ref);
    }
  }
  hideText() {
    sidebarText.style('display: none');
    sidebarRef.style('display: none');
    sidebarURL.style('display: none');
  }
}
// 
// ----------------mouse-functions--------------------
// 
function mouseMoved() {
  for (i = 0; i < bubbles.length; i++) {
    bubbles[i].hovering(mouseX, mouseY);
  }
  redraw();
}

function mousePressed() {
  if (mouseOnCanvas() === true) {
    cStroke = color(0, 0);
    
    if (BANNERS === false) {
      for (i = 0; i < bubbles.length; i++) {
        if (bubbles[i].hovering(mouseX, mouseY)) {
          bubbles[i].showText(i);
          redraw();
          return;
        }
      }
      bubbles[0].hideText();
    }
  }
  redraw();
}
function mouseReleased() {
  cStroke = color(234, 213, 144);
  //go to FOREST
  if (BANNERS===true &&
      bannerForest.ready() === true) {
    BANNERS = false;
    CREDITS1 = false;
    CREDITS2 = false;
    FOREST = true;
    ICE = false;
    BEACH = false;
    FIRE = false;
  }
  //go to ICE
  else if (BANNERS===true &&
           bannerIce.ready() === true) {
    BANNERS = false;
    CREDITS1 = false;
    CREDITS2 = false;
    FOREST = false;
    ICE = true;
    BEACH = false;
    FIRE = false;
  }
  //go to BEACH
  else if (BANNERS===true &&
           bannerBeach.ready() === true) {
    BANNERS = false;
    CREDITS1 = false;
    CREDITS2 = false;
    FOREST = false;
    ICE = false;
    BEACH = true;
    FIRE = false;
  }
  //go to FIRE
  else if (BANNERS===true &&
           bannerFire.ready() === true) {
    BANNERS = false;
    CREDITS1 = false;
    CREDITS2 = false;
    FOREST = false;
    ICE = false;
    BEACH = false;
    FIRE = true;
  }
  //go to CREDITS1
  else if (BANNERS===true &&
           credits1.ready() === true) {
    BANNERS = false;
    CREDITS1 = true;
    CREDITS2 = false;
    FOREST = false;
    ICE = false;
    BEACH = false;
    FIRE = false;
  }
  //go to CREDITS2
  else if (BANNERS===true &&
           credits2.ready() === true) {
    BANNERS = false;
    CREDITS1 = false;
    CREDITS2 = true;
    FOREST = false;
    ICE = false;
    BEACH = false;
    FIRE = false;
  }
  else {
    //do nothing
  }
  redraw();
}
// 
// ----------------other-functions--------------------
// 
function coord(value){
  return brd + (sgm * value)
}
function backtoStart() {
  BANNERS = true;
  CREDITS1 = false;
  CREDITS2 = false;
  FOREST = false;
  ICE = false;
  BEACH = false;
  FIRE = false;
  
  sidebarTitle.style('display: none');
  sidebarText.style('display: none');
  sidebarRef.style('display: none');
  sidebarURL.style('display: none');
  
  redraw();
}
function mouseOnCanvas() {
  if(mouseX > 0 &&
     mouseY > 0 &&
     mouseX < width &&
     mouseY < height
     ) {
    return true;
  }
  else {
    return false;
  }
}   