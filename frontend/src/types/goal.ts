export interface goalProps {
    _id: string
    title: string,
    description: string,
    targetValue: number,
    currentValue: number,
    unit: string,
    category: string,
    startedDate: string | Date,
    deadline: string | Date,
    completed: boolean
}

export interface createGoalProp {
    title: string,
    description: string,
    targetValue: number,
    unit: string,
    category: string,
}

export interface updateGoal {
    title: string,
    description: string,
}

export interface goalState {
    goalDatas: goalProps[];
    loading: boolean,
    error: string | null;
}