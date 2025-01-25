import { useState, useRef } from "react";

// // OperateButtonコンポーネントは、setNowTime、firstTime、setIsInputDisabledの3つのプロップスを受け取る。
const OperateButton = ({ setNowTime, firstTime, setIsInputDisabled }: any) => {
    const [isResetDisabled, setIsResetDisabled] = useState<boolean>(true);

    // タイマーとボタンの参照を作成する。
    let timer: React.MutableRefObject<number | undefined> = useRef<number | undefined>(undefined);
    let startButton: React.MutableRefObject<any> = useRef<any>(null);
    let stopButton: React.MutableRefObject<any> = useRef<any>(null);
    let restartButton: React.MutableRefObject<any> = useRef<any>(null);

    // スタートボタン押下処理
    const startTimer = () => {
        changeButton(1);    // ボタンの表示を変更
        timer.current = window.setInterval(countDown, 1000);    // カウントダウンを１秒ごとに実行
        setIsResetDisabled(true); // リセットボタンを無効化
        setIsInputDisabled(true); // 入力を無効化
    }

    // カウントダウン処理
    const countDown = () => {
        setNowTime((prevTime: any) => {
            if (prevTime > 1) {
                return prevTime - 1; // 1秒減らす
                } else {
                return firstTime; // タイマーを初期時間にリセット
                }
        });
    };

    // ストップボタン押下処理
    const stopTimer = () => {
        clearInterval(timer.current); // タイマーをクリア
        changeButton(2); // ボタンの表示を変更
        setIsResetDisabled(false); // リセットボタンを有効化
        };

        // リスタートボタン押下処理
        const restartTimer = () => {
        changeButton(3); // ボタンの表示を変更
        setIsResetDisabled(true); // リセットボタンを無効化
        timer.current = window.setInterval(countDown, 1000); // カウントダウンを再開
        };

        // リセットボタン押下処理
        const resetTimer = () => {
        clearTimer(); // タイマーをクリア
        setIsInputDisabled(false); // 入力を有効化
        };

        // タイマークリア処理
        const clearTimer = () => {
        clearInterval(timer.current); // タイマーをクリア
        timer.current = undefined; // タイマー参照をリセット
        setNowTime(firstTime); // 現在の時間を初期時間にリセット
        changeButton(4); // ボタンの表示を変更
        setIsResetDisabled(true); // リセットボタンを無効化
        };

        // ボタン制御
        const changeButton = (num: number) => {
        if(num == 1) {
            startButton.current.style.display = 'none'; // スタートボタンを非表示
            stopButton.current.style.display = 'block'; // ストップボタンを表示
        } else if(num == 2) {
            stopButton.current.style.display = 'none'; // ストップボタンを非表示
            restartButton.current.style.display = 'block'; // リスタートボタンを表示
        } else if(num == 3) {
            stopButton.current.style.display = 'block'; // ストップボタンを表示
            restartButton.current.style.display = 'none'; // リスタートボタンを非表示
        } else {
            startButton.current.style.display = 'block'; // スタートボタンを表示
            stopButton.current.style.display = 'none'; // ストップボタンを非表示
            restartButton.current.style.display = 'none'; // リスタートボタンを非表示
        }
        }

        return (
        <div className='d-flex justify-content-center my-2'>
            <div className='mx-3'>
            <button
                onClick={startTimer}
                ref={startButton}
                className="btn btn-outline-primary text-center"
            >
                Start
            </button>
            <button
                onClick={stopTimer}
                ref={stopButton}
                className="btn btn-outline-danger text-center"
                style={{ display: 'none' }}
            >
                Stop
            </button>
            <button
                onClick={restartTimer}
                ref={restartButton}
                className="btn btn-outline-success text-center"
                style={{ display: 'none' }}
            >
                Restart
            </button>
            </div>
            <div className='mx-3'>
            <button
                onClick={resetTimer}
                className="btn btn-outline-warning text-center"
                disabled={isResetDisabled}
            >
                Reset
            </button>
            </div>
        </div>
        );
    }

export default OperateButton;
