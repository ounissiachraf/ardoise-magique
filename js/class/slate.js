class slate{

    //constructeur

    constructor(){
        this.canvas='';
        this.position={x:0,y:0};
    }

    setposition(){
        this.position = position;
    }

    draw(ctx){
        ctx.beginPath();
        ctx.moveTo(x,y);
        ctx.lineTo(this.position.x,this.position.y);
        ctx.strokeStyle= this.color;
        ctx.lineWidth = this.size;
        ctx.stroke();
        x=this.position.x;
        y=this.position.y;
    }
}