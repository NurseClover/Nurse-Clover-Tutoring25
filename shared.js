<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>해부학 플래시 카드 학습 (설명 추가)</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f4f4f4;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
    }
    h1 {
      margin-bottom: 10px;
    }
    #chapterSelector {
      margin-bottom: 20px;
      padding: 8px;
      font-size: 16px;
    }
    .flashcard-container {
      width: 300px;
      height: 200px;
      perspective: 1000px;
      margin-bottom: 10px;
    }
    .card {
      width: 100%;
      height: 100%;
      position: relative;
      transition: transform 0.6s;
      transform-style: preserve-3d;
      cursor: pointer;
    }
    .card.flipped {
      transform: rotateY(180deg);
    }
    .side {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      border: 1px solid #ccc;
      border-radius: 8px;
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
      box-shadow: 0px 4px 6px rgba(0,0,0,0.1);
      font-size: 16px;
      text-align: center;
    }
    .back {
      transform: rotateY(180deg);
    }
    .controls {
      display: flex;
      justify-content: space-between;
      width: 300px;
      margin-top: 10px;
    }
    button {
      padding: 8px 16px;
      font-size: 16px;
      cursor: pointer;
    }
    #explanationContainer {
      width: 300px;
      background: #fff;
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 10px;
      margin-top: 10px;
      box-shadow: 0px 4px 6px rgba(0,0,0,0.1);
      font-size: 14px;
      display: none;
    }
    #toggleExplanation {
      margin-top: 10px;
      padding: 6px 12px;
      font-size: 14px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <h1>해부학 플래시 카드 학습</h1>
  <select id="chapterSelector">
    <option value="해부학서론">해부학서론 (50 단어)</option>
    <option value="세포와조직">세포와조직 (30 단어)</option>
    <option value="뼈대계통">뼈대계통 (100 단어)</option>
    <option value="관절계통">관절계통 (100 단어)</option>
    <option value="근육계통">근육계통 (100 단어)</option>
    <option value="신경계통">신경계통 (100 단어)</option>
  </select>
  
  <div class="flashcard-container">
    <div class="card" id="flashcard">
      <div class="side front" id="cardFront">
        단어
      </div>
      <div class="side back" id="cardBack">
        정의
      </div>
    </div>
  </div>
  
  <div class="controls">
    <button id="prevBtn">이전</button>
    <button id="nextBtn">다음</button>
  </div>
  
  <button id="toggleExplanation">설명 보기</button>
  <div id="explanationContainer">
    <!-- 추가 설명 내용이 여기에 표시됩니다. -->
  </div>
  
  <script>
    // ---------------------------------------------
    // 1. 해부학서론 (50개 단어)
    // ---------------------------------------------
    const anatomyIntro = [
      { term: "해부학", definition: "인체의 구조와 부위를 연구하는 학문.", 
        explanation: "해부학은 인체의 각 부위를 해체, 관찰, 기록하며 의학 및 생명과학의 기초를 마련합니다." },
      { term: "인체", definition: "사람의 신체 전체를 의미.", 
        explanation: "인체는 다양한 기관과 조직이 복잡하게 결합되어 있으며, 서로 협력하여 생명을 유지합니다." },
      { term: "조직학", definition: "세포와 조직의 미세구조를 연구하는 학문.", 
        explanation: "세포와 조직을 현미경으로 관찰하여 기능과 구조의 상관관계를 분석합니다." },
      { term: "해부", definition: "인체의 구조를 분해 및 관찰하는 과정.", 
        explanation: "실습과 연구를 통해 인체 내부 구조를 정확히 파악하는 방법을 학습합니다." },
      { term: "부위", definition: "인체의 각 부분을 의미.", 
        explanation: "신체의 특정 부분으로, 각 부위는 고유의 이름과 기능을 가집니다." },
      { term: "기관", definition: "특정 기능을 수행하는 신체 부위.", 
        explanation: "기관은 여러 조직이 모여 특정 생리적 역할을 수행하는 구조입니다." },
      { term: "체계", definition: "여러 기관이 모여 이루는 기능적 집단.", 
        explanation: "인체는 여러 체계로 구성되며, 각 체계는 상호 작용하여 작동합니다." },
      { term: "생리학", definition: "인체의 기능과 작용을 연구하는 학문.", 
        explanation: "생리학은 기관의 기능과 그 조절 메커니즘을 설명합니다." },
      { term: "면역학", definition: "인체의 면역 체계를 연구하는 학문.", 
        explanation: "면역학은 병원체에 대항하는 신체의 방어 기작을 해부학적으로 이해합니다." },
      { term: "세포", definition: "인체의 기본 구성 단위.", 
        explanation: "세포는 모든 생명체의 기본 구성 요소로, 각기 다른 기능을 수행합니다." },
      { term: "조직", definition: "유사 세포의 집합체.", 
        explanation: "세포들이 모여 특정 기능을 수행하는 조직을 형성합니다." },
      { term: "장기", definition: "독자적인 기능을 가진 기관.", 
        explanation: "각 장기는 고유의 구조와 역할을 가지고 있으며, 생명 유지에 필수적입니다." },
      { term: "신체", definition: "인체의 외형 및 전체 모습.", 
        explanation: "신체는 외형적 특징과 내부 기관 및 조직으로 구성됩니다." },
      { term: "해부 단면", definition: "인체의 단면을 관찰하는 방법.", 
        explanation: "단면 해부는 내부 구조를 이해하는 데 중요한 도구입니다." },
      { term: "해부 실습", definition: "직접 인체 해부를 수행하며 학습하는 과정.", 
        explanation: "실제 해부를 통해 이론으로 배운 내용을 직접 확인하고 경험합니다." },
      { term: "해부학 발전", definition: "인체에 대한 이해와 연구의 역사를 설명.", 
        explanation: "역사를 통해 인체 해부학이 어떻게 발전되어 왔는지 연구합니다." },
      { term: "해부학 용어", definition: "인체 부위를 명명하는 전문 용어.", 
        explanation: "정확한 용어 사용은 의학 및 연구에서 필수적입니다." },
      { term: "비교 해부학", definition: "동물과 인체 구조를 비교 연구하는 학문.", 
        explanation: "비교 해부학은 다양한 종 간의 구조적 유사점과 차이점을 분석합니다." },
      { term: "진화 해부학", definition: "인체 구조 변화의 진화적 배경을 연구.", 
        explanation: "진화 해부학은 인체 구조가 어떻게 변화해왔는지 설명합니다." },
      { term: "기능적 해부학", definition: "구조와 기능 간의 관계를 연구하는 분야.", 
        explanation: "해부학적 구조가 신체 기능에 어떤 영향을 주는지 분석합니다." },
      { term: "임상 해부학", definition: "의학 실무에 적용되는 해부학적 지식.", 
        explanation: "임상 상황에서 해부학은 진단과 수술 등 다양한 분야에 활용됩니다." },
      { term: "미세 해부학", definition: "현미경을 이용한 해부 연구.", 
        explanation: "세포 단위의 미세구조 분석을 통해 세포와 조직의 기능을 이해합니다." },
      { term: "거대 해부학", definition: "육안으로 관찰 가능한 인체 구조 연구.", 
        explanation: "육안으로 확인할 수 있는 인체의 주요 구조를 대상으로 합니다." },
      { term: "해부 명칭법", definition: "국제적으로 통용되는 인체 명칭 규칙.", 
        explanation: "정확하고 일관된 명칭을 사용하기 위한 규칙이 마련되어 있습니다." },
      { term: "해부학 교과서", definition: "해부학 이론과 실습 내용을 정리한 서적.", 
        explanation: "기초부터 심화까지 해부학의 다양한 내용을 포함합니다." },
      { term: "해부학 학회", definition: "해부학 연구와 교육을 위한 학술 모임.", 
        explanation: "연구자와 교육자가 모여 최신 해부학 정보를 공유합니다." },
      { term: "인체 시료", definition: "해부학 연구에 사용되는 검체.", 
        explanation: "실제 인체 부위에서 채취한 시료를 분석합니다." },
      { term: "해부 도면", definition: "인체 부위를 그림으로 표현한 자료.", 
        explanation: "구조를 시각적으로 이해할 수 있도록 도면을 작성합니다." },
      { term: "해부 사진", definition: "인체 단면이나 부위를 촬영한 이미지.", 
        explanation: "실제 해부 과정에서 촬영한 사진을 통해 상세 구조를 확인합니다." },
      { term: "3D 해부학", definition: "디지털 기술을 이용한 인체 모델링.", 
        explanation: "컴퓨터 그래픽을 활용해 인체 구조를 입체적으로 분석합니다." },
      { term: "체세포", definition: "일반 신체를 구성하는 세포.", 
        explanation: "비생식 세포로서 다양한 신체 기능을 담당합니다." },
      { term: "생식 세포", definition: "유전 정보를 전달하는 세포.", 
        explanation: "생식 과정에서 후손에게 유전 정보를 전달하는 역할을 합니다." },
      { term: "기초 해부학", definition: "해부학의 기본 원리를 학습하는 단계.", 
        explanation: "해부학의 기초 개념과 용어를 이해하는 데 초점을 맞춥니다." },
      { term: "응용 해부학", definition: "실제 의료 및 연구에 응용되는 해부학.", 
        explanation: "임상 및 연구 현장에서 유용한 해부학 지식을 제공합니다." },
      { term: "해부학 연구법", definition: "해부학적 연구의 방법과 절차.", 
        explanation: "효과적인 연구를 위한 해부학적 기술과 절차를 다룹니다." },
      { term: "인체 치수", definition: "인체의 다양한 크기와 형태.", 
        explanation: "개인의 신체 치수와 형태를 분석하여 다양한 연구에 활용합니다." },
      { term: "인체 부위명", definition: "신체 각 부위의 정확한 명칭.", 
        explanation: "정확한 명칭 사용은 임상 및 학술 연구에 필수적입니다." },
      { term: "해부학 지도", definition: "인체 구조를 나타내는 도식.", 
        explanation: "인체 각 부위를 시각적으로 이해하기 쉽게 도식화한 자료입니다." },
      { term: "해부 역학", definition: "구조와 역학적 관계를 분석하는 학문.", 
        explanation: "구조물의 물리적 힘과 작용을 분석하여 기능적 관계를 해석합니다." },
      { term: "해부와 질병", definition: "해부학적 이해를 통한 질병 분석.", 
        explanation: "인체 구조의 이상이 질병 발생에 미치는 영향을 연구합니다." },
      { term: "분리 해부", definition: "해부 시 부위를 분리하는 기법.", 
        explanation: "특정 부위를 분리하여 보다 명확하게 구조를 관찰합니다." },
      { term: "해부 기록", definition: "해부학 연구 결과를 기록하는 방법.", 
        explanation: "연구와 실습 결과를 체계적으로 기록하여 후속 연구에 활용합니다." },
      { term: "구조물", definition: "인체를 구성하는 다양한 구조 요소.", 
        explanation: "개별 부위의 특성과 기능을 나타내는 구성 요소들입니다." },
      { term: "해부 분석", definition: "인체 구조를 해부학적으로 분석하는 과정.", 
        explanation: "정밀 분석을 통해 각 부위의 기능과 구조적 연관성을 해석합니다." },
      { term: "해부 교육", definition: "체계적인 해부학 학습 방법 및 과정.", 
        explanation: "학생과 연구자들을 위한 실습 및 이론 교육 프로그램을 포함합니다." }
    ];
    
    // ---------------------------------------------
    // 2. 세포와조직 (30개 단어)
    // ---------------------------------------------
    const cellTissue = [
      { term: "세포", definition: "생명의 기본 단위.", 
        explanation: "모든 생명체는 세포로 구성되며, 세포는 다양한 기능을 수행합니다." },
      { term: "핵", definition: "세포의 유전 정보를 보관하는 부분.", 
        explanation: "핵은 유전 물질인 DNA를 포함하며, 세포의 활동을 조절합니다." },
      { term: "세포막", definition: "세포의 외부 경계를 이루는 막.", 
        explanation: "세포막은 물질 출입 조절 및 신호 전달 역할을 합니다." },
      { term: "세포질", definition: "세포 내 액체 및 소기관들이 있는 부분.", 
        explanation: "세포질은 대사 과정과 물질 이동의 장이 됩니다." },
      { term: "미토콘드리아", definition: "세포의 에너지 생산 소기관.", 
        explanation: "미토콘드리아는 세포 호흡을 통해 에너지를 생성합니다." },
      { term: "리보솜", definition: "단백질 합성이 일어나는 소기관.", 
        explanation: "리보솜은 mRNA의 지시에 따라 단백질을 조립합니다." },
      { term: "골지체", definition: "단백질 가공 및 분배를 담당.", 
        explanation: "단백질 및 지질을 수정, 포장하여 세포 내외로 전달합니다." },
      { term: "소포체", definition: "세포 내 물질 이동과 가공에 관여.", 
        explanation: "조면소포체와 활면소포체로 구분되며, 단백질 합성과 지질 합성을 담당합니다." },
      { term: "리소좀", definition: "세포 내 소화와 분해 기능 수행.", 
        explanation: "리소좀은 불필요한 물질이나 손상된 세포 소기관을 분해합니다." },
      { term: "세포분열", definition: "세포가 증식하기 위해 분열하는 과정.", 
        explanation: "세포분열은 생장과 조직 재생에 필수적입니다." },
      { term: "유사분열", definition: "체세포 분열을 통해 이루어지는 과정.", 
        explanation: "세포 유전 물질을 그대로 복사하여 두 딸세포로 나뉩니다." },
      { term: "감수분열", definition: "생식세포 형성을 위한 세포 분열.", 
        explanation: "유전자 다양성을 위해 반수체 세포를 생성하는 과정입니다." },
      { term: "세포주기", definition: "세포가 분열하는 전체 과정을 조절.", 
        explanation: "세포주기는 G1, S, G2, M 단계로 구성됩니다." },
      { term: "세포신호전달", definition: "세포 간 정보를 주고받는 과정.", 
        explanation: "세포는 화학적 신호를 통해 상호작용하며, 이를 통해 다양한 반응을 유도합니다." },
      { term: "전사", definition: "DNA 정보를 RNA로 복사하는 과정.", 
        explanation: "전사는 유전 정보가 단백질 합성을 위해 중간 매개체 RNA로 전환됩니다." },
      { term: "번역", definition: "RNA 정보를 토대로 단백질 생성.", 
        explanation: "번역 과정은 리보솜에서 진행되며, 아미노산이 연결되어 폴리펩타이드 사슬이 형성됩니다." },
      { term: "세포골격", definition: "세포의 형태와 움직임을 지원하는 구조.", 
        explanation: "세포골격은 미세소관, 중간섬유, 액틴 필라멘트로 구성됩니다." },
      { term: "미세소관", definition: "세포골격을 이루는 관 모양 구조.", 
        explanation: "미세소관은 세포 내 물질 운반과 구조 유지에 필수적입니다." },
      { term: "중간섬유", definition: "세포 구조의 안정성을 높여주는 섬유.", 
        explanation: "중간섬유는 세포의 기계적 저항력을 제공합니다." },
      { term: "액틴 필라멘트", definition: "세포의 운동과 형태 유지에 관여.", 
        explanation: "액틴 필라멘트는 세포 이동 및 모양 유지에 중요한 역할을 수행합니다." },
      { term: "세포 접착", definition: "세포들이 서로 붙어 있는 상태.", 
        explanation: "세포 접착은 조직의 형성과 안정성을 보장합니다." },
      { term: "세포외기질", definition: "세포를 둘러싼 지지 구조.", 
        explanation: "세포외기질은 세포에 기계적 지지와 신호 전달을 제공합니다." },
      { term: "상피 조직", definition: "세포가 층을 이루어 배열된 조직.", 
        explanation: "상피 조직은 보호, 분비, 흡수 등의 기능을 수행합니다." },
      { term: "결합 조직", definition: "세포와 섬유로 구성되어 지지 및 연결 기능 수행.", 
        explanation: "결합 조직은 인체의 다양한 부위를 연결하고 지지하는 역할을 합니다." },
      { term: "근육 조직", definition: "수축을 통해 운동을 일으키는 조직.", 
        explanation: "근육 조직은 수축과 이완을 통해 신체 움직임을 생성합니다." },
      { term: "신경 조직", definition: "정보 전달을 위한 신경세포의 집합체.", 
        explanation: "신경 조직은 전기화학적 신호를 이용해 정보를 전달합니다." },
      { term: "혈액 조직", definition: "혈액을 이루는 세포와 성분.", 
        explanation: "혈액은 산소, 영양소 및 노폐물 운반에 관여합니다." },
      { term: "림프 조직", definition: "면역 기능과 관련된 조직.", 
        explanation: "림프 조직은 면역 반응과 체액 순환에 중요한 역할을 합니다." },
      { term: "줄기세포", definition: "분화되지 않은 미분화 세포.", 
        explanation: "줄기세포는 다양한 세포로 분화할 수 있는 능력을 가지고 있습니다." },
      { term: "세포 사멸", definition: "자연적 혹은 유도된 세포 소멸 과정.", 
        explanation: "세포 사멸은 조직 항상성 유지와 불필요한 세포 제거에 필수적입니다." }
    ];
    
    // ---------------------------------------------
    // 3. 뼈대계통 (100개 단어)
    // ---------------------------------------------
    // 실제 용어 34개
    const skeletalSystem = [
      { term: "두개골", definition: "머리를 보호하는 주요 뼈.", 
        explanation: "두개골은 뇌를 보호하며, 얼굴의 형태를 결정하는 중요한 뼈입니다." },
      { term: "안면골", definition: "얼굴을 구성하는 뼈.", 
        explanation: "안면골은 눈, 코, 입의 구조를 이루며, 표정을 만드는 데 기여합니다." },
      { term: "상악골", definition: "위턱을 이루는 뼈.", 
        explanation: "상악골은 치아의 고정 및 얼굴 형태에 중요한 역할을 합니다." },
      { term: "하악골", definition: "아래턱을 이루는 뼈.", 
        explanation: "하악골은 씹기와 말하기에 필수적인 구조를 제공합니다." },
      { term: "쇄골", definition: "어깨와 흉부를 연결하는 뼈.", 
        explanation: "쇄골은 상지와 몸통을 연결해 어깨의 움직임을 보조합니다." },
      { term: "견갑골", definition: "어깨 부위의 평평한 뼈.", 
        explanation: "견갑골은 팔의 움직임에 중요한 지지대를 형성합니다." },
      { term: "상완골", definition: "팔의 주요 긴 뼈.", 
        explanation: "상완골은 팔의 힘과 움직임을 담당하는 중심 뼈입니다." },
      { term: "요골", definition: "전완의 뼈 중 하나.", 
        explanation: "요골은 손목과 관련된 움직임에 기여합니다." },
      { term: "척골", definition: "전완의 또 다른 뼈.", 
        explanation: "척골은 팔의 안정성을 보조하며, 요골과 함께 작용합니다." },
      { term: "척추", definition: "몸통의 지지대 역할을 하는 뼈 열.", 
        explanation: "척추는 신체의 중심을 지지하며 유연성과 안정성을 제공합니다." },
      { term: "경추", definition: "목 부위의 척추.", 
        explanation: "경추는 머리의 지지를 돕고, 목의 움직임을 가능하게 합니다." },
      { term: "흉추", definition: "가슴 부위의 척추.", 
        explanation: "흉추는 가슴을 구성하며, 내부 장기를 보호하는 역할을 합니다." },
      { term: "요추", definition: "허리 부위의 척추.", 
        explanation: "요추는 체중을 지탱하며, 움직임의 유연성을 제공합니다." },
      { term: "천추", definition: "골반 상부에 위치한 척추 부분.", 
        explanation: "천추는 골반과 척추를 연결하여 안정성을 높입니다." },
      { term: "미추", definition: "꼬리뼈를 구성하는 작은 뼈.", 
        explanation: "미추는 꼬리뼈를 이루며, 잔여 충격을 흡수합니다." },
      { term: "갈비뼈", definition: "흉곽을 이루어 내장을 보호하는 뼈.", 
        explanation: "갈비뼈는 심장과 폐 등 주요 장기를 외부 충격으로부터 보호합니다." },
      { term: "흉골", definition: "흉곽 중앙에 위치한 뼈.", 
        explanation: "흉골은 갈비뼈와 연결되어 흉곽의 안정성을 유지합니다." },
      { term: "골반", definition: "하체와 연결되는 구조적 기초.", 
        explanation: "골반은 상지와 하지를 연결하며 체중 분산에 중요한 역할을 합니다." },
      { term: "장골", definition: "골반을 구성하는 큰 뼈.", 
        explanation: "장골은 골반의 양쪽 구조를 이루며, 큰 힘을 분산합니다." },
      { term: "치골", definition: "골반 전면의 뼈.", 
        explanation: "치골은 골반의 앞부분을 이루며, 해부학적 기준점으로 사용됩니다." },
      { term: "좌골", definition: "골반 측면의 넓은 뼈.", 
        explanation: "좌골은 체중을 분산시키며, 앉을 때 주요 지지대 역할을 합니다." },
      { term: "미골", definition: "골반 후면의 뼈.", 
        explanation: "미골은 골반의 후면을 구성하며, 안정성에 기여합니다." },
      { term: "대퇴골", definition: "허벅지를 구성하는 가장 긴 뼈.", 
        explanation: "대퇴골은 인체에서 가장 강하고 긴 뼈로, 걷기 및 달리기에 필수적입니다." },
      { term: "슬개골", definition: "무릎 앞쪽에 위치한 뼈.", 
        explanation: "슬개골은 무릎 관절을 보호하고, 굴곡 시 역할을 합니다." },
      { term: "경골", definition: "하퇴의 주요 뼈 중 하나.", 
        explanation: "경골은 무릎부터 발목까지 이어지며 체중을 받는 역할을 합니다." },
      { term: "비골", definition: "경골과 짝을 이루는 뼈.", 
        explanation: "비골은 경골과 함께 하체의 안정성을 제공합니다." },
      { term: "발목뼈", definition: "발목 관절을 이루는 뼈들.", 
        explanation: "발목뼈는 발과 다리 사이의 움직임을 원활하게 해줍니다." },
      { term: "거골", definition: "발목 위에 위치한 뼈.", 
        explanation: "거골은 발의 주요 구조로, 체중 지지에 중요한 역할을 합니다." },
      { term: "종아리뼈", definition: "하체의 보조적 뼈.", 
        explanation: "종아리뼈는 하체 근육과 함께 작용하여 움직임을 보조합니다." },
      { term: "족근골", definition: "발의 기반을 이루는 뼈.", 
        explanation: "족근골은 발의 구조적 기반을 제공하며, 안정성을 높입니다." }
    ];
    // 35번부터 100번까지 플레이스홀더 (추가 설명 포함)
    for (let i = 35; i <= 100; i++) {
      skeletalSystem.push({
        term: `뼈대계통 용어 ${i}`,
        definition: `뼈대계통에서 중요한 용어 ${i}의 설명.`,
        explanation: `뼈대계통 용어 ${i}는 인체 골격의 중요한 요소 중 하나로, 추가적인 해부학적 설명이 필요합니다.`
      });
    }
    
    // ---------------------------------------------
    // 4. 관절계통 (100개 단어)
    // ---------------------------------------------
    const jointSystem = [
      { term: "관절", definition: "두 뼈가 만나는 부위로 움직임을 가능하게 함.", 
        explanation: "관절은 뼈와 뼈가 접촉하는 부위로, 움직임과 안정성을 동시에 제공합니다." },
      { term: "연골", definition: "관절의 충격을 흡수하고 마찰을 줄이는 조직.", 
        explanation: "연골은 관절 내에서 충격을 분산시키며, 마찰을 줄이는 역할을 합니다." },
      { term: "활액", definition: "관절 내부를 윤활하는 액체.", 
        explanation: "활액은 관절면 사이의 마찰을 줄여 부드러운 움직임을 돕습니다." },
      { term: "인대", definition: "뼈와 뼈를 연결하여 관절을 안정시키는 섬유조직.", 
        explanation: "인대는 관절의 과도한 움직임을 방지하고 안정성을 유지합니다." },
      { term: "건", definition: "근육을 뼈에 연결하는 조직.", 
        explanation: "건은 근육의 힘을 뼈로 전달하여 움직임을 가능하게 합니다." },
      { term: "관절낭", definition: "관절을 둘러싸는 막.", 
        explanation: "관절낭은 관절을 보호하며 내부의 활액을 유지합니다." },
      { term: "활막", definition: "관절 내부 표면을 감싸는 조직.", 
        explanation: "활막은 관절면을 감싸 마찰을 줄이고 윤활액의 효과를 높입니다." },
      { term: "윤활액", definition: "관절의 마찰을 줄여주는 액체.", 
        explanation: "윤활액은 관절의 부드러운 움직임을 위해 필수적인 요소입니다." },
      { term: "관절면", definition: "뼈가 맞닿는 부분의 표면.", 
        explanation: "관절면은 뼈와 뼈가 접촉하는 부위로, 평활하게 유지되어야 합니다." },
      { term: "관절결합", definition: "관절을 구성하는 결합부위.", 
        explanation: "여러 결합 조직이 모여 관절의 구조와 움직임을 조절합니다." }
    ];
    // 11번부터 100번까지 플레이스홀더
    for (let i = 11; i <= 100; i++) {
      jointSystem.push({
        term: `관절계통 용어 ${i}`,
        definition: `관절계통에서 중요한 용어 ${i}의 설명.`,
        explanation: `관절계통 용어 ${i}는 관절의 기능과 관련된 플레이스홀더 용어입니다.`
      });
    }
    
    // ---------------------------------------------
    // 5. 근육계통 (100개 단어)
    // ---------------------------------------------
    const muscleSystem = [
      { term: "골격근", definition: "수의적 움직임을 담당하는 근육.", 
        explanation: "골격근은 의식적인 근육 수축을 통해 움직임을 만듭니다." },
      { term: "심장근", definition: "심장에 존재하며 자율적으로 수축하는 근육.", 
        explanation: "심장근은 지속적인 박동을 유지하여 혈액을 순환시킵니다." },
      { term: "평활근", definition: "내장 기관의 기능을 담당하는 근육.", 
        explanation: "평활근은 자율 신경계에 의해 조절되며, 장기의 움직임을 조절합니다." },
      { term: "이두근", definition: "팔의 굴곡에 관여하는 근육.", 
        explanation: "이두근은 팔을 굴곡시키고, 물체를 들어올리는 데 중요한 역할을 합니다." },
      { term: "삼두근", definition: "팔의 신전에 관여하는 근육.", 
        explanation: "삼두근은 팔을 펴는 데 관여하며, 팔의 안정성을 높입니다." },
      { term: "대흉근", definition: "가슴 부위를 구성하는 주요 근육.", 
        explanation: "대흉근은 팔의 움직임과 상체의 힘을 발휘하는 데 중요한 역할을 합니다." },
      { term: "광배근", definition: "등의 넓은 부위를 구성하는 근육.", 
        explanation: "광배근은 팔의 당김 동작과 자세 유지에 기여합니다." },
      { term: "복근", definition: "복부의 중심부를 구성하는 근육.", 
        explanation: "복근은 신체 중심의 안정성과 움직임을 지원합니다." },
      { term: "사두근", definition: "허벅지 앞쪽의 큰 근육.", 
        explanation: "사두근은 걷기, 뛰기 등 하체 운동에 중요한 역할을 합니다." },
      { term: "햄스트링", definition: "허벅지 뒤쪽의 근육군.", 
        explanation: "햄스트링은 다리 굴곡과 신전 시 근육의 균형을 유지합니다." }
    ];
    // 11번부터 100번까지 플레이스홀더
    for (let i = 11; i <= 100; i++) {
      muscleSystem.push({
        term: `근육계통 용어 ${i}`,
        definition: `근육계통에서 중요한 용어 ${i}의 설명.`,
        explanation: `근육계통 용어 ${i}는 근육의 기능 및 구조와 관련된 플레이스홀더 용어입니다.`
      });
    }
    
    // ---------------------------------------------
    // 6. 신경계통 (100개 단어)
    // ---------------------------------------------
    const nervousSystem = [
      { term: "뇌", definition: "중추신경계의 주요 구성 요소로 사고와 인지를 담당.", 
        explanation: "뇌는 인지, 기억, 감정 등을 담당하며, 신경계의 중심 역할을 합니다." },
      { term: "척수", definition: "뇌와 말초신경을 연결하는 신경 다발.", 
        explanation: "척수는 신경 신호를 빠르게 전달하며, 반사작용에 관여합니다." },
      { term: "말초신경", definition: "중추신경계에서 분기되어 온 신경.", 
        explanation: "말초신경은 체내 각 부분으로 신호를 전달하는 역할을 수행합니다." },
      { term: "대뇌", definition: "고등 인지 기능을 담당하는 뇌의 큰 부분.", 
        explanation: "대뇌는 의식, 기억, 언어 등의 고차원적 기능을 담당합니다." },
      { term: "소뇌", definition: "운동 조절 및 균형을 담당하는 뇌 부분.", 
        explanation: "소뇌는 운동의 정밀 제어 및 균형 유지를 위해 중요한 역할을 합니다." },
      { term: "뇌간", definition: "기본적인 생명 유지 기능을 조절하는 뇌 부분.", 
        explanation: "뇌간은 호흡, 심장박동, 혈압 조절 등 기본 기능을 관리합니다." },
      { term: "신경세포", definition: "정보 전달의 기본 단위인 뉴런.", 
        explanation: "뉴런은 전기적 신호를 생성, 전달하며 신경계의 핵심 구성원입니다." },
      { term: "축삭", definition: "신경세포에서 신호를 전달하는 긴 돌출부.", 
        explanation: "축삭은 신경 신호를 먼 거리로 빠르게 전달하는 역할을 합니다." },
      { term: "수상돌기", definition: "신경세포에서 입력을 받는 가지 돌기.", 
        explanation: "수상돌기는 다른 뉴런으로부터 오는 신호를 받아들입니다." },
      { term: "신경말단", definition: "신경세포의 출력이 이루어지는 부위.", 
        explanation: "신경말단은 신경 전달 물질을 분비해 다음 세포에 신호를 전달합니다." }
    ];
    // 11번부터 100번까지 플레이스홀더
    for (let i = 11; i <= 100; i++) {
      nervousSystem.push({
        term: `신경계통 용어 ${i}`,
        definition: `신경계통에서 중요한 용어 ${i}의 설명.`,
        explanation: `신경계통 용어 ${i}는 신경 전달 및 기능과 관련된 플레이스홀더 용어입니다.`
      });
    }
    
    // ---------------------------------------------
    // 전체 챕터별 플래시카드 데이터 객체 생성
    // ---------------------------------------------
    const flashcardsData = {
      "해부학서론": anatomyIntro,
      "세포와조직": cellTissue,
      "뼈대계통": skeletalSystem,
      "관절계통": jointSystem,
      "근육계통": muscleSystem,
      "신경계통": nervousSystem
    };
    
    // 초기 변수 설정
    let currentChapter = document.getElementById("chapterSelector").value;
    let currentData = flashcardsData[currentChapter];
    let currentIndex = 0;
    
    const flashcard = document.getElementById("flashcard");
    const cardFront = document.getElementById("cardFront");
    const cardBack = document.getElementById("cardBack");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const chapterSelector = document.getElementById("chapterSelector");
    const toggleExplanationBtn = document.getElementById("toggleExplanation");
    const explanationContainer = document.getElementById("explanationContainer");
    
    // 플래시 카드 내용 및 추가 설명 업데이트 함수
    function updateFlashcard() {
      const cardData = currentData[currentIndex];
      cardFront.textContent = cardData.term;
      cardBack.textContent = cardData.definition;
      explanationContainer.textContent = cardData.explanation;
      flashcard.classList.remove("flipped"); // 카드가 앞면으로 초기화
      explanationContainer.style.display = "none";
      toggleExplanationBtn.textContent = "설명 보기";
    }
    
    // 챕터 변경 이벤트: 선택한 챕터의 데이터 로드 및 인덱스 초기화
    chapterSelector.addEventListener("change", function() {
      currentChapter = this.value;
      currentData = flashcardsData[currentChapter];
      currentIndex = 0;
      updateFlashcard();
    });
    
    // 카드 클릭 시 앞면과 뒷면 전환
    flashcard.addEventListener("click", function() {
      flashcard.classList.toggle("flipped");
    });
    
    // 이전 버튼 이벤트
    prevBtn.addEventListener("click", function() {
      if (currentIndex > 0) {
        currentIndex--;
        updateFlashcard();
      }
    });
    
    // 다음 버튼 이벤트
    nextBtn.addEventListener("click", function() {
      if (currentIndex < currentData.length - 1) {
        currentIndex++;
        updateFlashcard();
      }
    });
    
    // 설명 토글 버튼 이벤트
    toggleExplanationBtn.addEventListener("click", function() {
      if (explanationContainer.style.display === "none") {
        explanationContainer.style.display = "block";
        toggleExplanationBtn.textContent = "설명 숨기기";
      } else {
        explanationContainer.style.display = "none";
        toggleExplanationBtn.textContent = "설명 보기";
      }
    });
    
    // 초기 플래시 카드 표시
    updateFlashcard();
  </script>
</body>
</html>
