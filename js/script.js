window.onload = function(){

    // 캔버스 drawing default
    const canvas = document.getElementById('jsCanvas');

    // 2d context를 가지고 왔고 context는 pixel을 다루기 위한 것.
    const context = canvas.getContext('2d');

    const initialColour = '#2c2c2c';

    // pixel을 다루는 캔버스의 사이즈가 얼만지 알려주기 위해 width, height 지정 필요
    // 이 값들을 지정할 때에만 pixel manipulation이 가능
    const canvasSize = 700;

    canvas.width = canvasSize;
    canvas.height = canvasSize;

    // 초기 배경화면 값 지정
    context.fillStyle = "#fff";
    context.fillRect(0,0,canvasSize,canvasSize)

    context.strokeStyle = initialColour;
    context.fillStyle = initialColour;
    context.lineWidth = 2.5;

    let painting = false;
    let filling = false;

    function stopPainting(){
        painting = false;
    }

    function startPainting(){
        painting = true;
    }

    function onMouseMove(event){
        const x = event.offsetX;
        const y = event.offsetY;

        if(!painting){
            // painting = false일 때는 x,y 좌표를 옮기면서 path를 만듦.
            context.beginPath();
            context.moveTo(x,y);
            // console.log('creating path in', x, y)
        }else{
            // painting = true일 때 시작점에서부터 line을 그린다. moveTo position에서부터 lineTo position까지
            // 마우스를 움직일 때마다 발생한다.
            context.lineTo(x,y);
            // stroke 가 선이 캔버스 위에 보여지게 만듦. 
            // 마우스를 움직일 때마다 발생한다.
            context.stroke()
            // console.log('creating line in', x, y)
        }
    }

    if(canvas){
        canvas.addEventListener('mousemove', onMouseMove)
        // mousedown: 마우스 클릭했을 때 이벤트 발생
        canvas.addEventListener('mousedown', startPainting)
        canvas.addEventListener('mouseup', stopPainting)
        canvas.addEventListener('mouseleave', stopPainting)
        canvas.addEventListener('click', handleCanvasClick)
        // contextmenu는 마우스 우클릭시 나타나는 메뉴이자 event
        canvas.addEventListener('contextmenu', handleContextMenu)
    }

    // changing colour

    const colour = document.getElementsByClassName('jsColour');
    
    // HTML Collection에서 array를 만들어 준다. 
    // console.log(Array.from(colour));

    Array.from(colour).forEach(colour => colour.addEventListener('click', handleColourClick))
        
    function handleColourClick(event){
        // console.log(event.target.style)
        const colour = event.target.style.backgroundColor;
        // console.log(colour);
        context.strokeStyle = colour;
        // 채우기 색상 지정
        context.fillStyle = colour;
    }

    // 기본 색상과 선의 굵기는 위에 context.strokeStyle && context.lineWidth로 지정돼 있음.

    // Changing line width
    const range = document.getElementById('jsRange');

    if(range){
        range.addEventListener('input', handleRangeChange)
    }

    function handleRangeChange(event){
        // console.log(event.target.value);
        const range = event.target.value;
        context.lineWidth = range;
    }

    //Changing mode
    const mode = document.getElementById('jsMode');

    function handleModeClick(event){
        if(filling){
            filling = false;
            mode.innerText = 'Fill';
        }else{
            filling = true;
            mode.innerText = 'Paint'
        }
    }

    if(mode){
        mode.addEventListener('click', handleModeClick)
    }

    function handleCanvasClick(){
        if(filling){
            context.fillRect(0,0,canvasSize,canvasSize)
        }
    }

    // Save 기능
    function handleContextMenu(event){
        console.log(event);
        // contextmenu가 나타나는 event를 preventDefault했기때문에 우클릭시 메뉴가 나타나지 않는다.
        event.preventDefault();
    }

    const saveBtn = document.getElementById('jsSave');

    if(saveBtn){
        saveBtn.addEventListener('click', handleSaveClick)
    }

    function handleSaveClick(){
        // toDataURL(type, encoderOptions)
        // image의 url 값을 가지고 온다.
        const image = canvas.toDataURL('image/jpeg');
        console.log(image);
        const link = document.createElement('a');
        // href는 이미지 && download는 이름이 되어야 함.
        link.href = image;
        link.download = 'paintJS[EXPORT]';
        console.log(link);
        link.click();
    }
}