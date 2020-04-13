function Goal(x,y, w, h) {
  // ATTRIBUTES
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;

  // DRAWING FUNCTION
  this.show = function() {
    rectMode(CENTER);
    noFill();
    rect(this.x, this.y, this.w, this.h);
  }
}