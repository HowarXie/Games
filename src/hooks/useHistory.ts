import { useState } from "react";

function useHistory<T>(init: T, clone: (oldValue: T) => T) {
    const [current, setCurrent] = useState(clone(init));
    const [history, setHistory] = useState({
        canBack: false,
        previous: clone(init)
    });

    const goBack = () => {
        if (!history.canBack) {
            return;
        }

        setCurrent(clone(history.previous));
        setHistory({
            canBack: false,
            previous: clone(history.previous)
        })
    };

    const record = (future: T, canBack?: boolean) => {
        setCurrent(clone(future));
        setHistory({
            canBack: canBack ?? true,
            previous: clone(current)
        });
    };

    const clear = (future?: T) => {
        setCurrent(clone(future ?? init));
        setHistory({
            canBack: false,
            previous: clone(init)
        });
    };

    return [{ current, history }, { setCurrent, goBack, record, clear }];
}

export default useHistory;