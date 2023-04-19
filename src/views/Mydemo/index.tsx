import { Button } from 'antd';
import react, { useRef, useCallback, useState, useEffect } from 'react'
import './index.less'

function index() {

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const imgInstance = useRef<HTMLImageElement | null>(null);
    const [isPop, setIsPop] = useState<Boolean>(false)
    const [invalidLocations, setInvalidLocations] = useState<any[]>([]);

    const initCanvas = useCallback((node) => {
        canvasRef.current = node;
        const context = node?.getContext('2d');
        context?.drawImage(imgInstance?.current, 0, 0, 400, 400);
    }, []);

    const addInvalidLocation = useCallback((newMark) => {
        setInvalidLocations([...invalidLocations, newMark]);
    }, [invalidLocations])


    useEffect(() => {
        const canvasElem = canvasRef?.current;
        let x = 0; let y = 0;
        let isDrawing = false;
        const drawContext = canvasRef?.current!.getContext('2d');
        let canvasRect;
        const lastCursorPosition = {
            x: 0,
            y: 0,
        };
        const clearRect = (drawContext) => {
            drawContext.clearRect(0, 0, canvasRef?.current?.width, canvasRef?.current?.height);
        };
        const startDraw = (e) => {
            console.log(e.type, 'start');
            canvasRect = canvasRef?.current?.getBoundingClientRect();
            x = e.clientX - canvasRect.left;
            y = e.clientY - canvasRect.top;
            if (x < 0) x = 0;
            if (y < 0) y = 0;
            isDrawing = true;
        };
        const drawingDeal = (e) => {
            console.log(e.type, 'move');
            if (isDrawing) {
                const x1 = e.clientX - canvasRect.left;
                const y1 = e.clientY - canvasRect.top;
                clearRect(drawContext);
                highlightInvalid(drawContext, x, y, x1, y1);
                lastCursorPosition.x = x1;
                lastCursorPosition.y = y1;
            }
        };
        const drawingEnd = () => {
            if (isDrawing) {
                if (lastCursorPosition.x && lastCursorPosition.y) {
                    const width = lastCursorPosition.x - x + 1;
                    const height = lastCursorPosition.y - y + 1;
                    addInvalidLocation({ x, y, width, height });
                    lastCursorPosition.x = 0;
                    lastCursorPosition.y = 0;
                }
                clearRect(drawContext);
                isDrawing = false;
                x = 0;
                y = 0;
            }
        };
        canvasElem?.addEventListener('mousedown', startDraw);
        canvasElem?.addEventListener('mousemove', drawingDeal);
        canvasElem?.addEventListener('mouseup', drawingEnd);
        return () => {
            canvasElem?.removeEventListener('mousedown', startDraw);
            canvasElem?.removeEventListener('mousemove', drawingDeal);
            canvasElem?.removeEventListener('mouseup', drawingEnd);
        };
    }, [invalidLocations, addInvalidLocation]);
    const highlightInvalid = (context, x1, y1, x2, y2) => {
        context.beginPath();
        context.rect(x1, y1, x2 - x1, y2 - y1);
        context.fillStyle = 'rgba(255, 0, 0, 0.2)';
        context.fill();
        context.strokeStyle = '#FF0070';
        context.lineWidth = 1;
        context.stroke();
        console.log('drawing', x2, y2);
    };

    const chearMark = () => {



        setIsPop(!isPop)

        setInvalidLocations([])
    }
    const close = () => {
        setIsPop(false)
    }
    return (
        <div>
            <img src='src/assets/images/tu1.jpg' ref={imgInstance} className="App-logo" alt="logo" />
            <canvas className="canvas" ref={initCanvas} width="750px" height="750px" />
            <Button className="clearMark" onClick={chearMark}>清空标注</Button>
            <div className="img-wrap">
                {invalidLocations && invalidLocations.map((location, index) => {
                    const { width, height, x, y } = location;
                    return <div
                        key={`${width}_${height}_${x}_${y}`}
                        tabIndex={-1}
                        className={'remark'}
                        style={{ width: `${width}px`, height: `${height}px`, left: `${x}px`, top: `${y}px` }}
                    ></div>
                })}

            </div>
            {
                isPop
                &&
                <div className='myPop'>
                    <div className='close' onClick={close}>X</div>
                    <div className='concent'>
                        1<br />
                        1<br />1<br />1<br />1<br />1<br />1<br />1<br />1<br />1<br />1<br />
                        1<br />
                        1<br />1<br />1<br />1<br />1<br />1<br />1<br />1<br />1<br />1<br />1<br />
                        1<br />1<br />1<br />1<br />1<br />1<br />1<br />1<br />1<br />1<br />
                    </div>


                </div>}
        </div>
    )
}


export default index