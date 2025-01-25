import { useEffect, useState } from "react";

// TimeViewコンポーネントは、nowTimeとfirstTimeの2つのプロップスを受け取る。
const TimeView = ({ nowTime, firstTime }: any) => {
    // dashArrayの状態を管理するためのuseStateフック
    const [dashArray, setDashArray] = useState<any>();

    // 秒数をフォーマットする関数
    const formatTime = (seconds: number): string => {
        const hours = Math.floor(seconds / 3600);   // 時間
        const minutes = Math.floor((seconds % 3600) / 60)   // 残り時間
        const remainingSeconds = seconds % 60;  // 残りの秒

        if (hours > 0) {
            // 3600秒以上の場合 hh:mm:ss 形式
            return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
        }
        else {
            // 3600秒未満の場合 mm:ss 形式
            return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
        }
    }

    // nowTimeが変更されたときにdashArrayを設定するuseEffectフック
    useEffect(() => {
        setDashArray(() => {
            const percentage: number = 100 - (nowTime / firstTime) * 100;

            if (nowTime == firstTime) {
                return "0 100";
            } else if (nowTime === 0) {
                return "100 0";
            } else {
                return percentage + " 100";
            }
        });
    }, [nowTime]);

    return (
        <svg width="300" height="300" viewBox="0 0 40 40" className="my-2">
          <circle
            cx="20"
            cy="20"
            r="16"
            fill="none"
            stroke="#F2F2F2"
            strokeWidth="3"
          />
          <circle
            cx="20"
            cy="20"
            r="16"
            fill="none"
            stroke="#2fb6f0"
            strokeWidth="3"
            strokeDasharray={`${dashArray}`}
            transform="rotate(-90 20 20)"
          />
          <text
            x="20"
            y="21"
            fontSize=".5em"
            textAnchor="middle"
            dominantBaseline="middle">
          {formatTime(nowTime)}
          </text>
        </svg>    
      );
}

export default TimeView;