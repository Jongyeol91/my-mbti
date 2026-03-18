import type { Metadata } from "next";
import ModeSelectionPage from "./ModeSelectionPage";

export const metadata: Metadata = {
  title: "테스트 모드 선택 | 나의 MBTI",
  description:
    "간단 테스트(12문항)와 심화 테스트(40문항) 중 원하는 모드를 선택하세요.",
};

export default function SelectPage() {
  return <ModeSelectionPage />;
}
