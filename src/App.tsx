/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Code,
  Award,
  Briefcase,
  Users,
  GraduationCap,
  Github,
  Linkedin,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  FileText,
  Cpu,
  Bot,
  Network,
  X,
  Globe,
} from "lucide-react";
import { cn } from "@/src/lib/utils";

type Lang = "en" | "kr";

const NAV_LINKS = [
  { name: "Home", nameKr: "Home", href: "#" },
  { name: "Research Interests", nameKr: "연구 관심 분야", href: "#focus" },
  { name: "Publications", nameKr: "Publications", href: "#publications" },
  { name: "Research & Projects", nameKr: "연구 & 프로젝트", href: "#research" },
  { name: "Experience", nameKr: "Experience", href: "#activities" },
];

const RESEARCH_FOCUS = [
  {
    title: "3D Reconstruction",
    titleKr: "3D Reconstruction",
    description:
      "Developing high-fidelity neural radiance fields and Gaussian splatting techniques for real-time scene synthesis and large-scale environment mapping.",
    descriptionKr:
      "Neural Radiance Fields와 Gaussian Splatting 기술을 활용한 고품질 실시간 장면 합성 및 대규모 환경 매핑 연구.",
    icon: Cpu,
    tags: ["NeRF", "Gaussian Splatting", "Computer Vision"],
  },
  {
    title: "Spatial Perception",
    titleKr: "Spatial Perception",
    description:
      "Engineering robust SLAM and spatial reasoning algorithms that enable autonomous agents to navigate and interact with complex, dynamic 3D environments.",
    descriptionKr:
      "자율 에이전트가 복잡하고 동적인 3D 환경에서 탐색하고 상호작용할 수 있도록 하는 SLAM 및 공간 추론 알고리즘 연구.",
    icon: Network,
    tags: ["SLAM", "Spatial AI", "Robotics"],
  },
  {
    title: "VLA (Vision-Language-Action)",
    titleKr: "VLA (Vision-Language-Action)",
    description:
      "Integrating large-scale vision-language models with robotic control systems to create intuitive, multi-modal interaction frameworks for VLA.",
    descriptionKr:
      "대규모 Vision-Language 모델과 로봇 제어 시스템을 결합하여 VLA를 위한 멀티모달 상호작용 프레임워크 연구.",
    icon: Bot,
    tags: ["VLA", "VLM", "Robotic Control"],
  },
];

