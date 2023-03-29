let rows=document.querySelectorAll('.row');
let a=[],b=[];
let s=[],t=[],size=1;
let lastkey;

for (let i=0;i<10;i++){
    a[i]=new Array(10);
    b[i]=new Array(10);
}

for (let i=0;i<10;i++){
    let cells=rows[i].children;
    for (let j=0;j<10;j++){
        cells[j].classList.add(`c${i}-${j}`);
        a[i][j]=cells[j];
    }
}

let x=5,y=5,dx=0,dy=0;
let m=getrandom(0,9),n=getrandom(0,9);
while (b[m][n]==true)
{
    m=getrandom(-1,10);
    n=getrandom(-1,10);
}
a[5][5].classList.add('snake');
b[5][5]=true;
a[m][n].classList.add('apple');
s.push(5);
t.push(5);

document.documentElement.addEventListener('keydown',setkey);

function setkey(e)
{
    if (e.key=='w' && lastkey!='s')
    {
        lastkey=e.key;
        dx=-1;
        dy=0;
    }
    if (e.key=='a' && lastkey!='d')
    {
        lastkey=e.key;
        dx=0;
        dy=-1;
    }
    if (e.key=='s' && lastkey!='w')
    {
        lastkey=e.key;
        dx=1;
        dy=0;
    }
    if (e.key=='d' && lastkey!='a')
    {
        lastkey=e.key;
        dx=0;
        dy=1;
    }
}

document.documentElement.addEventListener('touchstart',settouchstart);

document.documentElement.addEventListener('touchend',settouchend);

let stx,sty;
let enx,eny;

function settouchstart(e)
{
    let a=e.changedTouches[0];
    stx=a.pageX;
    sty=a.pageY;
}

function settouchend(e)
{
    let a=e.changedTouches[0];
    enx=a.pageX;
    eny=a.pageY;
    console.log(stx,sty,enx,eny);
    if (Math.abs(stx-enx)>=Math.abs(sty-eny))
    {
        if (stx>enx)
        {
            dx=0;
            dy=-1;
        }
        else
        {
            dx=0;
            dy=1;
        }
    }
    else
    {
        if (sty>eny)
        {
            dx=-1;
            dy=0;
        }
        else
        {
            dx=1;
            dy=0;
        }
    }
}


let qwe=setInterval(function(){
    x+=dx;
    y+=dy;
    if (x==m && y==n)
    {
        a[m][n].classList.remove('apple');
        b[m][n]=true;
        s.push(m);
        t.push(n);
        size+=1;
        m=getrandom(-1,10);
        n=getrandom(-1,10);
        while (b[m][n]==true)
        {
            m=getrandom(-1,10);
            n=getrandom(-1,10);
        }
        a[m][n].classList.add('apple');
    }
    else
    {
        for (let i=0;i<10;i++) for (let j=0;j<10;j++)
        {
            b[i][j]=false;
            a[i][j].classList.remove('snake');
        }
        for (let i=0;i<size-1;i++)
        {
            s[i]=s[i+1];
            t[i]=t[i+1];
            a[s[i]][t[i]].classList.add('snake');
            b[s[i]][t[i]]=true;
        }
        s[size-1]+=dx;
        t[size-1]+=dy;
        if (s[size-1]<0 || s[size-1]>9 || t[size-1]<0 || t[size-1]>9)
        {
            setTimeout(function()
            {
                clearInterval(qwe);
                alert("game over");
                location.reload();
            },25)
        }
        if (b[s[size-1]][t[size-1]]==true)
        {
            setTimeout(function()
            {
                clearInterval(qwe);
                alert("game over");
                location.reload();
            },25)
        }
        else
        {
            b[s[size-1]][t[size-1]]=true;
        }
    }
    a[x][y].classList.add('snake');
},250)

function getrandom(maxi,mini)
{
    maxi=maxi+1;
    let ans=Math.random()*(maxi-mini)+mini;
    return Math.floor(ans);
}