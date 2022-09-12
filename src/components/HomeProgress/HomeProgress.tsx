import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeGoal } from '../../store/reducers/reducerUser';
import './HomeProgress.scss';

export default function HomeProgress() {
    const { userGoals } = useAppSelector(state => state.reducerUser);
    const { screen } = useAppSelector(state => state.reducerUI)
    const [sizeSvg, setSizeSvg] = useState(255)
    const [radiusCircle, setRadiusCircle] = useState(117)
    const dispatch = useAppDispatch();

    const PI = Math.PI;
    const percentOnGoal = 100 / userGoals.length;

    let partPieSucces = 0;
    let partPieHalfComplete = 0;
    let partPieCancel = 0;
    let completedPercent = 0;

    useEffect(() => {
        if(screen === 'tablet'){
            setSizeSvg(320);
            setRadiusCircle(140);
        }
        if(screen === 'mobile'){
            setSizeSvg(148);
            setRadiusCircle(49);
        }
        if(screen === 'desktop' || screen === 'laptop'){
            setSizeSvg(255);
            setRadiusCircle(117)
        }
    }, [screen])

    const changeStatusGoal = (id: number) => {
        dispatch(changeGoal(id));
    };

    const calculateRadiusPie = (partPie: number): number => {
        const relativeVariable = (2 / 100) * partPie;
        return PI * (radiusCircle * relativeVariable);
    };

    userGoals.map((item) => {
        switch (item.status) {
            case 'complete':
                completedPercent += percentOnGoal;
                partPieSucces += 1;
                return;
            case 'half-complete':
                completedPercent += percentOnGoal / 2;
                partPieHalfComplete += 1;
                return;
            case 'cancel':
                completedPercent += percentOnGoal;
                partPieCancel += 1;
                return;
            default:
                return;
        }
    });

    return (
        <div className='progress-daily'>
            <svg width={sizeSvg} height={sizeSvg}>
                <text x={screen === 'mobile' ? '43%': '35%'} y='55%' className='progress-daily__percent'>{`${Math.round(
                    completedPercent
                )}%`}</text>
                <circle
                    cx='50%'
                    cy='50%'
                    r={radiusCircle}
                    className='main-pie'
                    fill='transparent'
                />
                <circle
                    cx='50%'
                    cy='50%'
                    r={radiusCircle}
                    strokeDasharray={`${calculateRadiusPie(
                        (partPieCancel + partPieHalfComplete / 2 + partPieSucces) * percentOnGoal
                    )} 1000`}
                    className='cancel-pie'
                    fill='transparent'
                />
                <circle
                    cx='50%'
                    cy='50%'
                    r={radiusCircle}
                    strokeDasharray={`${calculateRadiusPie(
                        (partPieSucces + partPieHalfComplete / 2) * percentOnGoal
                    )} 1000`}
                    className='halfСomplete-pie'
                    fill='transparent'
                />
                <circle
                    cx='50%'
                    cy='50%'
                    r={radiusCircle}
                    strokeDasharray={`${calculateRadiusPie(partPieSucces * percentOnGoal)} 1000`}
                    className='success-pie'
                    fill='transparent'
                />
            </svg>
            <div className='progress-daily__goals-list' style={{'height': sizeSvg + 'px'}}>
                <h5>Ежедневный прогресс</h5>
                <ul>
                    {userGoals.map((item) => {
                        const { id, name, status } = item;
                        return (
                            <li
                                key={id}
                                className={`progress-daily__goals-item progress-daily__goals-item_${status}`}
                                onClick={() => changeStatusGoal(id)}>
                                <span></span>
                                {name}
                                {status === 'half-complete' ? ' 1/2' : null}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