const PROJECTS = [
  {
    id: "01",
    title: "Budget-Constrained UAV Scanning for 3D Reconstruction",
    titleKr: "제한된 비행 예산으로 3D 재구성 품질을 높이는 UAV 스캐닝",
    description:
      "Maximizing 3D reconstruction quality under limited flight budget via online explore-then-exploit UAV scanning.",
    descriptionKr:
      "제한된 비행 예산 내에서 온라인 탐색-활용 방식으로 3D 재구성 품질을 극대화하는 UAV 스캐닝 연구.",
    detail: {
      overview: "Maximizing 3D reconstruction quality by optimally re-scanning within a limited return flight budget after an initial UAV coverage flight.",
      overviewKr: "초기 UAV 비행 후, 제한된 귀환 예산 내에서 최적의 재스캔을 통해 3D 재구성 품질을 극대화하는 연구.",
      problem: "After the initial UAV scan, certain regions are reconstructed with low quality. Additional dedicated flights are costly and impractical for field deployment.",
      problemKr: "초기 UAV 스캔 후 일부 영역의 복원 품질이 낮음. 추가 비행은 비용이 크고 현장 운용이 어려움.",
      approach: "1. Real-time detection of low-quality regions during initial coverage path.\n2. Budget-constrained return path planning in parallel (online).\n3. Optimal re-scanning along the return route.",
      approachKr: "1. 비행 중 품질 취약 구역 실시간 파악.\n2. 예산 제약 내 Return Path를 병렬로 계획 (Online).\n3. 복귀 시 최적 경로로 재스캔 진행.",
      results: "Improved reconstruction quality compared to existing methods under the same budget. Enables field deployment without additional flight scheduling.",
      resultsKr: "동일 예산 내 기존 방법 대비 재구성 품질 향상. 추가 비행 일정 없이 현장 운용 가능.",
    },
    tags: ["UAV", "3D Reconstruction", "Path Planning"],
    icon: Network,
    thumbnail: "",
    type: "Research",
    period: "2025.12 - 2026.03",
  },
  {
    id: "02",
    title: "Quality-Based Filtering for Diffusion-Refined Views & Tech Transfer",
    titleKr: "Diffusion 보완 영상의 품질 기반 필터링 & 기술 이전",
    description:
      "IQA-based filtering pipeline for Video Diffusion Model outputs to improve 3D reconstruction of deficient regions. Industry-academia project with technology transfer. Led to PR-IQA (CVPR '26).",
    descriptionKr:
      "Video Diffusion Model 출력에 대한 IQA 기반 필터링 파이프라인으로 3D 복원 부족 영역 개선. 산학과제 기술 이전 완료. PR-IQA (CVPR '26)로 이어짐.",
    detail: {
      overview: "Two-stage IQA filtering pipeline for Video Diffusion Model outputs, enabling high-quality re-reconstruction of deficient 3D regions.",
      overviewKr: "Video Diffusion Model 출력에 대한 2단계 IQA 필터링 파이프라인으로, 3D 복원 부족 영역을 고품질로 재구성.",
      problem: "After building the offline reconstruction pipeline, areas like rooftops, glass walls, and overlapping regions still failed to reconstruct. VDM-based inpainting introduced inconsistent quality.",
      problemKr: "Offline 파이프라인 구축 후에도 옥상, 유리벽, overlap 부족 영역의 복원 불가 문제 잔존. VDM으로 보완 시도 시 생성 품질 불균일 문제 발생.",
      approach: "1. Detect deficient reconstruction regions.\n2. Generate supplementary video via Video Diffusion Model conditioned on adjacent frames.\n3. First-pass filtering with TOPIQ (NR-IQA) to remove distorted/blurry frames.\n4. Second-pass filtering with PR-IQA for geometric and semantic consistency without same-pose GT.\n5. Reconstruct deficient regions using filtered images.",
      approachKr: "1. 복원 부족 영역 감지.\n2. 인접 프레임을 condition으로 Video Diffusion Model 영상 생성.\n3. 1차 필터링: TOPIQ (NR-IQA)로 왜곡·블러 프레임 제거.\n4. 2차 필터링: PR-IQA로 기하·의미적 일관성 기준 추가 필터링.\n5. 필터링된 이미지로 결손 영역 재구성.",
      results: "Completed pipeline for re-reconstructing deficient areas after VDM filtering. Validated real-world applicability of PR-IQA. Technology transferred.",
      resultsKr: "VDM 생성 이미지 필터링 후 복원 불가 영역 재구성 파이프라인 완성. PR-IQA 실환경 적용 가능성 입증. 기술 이전 완료.",
      role: "Pipeline design and full implementation.",
      roleKr: "파이프라인 설계 및 구현 담당.",
    },
    tags: ["Video Diffusion", "IQA", "PR-IQA", "3D Reconstruction"],
    icon: Cpu,
    thumbnail: "/projects/diffusion-filtering/thumbnail.png",
    type: "Research & Project",
    period: "2025.07 - 2026.03",
  },
  {
    id: "03",
    title: "Urban Building 3D Reconstruction Pipeline & Tech Transfer",
    titleKr: "도심 건물 3D 재구성 파이프라인 구축 및 기술 이전",
    description:
      "End-to-end offline 3D reconstruction pipeline for urban buildings using COLMAP + OpenMVS. Industry-academia collaboration with technology transfer.",
    descriptionKr:
      "COLMAP + OpenMVS 기반 도심 건물 3D 재구성 Offline 파이프라인 구축. 산학과제 기술 이전 완료.",
    detail: {
      overview: "End-to-end offline 3D reconstruction pipeline for urban buildings, split into Online (real-time) and Offline (post-processing) architecture.",
      overviewKr: "도심 건물군 3D 복원을 위한 Online(실시간) + Offline(후처리) 분리 아키텍처 기반 파이프라인.",
      problem: "Urban building 3D reconstruction required a robust pipeline that could handle large-scale real-world data and be transferred to industry partners.",
      problemKr: "도심 건물군 3D 복원 산학 과제로, 대규모 실환경 데이터를 처리하고 기업에 이전 가능한 파이프라인 필요.",
      approach: "1. COLMAP — SfM-based camera pose estimation + Sparse Point Cloud.\n2. OpenMVS — Dense Point Cloud → Mesh → Texture mapping.\n3. Textured Mesh generation.",
      approachKr: "1. COLMAP — SfM 기반 카메라 포즈 추정 + Sparse Point Cloud.\n2. OpenMVS — Dense Point Cloud → Mesh → Texture 매핑.\n3. Textured Mesh 생성.",
      results: "Successfully applied to real urban data and completed technology transfer. Identified reconstruction failure regions, leading to the follow-up diffusion filtering project.",
      resultsKr: "실환경 도심 데이터 적용 및 기술 이전 완료. 복원 불가 영역 발견 → 후속 Diffusion 필터링 과제로 이어짐.",
      role: "Offline pipeline design and full implementation.",
      roleKr: "Offline 파이프라인 전체 설계 및 구축 담당.",
    },
    tags: ["COLMAP", "OpenMVS", "3D Reconstruction", "Tech Transfer"],
    icon: Cpu,
    thumbnail: "",
    type: "Research & Project",
    period: "2025.01 - 2025.05",
  },
  {
    id: "04",
    title: "Cultural Bias Mitigation → Culture-TRIP",
    titleKr: "문화 편향 완화 → Culture-TRIP",
    description:
      "From cultural bias research to NAACL '25 publication. RAG-based bias mitigation evolved into iterative prompt refinement for T2I models.",
    descriptionKr:
      "문화 편향 완화 연구에서 NAACL '25 논문으로. RAG 기반 편향 완화가 T2I 모델의 반복 프롬프트 정제 프레임워크로 발전.",
    detail: {
      overview: "Two-phase research: RAG-based cultural bias mitigation in T2I generation, evolved into Culture-TRIP — an iterative prompt refinement framework published at NAACL '25.",
      overviewKr: "RAG 기반 문화 편향 완화 연구에서 출발하여 Culture-TRIP — 반복 프롬프트 정제 프레임워크로 발전, NAACL '25 출판.",
      problem: "T2I models are dependent on training data distribution, substituting low-frequency cultural concepts (e.g., hanbok, pottery) with similar Western concepts.",
      problemKr: "T2I 모델이 학습 데이터 분포에 종속되어 저빈도 문화 개념(한복, 항아리 등)을 서구권 유사 개념으로 대체 생성.",
      approach: "Phase 1 (Bias Mitigation): Extract cultural captions from COCO, augment via VectorDB (CCSK) + RAG + LLaMA, generate with Stable Diffusion 2.0.\n\nPhase 2 (Culture-TRIP): Retrieve cultural context from Wikipedia/Web, score prompts with LLaMA-3-70B across 5 criteria (clarity, background, usage, visual elements, comparison), iteratively refine until threshold met.",
      approachKr: "Phase 1 (편향 완화): COCO 캡션에서 문화 관련 추출, VectorDB (CCSK) + RAG + LLaMA로 증강, Stable Diffusion 2.0으로 생성.\n\nPhase 2 (Culture-TRIP): Wikipedia/Web에서 문화 맥락 수집, LLaMA-3-70B로 5개 기준(명확성, 배경, 용도, 시각요소, 비교대상) 점수화, 기준 미달 시 반복 정제.",
      results: "18.84% improvement in cultural alignment across 8 countries (10K prompts, 66 human evaluators). VIEScore Overall 0.74 (best among all methods). Published at NAACL '25.",
      resultsKr: "8개국 1만 프롬프트, 66명 평가에서 문화 정합성 평균 18.84% 향상. VIEScore Overall 0.74 (전 방법 중 최고). NAACL '25 출판.",
    },
    tags: ["NAACL '25", "T2I", "RAG", "LLM", "Cultural AI"],
    icon: Network,
    thumbnail: "/projects/culture-trip/thumbnail.png",
    type: "Research",
    period: "2024.03 - 2024.12",
  },
  {
    id: "05",
    title: "Industrial Anomaly Detection",
    titleKr: "산업용 이상 탐지",
    description:
      "AI engine for product quality and equipment management based on image and vibration data. Capstone project with CTINC.",
    descriptionKr:
      "이미지 및 진동 데이터 기반 제품 품질 설비 관리 AI 엔진. CTINC 기업 연계 종합설계 프로젝트.",
    detail: {
      overview: "Capstone design project in collaboration with CTINC, building an AI service for industrial product quality management using image-based anomaly detection.",
      overviewKr: "CTINC 기업과 연계한 종합설계 프로젝트로, 이미지 기반 이상 탐지를 활용한 제품 품질 관리 AI 서비스 구축.",
      problem: "Industrial quality inspection requires detecting not only physical appearance defects but also logical anomalies such as incorrect count and mismatched pairs.",
      problemKr: "물리적 외관 결함뿐 아니라 개수, 짝 여부 등 논리적 결함까지 탐지해야 하는 산업 품질 검사 요구.",
      approach: "Trained YOLOv11-based models on MVTec-AD, MVTec-LOCO AD, and VisA datasets. MVTec-LOCO specifically targets logical constraint understanding.",
      approachKr: "MVTec-AD, MVTec-LOCO AD, VisA 데이터셋으로 YOLOv11 기반 모델 학습. LOCO는 논리적 제약 파악에 특화된 데이터셋.",
      results: "Built a model capable of detecting both physical and logical defects across multiple product classes.",
      resultsKr: "물리적·논리적 결함 모두 탐지 가능한 모델 구축.",
    },
    tags: ["YOLOv11", "Anomaly Detection", "MVTec", "Industry AI"],
    icon: Cpu,
    thumbnail: "/projects/anomaly-detection/thumbnail.png",
    type: "Project",
    period: "2024.03 - 2024.12",
  },
  {
    id: "06",
    title: "Korean LLM Fine-tuning & Optimization",
    titleKr: "한국어 LLM Fine-tuning & 최적화",
    description:
      "Fine-tuning and optimization of open-source LLMs for Korean language performance.",
    descriptionKr:
      "오픈소스 LLM의 한국어 성능 향상을 위한 Fine-tuning 및 최적화 연구.",
    detail: {
      overview: "Fine-tuning open-source LLMs for improved Korean language performance, competing on Upstage's Korean LLM Leaderboard.",
      overviewKr: "오픈소스 LLM의 한국어 성능 향상을 위한 Fine-tuning으로 Upstage 한국어 LLM 리더보드에 도전.",
      problem: "Open-source LLMs underperform on Korean tasks. GPU resources are limited, requiring efficient fine-tuning strategies.",
      problemKr: "오픈소스 LLM의 한국어 성능 부족. 제한적인 GPU 환경에서 효율적인 Fine-tuning 전략 필요.",
      approach: "Applied Supervised Fine Tuning using unsloth, QLoRA, and SFTTrainer to fine-tune within ~10GB GPU memory constraints.",
      approachKr: "unsloth, QLoRA, SFTTrainer를 활용하여 약 10GB GPU 환경에서 Supervised Fine Tuning 수행.",
      results: "Successfully adapted LLaMA-based models for Korean NLP tasks with efficient resource utilization.",
      resultsKr: "효율적인 리소스 활용으로 LLaMA 기반 모델의 한국어 NLP 태스크 적용 성공.",
    },
    tags: ["LLM", "QLoRA", "SFT", "Korean NLP"],
    icon: Network,
    thumbnail: "/projects/korean-llm/thumbnail.jpeg",
    type: "Research",
    period: "2024.07 - 2024.08",
  },
  {
    id: "07",
    title: "Synthetic Data Generation via Game Engine",
    titleKr: "게임엔진 기반 합성 데이터 생성",
    description:
      "Deep learning data generation using Unreal Engine 5 and AirSim for object detection.",
    descriptionKr:
      "Unreal Engine 5와 AirSim을 활용한 딥러닝용 합성 데이터 생성 파이프라인.",
    detail: {
      overview: "Synthetic data generation pipeline for UAV-based person detection and ReID research using Unreal Engine 5 and AirSim.",
      overviewKr: "UAV 기반 인물 탐지·ReID 연구를 위한 UE5 + AirSim 기반 대규모 합성 데이터셋 자동 구축 파이프라인.",
      problem: "Real outdoor data collection is costly and privacy-limited. Prior pipeline required separate Python-UE execution per actor change, lacked automatic labeling.",
      problemKr: "실외 데이터 수집의 비용·프라이버시 한계. 기존 파이프라인은 Python-UE 분리 실행 구조로 Actor 변경마다 엔진 재시작 필요, 자동 라벨링 불가.",
      approach: "Migrated actor generation to UE5 Blueprints with custom C++ functions for labeled creation. Implemented multi-drone capture system (8 drones, 12 directions at 30° intervals) via AirSim and Python.",
      approachKr: "Actor 생성을 UE5 Blueprint로 이주, 필요한 함수는 C++로 구현. AirSim 기반 8개 드론 × 12방향(30°) 자동 촬영 스케줄링 구현.",
      results: "Achieved attribute-level automatic annotation. Significantly reduced experiment iteration cycle.",
      resultsKr: "Attribute-level annotation 자동 확보. 반복 실험 사이클 대폭 단축.",
    },
    tags: ["Unreal Engine 5", "AirSim", "C++", "Synthetic Data"],
    icon: Cpu,
    thumbnail: "/projects/synthetic-data/thumbnail.png",
    type: "Research",
    period: "2023.09 - 2023.12",
  },
  {
    id: "08",
    title: "LG Aimers 4th Cohort",
    titleKr: "LG Aimers 4기",
    description:
      "B2B sales opportunity prediction model development using MQL data.",
    descriptionKr:
      "MQL 데이터 기반 B2B 영업 기회 창출 예측 모델 개발.",
    detail: {
      overview: "2-month program developing a customer conversion prediction model from MQL data, completed with XGBoost.",
      overviewKr: "2개월간 MQL 데이터로 고객 전환율 예측 모델 개발, XGBoost로 최종 완료.",
      problem: "Predicting B2B customer conversion from marketing qualified lead data with significant missing values across attributes.",
      problemKr: "결측치가 많은 MQL 데이터에서 B2B 고객 전환 예측.",
      approach: "Team of 4 with biweekly meetings. Preprocessed data by selectively removing/retaining attributes through discussion. Tested LightGBM, Random Forest, XGBoost, and others.",
      approachKr: "4인 팀으로 주 2회 회의. 회의를 통해 속성별 제거/유지 결정 후 데이터 전처리. LightGBM, Random Forest, XGBoost 등 모델 테스트.",
      results: "XGBoost yielded the best results and was used for the final submission.",
      resultsKr: "XGBoost가 가장 좋은 결과를 보여 최종 제출에 사용.",
      role: "Data preprocessing and model experimentation.",
      roleKr: "데이터 전처리 및 모델 실험 담당.",
    },
    tags: ["XGBoost", "LightGBM", "B2B", "ML"],
    icon: Network,
    thumbnail: "/projects/lg-aimers/thumbnail.png",
    type: "Project",
    period: "2024.01 - 2024.02",
  },
];

