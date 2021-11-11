'use strict'

let canvas = document.querySelector('#canvas');
let palette = document.querySelector('#palette')
let eraser = document.querySelector('.eraser');
let paint = document.querySelector('.paint');
let colors = document.querySelectorAll('.circle');

let color,size;

let ctx = canvas.getContext('2d');
let context = palette.getContext('2d');

const offset = canvas.getBoundingClientRect();

const styles = window.getComputedStyle(canvas);
var x,y;
var test=false;


function dessiner(event){
    
     x= event.clientX - offset.left - parseInt(styles.borderLeftWidth);
     y= event.clientY - offset.top - parseInt(styles.borderTopWidth);
     test=true;
}
 function drawing(event){

  

if(test){
    var x1= event.clientX - offset.left - parseInt(styles.borderLeftWidth);

    var y1= event.clientY - offset.top - parseInt(styles.borderTopWidth);

    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x1,y1);


    if(color!='')
    ctx.strokeStyle= color;
    else
    ctx.strokeStyle= 'black';

    ctx.lineWidth = size;
    ctx.stroke();
    x=x1;
    y=y1;
}

}

function stop(){
    test=false;
}

function deleteAll(){
    ctx.clearRect(0, 0, 600, 500);
}

function choix(){
    palette.classList.remove('palette'); 
    palette.classList.add('show');
    let gradient = context.createLinearGradient(0, 0, palette.width, 0);

        // Dégradé rouge -> vert -> bleu horizontal.
        gradient.addColorStop(0, 'rgb(255,   0,   0)');
        gradient.addColorStop(0.15, 'rgb(255,   0, 255)');
        gradient.addColorStop(0.32, 'rgb(0,     0, 255)');
        gradient.addColorStop(0.49, 'rgb(0,   255, 255)');
        gradient.addColorStop(0.66, 'rgb(0,   255,   0)');
        gradient.addColorStop(0.83, 'rgb(255, 255,   0)');
        gradient.addColorStop(1, 'rgb(255,   0,   0)');

        context.fillStyle = gradient;
        context.fillRect(0, 0, palette.width, palette.height);

        gradient = context.createLinearGradient(0, 0, 0, palette.height);

        // Dégradé blanc opaque -> transparent -> noir opaque vertical.
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
        gradient.addColorStop(0.5, 'rgba(0,     0,   0, 0)');
        gradient.addColorStop(1, 'rgba(0,     0,   0, 1)');

        context.fillStyle = gradient;
        context.fillRect(0, 0, palette.width, palette.height);
}

function getcolor(event){
    const offset1 = palette.getBoundingClientRect();
    const style = window.getComputedStyle(palette);
    let x2= event.clientX - offset1.left - parseInt(style.borderLeftWidth);
    let y2= event.clientY - offset1.top - parseInt(style.borderTopWidth);
    
    
    var pixel=context.getImageData(x2,y2,1,1);
    color="rgb("+pixel.data[0]+","+pixel.data[1]+","+pixel.data[2]+")";
    console.log(color);
}
document.addEventListener('DOMContentLoaded', function(){
    canvas.addEventListener('mousedown', dessiner);
    canvas.addEventListener('mousemove', drawing);
    canvas.addEventListener('mouseup', stop);
    canvas.addEventListener('mouseout', stop);
    eraser.addEventListener('click',deleteAll);

    for(let i=0;i<colors.length;i++)
    {
        colors[i].addEventListener('click',function(){
            color=this.id;
        });
    }

    paint.addEventListener('click',choix);
    palette.addEventListener('click',getcolor);

    document.querySelector('.fin').addEventListener('click',function(){
        size=1;
    });

    document.querySelector('.normal').addEventListener('click',function(){
        size=2.5;
    });

    document.querySelector('.epais').addEventListener('click',function(){
        size=5;
    });
});
