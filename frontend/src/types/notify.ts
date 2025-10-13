export interface notifyProps {
    _id: string;
    title: string;
    message: string;
    read: boolean;
    link?: string;
    createdAt: string | Date
}

export interface notifyState {
    notifyDatas: notifyProps[];
    error: string | null;
    loading: boolean;
}
