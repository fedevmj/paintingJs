window.onload = function(){
    // 모달창
    const modal = document.getElementById('modal');
    const close = document.getElementById('close');

    function closeModal(){
        modal.style.display = 'none';
    }

    if(close){
        close.addEventListener('click', closeModal)
    }

    // 캔버스

    const canvas = document.getElementById('jsCanvas');
    const context = canvas.getContext('2d');
    const colour = document.getElementsByClassName('jsColour');
    const range = document.getElementById('jsRange');
    const saveBtn = document.getElementById('jsSave');
    const mode = document.getElementById('jsMode');
    const initialColour = '#2c2c2c';
    const canvasSize = 700;

    canvas.width = canvasSize;
    canvas.height = canvasSize;
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
            context.beginPath();
            context.moveTo(x,y);
        }else{
            context.lineTo(x,y);
            context.stroke()
        }
    }

    if(canvas){
        canvas.addEventListener('mousemove', onMouseMove)
        canvas.addEventListener('mousedown', startPainting)
        canvas.addEventListener('mouseup', stopPainting)
        canvas.addEventListener('mouseleave', stopPainting)
        canvas.addEventListener('click', handleCanvasClick)
        canvas.addEventListener('contextmenu', handleContextMenu)
    }

    Array.from(colour).forEach(colour => colour.addEventListener('click', handleColourClick))
        
    function handleColourClick(event){
        const colour = event.target.style.backgroundColor;
        context.strokeStyle = colour;
        context.fillStyle = colour;
    }

    if(range){
        range.addEventListener('input', handleRangeChange)
    }

    function handleRangeChange(event){
        const range = event.target.value;
        context.lineWidth = range;
    }

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

    function handleContextMenu(event){
        event.preventDefault();
    }

    if(saveBtn){
        saveBtn.addEventListener('click', handleSaveClick)
    }

    function handleSaveClick(){
        const image = canvas.toDataURL('image/jpeg');
        const link = document.createElement('a');
        link.href = image;
        link.download = 'paintJS[EXPORT]';
        link.click();
    }
}