const PUBLICATIONS = [
  {
    venue: "CVPR '26",
    title:
      "PR-IQA: Partial-Reference Image Quality Assessment for Diffusion-Based Novel View Synthesis",
    authors: "Inseong Choi, Siwoo Lee, Seung-Hun Nam, Soohwan Song",
    year: "2026",
    projectUrl: "",
    githubUrl: "https://github.com/Kakaomacao/PR-IQA",
    arxivUrl: "",
  },
  {
    venue: "NAACL '25",
    title:
      "Culture-TRIP: Culturally-Aware Text-to-Image Generation with Iterative Prompt Refinement",
    authors: "Suchae Jeong, Inseong Choi, Youngsik Yun, Jihie Kim",
    year: "2025",
    projectUrl: "https://shane3606.github.io/Culture-TRIP/",
    githubUrl: "https://github.com/Kakaomacao/Culture-TRIP",
    arxivUrl: "https://arxiv.org/abs/2502.16902",
  },
];

const ACTIVITY_CATEGORIES = [
  {
    id: "education",
    title: "Education",
    titleKr: "학력",
    icon: GraduationCap,
    items: [
      {
        title: "MS in Computer Science",
        titleKr: "인공지능 전공 석사과정",
        detail: "Dongguk University. Advisor: Prof. Soohwan Song. Focus on AI & Robotics.",
        detailKr: "동국대학교. 지도교수: 송수환 교수님. Computer Vision & AI 연구.",
        date: "2025.03 - PRESENT",
      },
      {
        title: "BS in Engineering",
        titleKr: "컴퓨터공학전공 공학사",
        detail: "College of Engineering, Dongguk University.",
        detailKr: "동국대학교 공과대학.",
        date: "2017.03 - 2025.02",
      },
    ],
  },
  {
    id: "activities",
    title: "Experience",
    titleKr: "경험",
    icon: Briefcase,
    items: [
      {
        title: "M.S. Student / Graduate Researcher",
        titleKr: "석사과정 / 대학원 연구원",
        detail: "Researching computer vision and AI at AiRLab, Dongguk University.",
        detailKr: "동국대학교 AiRLab에서 Computer Vision 및 AI 연구.",
        date: "2025 - PRESENT",
      },
      {
        title: "TA: Data Structures",
        titleKr: "TA: 자료구조",
        detail: "Teaching assistant for Data Structures, Dongguk University.",
        detailKr: "동국대학교 자료구조 수업 조교.",
        date: "2026-1",
      },
      {
        title: "TA: Adventure Capstone Design",
        titleKr: "TA: 어드벤처캡스톤디자인",
        detail: "Teaching assistant for Adventure Capstone Design, Dongguk University.",
        detailKr: "동국대학교 어드벤처캡스톤디자인 수업 조교.",
        date: "2025-2",
      },
      {
        title: "Undergraduate Research Intern",
        titleKr: "학부 연구생",
        detail: "Joined AiRLab as an undergraduate researcher.",
        detailKr: "AiRLab 학부 연구생으로 참여.",
        date: "2024 SUMMER",
      },
      {
        title: "Software Engineering\n(Unified Secondhand Market)",
        titleKr: "소프트웨어공학개론\n(중코거래)",
        detail: "Unified platform aggregating listings from multiple secondhand marketplaces. Built backend with Spring and AWS Lambda scraper in Python.",
        detailKr: "여러 중고거래 플랫폼 매물을 통합하는 서비스. Spring 백엔드 및 AWS Lambda Python 스크래퍼 구축.",
        date: "2023-2",
      },
      {
        title: "Open Source SW Project\n(Campus Notice Alert)",
        titleKr: "공개SW프로젝트\n(공지사항알리미)",
        detail: "Personalized university notice notification service for Dongguk University students. Built frontend with Django and JavaScript.",
        detailKr: "동국대학교 학생을 위한 개인 맞춤형 공지사항 알림 서비스. Django + JavaScript 프론트엔드 구축.",
        date: "2023-1",
      },
      {
        title: "Adventure Design\n(Smart Air Purifier)",
        titleKr: "어드벤처디자인\n(스마트 공기청정기)",
        detail: "Window-mounted smart air purifier with sensors for temperature, rain, dust, and noise. Auto open/close and filtered ventilation.",
        detailKr: "창문 틀에 끼우는 스마트 공기청정기. 온도, 강수, 미세먼지, 소음 센서로 창문 자동 개폐 및 필터 환기.",
        date: "2022-2",
      },
    ],
  },
  {
    id: "honors",
    title: "Honors & Awards",
    titleKr: "수상",
    icon: Award,
    items: [
      {
        title: "The Grand Prize (Dean's Award)",
        titleKr: "최우수상 (학장상)",
        detail: "Adventure Design Contest, Dongguk University.",
        detailKr: "동국대학교 어드벤처디자인경진대회.",
        date: "2022",
      },
    ],
  },
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<
    (typeof PROJECTS)[number] | null
  >(null);
  const [lang, setLang] = useState<Lang>("en");
  const pubListRef = useRef<HTMLDivElement>(null);

  const t = (en: string, kr?: string) => (lang === "kr" && kr ? kr : en);

  const pubYears = [...new Set(PUBLICATIONS.map((p) => p.year))].sort(
    (a, b) => Number(b) - Number(a),
  );
  const projectYears = [
    ...new Set(PROJECTS.map((p) => p.period.slice(0, 4))),
  ].sort((a, b) => Number(b) - Number(a));

  const scrollToYear = (year: string) => {
    const el = document.getElementById(`pub-year-${year}`);
    if (el && pubListRef.current) {
      pubListRef.current.scrollTo({
        top: el.offsetTop - pubListRef.current.offsetTop,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="min-h-screen selection:bg-surface-highest selection:text-primary">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-outline-variant/10">
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
          <div className="text-xl font-headline font-bold tracking-tighter text-primary">
            Inseong Choi.
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-headline font-medium transition-colors",
                  link.name === "Home"
                    ? "text-secondary border-b-2 border-secondary pb-1"
                    : "text-on-surface-variant hover:text-primary",
                )}
              >
                {t(link.name, link.nameKr)}
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setLang(lang === "en" ? "kr" : "en")}
              className="flex items-center space-x-1 p-2 hover:bg-surface-low transition-all rounded-full text-primary"
              title={lang === "en" ? "한국어로 전환" : "Switch to English"}
            >
              <Globe size={16} />
              <span className="font-headline text-xs font-bold">
                <span className={lang === "en" ? "text-primary" : "text-on-surface-variant/40"}>EN</span>
                <span className="text-on-surface-variant/40 mx-0.5">/</span>
                <span className={lang === "kr" ? "text-primary" : "text-on-surface-variant/40"}>KO</span>
              </span>
            </button>
            <a
              href="https://github.com/Kakaomacao"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-surface-low transition-all rounded-full text-primary"
            >
              <Github size={20} />
            </a>
            <a
              href="https://scholar.google.com/citations?user=eUQv_1oAAAAJ&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-surface-low transition-all rounded-full text-primary"
            >
              <GraduationCap size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/%EC%9D%B8%EC%84%B1-%EC%B5%9C-196891398/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-surface-low transition-all rounded-full text-primary"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:tomas6820@gmail.com"
              className="hidden md:block bg-primary text-white px-6 py-2 rounded-sm font-headline text-sm font-bold active:opacity-80 active:scale-95 transition-all"
            >
              Contact
            </a>
          </div>
        </div>
      </nav>

      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center overflow-hidden px-6 lg:px-24">
          <div className="absolute inset-0 grid-bg pointer-events-none" />
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-8"
            >
              <div className="inline-flex items-center space-x-2 bg-primary text-white px-3 py-1 rounded-none font-headline text-[10px] tracking-widest">
                <span className="text-secondary font-bold font-mono">&gt;</span>
                <span>STATUS: COMPILING_INSIGHTS</span>
              </div>

              <h1 className="font-headline text-5xl lg:text-7xl font-bold tracking-tight text-primary leading-tight">
                {t("Inseong Choi", "최인성")} <br />
                <span className="text-secondary">
                  Computer Vision & AI Researcher
                </span>
              </h1>

              <p className="text-lg text-on-surface-variant max-w-xl leading-relaxed">
                {t(
                  "M.S. student at Dongguk University, advised by Prof. Soohwan Song. Researching 3D vision, spatial intelligence, and VLA to bridge perception and robotic control.",
                  "동국대학교 석사과정, 송수환 교수님 지도. 3D Vision, Spatial Intelligence, VLA를 연구하여 인지와 로봇 제어를 연결하는 연구를 수행하고 있습니다."
                )}
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <div className="bg-surface-low p-4 rounded-sm border-l-4 border-secondary min-w-[200px]">
                  <span className="block font-headline text-[10px] text-on-surface-variant/60 font-bold tracking-widest mb-1">
                    AFFILIATION
                  </span>
                  <span className="font-mono text-sm text-primary font-bold">
                    {t("Dongguk University", "동국대학교")}
                  </span>
                </div>
                <div className="bg-surface-low p-4 rounded-sm border-l-4 border-primary min-w-[200px]">
                  <span className="block font-headline text-[10px] text-on-surface-variant/60 font-bold tracking-widest mb-1">
                    ADVISOR
                  </span>
                  <span className="font-mono text-sm text-primary font-bold">
                    Prof. Soohwan Song
                  </span>
                </div>
                <a
                  href="https://sites.google.com/view/smrlab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-surface-low p-3 rounded-sm border-l-4 border-secondary min-w-[200px] hover:bg-surface-high transition-colors group flex items-center gap-3"
                >
                  <img
                    src="/airlab.png"
                    alt="AiRLab"
                    className="h-10 w-auto object-contain"
                  />
                  <div>
                    <span className="block font-headline text-[10px] text-on-surface-variant/60 font-bold tracking-widest mb-1">
                      LAB
                    </span>
                    <span className="font-mono text-sm text-primary font-bold group-hover:text-secondary transition-colors">
                      AiRLab
                    </span>
                  </div>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative w-full aspect-[3/4] max-w-md mx-auto group">
                <div className="absolute inset-0 bg-primary translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform" />
                <img
                  src="/profile.jpg"
                  alt="Inseong Choi"
                  className="relative z-10 w-full h-full object-cover"
                />
                <div className="absolute top-0 right-0 z-20 bg-secondary text-white px-4 py-2 font-headline text-xs font-bold m-4 tracking-widest">
                  ID: IC-2026
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Research Interests Section */}
        <section id="focus" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16">
              <span className="font-headline text-[10px] text-secondary font-bold tracking-widest block mb-2 uppercase">
                Core_Competencies
              </span>
              <h2 className="font-headline text-4xl font-bold text-primary">
                {t("Research Interests", "연구 관심 분야")}
              </h2>
              <div className="h-1 w-24 bg-secondary mt-4" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {RESEARCH_FOCUS.map((focus, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-8 bg-surface-low border border-outline-variant/10 group hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <focus.icon
                    className="mb-6 text-secondary group-hover:text-white transition-colors"
                    size={32}
                  />
                  <h3 className="font-headline text-2xl font-bold mb-4">
                    {t(focus.title, focus.titleKr)}
                  </h3>
                  <p className="text-on-surface-variant group-hover:text-white/80 text-sm leading-relaxed mb-6">
                    {t(focus.description, focus.descriptionKr)}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {focus.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-headline font-bold tracking-widest border border-current px-2 py-1 opacity-60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Publications Section */}
        <section
          id="publications"
          className="py-24 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16"
        >
          <div className="lg:col-span-4">
            <div className="sticky top-32">
              <h2 className="font-headline text-4xl font-bold text-primary mb-6">
                Publications
              </h2>
              <p className="text-on-surface-variant mb-8 font-headline text-xs tracking-wider font-bold">
                {t("Peer-reviewed papers and conference proceedings.", "학술 논문 및 학회 발표.")}
              </p>
              <div className="space-y-4">
                {pubYears.map((year, idx) => (
                  <button
                    key={year}
                    onClick={() => scrollToYear(year)}
                    className={cn(
                      "flex items-center space-x-4 border-l-2 pl-4 text-left transition-colors hover:opacity-100",
                      idx === 0
                        ? "border-secondary"
                        : "border-outline-variant opacity-50",
                    )}
                  >
                    <span
                      className={cn(
                        "font-headline font-bold",
                        idx === 0 ? "text-secondary" : "text-primary",
                      )}
                    >
                      {year}
                    </span>
                    <span className="text-[10px] text-on-surface-variant/60 font-bold tracking-widest">
                      {PUBLICATIONS.filter((p) => p.year === year).length} paper
                      {PUBLICATIONS.filter((p) => p.year === year).length > 1
                        ? "s"
                        : ""}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div
              ref={pubListRef}
              className="max-h-[600px] overflow-y-auto pr-6 hide-scrollbar border-t border-outline-variant/10 pt-8"
            >
              {pubYears.map((year) => (
                <div key={year}>
                  <div
                    id={`pub-year-${year}`}
                    className="flex items-center gap-4 mb-6"
                  >
                    <span className="font-headline text-sm font-bold text-secondary">
                      {year}
                    </span>
                    <div className="flex-1 h-px bg-outline-variant/30" />
                  </div>
                  <div className="space-y-8 mb-12">
                    {PUBLICATIONS.filter((p) => p.year === year).map(
                      (pub, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          className="group pb-8 border-b border-surface-high last:border-0"
                        >
                          <div className="flex items-center space-x-2 mb-2">
                            <FileText className="text-secondary" size={14} />
                            <span className="font-headline text-[10px] font-bold text-secondary tracking-widest">
                              {pub.venue}
                            </span>
                          </div>
                          <h3 className="font-headline text-xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors">
                            {pub.title}
                          </h3>
                          <p className="text-on-surface-variant text-sm italic mb-4">
                            {pub.authors}
                          </p>
                          <div className="flex items-center space-x-6 text-[10px] font-headline font-bold tracking-widest">
                            {pub.projectUrl && (
                              <a
                                href={pub.projectUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-1 text-primary hover:text-secondary transition-colors"
                              >
                                <ExternalLink size={12} />
                                <span>PROJECT_PAGE</span>
                              </a>
                            )}
                            {pub.arxivUrl && (
                              <a
                                href={pub.arxivUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-1 text-primary hover:text-secondary transition-colors"
                              >
                                <FileText size={12} />
                                <span>ARXIV</span>
                              </a>
                            )}
                            {pub.githubUrl && (
                              <a
                                href={pub.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-1 text-primary hover:text-secondary transition-colors"
                              >
                                <Code size={12} />
                                <span>GITHUB</span>
                              </a>
                            )}
                          </div>
                        </motion.div>
                      ),
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Research Section */}
        <section id="research" className="py-24 bg-surface-low">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16">
              <span className="font-headline text-[10px] text-secondary font-bold tracking-widest block mb-2 uppercase">
                Selected_Work
              </span>
              <h2 className="font-headline text-4xl font-bold text-primary">
                {t("Research & Projects", "연구 & 프로젝트")}
              </h2>
              <div className="h-1 w-24 bg-secondary mt-4" />
            </div>

            <div className="max-h-[700px] overflow-y-auto pr-4 styled-scrollbar">
              {projectYears.map((year) => (
                <div key={year}>
                  <div className="flex items-center gap-4 mb-8">
                    <span className="font-headline text-sm font-bold text-secondary">
                      {year}
                    </span>
                    <div className="flex-1 h-px bg-outline-variant/30" />
                  </div>
                  <div className="space-y-8 mb-16">
                    {PROJECTS.filter((p) => p.period.startsWith(year)).map(
                      (project) => (
                        <motion.div
                          key={project.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          onClick={() => setSelectedProject(project)}
                          className="group grid grid-cols-1 md:grid-cols-12 gap-6 p-6 bg-white border border-outline-variant/10 hover:border-secondary/30 transition-all cursor-pointer"
                        >
                          {/* Thumbnail placeholder */}
                          <div className="md:col-span-4 bg-surface-low border border-outline-variant/10 aspect-video flex items-center justify-center overflow-hidden">
                            {project.thumbnail ? (
                              <img
                                src={project.thumbnail}
                                alt={project.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <project.icon
                                className="text-outline-variant/30"
                                size={48}
                              />
                            )}
                          </div>
                          {/* Content */}
                          <div className="md:col-span-8 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="font-headline text-[10px] font-bold text-secondary tracking-widest">
                                  {project.type} · {project.period}
                                </span>
                              </div>
                              <h3 className="font-headline text-xl font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
                                {t(project.title, project.titleKr)}
                              </h3>
                              <p className="text-on-surface-variant text-sm leading-relaxed line-clamp-2 mb-3">
                                {t(project.description, project.descriptionKr)}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="bg-surface-highest text-primary px-2 py-0.5 text-[9px] font-headline font-bold tracking-wider"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <span className="inline-flex items-center space-x-1 text-primary font-bold group-hover:text-secondary transition-colors text-[10px] font-headline tracking-widest mt-4">
                              <span>VIEW_DETAILS</span>
                              <ArrowRight size={12} />
                            </span>
                          </div>
                        </motion.div>
                      ),
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl"
              >
                <div className="sticky top-0 bg-primary text-white p-6 flex justify-between items-start z-10">
                  <div>
                    <span className="font-headline text-[10px] font-bold tracking-widest text-white/60 block mb-2">
                      {selectedProject.type} · {selectedProject.period}
                    </span>
                    <h3 className="font-headline text-2xl font-bold">
                      {t(selectedProject.title, selectedProject.titleKr)}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-1 hover:bg-white/20 rounded transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="p-6 space-y-6">
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="bg-surface-low text-primary px-3 py-1 text-[10px] font-headline font-bold tracking-wider"
                      >
                        &gt; {tag}
                      </span>
                    ))}
                  </div>

                  {selectedProject.thumbnail && (
                    <div className="border border-outline-variant/10 overflow-hidden">
                      <img
                        src={selectedProject.thumbnail}
                        alt={selectedProject.title}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  )}

                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    {t(selectedProject.detail.overview, selectedProject.detail.overviewKr)}
                  </p>

                  <div>
                    <h4 className="font-headline text-xs font-bold text-secondary tracking-widest mb-2">PROBLEM</h4>
                    <p className="text-on-surface-variant text-sm leading-relaxed">{t(selectedProject.detail.problem, selectedProject.detail.problemKr)}</p>
                  </div>

                  <div>
                    <h4 className="font-headline text-xs font-bold text-secondary tracking-widest mb-2">APPROACH</h4>
                    <p className="text-on-surface-variant text-sm leading-relaxed whitespace-pre-line">{t(selectedProject.detail.approach, selectedProject.detail.approachKr)}</p>
                  </div>

                  <div>
                    <h4 className="font-headline text-xs font-bold text-secondary tracking-widest mb-2">RESULTS</h4>
                    <p className="text-on-surface-variant text-sm leading-relaxed">{t(selectedProject.detail.results, selectedProject.detail.resultsKr)}</p>
                  </div>

                  {selectedProject.detail.role && (
                    <div>
                      <h4 className="font-headline text-xs font-bold text-secondary tracking-widest mb-2">MY ROLE</h4>
                      <p className="text-on-surface-variant text-sm leading-relaxed">{t(selectedProject.detail.role, selectedProject.detail.roleKr)}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Activities Section */}
        <section
          id="activities"
          className="py-24 bg-primary text-white overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 space-y-4 md:space-y-0">
              <div>
                <span className="font-headline text-[10px] text-surface-highest font-bold tracking-widest block mb-2 uppercase">
                  Log_Output: Events
                </span>
                <h2 className="font-headline text-4xl font-bold">
                  {t("Experience & Recognition", "경험 & 수상")}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {ACTIVITY_CATEGORIES.map((category) => (
                <motion.div
                  key={category.id}
                  onMouseEnter={() => setActiveCategory(category.id)}
                  onMouseLeave={() => setActiveCategory(null)}
                  className={cn(
                    "relative p-8 border border-white/10 transition-all cursor-default group",
                    activeCategory === category.id
                      ? "bg-secondary"
                      : "bg-primary-container/30",
                  )}
                >
                  <category.icon
                    className={cn(
                      "mb-6 transition-colors",
                      activeCategory === category.id
                        ? "text-white"
                        : "text-secondary",
                    )}
                    size={40}
                  />
                  <h4 className="font-headline text-2xl font-bold mb-2">
                    {t(category.title, category.titleKr)}
                  </h4>
                  <div className="flex items-center space-x-2 text-[10px] font-headline font-bold tracking-widest opacity-60">
                    <span>HOVER_FOR_DETAILS</span>
                    <ArrowRight
                      size={10}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Detailed View Area */}
            <div className="min-h-[300px] relative">
              <AnimatePresence mode="wait">
                {activeCategory ? (
                  <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                  >
                    {ACTIVITY_CATEGORIES.find(
                      (c) => c.id === activeCategory,
                    )?.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="space-y-4 p-6 bg-white/5 border-l-2 border-secondary"
                      >
                        <div className="flex justify-between items-start">
                          <h5 className="font-headline text-lg font-bold text-white whitespace-pre-line">
                            {t(item.title, item.titleKr)}
                          </h5>
                          <span className="font-headline text-[10px] font-bold text-secondary tracking-widest">
                            {item.date}
                          </span>
                        </div>
                        <p className="text-sm text-surface-highest/70 leading-relaxed">
                          {t(item.detail, item.detailKr)}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    className="flex items-center justify-center h-full py-12 border-2 border-dashed border-white/10"
                  >
                    <p className="font-headline text-sm tracking-widest font-bold">
                      SELECT_CATEGORY_TO_VIEW_LOGS
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="bg-surface-low border border-outline-variant/20 p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h3 className="font-headline text-3xl font-bold text-primary leading-tight">
                {t("Let's collaborate on", "함께 연구해요.")} <br /> {lang === "en" ? "Computer Vision & AI research." : ""}
              </h3>
              <p className="text-on-surface-variant max-w-md">
                {t(
                  "I am always open to discussing new research directions and project collaborations.",
                  "새로운 연구 방향과 프로젝트 협업에 대해 언제든 열려 있습니다."
                )}
              </p>
              <a
                href="mailto:tomas6820@gmail.com"
                className="inline-flex items-center space-x-2 bg-primary text-white px-8 py-3 rounded-sm font-headline text-xs font-bold tracking-widest active:scale-95 transition-all"
              >
                <span>INITIALIZE_COMMS</span>
                <ArrowRight size={14} />
              </a>
            </div>
            <div className="flex-1 w-full max-w-md">
              <div className="bg-white p-6 border border-outline-variant/20 font-mono text-xs space-y-2 shadow-sm">
                <div className="text-on-surface-variant/40">
                  $ curl -X POST inseong.api/collaborate
                </div>
                <div className="text-secondary">{"{"}</div>
                <div className="pl-4 text-on-surface-variant">
                  "status": "ready",
                </div>
                <div className="pl-4 text-on-surface-variant">
                  "interest_areas": [
                </div>
                <div className="pl-8 text-on-surface-variant">
                  "3d_reconstruction",
                </div>
                <div className="pl-8 text-on-surface-variant">
                  "spatial_perception",
                </div>
                <div className="pl-8 text-on-surface-variant">
                  "embodied_ai"
                </div>
                <div className="pl-4 text-on-surface-variant">]</div>
                <div className="text-secondary">{"}"}</div>
                <div className="text-on-surface-variant/40 animate-pulse">
                  _
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-outline-variant/10 bg-white py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <div className="text-lg font-headline font-bold tracking-tighter text-primary mb-2">
              Inseong Choi
            </div>
            <div className="text-[10px] font-headline font-bold text-on-surface-variant/40 uppercase tracking-widest">
              © 2026 Inseong Choi. Compiled with precision.
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {[
              {
                name: "Lab",
                icon: ExternalLink,
                href: "https://sites.google.com/view/smrlab",
              },
              {
                name: "GitHub",
                icon: Github,
                href: "https://github.com/Kakaomacao",
              },
              {
                name: "LinkedIn",
                icon: Linkedin,
                href: "https://www.linkedin.com/in/%EC%9D%B8%EC%84%B1-%EC%B5%9C-196891398/",
              },
              {
                name: "Google Scholar",
                icon: ExternalLink,
                href: "https://scholar.google.com/citations?user=eUQv_1oAAAAJ&hl=en",
              },
            ].map((social) => (
              <a
                key={social.name}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  social.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="text-on-surface-variant/60 hover:text-secondary text-[10px] font-headline font-bold tracking-widest transition-colors flex items-center space-x-1"
              >
                <span>{social.name.toUpperCase()}</span>
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
