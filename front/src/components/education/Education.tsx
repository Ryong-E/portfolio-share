import { useState } from "react";
import { curUserState, EduStatus, IEducation } from "../../atoms";
import { useForm } from "react-hook-form";
import EducationEditForm from "./EducationEditForm";
import EducationAddForm from "./EducationAddForm";
import { useLocation, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import {
    MvpContainer,
    MvpTitle,
    MvpTitleBox,
    MvpContentContainer,
    MvpContentBox,
    MvpContentName,
    MvpContentDetail,
    MvpEditButton,
    MvpAddButton,
    MvpDeleteButton,
    MvpContentAccent,
} from "../MyPortfolio";
import { PlusSquareFill } from "styled-icons/bootstrap";
import { Pencil } from "styled-icons/boxicons-solid";
import { Trash2 } from "styled-icons/feather";
export default function Education({ info }: any) {
    console.log("학력", info);
    // user ID
    const { id } = useParams();
    // 현재 로그인 유저
    const curUser = useRecoilValue(curUserState);
    // 학력 상태
    const [educations, setEducations] = useState<IEducation[]>(info); // 더미educations 초기값

    // form 관리
    const [addFormActive, setAddFormActive] = useState(false);
    const [editing, setEditing] = useState(true); // userId와 대조해서 맞으면 edit버튼 보임
    const [isEditing, setIsEditing] = useState(false); // edit버튼 눌러서 editform 활성화
    const [targetIndex, setTargetIndex] = useState<Number>(); // index 를 체크해서 맞는 것만 editform 활성화

    const location = useLocation();
    const pathName = location.pathname;
    function handleAdding() {
        setAddFormActive((current) => !current);
    }
    return (
        <MvpContainer>
            <MvpTitleBox>
                <MvpTitle>학력</MvpTitle>
            </MvpTitleBox>
            <MvpContentContainer>
                {addFormActive && (
                    <EducationAddForm
                        setAddFormActive={setAddFormActive}
                        setEducations={setEducations}
                        id={id}
                    />
                )}
                {!addFormActive &&
                    educations?.map((list, index) => (
                        <MvpContentBox key={index}>
                            {targetIndex !== index && (
                                <>
                                    <MvpContentAccent>{list.school}</MvpContentAccent>
                                    <div style={{ display: "flex" }}>
                                        <MvpContentDetail style={{ marginRight: "10px" }}>
                                            {list.major}
                                        </MvpContentDetail>
                                        <MvpContentDetail>({list.status})</MvpContentDetail>
                                    </div>
                                    {curUser && pathName === "/" && targetIndex !== index && (
                                        <>
                                            <MvpEditButton
                                                onClick={() => {
                                                    setIsEditing(true);
                                                    setTargetIndex(index);
                                                }}
                                            >
                                                <Pencil color="#3867FF" />
                                            </MvpEditButton>
                                            <MvpDeleteButton>
                                                <Trash2 color="#3867FF" />
                                            </MvpDeleteButton>
                                        </>
                                    )}
                                </>
                            )}
                            {isEditing && targetIndex == index && (
                                <EducationEditForm
                                    index={index}
                                    educations={educations}
                                    setEducations={setEducations}
                                    setIsEditing={setIsEditing}
                                    id={id}
                                    setTargetIndex={setTargetIndex}
                                />
                            )}
                        </MvpContentBox>
                    ))}
            </MvpContentContainer>
            {curUser && pathName === "/" && !addFormActive && (
                <button onClick={handleAdding}>
                    <MvpAddButton>
                        <PlusSquareFill color="#3687FF" />
                    </MvpAddButton>
                </button>
            )}
        </MvpContainer>
    );
}
