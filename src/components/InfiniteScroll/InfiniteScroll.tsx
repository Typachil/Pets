import React, { createRef, FC, useEffect, useRef, useState } from 'react';
import Masonry from 'react-masonry-css';
import './InfiniteScroll.scss'

interface propsInfiniteScroll{
    limit: number;
    children: React.ReactElement[]
}

const breakpointColumnsObj = {
    2100: 4,
    1600: 3,
    1279: 2,
    767: 1,
};

const InfiniteScroll : FC<propsInfiniteScroll> = ({limit, children}) =>  {
    const lastItem = useRef(null);
    const observerLoader = useRef(null);
    const [limitItems, setLimitItems] = useState<number>(0)
    const [items, setItems] = useState<React.ReactElement[]>(null)

    useEffect(() => {
        if (observerLoader.current) observerLoader.current.disconnect();
    
        observerLoader.current = new IntersectionObserver(actionInSight, {
            root: null,
            rootMargin: '5px',
            threshold: 0.5 
        });
        if (lastItem.current) observerLoader.current.observe(lastItem.current);

    }, [lastItem, items]);

    useEffect(() => setLimitItems(limit), [limit, children])

    useEffect(() => {
        let itemsSlice = children?.slice(0, limitItems);
        console.log(limitItems)
        itemsSlice = React.Children.map(itemsSlice, (child, i) => {
            if((i + 1) === limitItems){
                return React.createElement(child.type, { cardRef: lastItem, ...child.props}, null)
            }
            return React.createElement(child.type , {...child.props}, null)
        })
        console.log(itemsSlice)
        setItems(itemsSlice)
    }, [children, limitItems])

    const actionInSight = (entries : IntersectionObserverEntry[]) => {
        if (entries[0].isIntersecting && children.length > limitItems) {
            setLimitItems(limitItems + limitItems)
        }
    };

    return (
        <Masonry
                className={'masonry-grid'}
                columnClassName={'masonry-column'}
                breakpointCols={breakpointColumnsObj}>
                    {items}
        </Masonry>
    )
}

export default InfiniteScroll
