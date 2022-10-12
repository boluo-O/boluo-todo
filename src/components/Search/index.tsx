import { useState, useEffect, FC, KeyboardEvent } from 'react'
import { SearchEngine } from './interface'
import './style.less'



const searchEngineList: SearchEngine[] = [
    {
        name: '百度',
        searchUrl: 'https://www.baidu.com/s?ie=UTF-8&wd=',
        img: 'baidu.jpg',
    },
    {
        name: '谷歌',
        searchUrl: 'https://www.google.com/search?q=',
        img: 'google.jpg',
    },
    {
        name: '必应',
        searchUrl: 'https://cn.bing.com/search?q=',
        img: 'bing.jpg',
    },
    {
        name: 'stackoverflow',
        searchUrl: 'https://stackoverflow.com/search?q=',
        img: 'stackoverflow.ico',
    },
    {
        name: '知乎',
        searchUrl: 'https://www.zhihu.com/search?type=content&q=',
        img: 'zhihu.ico',
    },
    {
        name: '掘金',
        searchUrl: 'https://juejin.cn/search?query=',
        img: 'juejin.ico',
    },
]

const Search: FC = () => {
    const [isFocus, setIsFocus] = useState<boolean>(false)
    const focusClass = isFocus ? 'focus' : ''
    const [inputValue, setInputValue] = useState<string>('')
    const [activeEngineIndex, setActiveEngineIndex] = useState<number>(0)

    const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        const url = searchEngineList[activeEngineIndex]['searchUrl'] + inputValue
        window.open(url)
    }

    const onTab = (e: KeyboardEvent<HTMLInputElement>, isShift: boolean = false) => {
        e.preventDefault()
        const searchEngineNum = searchEngineList.length
        // 向左/右切换搜索引擎
        const step = isShift ? -1 : 1
        const _activeEngineIndex = (activeEngineIndex + step + searchEngineNum) % searchEngineNum
        setActiveEngineIndex(_activeEngineIndex)
    }

    const keyDownEventEnum = {
        'Tab': onTab,
        'shiftTab': (e: KeyboardEvent<HTMLInputElement>) => onTab(e, true),
        'Enter': onEnter,
    }

    const runKeyDownEvent = (e: KeyboardEvent<HTMLInputElement>) => {
        const { key, shiftKey } = e
        const fullKey = `${shiftKey ? 'shift' : ''}${key}`
        keyDownEventEnum[fullKey as keyof typeof keyDownEventEnum] && keyDownEventEnum[fullKey as keyof typeof keyDownEventEnum](e)
    }

    return (
        <div className='search'>
            <div className='search-engine-list'>
                {
                    searchEngineList.map((searchEngine: SearchEngine, index) => (
                        <div className={`search-engine-item ${activeEngineIndex === index ? 'active' : ''}`} key={index}>
                            <img onClick={() => setActiveEngineIndex(index)} src={`/images/${searchEngine.img}`} />
                        </div>
                    ))
                }
            </div>
            <div className={`search-input ${focusClass}`}>
                <div className='img-search'><img src='/images/search.jpg' /></div>
                <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => isFocus && runKeyDownEvent(e)}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)} />
            </div>
        </div>
    )
}

export default Search