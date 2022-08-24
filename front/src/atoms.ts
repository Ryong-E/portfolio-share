import { atom, selector } from "recoil";

export interface IUser {
    id: string;
    token: string;
    email: string;
    name: string;
    password: string;
    picture: string;
    description: string;
    hopeField: EHopeField;
    createdAt: Date;
    updatedAt: Date;
    educations?: IEducation[];
    awards?: IAward[];
    certificate?: ICertificate[];
    projects?: IProject[];
}
export enum EHopeField {
    undefined = "미정",
    backEnd = "백엔드",
    frontEnd = "프론트엔드",
    dataAnalysis = "데이터분석",
    AI = "인공지능",
}
export interface IEducation {
    school: string;
    major: string;
    status: EduStatus;
}
export enum EduStatus {
    attending = "재학중",
    bachelor = "학사졸업",
    master = "석사졸업",
    doctor = "박사졸업",
}
export interface IAward {
    title: string;
    grade: string;
    org: string;
    date: string;
    description: string;
}
export interface ICertificate {
    title: string;
    date: number; //Date
    org: string;
    description: string;
}
export interface IProject {
    title: string;
    startDate: number; //Date
    endDate: number; //Date
    description: string;
}

export const curUserState = atom<IUser | null>({
    key: "curUser",
    default: null,
});
export const usersState = atom<IUser[]>({
    key: "user",
    default: [
        {
            id: "1",
            token: "1",
            email: "chspower1@gmail.com",
            name: "조호성",
            password: "1",
            picture: "1",
            description: "프론트엔드장",
            hopeField: EHopeField.frontEnd,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: "2",
            token: "1",
            email: "Lee@gmail.com",
            name: "이준의",
            password: "1",
            picture: "1",
            description: "팀장",
            hopeField: EHopeField.AI,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: "3",
            token: "2",
            email: "han@elice.com",
            name: "한동룡",
            password: "2",
            picture: "2",
            description: "서기",
            hopeField: EHopeField.frontEnd,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: "4",
            token: "3",
            email: "jung@elice.com",
            name: "정소희",
            password: "3",
            picture: "3",
            description: "백엔드장",
            hopeField: EHopeField.frontEnd,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: "5",
            token: "3",
            email: "kim@elice.com",
            name: "김경원",
            password: "3",
            picture: "3",
            description: "응원단장",
            hopeField: EHopeField.frontEnd,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ],
});

export const isDarkState = atom({
    key: "isDark",
    default: false,
});

export const isLoginState = selector({
    key: "isLogin",
    get: ({ get }) => {
        const curUser = get(curUserState);
        const checkLogin = curUser?.token && true;
        return checkLogin;
    },
});
