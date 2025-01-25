import { useRef } from "react";

// SelectButtonコンポーネントは、setNowTime、setFirstTime、およびisInputDisabledの3つのプロップスを受け取る。
const SelectButton = ({ setNowTime, setFirstTime, isInputDisabled}: any) => {
    // useRefを使用して、入力要素への参照を作成する。
    // useRef：値変更した際、再レンダリングしない。
    // useState：値変更した際、再レンダリングする。
    let timeInput: any = useRef<any>(null);

    // 初回の時間を変更し、入力フィールドをクリアする関数
    const changeFirstTime = (firstTimeChange: number) => {
        setNowTime(firstTimeChange);    // 現在の時間を更新する。
        setFirstTime(firstTimeChange);   // 初回の時間を更新する。
        timeInput.current.value = "";   // 入力フィールドをクリアする。
    }

    // 入力フィールドの変更を処理する関数
    const changeInTime = (e: any) => {
        let thisTime: number = e.target.value;  // 入力値を取得する。

        // 入力値が０～８６４００秒の範囲内か確認する。
        if (thisTime < 0) {
            thisTime = 0;
        }
        else if (thisTime > 864000) {
            thisTime = 864000;
        }

        // 現在の時間を更新する。
        setNowTime(thisTime);

        // 初回の時間を更新する。
        setFirstTime(thisTime);

        // 検証された値を入力フィールドに設定する。
        e.target.value = thisTime;
    }

    return (
        <div className="my-2">
            <div className="my-2">
                {/* 事前定義された時間を設定するボタン */}
                <button
                    className="btn btn-outline-dark mx-1"
                    onClick={() => changeFirstTime(30)}
                    disabled={isInputDisabled}>３０秒</button>
                <button
                    className="btn btn-outline-dark mx-1"
                    onClick={() => changeFirstTime(60)}
                    disabled={isInputDisabled}>１分</button>
                <button
                    className="btn btn-outline-dark mx-1"
                    onClick={() => changeFirstTime(300)}
                    disabled={isInputDisabled}>５分</button>
                <button
                    className="btn btn-outline-dark mx-1"
                    onClick={() => changeFirstTime(600)}
                    disabled={isInputDisabled}>１０分</button>
            </div>
            <div>
                {/* カスタムの時間を入力するフィールド */}
                <input
                    type="number"
                    ref={timeInput}
                    onChange={changeInTime}
                    disabled={isInputDisabled}
                    placeholder="秒数"
                    min={1}
                    max={86400}/>
            </div>
        </div>
    );
}

export default SelectButton