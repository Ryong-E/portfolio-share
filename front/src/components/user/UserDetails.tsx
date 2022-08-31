import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import Education from "@education/Education";
import Award from "@award/Award";
import Certificate from "@certificate/Certificate";
import Project from "@project/Project";
import { Category, getUser, mutationCategory } from "@api/api";
import {
    curUserState,
    IAward,
    ICertificate,
    IEducation,
    IProject,
    isLoginState,
    IUser,
} from "@/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import UserCard from "./UserCard";
import styled from "styled-components";
import * as Mypage from "@styledComponents/CategoryStyled";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import CurrentBoard from "@components/category/CurrentBoard";
import { LoadingBox, LoadingIcon } from "./Network";
function UserDetails() {
    const navigator = useNavigate();
    const isLogin = useRecoilValue(isLoginState);

    const [curUser, setCurUser] = useRecoilState(curUserState);

    const location = useLocation();
    const pathName = location.pathname;
    //권한관리
    const { userSeq } = useParams();
    const compareUser = userSeq && parseInt(userSeq) === curUser?.userId!;
    const inMyPage = pathName === "/mypage";
    const admin = inMyPage || compareUser;

    //User관련 State
    const [user, setUser] = useState<IUser | null>(curUser);
    const [educations, setEducations] = useState<IEducation[]>([]);
    const [awards, setAwards] = useState<IAward[]>([]);
    const [certificates, setCertificates] = useState<ICertificate[]>([]);
    const [projects, setProjects] = useState<IProject[]>([]);
    //API User정보 받아오기
    const { isLoading, data: user,refetch } = useQuery(
        ["newCurUser", userSeq],
        () => (pathName === "/mypage" ? getUser(curUser?.userId!) : getUser(parseInt(userSeq!))),
        {
            onSuccess(sucessUser) {
                setUser(sucessUser!);
                setEducations(sucessUser?.educations!);
                setAwards(sucessUser?.awards!);
                setCertificates(sucessUser?.certificates!);
                setProjects(sucessUser?.projects!);
            },
        }
    
    );
    useEffect(()=>{
        refetch()
    },[curUser])
    console.log(educations, awards, certificates, certificates, certificates);
    const allSet = user && educations && awards && certificates && projects && !isLoading;
    //로그인상태 확인
    useEffect(() => {
        if (!isLogin) {
            navigator("/login", { replace: true });
        }
    }, [isLogin]);
    useEffect(() => {}, [UserCard]);
    const onDragEnd = async ({ draggableId, destination, source }: DropResult) => {
        if (destination?.droppableId !== source.droppableId) return;
        //드래그 필드가 Educations
        else if (destination?.droppableId === "educations") {
            setEducations((prev) => {
                const resultEducations = [...prev];
                const education = resultEducations[source.index];
                resultEducations.splice(source.index, 1);
                resultEducations.splice(destination?.index!, 0, education);

                mutationCategory(curUser?.userId!, Category.education, resultEducations); //API요청
                return resultEducations;
            });
        }
        //드래그 필드가 awards
        else if (destination?.droppableId === "awards") {
            setAwards((prev) => {
                const resultAwards = [...prev];
                const award = resultAwards[source.index];
                resultAwards.splice(source.index, 1);
                resultAwards.splice(destination?.index!, 0, award);

                mutationCategory(curUser?.userId!, Category.award, resultAwards); //API요청
                return resultAwards;
            });
        }
        //드래그 필드가 certificates
        else if (destination?.droppableId === "certificates") {
            setCertificates((prev) => {
                const resultCertificates = [...prev];
                const certificate = resultCertificates[source.index];
                resultCertificates.splice(source.index, 1);
                resultCertificates.splice(destination?.index!, 0, certificate);
                mutationCategory(curUser?.userId!, Category.certificate, resultCertificates); //API요청
                return resultCertificates;
            });
        }
        //드래그 필드가 project
        else if (destination?.droppableId === "projects") {
            setProjects((prev) => {
                const resultProjects = [...prev];
                const project = resultProjects[source.index];
                resultProjects.splice(source.index, 1);
                resultProjects.splice(destination?.index!, 0, project);
                mutationCategory(curUser?.userId!, Category.project, resultProjects); //API요청
                return resultProjects;
            });
        }
    };

    if (isLoading && !user)
        return (
            <LoadingBox>
                <LoadingIcon />
                Loading...
            </LoadingBox>
        );
    return (
        <>
            <Mypage.Root>
                <Mypage.MyPortWrap>
                    <Mypage.UserCardBox>{curUser && <UserCard user={user!} refetch={refetch}/>}</Mypage.UserCardBox>
                    <Mypage.Wrap>
                        <DragDropContext onDragEnd={onDragEnd}>
                            <CurrentBoard
                                educations={educations}
                                awards={awards}
                                certificates={certificates}
                                projects={projects}
                            />
                            <Education educations={educations} setEducations={setEducations} />
                            <Award awards={awards} setAwards={setAwards} />
                            <Certificate
                                certificates={certificates}
                                setCertificates={setCertificates}
                            />
                            <Project projects={projects} setProjects={setProjects} />
                        </DragDropContext>
                    </Mypage.Wrap>
                </Mypage.MyPortWrap>
            </Mypage.Root>
        </>
    );
}

export default UserDetails;
