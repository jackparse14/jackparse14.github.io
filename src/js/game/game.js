const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.rect(20,40,50,50);
ctx.fillstyle = "#FF0000";
ctx.fill();
ctx.closePath();