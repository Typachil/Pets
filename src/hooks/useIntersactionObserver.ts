import { useEffect } from "react";

export interface propsIntersactionObserver{
    observer: React.MutableRefObject<any>;
    observable: React.RefObject<any>;
    callback: any;
}

const useIntersactionObserver = ({observer, observable, callback}: propsIntersactionObserver) => {
    useEffect(() => {
        if (observer.current) observer.current.disconnect();
    
        observer.current = new IntersectionObserver(callback);
        if (observable.current) observer.current.observe(observable.current);
    }, [observable]);

    return {
        observer
    }
}

export default useIntersactionObserver;
