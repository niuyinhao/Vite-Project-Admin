import { useEffect, useState, useRef } from 'react'
import './index.css'
const InsureItem = (props) => {
    const { name, age, sex, seqond, } = props.policy
    const { delHandel, index } = props
    const [isShow, setIsShow] = useState(false)
    const collapsePanel = useRef(null);
    const [collapseOriginalHeight, setCollapseOriginalHeight] = useState('auto');
    useEffect(() => {
    }, []);
    useEffect(() => {
        if (index === 0) {
            setIsShow(true)
        }
        setCollapseOriginalHeight(`${collapsePanel.current.scrollHeight}px`);

        // return console.log('11');
    }, [])

    const collapseStyle = {
        height: isShow ? '0px' : `${collapseOriginalHeight}`,
    }
    return (
        <div>
            <div
                key={new Date() + '1'}
                className='item-insure'
            >
                <div className='name'>
                    {name + index}
                </div>
                <div
                    className='delbtn'
                    onClick={() => delHandel(index)}
                >删除</div>
                <span
                    className={isShow ? 'jiantouTop' : 'jiantouBot'}
                    onClick={() => setIsShow(!isShow)}
                ></span>
            </div>
            <ul
                ref={collapsePanel}
                style={collapseStyle}
                className='MyCollapsePanel'
            >
                <li>{name}</li>
                <li>{age}</li>
                <li>{sex}</li>
                <li>{seqond}</li>
            </ul>
            {/* <ListItem policy={prop.policy} isShow={isShow} /> */}

        </div>
    )
}
export default InsureItem