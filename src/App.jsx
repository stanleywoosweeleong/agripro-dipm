import React, { useState, useEffect, useMemo } from 'react';

// --- CRASH-PROOF INLINE ICONS (SCALED UP FOR READABILITY) ---
const Icon = ({ name, className }) => {
  const icons = {
    leaf: <path d="M11 20A7 7 0 0 1 14 6c7 0 7 7 7 7a7 7 0 0 1-7 7c-7 0-7-7-7-7"/>,
    bug: <><rect width="8" height="14" x="8" y="6" rx="4"/><path d="m19 7-3 2M5 7l3 2M19 19l-3-2M5 19l3-2M20 13h-4M4 13h4M10 4l1 2M14 4l-1 2"/></>,
    droplets: <path d="M7 16.3c0 2.6 2.24 4.7 5 4.7s5-2.1 5-4.7c0-2.4-2.24-5.3-5-8.8-2.76 3.5-5 6.4-5 8.8z" />,
    alert: <><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
    search: <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    info: <><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></>,
    activity: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>,
    calculator: <><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></>,
    link: <><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></>,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
    rain: <><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></>,
    camera: <><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></>,
    x: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    image: <><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></>,
    upload: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></>,
    grid: <><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></>,
    list: <><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></>,
    'arrow-up': <><line x1="12" x2="12" y1="19" y2="5"/><polyline points="5 12 12 5 19 12"/></>,
    'arrow-down': <><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></>,
    share: <><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/></>,
    filter: <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>,
    star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></>,
    moon: <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>,
    sunset: <><path d="M12 2v6"/><path d="M4.93 10.93l2.83 2.83"/><path d="M2 18h20"/><path d="M19.07 10.93l-2.83 2.83"/><path d="M8 18a4 4 0 0 1 8 0"/></>,
    clock: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    dash: <line x1="5" y1="12" x2="19" y2="12" />,
    'chevron-down': <polyline points="6 9 12 15 18 9"/>,
    'chevron-up': <polyline points="18 15 12 9 6 15"/>,
    'book-open': <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></>,
    'eye': <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
    'lightbulb': <><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.9 1.2 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></>,
    'dot': <circle cx="12" cy="12" r="10"/>,
    'target': <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
    'dollar-sign': <><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></>,
    'beaker': <><path d="M4.5 3h15"/><path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3"/><path d="M6 14h12"/></>
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {icons[name] || icons.info}
    </svg>
  );
};

// --- DATA ENRICHMENT: IPM, STAGE & PHOTOTAXIS TAGS ---
const ALL_PESTS = [
  // INSECTS - SAP SUCKERS & SCALES
  {
    id: 'thrips-nymph', category: 'Insects', common: '茶黄蓟马 (若虫)', scientific: 'Scirtothrips dorsalis / Thrips palmi', genus: 'Scirtothrips / Thrips', family: 'Thripidae', target: '花蕾，嫩梢', part: 'Fruit/Flower', type: '锉吸式', hiding: '藏匿于花蕾深处和紧卷的嫩叶中', symptoms: '叶片出现银白色条斑，导致落花。微小的黄色/半透明若虫。', activity: 'Continuous',
    lifecycle: '极短的生命周期 (14-20天)。雌虫将多达200粒卵直接产入娇嫩的植物组织内。在干旱炎热天气下，种群数量可在一周内呈指数级爆发。必须在开花前列为最高优先级的防治对象。', symbiosis: '无。', control: '生物防治：喷施球孢白僵菌 (Isaria fumosorosea)。物理防治：在树冠附近悬挂【蓝色粘虫板】捕捉羽化成虫。',
    severity: 4, stages: ['Vegetative', 'Flowering'], ipm: ['Chemical', 'Biological']
  },
  {
    id: 'thrips-adult', category: 'Insects', common: '茶黄蓟马 (有翅成虫)', scientific: 'Scirtothrips dorsalis', genus: 'Scirtothrips', family: 'Thripidae', target: '花朵，嫩叶，幼果', part: 'Fruit/Flower', type: '锉吸式', hiding: '花朵与树冠内', symptoms: '导致幼果表皮木栓化(结痂)、花朵褐变。是造成榴莲果壳出现褐色疤痕的主要元凶。', activity: 'Diurnal',
    lifecycle: '成虫具有强迁飞性，极易通过风力在果园间传播。它们在土壤/落叶层中化蛹，随后飞入树冠。通过蓝色粘虫板进行早期监测至关重要，因为它们破坏速度极快。', symbiosis: '干旱天气下种群数量剧增。', control: '在树冠内部大量悬挂【蓝色粘虫板】(每棵树10张)。生物防治：球孢白僵菌。化学防治：多杀霉素/阿维菌素。',
    severity: 4, stages: ['Flowering', 'Fruiting'], ipm: ['Physical', 'Chemical', 'Biological']
  },
  {
    id: 'aphid-nymph', category: 'Insects', common: '桔二叉蚜 (若虫)', scientific: 'Toxoptera aurantii', genus: 'Toxoptera', family: 'Aphididae', target: '新生嫩梢，花蕾', part: 'Leaves', type: '刺吸式', hiding: '密集聚集在新梢末端', symptoms: '新叶卷曲变形。分泌大量蜜露，引发严重的煤烟病。', activity: 'Continuous',
    lifecycle: '超快速繁殖者。蚜虫通过孤雌生殖(雌虫不经交配直接产下雌性克隆活体)繁殖。生命周期仅需5-7天。一小簇蚜虫能在不到一周的时间内发展成毁灭新梢的庞大群落。', symbiosis: '与蚂蚁共生，蚂蚁会保护它们免受天敌攻击。', control: '控制蚂蚁种群是首要任务。生物防治：喷施蜡蚧轮枝菌(Lecanicillium lecanii)寄生蚜虫群落。悬挂【黄色粘虫板】。',
    severity: 3, stages: ['Seedling', 'Vegetative'], ipm: ['Cultural', 'Chemical', 'Biological']
  },
  {
    id: 'aphid-adult', category: 'Insects', common: '桔二叉蚜 (有翅迁飞型)', scientific: 'Toxoptera aurantii', genus: 'Toxoptera', family: 'Aphididae', target: '新生营养枝', part: 'Leaves', type: '刺吸式', hiding: '树冠新梢末端', symptoms: '成群的有翅成虫四处飞舞，将蚜虫群落传播至新的生长点。', activity: 'Diurnal',
    lifecycle: '有翅成虫只有在群落过度拥挤或食物质量下降时才会产生。它们的突然出现意味着当前枝条的养分已被耗尽，它们正主动飞向健康的树木进行感染。必须迅速采取行动。', symbiosis: '已知是多种植物病毒的传播媒介。', control: '悬挂【黄色粘虫板】拦截迁飞成虫。生物防治：蜡蚧轮枝菌。在抽梢高峰期使用内吸性杀虫剂(如氟啶虫酰胺)。',
    severity: 3, stages: ['Vegetative'], ipm: ['Physical', 'Chemical', 'Biological']
  },
  {
    id: 'whitefly-nymph', category: 'Insects', common: '烟粉虱 (鳞片状若虫)', scientific: 'Bemisia tabaci', genus: 'Bemisia', family: 'Aleyrodidae', target: '叶片背面', part: 'Leaves', type: '刺吸式', hiding: '固定在成熟叶片和嫩叶的背面', symptoms: '导致叶片严重黄化。分泌大量蜜露，导致厚厚的黑色煤烟病。', activity: 'Continuous',
    lifecycle: '3-4周完成一代。若虫扁平，固定不动，看起来像淡绿色的鳞片。一旦定殖，它们对标准的接触性杀虫剂具有极高的抗性。需要使用内吸性农药或窒息性园艺油。', symbiosis: '蜜露会吸引蚂蚁和真菌。', control: '生物防治：球孢白僵菌或蜡蚧轮枝菌能溶解其角质层。使用园艺白油、噻嗪酮(IGR)或螺甲螨酯。',
    severity: 3, stages: ['Vegetative'], ipm: ['Biological', 'Chemical']
  },
  {
    id: 'whitefly-adult', category: 'Insects', common: '烟粉虱 (有翅成虫)', scientific: 'Bemisia tabaci', genus: 'Bemisia', family: 'Aleyrodidae', target: '树冠叶片', part: 'Leaves', type: '刺吸式', hiding: '叶片背面，受惊扰时如白云般飞起', symptoms: '大量微小的白色蛾状昆虫。植物病毒的传播媒介。', activity: 'Diurnal',
    lifecycle: '雌虫在叶背产下100-300粒卵。在温暖干燥的气候中移动性极强，繁殖迅速。由于成虫在喷药时会飞走，通常需要多次施药才能打破其繁殖周期。', symbiosis: '无。', control: '大量悬挂【黄色粘虫板】。生物防治：球孢白僵菌。使用吡丙醚(IGR)打破生命周期。',
    severity: 3, stages: ['Vegetative'], ipm: ['Physical', 'Chemical', 'Biological']
  },
  {
    id: 'durian-pit-scale-crawler', category: 'Insects', common: '榴莲盾介壳虫 (爬行若虫)', scientific: 'Asterolecanium ungulatum', genus: 'Asterolecanium', family: 'Asterolecaniidae', target: '细枝，较小分枝，叶背', part: 'Leaves', type: '刺吸式', hiding: '在树皮和叶面上移动', symptoms: '微小的黄色若虫在定殖前于树皮或叶片上快速移动。这是新一代蚧壳虫爆发的早期迹象。', activity: 'Diurnal',
    lifecycle: '这是盾介壳虫**唯一**脆弱的阶段。此阶段仅持续2-3天，随后它们将永久附着在树皮上并分泌坚不可摧的蜡质盔甲。发现爬行若虫需立即喷施接触性杀虫剂。', symbiosis: '此阶段极易被捕食者捕食。', control: '是施用接触性杀虫剂(如噻嗪酮)或园艺白油的最佳时机。',
    severity: 4, stages: ['Vegetative', 'Post-Harvest'], ipm: ['Chemical', 'Cultural']
  },
  {
    id: 'durian-pit-scale-adult', category: 'Insects', common: '榴莲盾介壳虫 (结壳成虫)', scientific: 'Asterolecanium ungulatum', genus: 'Asterolecanium', family: 'Asterolecaniidae', target: '细枝，小分枝，果柄，叶脉', part: 'Leaves', type: '刺吸式', hiding: '嵌入树皮凹陷处或紧贴叶片主脉', symptoms: '在树皮上形成火山口状的凹陷。在叶片上引起黄色失绿斑点和提早落叶。导致严重的枝条枯死。', activity: 'Continuous',
    lifecycle: '成虫雌性一生都固定在它们形成的凹陷处，长达数月。它们在厚重的蜡质盔甲下繁殖，产下数百粒卵。长期感染会在几年内慢慢耗尽树木的活力，严重降低产量。', symbiosis: '蜡质盔甲保护它们免受接触性喷雾的伤害。', control: '修剪重度感染的细枝。使用重型园艺白油混合渗透性强的内吸杀虫剂。',
    severity: 5, stages: ['All Stages'], ipm: ['Physical', 'Chemical']
  },
  {
    id: 'soft-scale', category: 'Insects', common: '褐软蚧', scientific: 'Coccus hesperidum', genus: 'Coccus', family: 'Coccidae', target: '叶片，绿色嫩枝', part: 'Leaves', type: '刺吸式', hiding: '叶片背面的主脉两侧', symptoms: '与盾介壳虫不同，它们不形成火山口凹陷。但会产生极大量的蜜露，导致严重的煤烟病。', activity: 'Continuous',
    lifecycle: '在热带地区世代重叠(生命周期约60天)。雌虫将卵留在体内直到孵化成活的若虫，这意味着如果有蚂蚁保护，其种群数量会稳定且无情地持续增长。', symbiosis: '受到蚂蚁的强力保护和"放牧"。', control: '必须控制蚂蚁。生物防治：白僵菌混合白油。化学防治：内吸性杀虫剂。',
    severity: 3, stages: ['Vegetative', 'Fruiting'], ipm: ['Biological', 'Chemical']
  },
  {
    id: 'psyllid-nymph', category: 'Insects', common: '榴莲木虱 (分泌蜡丝的若虫)', scientific: 'Allocarsidara malayensis', genus: 'Allocarsidara', family: 'Psyllidae', target: '嫩叶，新梢', part: 'Leaves', type: '刺吸式', hiding: '密集聚集在展开的新叶上', symptoms: '若虫分泌长长的白色蜡质细丝。导致叶片严重卷曲、提早脱落、新梢发育迟缓、严重的煤烟病。', activity: 'Continuous',
    lifecycle: '生命周期与榴莲抽梢期紧密同步。卵在3-5天内孵化。若虫猛烈取食15-20天。一次严重的爆发可以完全摧毁一波营养抽梢，使树木的生长倒退数月。', symbiosis: '产生大量蜜露，吸引蚂蚁。', control: '生物防治：蜡蚧轮枝菌针对其柔软的身体。在活跃抽梢期喷施内吸性杀虫剂(如噻虫嗪)。',
    severity: 4, stages: ['Vegetative'], ipm: ['Chemical', 'Biological']
  },
  {
    id: 'psyllid-adult', category: 'Insects', common: '榴莲木虱 (有翅成虫)', scientific: 'Allocarsidara malayensis', genus: 'Allocarsidara', family: 'Psyllidae', target: '树冠叶片', part: 'Leaves', type: '刺吸式', hiding: '在树冠内跳跃和飞行', symptoms: '出现小型、活跃的有翅昆虫，受惊扰时会跳跃或飞行。造成取食伤害并产卵。', activity: 'Diurnal',
    lifecycle: '成虫寿命长达一个月，不断在展开的幼叶主脉中产卵。它们是强健的跳跃者和飞行者，这意味着它们可以迅速从无人管理的邻近果园蔓延到您的果园。', symbiosis: '无。', control: '在新梢高度悬挂【黄色粘虫板】(每棵树5-8张)进行监测。针对成虫进行叶面喷施。',
    severity: 4, stages: ['Vegetative'], ipm: ['Physical', 'Chemical']
  },
  {
    id: 'green-leafhopper-nymph', category: 'Insects', common: '青蚊 (若虫)', scientific: 'Empoasca flavescens', genus: 'Empoasca', family: 'Cicadellidae', target: '嫩叶', part: 'Leaves', type: '刺吸式', hiding: '嫩叶背面 (横向快速横行)', symptoms: '植物毒性唾液导致"叶蝉烧(Hopperburn)"：叶缘变黄、叶片卷曲、叶尖坏死。若虫受惊时呈横向爬行。', activity: 'Continuous',
    lifecycle: '大约一周孵化。无翅若虫食量惊人。它们的有毒唾液会永久性破坏叶缘的维管组织。在大量施用氮肥后，其种群数量会立刻爆发。', symbiosis: '施用高氮肥后数量激增。', control: '避免过量施用营养期氮肥。喷施杀虫皂液或印楝油。',
    severity: 3, stages: ['Vegetative'], ipm: ['Cultural', 'Biological']
  },
  {
    id: 'green-leafhopper-adult', category: 'Insects', common: '青蚊 (有翅成虫)', scientific: 'Empoasca flavescens', genus: 'Empoasca', family: 'Cicadellidae', target: '嫩叶', part: 'Leaves', type: '刺吸式', hiding: '树冠叶片', symptoms: '摇晃树枝时会成群飞起的绿色昆虫。引起"叶蝉烧"并迅速蔓延。', activity: 'Diurnal',
    lifecycle: '成虫在干热天气下繁殖极快。整个生命周期可在3周内完成。虫群可以在大型庄园内快速移动，导致新抽出的树冠大面积出现叶蝉烧现象。', symbiosis: '无。', control: '施用呋虫胺或吡蚜酮。使用黄色粘虫板进行监测。',
    severity: 4, stages: ['Vegetative'], ipm: ['Chemical', 'Physical']
  },
  {
    id: 'durian-mealybug-crawler', category: 'Insects', common: '榴莲粉蚧 (爬行若虫)', scientific: 'Exallomochlus hispidus', genus: 'Exallomochlus', family: 'Pseudococcidae', target: '细枝，叶片，向果实移动', part: 'Fruit/Flower', type: '刺吸式', hiding: '缝隙中，由蚂蚁主动搬运', symptoms: '微小、高度活跃的黄色/粉红色若虫在树上快速蔓延。出现蜜露的早期迹象。', activity: 'Diurnal',
    lifecycle: '爬行若虫是高度移动的分布阶段。没有蜡质保护，它们容易受到阳光和喷雾的伤害。它们在这个阶段只停留几天就会定殖。如果有蚂蚁存在，蚂蚁会直接把它们搬运到您正在发育的优质果实上。', symbiosis: '被黄猄蚁主动搬运和"放牧"。', control: '这是接触性杀虫剂的最佳施药阶段。施用园艺油或噻嗪酮(IGR)。',
    severity: 4, stages: ['Flowering', 'Fruiting'], ipm: ['Chemical', 'Biological']
  },
  {
    id: 'durian-mealybug-adult', category: 'Insects', common: '榴莲粉蚧 (带蜡质成虫)', scientific: 'Exallomochlus hispidus', genus: 'Exallomochlus', family: 'Pseudococcidae', target: '果壳，花簇，细枝', part: 'Fruit/Flower', type: '刺吸式', hiding: '果刺之间，枝桠处', symptoms: '果皮上出现厚厚的白色粉状/棉絮状团块。导致果实畸形、落果和厚重的煤烟病。', activity: 'Continuous',
    lifecycle: '静止的雌虫存活30-40天，产下巨大的卵块(300-600粒卵)，被棉絮状蜡质包裹。它们在膨大的果实上无情地繁殖，吸取养分并破坏出口榴莲果壳的商业品相。', symbiosis: '与黄猄蚁存在强烈的互利共生关系。', control: '蜡质盔甲排斥许多喷雾。生物防治：白僵菌。使用内吸性杀虫剂(螺虫乙酯)。',
    severity: 5, stages: ['Fruiting'], ipm: ['Cultural', 'Chemical', 'Biological']
  },
  {
    id: 'coffee-mealybug', category: 'Insects', common: '咖啡粉蚧', scientific: 'Planococcus lilacinus', genus: 'Planococcus', family: 'Pseudococcidae', target: '根系，茎干，叶片，果实', part: 'Roots', type: '刺吸式', hiding: '叶背，根部', symptoms: '枝叶萎蔫、发黄，生长迟缓，煤烟病。', activity: 'Continuous',
    lifecycle: '在25-30天内可完成一个生命周期。极其危险，因为它们不仅能感染树冠，还能在地下根系建立群落，这使得标准的叶面喷洒几乎无法根除它们。', symbiosis: '由土壤和树冠的蚂蚁放牧。', control: '针对爬行若虫使用噻嗪酮(IGR)。如果发生在根部，需进行系统性灌根。',
    severity: 3, stages: ['Seedling', 'Vegetative'], ipm: ['Chemical', 'Cultural']
  },
  {
    id: 'leaf-footed-bug', category: 'Insects', common: '缘蝽', scientific: 'Leptoglossus spp.', genus: 'Leptoglossus', family: 'Coreidae', target: '发育中的幼果', part: 'Fruit/Flower', type: '刺吸式 (刺穿)', hiding: '停留在果壳或细枝上', symptoms: '幼果上有明显的刺穿孔迹象。导致局部坏死、内部果核褐变和未成熟果实掉落。', activity: 'Diurnal',
    lifecycle: '繁殖相对较慢(生命周期约60天)，但个体成虫破坏力极强。一只缘蝽就能在一个下午刺穿并毁坏多个幼果。成虫飞行能力强，会从杂草丛中迁飞而来。', symbiosis: '刺穿伤口会引来继发性真菌感染。', control: '在果实发育早期喷施拟除虫菊酯类药物(如高效氯氟氰菊酯)。保持果园无杂草。',
    severity: 4, stages: ['Fruiting'], ipm: ['Chemical', 'Cultural']
  },
  {
    id: 'stink-bug', category: 'Insects', common: '蝽象 (臭虫)', scientific: 'Halyomorpha halys', genus: 'Halyomorpha', family: 'Pentatomidae', target: '果实，嫩梢', part: 'Fruit/Flower', type: '刺吸式 (刺穿)', hiding: '树冠内，高度伪装', symptoms: '果肉内部变色，榴莲果肉(假种皮)硬化，果实畸形。受到威胁时散发恶臭。', activity: 'Diurnal',
    lifecycle: '雌虫成簇产下桶状卵。若虫和成虫都会猛烈取食果实。它们虽然不像蚜虫那样呈指数级繁殖，但其具有植物毒性的唾液意味着即使是极少量的种群也会对果实质量造成重大的经济损失。', symbiosis: '其唾液对榴莲果肉具有高度的植物毒性。', control: '如果虫口密度高，施用广谱杀虫剂。保持果园无杂草以清除寄主。',
    severity: 4, stages: ['Fruiting'], ipm: ['Physical', 'Chemical']
  },

  // INSECTS - ANTS & MUTUALISTS
  {
    id: 'weaver-ant', category: 'Insects', common: '黄猄蚁', scientific: 'Oecophylla smaragdina', genus: 'Oecophylla', family: 'Formicidae', target: '树冠，新叶', part: 'Leaves', type: '共生者 / 滋扰物', hiding: '缝合绿叶制成的大型蚁巢内', symptoms: '将树叶折叠并缝合在一起。在采收或修剪时会猛烈地成群攻击并咬伤工人。在果柄上放牧粉蚧。', activity: 'Diurnal',
    lifecycle: '成熟的蚁群包含多达五十万只蚂蚁，跨越数棵树木。蚁后在受保护的树叶巢穴中不断繁殖。它们不会咬伤树木，但它们对粉蚧/蚧壳虫的强力保护会引发严重的继发性害虫爆发。', symbiosis: '保护粉蚧和蚧壳虫免受天敌伤害，以换取蜜露。', control: '剪除并烧毁蚁巢。在树基部施用接触性杀虫剂(如氯氰菊酯)或使用慢性蚂蚁诱饵。',
    severity: 3, stages: ['All Stages'], ipm: ['Cultural', 'Chemical']
  },
  {
    id: 'crazy-ant', category: 'Insects', common: '长足捷蚁 (黄疯蚁)', scientific: 'Anoplolepis gracilipes', genus: 'Anoplolepis', family: 'Formicidae', target: '树干，树枝，土壤', part: 'General', type: '共生者 / 食腐物', hiding: '土壤裂缝，落叶层，树干基部', symptoms: '行动不规则、快速移动的黄色/棕色蚂蚁在树干上成群结队。通过击退有益的瓢虫和寄生蜂，导致蚜虫和蚧壳虫大规模爆发。', activity: 'Continuous',
    lifecycle: '高度入侵物种。与普通蚂蚁不同，它们形成跨越数公顷土地、拥有数百只蚁后的巨大"超级蚁群"。它们以可怕的速度繁殖并完全主导果园生态系统，确保吸汁害虫的永久性爆发，直到蚂蚁被根除。', symbiosis: '与产生蜜露的吸汁昆虫有专性互利共生关系。它们的存在预示着吸汁害虫的爆发。', control: '部署基于硼砂的糖水诱饵或氟虫腈颗粒。保持果园地面清洁，减少筑巢点。',
    severity: 4, stages: ['All Stages'], ipm: ['Chemical', 'Cultural']
  },

  // INSECTS - OCCUPATIONAL HAZARDS (WASPS & HORNETS)
  {
    id: 'paper-wasp', category: 'Insects', common: '马蜂 / 长脚蜂 (Penyengat)', scientific: 'Polistes spp.', genus: 'Polistes', family: 'Vespidae', target: '树冠，叶片背面', part: 'Leaves', type: '职业危害 /蛰伤', hiding: '附着在树枝或叶背的灰色纸质蜂巢内', symptoms: '工人在修剪、喷药或采收时遭遇群体攻击和严重蛰伤。巢穴呈倒挂莲蓬状、灰色纸质，常隐藏在茂密的树冠叶片中。', activity: 'Diurnal',
    lifecycle: '生态上它们实际上是益虫（捕食毛虫），但因对农场工人构成极高的蛰伤危险，在作业区必须被移除。白天极其活跃并具有强烈的护巢意识。', symbiosis: '无（捕食性）。', control: '【物理拦截】在作业区悬挂大型【黄色粘虫板】诱捕飞行成虫。【严格夜间作业】必须在夜间（蜂群视力受限且全部归巢时）穿着防蜂服进行处理。使用专用的远距离杀蜂气雾剂直接喷射蜂巢入口。',
    severity: 4, stages: ['All Stages'], ipm: ['Physical', 'Chemical']
  },
  {
    id: 'hornet', category: 'Insects', common: '虎头蜂 / 地雷蜂 (Tebuan / Tebuan Tanah)', scientific: 'Vespa spp.', genus: 'Vespa', family: 'Vespidae', target: '树冠高处，灌木丛，地下', part: 'General', type: '致命职业危险', hiding: '巨大的封闭纸质蜂巢，悬挂在树干高处，或隐藏在地下废弃蚁丘中 （地雷蜂）', symptoms: '极度危险。领地意识极强，攻击性极高。多重蛰伤可导致过敏性休克甚至死亡。割草机或震动地面的机械极易激怒地底的地雷蜂。', activity: 'Diurnal',
    lifecycle: '蜂群可达数千只。它们对震动、二氧化碳（呼吸）和深色衣物极其敏感。一旦被激怒，会成群追击入侵者极长距离。', symbiosis: '无（捕食性）。', control: '【物理拦截】在外围悬挂大型【黄色粘虫板】消减工蜂数量。【极度危险】发现巨大蜂巢时应立即设置隔离区，由受过训练的专业人员在深夜穿着重型防蜂服进行定点清除。',
    severity: 5, stages: ['All Stages'], ipm: ['Physical', 'Chemical']
  },
  {
    id: 'nocturnal-wasp', category: 'Insects', common: '平唇原胡蜂 (夜行性胡蜂)', scientific: 'Provespa barthelemyi', genus: 'Provespa', family: 'Vespidae', target: '树冠，趋光性 (人工光源)', part: 'General', type: '致命职业危险 (夜间)', hiding: '白天隐藏在隐蔽的纸质蜂巢中，夜间被光源吸引', symptoms: '完全夜行性，通体呈黄褐色。对工人夜间作业的头灯或手电筒具有极强的正趋光性，会像飞蛾一样疯狂扑向光源并引发严重的群体蛰伤。', activity: 'Nocturnal',
    lifecycle: '罕见的夜行性蜂类，拥有扩大的单眼以适应微光。在夜间捕食飞蛾和毛虫。虽然具有抑制蛀果蛾的生态益处，但由于其致命的趋光蛰伤习性，是夜间农场作业的重大隐患。', symbiosis: '捕食榴莲果蛀虫等夜行性飞蛾（生态双刃剑）。', control: '【物理拦截】高层杀虫灯会大量诱杀。【作业防护】夜间作业必须避免使用强光头灯直射面部，改用红光或在安全距离外设置诱导光源。如需捣毁蜂巢，需在白天（其视力受限且处于休息状态时）进行处理，与日行性胡蜂的处理时间完全相反！',
    severity: 5, stages: ['All Stages'], ipm: ['Physical', 'Cultural']
  },

  // INSECTS - BORERS & MAGGOTS
  {
    id: 'coconut-rhino-beetle-grub', category: 'Insects', common: '椰子犀角金龟 (蛴螬幼虫)', scientific: 'Oryctes rhinoceros', genus: 'Oryctes', family: 'Scarabaeidae', target: '腐烂的植物物质，堆肥', part: 'Roots', type: '食腐性', hiding: '深藏于腐烂的有机物或空果串中', symptoms: '不取食活树，但在堆肥/覆盖物中发现巨大的白色C形蛴螬表明存在繁殖地。', activity: 'Continuous',
    lifecycle: '生命周期缓慢。蛴螬在腐烂的树干或覆盖物内取食4到6个月后才化蛹。如果您在果园堆肥中看到蛴螬，意味着您还有4个月的倒计时，随后大量的破坏性成虫将羽化并攻击您的幼树。', symbiosis: '无。', control: '保持果园卫生。使用EM菌(有效微生物)处理繁殖地以加速分解，并撒播绿僵菌(Metarhizium anisopliae)杀灭蛴螬。',
    severity: 3, stages: ['All Stages'], ipm: ['Cultural', 'Biological']
  },
  {
    id: 'coconut-rhino-beetle-adult', category: 'Insects', common: '椰子犀角金龟 (成虫)', scientific: 'Oryctes rhinoceros', genus: 'Oryctes', family: 'Scarabaeidae', target: '嫩梢，发育中的树冠', part: 'Trunk/Branches', type: '蛀木性', hiding: '钻入生长中的嫩梢或树冠内', symptoms: '钻入生长中的嫩梢。靠近油棕翻种区的农场风险极高。长出的新叶呈明显的V形缺口。', activity: 'Nocturnal',
    lifecycle: '成虫寿命为4-6个月，不断从腐烂的繁殖地飞向活树进行取食。一只甲虫可以在一夜之间摧毁一棵榴莲幼树的生长顶点，使树木生长停滞数年或直接致死。', symbiosis: '通常伴随着继发性细菌性腐烂从钻孔处侵入。', control: '部署信息素诱捕器。从钻孔中物理提取并消灭甲虫。保持果园边界卫生。',
    severity: 5, stages: ['Seedling', 'Vegetative'], ipm: ['Physical', 'Biological']
  },
  {
    id: 'malaysian-rhino-beetle-adult', category: 'Insects', common: '马来犀角金龟', scientific: 'Oryctes gnu', genus: 'Oryctes', family: 'Scarabaeidae', target: '树冠，嫩梢', part: 'Trunk/Branches', type: '蛀木性', hiding: '植物嫩梢或腐烂物质内', symptoms: '类似椰树犀角金龟的蛀食损伤。体型更大，但较为罕见，很少成为主要害虫。', activity: 'Nocturnal',
    lifecycle: '生命周期与椰树犀角金龟类似地缓慢（每代长达一年）。繁殖力不如其表亲，但成虫体型更大，意味着单个钻孔对幼树的破坏力更大。', symbiosis: '无。', control: '使用与椰树犀角金龟相同的信息素诱捕器和果园卫生管理措施进行有效控制。',
    severity: 3, stages: ['Seedling', 'Vegetative'], ipm: ['Physical', 'Cultural']
  },
  {
    id: 'durian-fruit-borer-caterpillar', category: 'Insects', common: '榴莲果蛀虫 (幼虫)', scientific: 'Mudaria magniplaga', genus: 'Mudaria', family: 'Noctuidae', target: '果实 (果壳和果籽)', part: 'Fruit/Flower', type: '蛀食性', hiding: '发育中的果实内部', symptoms: '微小的入口孔，被棕色虫粪堵塞。果肉和种子被吃掉。导致未成熟果实提前掉落。', activity: 'Continuous',
    lifecycle: '极其快速且无法治疗的阶段。卵在短短3-5天内孵化。微小的幼虫在孵化后数小时内直接钻入果皮。一旦进入内部，任何化学喷雾都无法触及它。它在内部取食14-20天。', symbiosis: '无。', control: '生物防治：莱氏绿僵菌(Nomuraea rileyi)一触即木乃伊化幼虫。一旦幼虫深入内部，化学控制即告失效。',
    severity: 5, stages: ['Fruiting'], ipm: ['Physical', 'Biological', 'Cultural']
  },
  {
    id: 'durian-fruit-borer-moth', category: 'Insects', common: '榴莲果蛀虫 (成蛾)', scientific: 'Mudaria magniplaga', genus: 'Mudaria', family: 'Noctuidae', target: '发育中的果实表面', part: 'Fruit/Flower', type: '产卵', hiding: '白天藏于树冠，夜间活动', symptoms: '棕/灰色飞蛾在夜间飞行。将微小的卵直接产在发育中的榴莲果壳上。', activity: 'Nocturnal',
    lifecycle: '成蛾从土壤蛹中羽化，时间与榴莲结果期完美同步。一只雌蛾在夜间飞行，可在一周内将卵块产在数十个幼果上。必须在飞蛾飞行高峰前进行预防性诱捕。', symbiosis: '被果园灯光吸引。', control: '在树冠高处部署【太阳能杀虫灯】(紫外/蓝光光谱)，在夜飞成蛾产卵前进行大量诱杀。严格清理掉落的果实。',
    severity: 5, stages: ['Fruiting'], ipm: ['Physical', 'Chemical']
  },
  {
    id: 'durian-seed-borer-caterpillar', category: 'Insects', common: '榴莲籽蛀虫 (幼虫)', scientific: 'Mudaria luteileprosa', genus: 'Mudaria', family: 'Noctuidae', target: '果实 (专门针对果籽)', part: 'Fruit/Flower', type: '蛀食性', hiding: '深藏于榴莲种子内部', symptoms: '几乎没有外部迹象。打开后发现种子被完全掏空并充满虫粪。', activity: 'Continuous',
    lifecycle: '与果蛀虫有类似的1个月生命周期，但在果实发育早期专门针对种子核心。成蛾在果柄附近产卵。幼虫在土壤中化蛹；留在地上的感染落果保证了下个季节成蛾的大规模爆发。', symbiosis: '无。', control: '生物防治：莱氏绿僵菌。严格的果园卫生。销毁掉落/被剔除的果实。',
    severity: 5, stages: ['Fruiting'], ipm: ['Physical', 'Cultural', 'Biological']
  },
  {
    id: 'fruit-fly-maggot', category: 'Insects', common: '东方果实蝇 (蛆虫)', scientific: 'Bactrocera dorsalis', genus: 'Bactrocera', family: 'Tephritidae', target: '成熟或开裂的果实', part: 'Fruit/Flower', type: '食肉性', hiding: '榴莲果肉内部', symptoms: '果肉变成糊状、腐烂，并充满蠕动的白色蛆虫。通常通过自然裂口或蛀虫孔进入。', activity: 'Continuous',
    lifecycle: '超级侵略性的繁殖者。卵在短短1-3天内孵化成蛆。蛆虫在一周内迅速液化优质榴莲果肉，然后落入土壤化蛹。单个裂开的果实可以产生数百只新的果蝇。', symbiosis: '通过母蝇引入的细菌加速果实腐烂。', control: '确保果实不会在树上开裂。及时采收。销毁受感染的果实。',
    severity: 4, stages: ['Fruiting', 'Post-Harvest'], ipm: ['Cultural']
  },
  {
    id: 'fruit-fly-adult', category: 'Insects', common: '东方果实蝇 (成虫)', scientific: 'Bactrocera dorsalis', genus: 'Bactrocera', family: 'Tephritidae', target: '成熟/裂开的果实', part: 'Fruit/Flower', type: '产卵', hiding: '树冠内，被成熟的气味吸引', symptoms: '成蝇在成熟或掉落的果实周围盘旋产卵。', activity: 'Diurnal',
    lifecycle: '极高的繁殖能力。雌蝇一生可产下多达3000粒卵。它们会被几英里外成熟榴莲的气味吸引。虽然它们无法刺穿完好的榴莲果壳，但它们会立刻利用最微小的裂缝或蛀虫孔。', symbiosis: '无。', control: '使用【黄色粘虫板】结合甲基丁香酚(甲基丁香油)信息素诱饵。确保果实零裂缝。',
    severity: 4, stages: ['Fruiting'], ipm: ['Physical', 'Biological', 'Chemical']
  },
  {
    id: 'sap-beetle', category: 'Insects', common: '露尾甲 (露水甲虫)', scientific: 'Carpophilus spp.', genus: 'Carpophilus', family: 'Nitidulidae', target: '裂开或过熟的果实', part: 'Fruit/Flower', type: '食腐性', hiding: '成熟果实自然裂口或蛀虫孔深处', symptoms: '微小、移动迅速的黑色甲虫，在采收时成群涌入成熟榴莲的裂缝中。它们直接取食甜美的果肉，破坏商业价值。', activity: 'Diurnal',
    lifecycle: '在掉落或腐烂的果实中呈爆炸性繁殖。在炎热天气下只需12-15天即可完成生命周期。它们完全依靠嗅觉导航，在果实开裂后的几小时内就会在树上蜂拥而至自然裂缝。', symbiosis: '继发性害虫；严格依赖自然裂缝、蛀虫孔或机械损伤来接触果肉。', control: '生物防治：白僵菌用于控制结构性种群。自然掉落后果断采收。清除果园地面所有腐烂、不可销售的果实。',
    severity: 3, stages: ['Fruiting', 'Post-Harvest'], ipm: ['Cultural', 'Biological', 'Physical']
  },
  {
    id: 'rind-borer', category: 'Insects', common: '榴莲皮蛀蛾', scientific: 'Tonica terrasella', genus: 'Tonica', family: 'Oecophoridae', target: '果壳 (表皮)', part: 'Fruit/Flower', type: '表层蛀食', hiding: '果皮上丝网和虫粪的下方', symptoms: '幼虫在果实的刺和果皮上啃食出浅浅的隧道，并用丝和虫粪覆盖取食点。不会穿透到果肉，但会导致严重的表面疤痕。', activity: 'Nocturnal / Continuous',
    lifecycle: '成蛾将卵直接产在发育中的果实上。幼虫在果皮表面取食，果实愈合时会形成厚厚的软木塞状疤痕组织。破坏优质果实（如A级猫山王）的外观品相。', symbiosis: '无。', control: '生物防治：莱氏绿僵菌。部署太阳能杀虫灯捕杀成蛾。喷施乙基多杀菌素。',
    severity: 4, stages: ['Fruiting'], ipm: ['Physical', 'Chemical', 'Biological']
  },
  {
    id: 'peach-moth', category: 'Insects', common: '桃蛀螟', scientific: 'Conogethes punctiferalis', genus: 'Conogethes', family: 'Crambidae', target: '果实簇', part: 'Fruit/Flower', type: '结网 /蛀食', hiding: '相互接触的果实之间', symptoms: '幼虫在成簇的果实之间吐丝结网，并蛀入果壳。常在果实间的丝网中看到被挂住的虫粪。', activity: 'Nocturnal',
    lifecycle: '高度多食性害虫，生命周期短(~30天)。成蛾专门针对果簇产卵，因为果实之间的狭窄空间为幼虫孵化和蛀食提供了绝佳的保护环境。', symbiosis: '丝网和伤口常引来继发性真菌性果腐病。', control: '生物防治：莱氏绿僵菌。进行适当的疏果，确保果实互不接触。部署太阳能杀虫灯。',
    severity: 4, stages: ['Fruiting'], ipm: ['Cultural', 'Physical', 'Biological']
  },
  {
    id: 'mango-stem-borer-larva', category: 'Insects', common: '天牛 (幼虫/蛴螬)', scientific: 'Batocera rufomaculata', genus: 'Batocera', family: 'Cerambycidae', target: '主干，大型主枝', part: 'Trunk/Branches', type: '蛀木性', hiding: '心材深处的蛀道内', symptoms: '巨大的羽化孔。树基部堆积类似锯末的虫粪。导致严重的枝条枯死和树干空心。', activity: 'Continuous',
    lifecycle: '生命周期极其缓慢，但单个个体的破坏力是灾难性的。巨大的幼虫在树**内部**生活8到12个月，慢慢吃掉维管组织和结构心材。当您看到锯末时，严重的内部破坏已经发生。', symbiosis: '入侵伤口会引来继发性真菌感染。', control: '将氯氰菊酯或毒死蜱直接注入**现有**的蛀孔内，并立即用粘土/蜡密封以防腐烂。避免钻出新孔。',
    severity: 5, stages: ['All Stages'], ipm: ['Chemical', 'Physical']
  },
  {
    id: 'mango-stem-borer-adult', category: 'Insects', common: '天牛 (成虫)', scientific: 'Batocera rufomaculata', genus: 'Batocera', family: 'Cerambycidae', target: '树枝的树皮', part: 'Trunk/Branches', type: '咀嚼树皮', hiding: '白天停留在树干上', symptoms: '体型很大，有长触角的甲虫。在树皮上咬出小缝隙来产卵。造成轻微的树皮损伤。', activity: 'Nocturnal',
    lifecycle: '成虫在雨季羽化，寿命数月。雌虫在树皮上咬出水平裂缝，一生可产下多达200粒卵。在夜间捕捉成虫可防止未来数年的幼虫危害。', symbiosis: '无。', control: '人工捕捉和销毁。在树干上涂抹驱避白涂剂/杀虫剂。',
    severity: 4, stages: ['All Stages'], ipm: ['Cultural', 'Chemical']
  },
  {
    id: 'pinhole-borer', category: 'Insects', common: '针孔小蠹', scientific: 'Platypus spp. / Crossotarsus spp.', genus: 'Platypus', family: 'Curculionidae (Platypodinae)', target: '成熟树干，虚弱的树木', part: 'Trunk/Branches', type: '蛀木性', hiding: '木质部深处', symptoms: '树皮上密集的微小"针孔"。从孔中排出细小的白色粉末状虫粪。导致老树严重的维管衰退。', activity: 'Crepuscular',
    lifecycle: '成虫钻入木材深处培养豚草真菌(Ambrosia)来喂养幼虫。它们会被受压、生病或水涝树木散发的乙醇气味强烈吸引。是成熟果园树木猝死的主要原因之一。', symbiosis: '培养并专门以豚草真菌(Ambrosia fungi)为食。', control: '提高树木活力。生物防治：白僵菌。使用具有渗透性的内吸杀虫剂处理树干。立即移除枯死/濒死的树木。',
    severity: 5, stages: ['All Stages'], ipm: ['Cultural', 'Chemical', 'Biological']
  },
  {
    id: 'ambrosia-beetle', category: 'Insects', common: '材小蠹 (食菌小蠹)', scientific: 'Xyleborus fornicatus', genus: 'Xyleborus', family: 'Curculionidae', target: '树干和树枝', part: 'Trunk/Branches', type: '蛀木性', hiding: '木质部内错综复杂的隧道中', symptoms: '树皮上微小、完美的圆孔 ("霰弹孔")。挤出压实的条状虫粪 ("牙签")。', activity: 'Crepuscular',
    lifecycle: '快速且高度专业化的繁殖者(30天/代)。雌虫在树内部进行近亲交配，这意味着单只雌虫飞到新树上就能立即开始建立庞大的新群落，无需寻找配偶。主要目标是受压或水涝的树木。', symbiosis: '与豚草真菌有专性互利共生关系。是疫霉病和长喙壳菌的传播媒介。', control: '生物防治：白僵菌。保持树木健康/水分状态。修剪并烧毁受感染的木材。涂抹树皮渗透性杀菌剂。',
    severity: 5, stages: ['All Stages'], ipm: ['Cultural', 'Chemical', 'Biological']
  },
  {
    id: 'red-branch-borer', category: 'Insects', common: '豹蠹蛾 (红枝蠹蛾)', scientific: 'Zeuzera coffeae', genus: 'Zeuzera', family: 'Cossidae', target: '中小型树枝', part: 'Trunk/Branches', type: '蛀木性', hiding: '树枝髓部内部', symptoms: '看起来健康的树枝突然萎蔫并在风中折断。树枝上有单个圆形入口孔，常有红色的颗粒状虫粪被推出。', activity: 'Nocturnal',
    lifecycle: '成蛾将卵产在年轻的树皮上。幼虫直接钻入树枝的中心，从内部将其掏空。幼虫阶段持续数月。剪除空心、濒死的树枝是唯一有效的控制方法。', symbiosis: '无。', control: '在蛀孔下方修剪并销毁受感染的树枝。只有在关键的结构肢干上才向*现有*蛀孔内注射杀虫剂。',
    severity: 4, stages: ['Vegetative', 'Fruiting'], ipm: ['Physical', 'Chemical']
  },
  {
    id: 'clearwing-moth', category: 'Insects', common: '透翅蛾 (树皮蛀虫)', scientific: 'Synanthedon spp.', genus: 'Synanthedon', family: 'Sesiidae', target: '树皮和形成层', part: 'Trunk/Branches', type: '蛀树皮', hiding: '树皮下方的浅层隧道中', symptoms: '树干局部肿胀、开裂，并有严重的流胶(树液渗出)。虫粪与树液混合。常被误诊为疫霉病(溃疡病)。', activity: 'Diurnal',
    lifecycle: '成蛾看起来像小黄蜂。幼虫严格在树皮正下方的形成层中取食，慢慢对树木进行环剥。它们的取食伤口是严重的真菌感染的绝佳入口点。', symbiosis: '为疫霉病和枝枯病病菌创造入侵伤口。', control: '刮开树皮暴露幼虫并施用接触性杀虫剂。在树干涂抹保护性杀虫膏。',
    severity: 4, stages: ['All Stages'], ipm: ['Physical', 'Chemical']
  },
  {
    id: 'bark-eating-caterpillar', category: 'Insects', common: '拟木蠹蛾 (食皮毛虫)', scientific: 'Indarbela spp.', genus: 'Indarbela', family: 'Cossidae', target: '成熟树干的树皮', part: 'Trunk/Branches', type: '啃食树皮', hiding: '树干上覆盖着木屑和虫粪的丝网内部', symptoms: '丝和虫粪交织成带状的取食通道蜿蜒在树皮上。树皮被吃掉，导致树枝变弱。', activity: 'Nocturnal',
    lifecycle: '繁殖速度非常慢(通常每年仅1代)。幼虫白天隐藏在钻入木材的短孔中，夜间出来在保护性丝网下啃食树皮。造成长期、缓慢累积的损害。', symbiosis: '无。', control: '生物防治：莱氏绿僵菌。用钢丝刷人工清除虫粪通道。在树皮上局部喷洒或涂抹溴氰菊酯。',
    severity: 3, stages: ['Vegetative', 'Post-Harvest'], ipm: ['Physical', 'Biological', 'Chemical']
  },
  {
    id: 'subterranean-termite', category: 'Insects', common: '散白蚁 / 台湾乳白蚁', scientific: 'Coptotermes curvignathus', genus: 'Coptotermes', family: 'Rhinotermitidae', target: '活树干，主根，心材', part: 'Trunk/Branches', type: '消耗木材', hiding: '地下巢穴，树干上的泥管内', symptoms: '泥土构成的管道顺着树干外部延伸。随着心材被掏空，树冠突然萎蔫并迅速死亡。', activity: 'Continuous',
    lifecycle: '持续且极其可怕的指数级繁殖。成熟的蚁后**每天**可以产下数千粒卵。一个蚁群数量可达数百万只，能在几个月内完全掏空并杀死一棵成熟的活榴莲树。', symbiosis: '在肠道内培养原生动物以消化纤维素。', control: '摧毁泥管。使用氟虫腈或吡虫啉进行土壤灌根。使用白蚁诱饵站。',
    severity: 5, stages: ['All Stages'], ipm: ['Chemical', 'Biological']
  },

  // INSECTS - DEFOLIATORS
  {
    id: 'bagworm', category: 'Insects', common: '蓑蛾 (避债蛾)', scientific: 'Pteroma x pendula', genus: 'Pteroma', family: 'Psychidae', target: '叶片', part: 'Leaves', type: '咀嚼式', hiding: '由枯叶碎片制成的圆锥形护囊内', symptoms: '微小的圆锥形"袋子"悬挂在叶片背面。爆发期间，叶片出现不规则孔洞或被完全吃光仅剩叶脉。', activity: 'Continuous',
    lifecycle: '雌虫无翅，终生留在护囊内。它们在囊内产下数千粒卵。幼虫孵化后，会吐出长丝，随风"空飘"到新的树上。能非常迅速地造成严重的落叶。', symbiosis: '无。', control: '生物防治：莱氏绿僵菌。施用苏云金芽孢杆菌(Bt)或接触性杀虫剂。小规模爆发时手工摘除很有效。',
    severity: 4, stages: ['Vegetative'], ipm: ['Biological', 'Chemical']
  },
  {
    id: 'chafer-beetle-grub', category: 'Insects', common: '鳃金龟 (白色蛴螬)', scientific: 'Apogonia cribricollis', genus: 'Apogonia', family: 'Scarabaeidae', target: '幼苗和幼树的根部', part: 'Roots', type: '咀嚼根部', hiding: '地下土壤和有机物中', symptoms: '尽管水分充足，幼苗仍神秘地萎蔫、变黄并死亡。根部被剥皮或切断。', activity: 'Continuous',
    lifecycle: '繁殖缓慢。蛴螬在地下待3-6个月，以细根和大量未腐熟的粪肥为食。它们会导致苗圃植物缓慢、神秘的衰退，最终化蛹成为食叶成虫。', symbiosis: '在含有大量未腐熟有机粪肥的土壤中茁壮成长。', control: '施用内吸性土壤灌根剂(吡虫啉)或在土壤中撒播昆虫病原真菌(绿僵菌)。',
    severity: 4, stages: ['Seedling', 'Vegetative'], ipm: ['Biological', 'Chemical']
  },
  {
    id: 'chafer-beetle-adult', category: 'Insects', common: '夜飞鳃金龟', scientific: 'Apogonia cribricollis', genus: 'Apogonia', family: 'Scarabaeidae', target: '幼苗和幼树的叶片', part: 'Leaves', type: '咀嚼式', hiding: '白天埋在土壤或落叶层中', symptoms: '叶片在一夜之间被严重啃食成网状，只留下坚韧的主脉。大规模的落叶。', activity: 'Nocturnal',
    lifecycle: '成虫羽化通常与干旱后的第一场雨高度同步。成虫在夜间大量成群出现进行取食和交配，能够在一夜之间将幼树完全啃光。黎明前它们会返回土壤。', symbiosis: '无。', control: '在离地1-2米处安装【太阳能杀虫灯】拦截虫群。在傍晚对叶面喷施接触性杀虫剂(氯氰菊酯)。',
    severity: 4, stages: ['Seedling', 'Vegetative'], ipm: ['Physical', 'Chemical']
  },
  {
    id: 'rose-chafer', category: 'Insects', common: '丽金龟', scientific: 'Adoretus spp.', genus: 'Adoretus', family: 'Scarabaeidae', target: '叶片', part: 'Leaves', type: '咀嚼式', hiding: '白天在土壤，夜间在树冠', symptoms: '叶片上出现独特的蕾丝状网格取食痕迹。它们啃食叶脉之间的柔软组织，留下网状骨架。', activity: 'Nocturnal',
    lifecycle: '具有类似夜间成群活动的习性，通常造成更复杂的"窗玻璃"式损伤模式。蛴螬生活在土壤中。苗圃常见的害虫。', symbiosis: '无。', control: '夜间叶面喷施拟除虫菊酯。进行土壤处理以控制蛴螬。',
    severity: 3, stages: ['Seedling', 'Vegetative'], ipm: ['Chemical']
  },
  {
    id: 'gold-dust-weevil-grub', category: 'Insects', common: '灰绿鳞象甲 (根部幼虫)', scientific: 'Hypomeces squamosus', genus: 'Hypomeces', family: 'Curculionidae', target: '幼苗根部', part: 'Roots', type: '咀嚼根部', hiding: '地下', symptoms: '幼苗衰退，根系受损。与鳃金龟蛴螬的破坏特征非常相似。', activity: 'Continuous',
    lifecycle: '雌虫将卵落在土壤表面。幼虫钻入地下，数个月内专吃根系。通常在幼树表现出严重受压症状之前完全不被察觉。', symbiosis: '无。', control: '针对根系区域进行土壤灌根。',
    severity: 3, stages: ['Seedling'], ipm: ['Chemical']
  },
  {
    id: 'gold-dust-weevil-adult', category: 'Insects', common: '灰绿鳞象甲 (成虫)', scientific: 'Hypomeces squamosus', genus: 'Hypomeces', family: 'Curculionidae', target: '成熟和年轻叶片', part: 'Leaves', type: '咀嚼式', hiding: '白天藏在树冠叶背', symptoms: '叶缘被啃出不规则的、参差不齐的锯齿状缺口。可见带有金属绿金色的甲虫。', activity: 'Diurnal',
    lifecycle: '成虫存活数周，爬上树干在叶片上取食。受惊扰时会掉落地面装死。繁殖速度慢于蝗虫，但会对叶片造成持久的损害。', symbiosis: '无。', control: '叶面喷施氟虫腈或合成拟除虫菊酯。',
    severity: 3, stages: ['Vegetative'], ipm: ['Chemical']
  },
  {
    id: 'valanga-grasshopper-nymph', category: 'Insects', common: '棉蝗 (若虫)', scientific: 'Valanga nigricornis', genus: 'Valanga', family: 'Acrididae', target: '苗木叶片', part: 'Leaves', type: '咀嚼式', hiding: '树冠下层枝条', symptoms: '无翅跳蝻从叶片上咬下不规则的大块。能迅速使小幼苗落叶。', activity: 'Diurnal',
    lifecycle: '雌虫将卵荚产在5-8厘米深的土壤中。若虫在一个月后孵化，并在约2个月内经历6个蜕皮阶段(龄期)。它们虽然无翅但食量惊人，常群聚在较矮的幼树上。', symbiosis: '无。', control: '人工清除。在苗木上喷施印楝油作为驱避剂。',
    severity: 3, stages: ['Seedling', 'Vegetative'], ipm: ['Physical', 'Biological']
  },
  {
    id: 'valanga-grasshopper-adult', category: 'Insects', common: '棉蝗 (成虫)', scientific: 'Valanga nigricornis', genus: 'Valanga', family: 'Acrididae', target: '幼树叶片', part: 'Leaves', type: '咀嚼式', hiding: '伪装在茂密的树冠叶片中', symptoms: '巨大的有翅蝗虫导致严重的局部落叶，将叶片啃食得只剩主脉。', activity: 'Diurnal',
    lifecycle: '繁殖相对缓慢(根据气候每年1或2代)。具有高度流动性，能够从周围的灌木丛迁飞进入果园。成虫存活数月，造成持续的局部破坏。', symbiosis: '无。', control: '在清晨昆虫身体冰冷、行动迟缓时，局部喷施氯氰菊酯。',
    severity: 3, stages: ['Vegetative'], ipm: ['Chemical', 'Physical']
  },
  {
    id: 'durian-leafroller', category: 'Insects', common: '榴莲卷叶蛾', scientific: 'Homona spp.', genus: 'Homona', family: 'Tortricidae', target: '正在展开的嫩叶', part: 'Leaves', type: '咀嚼式 / 吐丝结网', hiding: '用丝线绑在一起的卷曲或对折的叶片内', symptoms: '幼叶被折叠或缝合在一起。叶片从内部被啃食成网状。导致新梢生长迟缓。', activity: 'Nocturnal',
    lifecycle: '依赖新梢快速繁殖。成蛾在叶片上产下重叠的鳞片状卵。毛虫在几天内孵化，立刻吐丝将叶片绑在一起，形成一个受保护的取食巢穴。在卷叶内化蛹。', symbiosis: '无。', control: '生物防治：莱氏绿僵菌一触即木乃伊化幼虫。手工捏碎并销毁卷曲的叶子。',
    severity: 3, stages: ['Vegetative'], ipm: ['Biological', 'Physical']
  },
  {
    id: 'tussock-moth', category: 'Insects', common: '毒蛾 (毛虫)', scientific: 'Calliteara horsfieldii', genus: 'Calliteara', family: 'Erebidae', target: '成熟和年轻叶片', part: 'Leaves', type: '咀嚼式', hiding: '叶背或停留在树皮上', symptoms: '快速落叶。毛虫拥有密集的刺激性毒毛，会对果园工人造成严重的皮肤皮疹。', activity: 'Nocturnal',
    lifecycle: '中等繁殖速度(4-6周一代)。成蛾产下带毛的卵块。毛虫具有高度多食性，在树冠上快速移动。由于带有刺毛，它们对农场工人构成了重大的职业健康危害。', symbiosis: '无。', control: '生物防治：莱氏绿僵菌。避免徒手触摸。施用针对鳞翅目的专效杀虫剂，如茚虫威。',
    severity: 4, stages: ['Vegetative'], ipm: ['Biological', 'Chemical']
  },
  {
    id: 'durian-hawk-moth', category: 'Insects', common: '榴莲天蛾', scientific: 'Daphnusa ocellaris', genus: 'Daphnusa', family: 'Sphingidae', target: '成熟和年轻叶片', part: 'Leaves', type: '咀嚼式', hiding: '伪装在绿色叶片中', symptoms: '连带叶脉将叶片完全吃光。非常巨大的绿色毛虫(可达8厘米)，尾部有独特的角状突起。', activity: 'Nocturnal',
    lifecycle: '繁殖缓慢，种群密度极低。然而，由于体型巨大，单条毛虫每天就能吃掉海量的叶片。它们落到土壤中化蛹数周。极少达到爆发的程度。', symbiosis: '无。', control: '由于数量少但体型巨大，通常手工捕捉就足够了。',
    severity: 2, stages: ['Vegetative'], ipm: ['Physical']
  },

  // MITES & NEMATODES
  {
    id: 'african-red-mite', category: 'Mites/Nematodes', common: '非洲红蜘蛛 (叶螨)', scientific: 'Eutetranychus africanus', genus: 'Eutetranychus', family: 'Tetranychidae', target: '成熟叶片的上表面', part: 'Leaves', type: '吸取细胞液', hiding: '沿着主叶脉', symptoms: '出现斑点，叶片呈现暗灰色/古铜色。导致严重的提早落叶 (树冠秃顶)。', activity: 'Diurnal',
    lifecycle: '爆发性繁殖率。在干热天气下，从卵到成螨的一个完整生命周期只需4到7天。只要两周时间，轻微的感染就能演变成灾难性的爆发，使树冠完全秃顶。倾盆大雨会将其瞬间冲刷掉。', symbiosis: '在长期干旱、多尘的条件下种群数量呈爆炸式增长。', control: '生物防治：汤普森被毛孢(Hirsutella thompsonii)会引发螨虫大瘟疫。杀螨剂(炔螨特)。保持果园湿度。',
    severity: 4, stages: ['Vegetative'], ipm: ['Cultural', 'Biological', 'Chemical']
  },
  {
    id: 'oriental-red-mite', category: 'Mites/Nematodes', common: '东方红蜘蛛 (叶螨)', scientific: 'Eutetranychus orientalis', genus: 'Eutetranychus', family: 'Tetranychidae', target: '叶面上表面', part: 'Leaves', type: '吸取细胞液', hiding: '沿着叶片上表面的主脉和细脉', symptoms: '失绿的浅色斑点，呈现出"布满灰尘"或古铜色的外观。严重感染会导致落叶。', activity: 'Diurnal',
    lifecycle: '在干旱炎热条件下极其迅速。从卵到成虫的生命周期可短至8-10天。通过风和爬行传播。', symbiosis: '在干旱期和低湿度期间种群数量爆发。', control: '生物防治：汤普森被毛孢。杀螨剂(螺螨酯、唑螨酯)。通过喷雾增加环境湿度。',
    severity: 4, stages: ['Vegetative'], ipm: ['Biological', 'Chemical', 'Cultural']
  },
  {
    id: 'broad-mite', category: 'Mites/Nematodes', common: '侧多食跗线螨 (茶黄螨)', scientific: 'Polyphagotarsonemus latus', genus: 'Polyphagotarsonemus', family: 'Tarsonemidae', target: '顶端分生组织，极嫩的幼叶', part: 'Leaves', type: '吸取细胞液', hiding: '深藏于新梢顶端的缝隙中', symptoms: '微观害虫。新长出的叶片扭曲、变形、生长迟缓。常被误诊为除草剂药害。', activity: 'Continuous',
    lifecycle: '超快速繁殖者。只需4-6天即可完成生命周期。成年雄螨会主动抱起雌性蛹，将它们带到新鲜的嫩梢上以扩大群落。它们具有高毒性的唾液，即使在螨虫消失很久后，叶片依然会变形。', symbiosis: '有毒唾液导致严重的生长畸形。', control: '生物防治：汤普森被毛孢。专门针对新梢喷施阿维菌素或螺甲螨酯。',
    severity: 4, stages: ['Vegetative'], ipm: ['Biological', 'Chemical']
  },
  {
    id: 'eriophyid-mite', category: 'Mites/Nematodes', common: '瘿螨 (卷叶螨)', scientific: 'Eriophyes spp.', genus: 'Eriophyes', family: 'Eriophyidae', target: '嫩叶', part: 'Leaves', type: '吸取细胞液', hiding: '虫瘿内部或叶背密集的绒毛斑块(erineum)中', symptoms: '微观害虫。导致叶片起泡、卷曲，并在叶背形成天鹅绒状/多毛的斑块(erineum)。', activity: 'Continuous',
    lifecycle: '生命周期非常快(1-2周)。它们像灰尘颗粒一样随风扩散。当它们取食时，其唾液会改变植物的局部DNA表达，迫使叶片长出保护性的"绒毛"(erineum)，然后螨虫就在里面生活和繁殖，这能保护它们免受化学喷雾的伤害。', symbiosis: '唾液诱导植物长出保护性的多毛虫瘿。', control: '生物防治：汤普森被毛孢。在营养抽梢早期施用可湿性硫磺或阿维菌素。',
    severity: 3, stages: ['Vegetative'], ipm: ['Biological', 'Chemical']
  },
  {
    id: 'root-knot-nematode', category: 'Mites/Nematodes', common: '根结线虫', scientific: 'Meloidogyne incognita', genus: 'Meloidogyne', family: 'Heteroderidae', target: '吸收根 (须根)', part: 'Roots', type: '内寄生', hiding: '肿大的根部根结(瘤)内部', symptoms: '树木生长迟缓，尽管施肥仍表现出缺素症状(黄化)。挖掘后可见根部有肿块。', activity: 'Continuous',
    lifecycle: '25-30天完成一代。微小的幼虫进入根部并建立永久性的取食点，导致根部肿胀成巨大的根结。雌虫在土壤的凝胶状物质中产下数百粒卵。这是一种无情、缓慢的繁殖者。', symbiosis: '破坏根系抵抗力，为疫霉病打开大门。', control: '种植前进行土壤日光消毒。生物防治：淡紫拟青霉(Purpureocillium lilacinum)猎杀并破坏其虫卵。施用噻唑膦。',
    severity: 4, stages: ['All Stages'], ipm: ['Biological', 'Cultural']
  },
  {
    id: 'lesion-nematode', category: 'Mites/Nematodes', common: '短体线虫 (根腐线虫)', scientific: 'Pratylenchus spp.', genus: 'Pratylenchus', family: 'Pratylenchidae', target: '吸收根 (须根)', part: 'Roots', type: '内寄生', hiding: '根皮层内部和周围', symptoms: '树木生长发育迟缓，树冠发黄，对肥料反应不佳。根部呈现深色坏死病斑并脱落。', activity: 'Continuous',
    lifecycle: '生命周期为3-4周。与根结线虫不同，它们是迁徙性的。它们不断穿过根部组织，吞噬细胞，产卵然后继续移动，造成巨大的坏死伤口，瞬间引来致命的真菌性根腐病。', symbiosis: '病斑为疫霉病和腐霉根腐病提供了入口。', control: '生物防治：淡紫拟青霉明确猎杀线虫。施用木霉菌。种植前用噻唑膦进行土壤处理。',
    severity: 4, stages: ['All Stages'], ipm: ['Biological', 'Chemical']
  },

  // FUNGI & PATHOGENS
  {
    id: 'phytophthora', category: 'Fungi/Pathogens', common: '疫霉病 (树干溃疡 / 根腐病)', scientific: 'Phytophthora palmivora', genus: 'Phytophthora', family: 'Oomycete', target: '根部，根颈，树干，果实', part: 'Trunk/Branches', type: '病原体', hiding: '积水的土壤，渗出汁液的树皮溃疡中', symptoms: '树干流出深色、渗液的树液。须根腐烂。采前和采后出现褐色的果实腐烂。', activity: 'N/A',
    lifecycle: '在潮湿条件下传播极具侵略性。产生数以百万计的游动孢子(zoospores)，它们可以在土壤水分和雨水飞溅中物理"游泳"。能够在连续大雨后的3到5天内感染一棵健康的树木并引起大规模可见的腐烂。必须将其视为绝对的紧急情况。', symbiosis: '由材小蠹和不洁的修剪工具传播。', control: '严格排水。生物防治：哈茨木霉、荧光假单胞菌和EM菌灌根，以寄生和竞争排斥腐烂菌。使用内吸性亚磷酸(Phosphorous Acid)。',
    severity: 5, stages: ['All Stages'], ipm: ['Chemical', 'Biological', 'Cultural']
  },
  {
    id: 'black-mildew', category: 'Fungi/Pathogens', common: '黑团孢病 (小煤炱病)', scientific: 'Meliola durionis', genus: 'Meliola', family: 'Meliolaceae', target: '叶片', part: 'Leaves', type: '病原体', hiding: '成熟叶片的上表面', symptoms: '叶片表面出现致密、天鹅绒般的深黑色真菌菌落。与煤烟病不同，这种真菌直接寄生在叶片上，不容易被冲洗掉。', activity: 'N/A',
    lifecycle: '专性植物寄生菌。孢子在高湿度下发芽，并将专门的吸器(haustoria)直接送入叶片细胞中。虽然很少杀死树木，但严重的感染会大幅减少光合作用面积，久而久之削弱树木活力。', symbiosis: '不需要昆虫蜜露(与煤烟病不同)。', control: '确保适当的树冠修剪。生物防治：叶面喷施枯草芽孢杆菌。使用铜制剂杀菌剂。',
    severity: 3, stages: ['Vegetative', 'Post-Harvest'], ipm: ['Cultural', 'Biological', 'Chemical']
  },
  {
    id: 'fusicoccum-canker', category: 'Fungi/Pathogens', common: '枝枯病 (壳梭孢菌)', scientific: 'Fusicoccum spp.', genus: 'Fusicoccum', family: 'Botryosphaeriaceae', target: '上部树枝，主茎', part: 'Trunk/Branches', type: '病原体', hiding: '树皮裂缝，修剪伤口，日灼区域', symptoms: '树枝上的树皮开裂和剥落，通常伴有深色胶状渗出物。导致严重的枝条枯死和溃疡上方的叶片萎蔫。常被误认为是疫霉病，但它通常发生在树冠较高处，而不是根颈。', activity: 'N/A',
    lifecycle: '一种机会性伤口病原体，迅速利用受压的树木(由于干旱、日灼或大量结果)。孢子通过风和雨水飞溅传播。一旦进入维管组织，它就会猛烈地环切并杀死树枝。它可以潜伏在看起来健康的木材内部，直到树木免疫力下降。', symbiosis: '通过蛀虫孔或未涂漆的修剪切口进入。', control: '修剪受感染的树枝。生物防治：在伤口涂抹链霉菌生物膏(Streptomyces)以溶解真菌细胞。对工具进行消毒。',
    severity: 4, stages: ['Vegetative', 'Post-Harvest'], ipm: ['Cultural', 'Biological', 'Chemical']
  },
  {
    id: 'twig-blight', category: 'Fungi/Pathogens', common: '枯梢病 (拟茎点霉)', scientific: 'Phomopsis durionis / Diaporthe spp.', genus: 'Phomopsis', family: 'Diaporthaceae', target: '嫩枝，顶端新梢', part: 'Trunk/Branches', type: '病原体', hiding: '附着在树冠上的枯枝', symptoms: '年轻顶端嫩枝上的叶片突然变褐死亡，但仍顽固地附着在茎上。细枝本身会枯萎、变黑，并从尖端向下枯死。', activity: 'N/A',
    lifecycle: '孢子通过风和雨水飞溅传播，主要针对柔软、未硬化的营养嫩梢。真菌在此处定殖并迅速杀死维管组织，切断叶片的水分供应。在漫长的雨季极其常见。', symbiosis: '经常利用那些之前被吸汁昆虫(如蚧壳虫或叶蝉)削弱或刺穿的嫩枝。', control: '卫生管理是关键：剪除并烧毁死枝。叶面喷施广谱杀菌剂，如代森锰锌或苯醚甲环唑。',
    severity: 3, stages: ['Vegetative'], ipm: ['Cultural', 'Chemical']
  },
  {
    id: 'pythium-rot', category: 'Fungi/Pathogens', common: '腐霉根腐病', scientific: 'Pythium complectens', genus: 'Pythium', family: 'Oomycete', target: '吸收根，幼苗', part: 'Roots', type: '病原体', hiding: '饱和水分的土壤，苗圃多袋中', symptoms: '苗圃中出现猝倒病。成熟树木的外部根皮层脱落。', activity: 'N/A',
    lifecycle: '在水涝条件下发病极快(几小时到几天)。与疫霉菌一样，它依靠游动的游动孢子传播。它专门针对细嫩的吸收根和幼苗，在饱和水分的苗圃袋中感染后 24 小时内就会引起猝倒(突然倒伏)。', symbiosis: '经常与疫霉病共同感染。', control: '避免过度浇水。生物防治：哈茨木霉和荧光假单胞菌灌根。使用依得利(Etridiazole)进行土壤灌根。',
    severity: 4, stages: ['Seedling'], ipm: ['Cultural', 'Biological', 'Chemical']
  },
  {
    id: 'lasiodiplodia', category: 'Fungi/Pathogens', common: '蒂腐/茎枝溃疡病', scientific: 'Lasiodiplodia theobromae', genus: 'Lasiodiplodia', family: 'Botryosphaeriaceae', target: '树干，树枝，采后果实', part: 'Trunk/Branches', type: '病原体', hiding: '伤口，破裂的树皮，受感染的修剪切口', symptoms: '树枝枯死，树干上出现深色渗液的病斑。导致果实采后迅速出现黑腐。', activity: 'N/A',
    lifecycle: '机会性伤口病原体，在高温高湿下发病极快。孢子落在新鲜的修剪切口或日灼伤口上，可在 48 小时内开始腐蚀木材或采后的果实。它可以休眠在木材内部数月，直到树木承受压力才爆发。', symbiosis: '通常通过日灼、蛀虫孔或机械损伤进入。', control: '对修剪工具进行消毒。用链霉菌或杀菌剂涂抹修剪伤口。采后使用咪鲜胺浸泡。',
    severity: 4, stages: ['Post-Harvest', 'All Stages'], ipm: ['Cultural', 'Biological', 'Chemical']
  },
  {
    id: 'ceratocystis', category: 'Fungi/Pathogens', common: '猝萎病 (长喙壳菌)', scientific: 'Ceratocystis fimbriata', genus: 'Ceratocystis', family: 'Ceratocystidaceae', target: '维管系统 (木质部)', part: 'Trunk/Branches', type: '病原体', hiding: '深藏于维管组织内部', symptoms: '整个树冠迅速萎蔫。叶片干枯但仍附着在树上。树皮下的木材中出现深色条纹/染色。', activity: 'N/A',
    lifecycle: '毁灭性的维管增殖者。孢子通过伤口进入，并在树木的导水管(木质部)内迅速繁殖。它实际上堵塞了树木的"水管"。一棵看起来完全健康的成熟树木，可能会在 2 到 4 周内突然全部萎蔫并死亡。', symbiosis: '由材小蠹(食菌小蠹)强烈传播。', control: '控制蛀虫。生物防治：链霉菌土壤灌根/涂抹。使用可穿透树皮的内吸杀菌剂(丙环唑)。',
    severity: 5, stages: ['All Stages'], ipm: ['Chemical', 'Biological', 'Cultural']
  },
  {
    id: 'white-root-disease', category: 'Fungi/Pathogens', common: '白根病 (刚毛白腐菌)', scientific: 'Rigidoporus microporus', genus: 'Rigidoporus', family: 'Basidiomycete', target: '主根，结构根', part: 'Roots', type: '病原体', hiding: '地下，根对根蔓延', symptoms: '树叶突然发黄脱落。可见白色的线状根状菌索紧紧贴附在根部。', activity: 'N/A',
    lifecycle: '缓慢、无声却致命的地下传播者。不严重依赖孢子；相反，粗壮的白色真菌丝(根状菌索)实际上直接穿过土壤，从受感染的死木生长到活的榴莲根部。它能在地下每年悄无声息地蔓延数米。', symbiosis: '在由老橡胶园开垦的果园中非常普遍。', control: '挖沟隔离受感染的树木。生物防治：哈茨木霉和链霉菌生物灌根。施用己唑醇(Hexaconazole)。',
    severity: 5, stages: ['All Stages'], ipm: ['Physical', 'Biological', 'Chemical']
  },
  {
    id: 'pink-disease', category: 'Fungi/Pathogens', common: '粉红病 (树赤衣病)', scientific: 'Erythricium salmonicolor', genus: 'Erythricium', family: 'Corticiaceae', target: '树枝和分叉处的树皮', part: 'Trunk/Branches', type: '病原体', hiding: '荫蔽、高湿度的树枝交叉处', symptoms: '蛛网状的白色菌丝体，随后在树皮上变成粉红/鲑鱼色的结痂。导致树枝被环剥枯死("挂旗"现象)。', activity: 'N/A',
    lifecycle: '在连续的季风降雨期间迅速蔓延。孢子被雨水飞溅到密集、未经修剪的树枝分叉处。真菌在树皮上生长出粉红色结痂，并在几周内将树枝环剥致死。在旱季会进入休眠状态。', symbiosis: '在杂草丛生、未修剪的树冠中茁壮成长。', control: '修剪以保持空气流通。刮除受影响的树皮并涂抹波尔多液或氢氧化铜。',
    severity: 4, stages: ['Vegetative'], ipm: ['Cultural', 'Chemical']
  },
  {
    id: 'anthracnose', category: 'Fungi/Pathogens', common: '炭疽病', scientific: 'Colletotrichum zibethinum', genus: 'Colletotrichum', family: 'Glomerellaceae', target: '叶片，幼芽', part: 'Leaves', type: '病原体', hiding: '果园地面的落叶和枯枝', symptoms: '叶片上出现带有独特同心圆纹或黄色晕圈的褐色坏死斑。叶缘枯萎。', activity: 'N/A',
    lifecycle: '当叶片上有游离水(露水或雨水)积聚时，传播非常迅速。孢子需要 12-24 小时的连续叶面湿润才能发芽。如果天气持续阴天潮湿，可在几天内横扫整波抽出的新梢。', symbiosis: '攻击因压力或其他害虫削弱的树木。', control: '生物防治：叶面喷施枯草芽孢杆菌建立弹性的保护盾。叶面喷施嘧菌酯或代森锰锌。',
    severity: 3, stages: ['Vegetative'], ipm: ['Cultural', 'Biological', 'Chemical']
  },
  {
    id: 'leaf-blight', category: 'Fungi/Pathogens', common: '叶枯病 (丝核菌)', scientific: 'Rhizoctonia solani', genus: 'Rhizoctonia', family: 'Ceratobasidiaceae', target: '幼苗，下层树冠叶片', part: 'Leaves', type: '病原体', hiding: '土壤表面，溅到下部叶片上', symptoms: '不规则的水浸状病斑迅速扩大，干燥后呈纸质质感。树叶可能粘连在一起。', activity: 'N/A',
    lifecycle: '在密集、潮湿的环境中移动极快。不产生孢子；通过重叠的叶片进行物理菌丝生长蔓延。如果不加治疗，能在不到 3 天内摧毁排列紧密的种植袋苗圃。', symbiosis: '在排列紧密的苗圃中风险极高。', control: '将种植袋抬离地面。预防：喷施贝莱斯芽孢杆菌 (B. velezensis) 和解淀粉芽孢杆菌。爆发时：使用合成药剂击倒 (戊菌隆/噻呋酰胺)。',
    severity: 4, stages: ['Seedling'], ipm: ['Cultural', 'Chemical', 'Biological']
  },
  {
    id: 'bacterial-leaf-spot', category: 'Fungi/Pathogens', common: '细菌性叶斑病', scientific: 'Xanthomonas campestris', genus: 'Xanthomonas', family: 'Xanthomonadaceae', target: '叶片', part: 'Leaves', type: '细菌性', hiding: '叶面，飞溅的水', symptoms: '叶片上出现带有黄色晕圈的微小、有棱角的水浸状病斑，随后变黑。导致苗圃中严重的落叶。', activity: 'N/A',
    lifecycle: '在温暖潮湿的天气中，细菌呈指数级繁殖(每20-30分钟翻一番)。主要通过顶部喷洒灌溉和风雨传播。通过自然气孔或风吹打造成的微小伤口进入叶片。', symbiosis: '通过自然气孔或昆虫咬伤进入。', control: '生物防治：叶面喷施荧光假单胞菌和枯草芽孢杆菌。使用铜制杀细菌剂。',
    severity: 3, stages: ['Seedling', 'Vegetative'], ipm: ['Cultural', 'Biological', 'Chemical']
  },
  {
    id: 'algal-leaf-spot', category: 'Fungi/Pathogens', common: '藻斑病 (红锈病)', scientific: 'Cephaleuros virescens', genus: 'Cephaleuros', family: 'Algae', target: '成熟叶片', part: 'Leaves', type: '寄生藻类', hiding: '老树冠叶片的表面', symptoms: '在老叶上表面出现凸起的、天鹅绒般的、橙色到铁锈红色的圆形斑点。', activity: 'N/A',
    lifecycle: '发展缓慢。实际上是一种寄生绿藻(在产生孢子时变成橙色)。需要高度潮湿、停滞的空气和微弱的树势才能建立。风和雨传播具有鞭毛的游动孢子。极少致死，但会长期降低光合作用。', symbiosis: 'N/A', control: '修剪树冠以改善空气流通。喷施铜制杀菌剂可提供出色的控制效果。',
    severity: 2, stages: ['Vegetative', 'Post-Harvest'], ipm: ['Cultural', 'Chemical']
  },
  {
    id: 'sooty-mold', category: 'Fungi/Pathogens', common: '煤烟病', scientific: 'Capnodium spp.', genus: 'Capnodium', family: 'Capnodiaceae', target: '叶片，果实，茎干', part: 'Leaves', type: '继发真菌', hiding: '覆盖在涂有蜜露的植物表面', symptoms: '覆盖在叶片上表面的厚厚、黑色的结壳或粉末状烟炱。阻挡阳光，降低光合作用并阻碍生长。', activity: 'N/A',
    lifecycle: '只要存在含糖的蜜露，就会瞬间繁殖。这种真菌本身**不会**感染植物；它只以昆虫的排泄物为食。只要蚜虫、粉虱或蚧壳虫产生蜜露，它就会继续迅速蔓延。', symbiosis: '直接与蚜虫、粉蚧、粉虱或软蚧的爆发相连。', control: '根除吸汁昆虫。生物防治：蜡蚧轮枝菌会直接以蜜露为食。',
    severity: 2, stages: ['Vegetative', 'Fruiting'], ipm: ['Chemical', 'Biological', 'Cultural']
  },

  // VERTEBRATES (WILDLIFE)
  {
    id: 'civet', category: 'Vertebrates', common: '果子狸 (椰子猫)', scientific: 'Paradoxurus hermaphroditus', genus: 'Paradoxurus', family: 'Viverridae', target: '树上成熟的果实', part: 'Fruit/Flower', type: '食腐/破坏', hiding: '树冠，邻近森林', symptoms: '一种夜间突袭者，专门针对优质的成熟果实(如猫山王)。在果壳上咬出精确的孔来吃果肉。', activity: 'Nocturnal',
    lifecycle: '全年繁殖，每胎2-4只。主要的威胁不是庞大的数量，而是学习行为。果子狸非常聪明，一旦果实香味达到顶峰，它们会习惯性地每晚回到完全相同的高价值树上。', symbiosis: 'N/A', control: '安装锌片树干防护罩以防止攀爬。配备夜间看门狗。',
    severity: 5, stages: ['Fruiting'], ipm: ['Physical']
  },
  {
    id: 'macaque', category: 'Vertebrates', common: '猕猴', scientific: 'Macaca fascicularis', genus: 'Macaca', family: 'Cercopithecidae', target: '果实，整个树枝', part: 'Fruit/Flower', type: '破坏性', hiding: '相邻的森林边界', symptoms: '折断的树枝，吃到一半被扔到地上的果实，对树木结构造成严重的机械损伤。', activity: 'Diurnal',
    lifecycle: '生活在20-50只个体组成的高度社会化、具有学习能力的群体中。繁殖缓慢(每只雌猴每年1只幼崽)，但它们的集体智慧使其成为严重的威胁。它们会交流果园防御的弱点并在白天进行系统的袭击。', symbiosis: 'N/A', control: '高压农业周边电围栏。看门狗。采收期间配备活跃的人工巡逻队。',
    severity: 5, stages: ['Fruiting'], ipm: ['Physical']
  },
  {
    id: 'plantain-squirrel', category: 'Vertebrates', common: '赤腹松鼠', scientific: 'Callosciurus notatus', genus: 'Callosciurus', family: 'Sciuridae', target: '成熟 / 熟透的果实', part: 'Fruit/Flower', type: '啃咬', hiding: '上层树冠，树洞', symptoms: '直接在榴莲果壳上咬出圆孔来提取甜美的果肉和种子。导致果实完全损毁。', activity: 'Diurnal',
    lifecycle: '全年不断繁殖(每胎2-4只)。极其敏捷和执着。如果相邻的丛林受到干扰，或者果园缺乏猛禽或蛇等天敌，其种群数量可能会大幅增加。', symbiosis: 'N/A', control: '用1米宽的光滑锌片/铝片包裹树干以防止其攀爬。',
    severity: 4, stages: ['Fruiting'], ipm: ['Physical']
  },
  {
    id: 'porcupine', category: 'Vertebrates', common: '马来豪猪', scientific: 'Hystrix brachyura', genus: 'Hystrix', family: 'Hystricidae', target: '幼树的树皮，根部', part: 'Trunk/Branches', type: '啃咬', hiding: '地下洞穴，夜间活动', symptoms: '在幼树干基部周围啃咬，通常导致幼树被环剥而死。在根部周围挖掘。', activity: 'Nocturnal',
    lifecycle: '繁殖缓慢(每年1-2只幼崽)。独居或组成小家庭群。它们夜间靠嗅觉觅食。虽然数量保持在低位，但一只觅食的豪猪可以通过环切树皮，在一夜之间有效杀死几棵昂贵的幼树。', symbiosis: 'N/A', control: '在幼树基部周围缠绕重型金属网。坚固的周边围栏。',
    severity: 4, stages: ['Seedling', 'Vegetative'], ipm: ['Physical']
  },
  {
    id: 'wild-boar', category: 'Vertebrates', common: '野猪', scientific: 'Sus scrofa', genus: 'Sus', family: 'Suidae', target: '掉落的果实，根部，幼树', part: 'Roots', type: '食腐/挖掘', hiding: '茂密的灌木丛，深沟', symptoms: '在树基部周围进行深层挖掘破坏。消耗有价值的落果。', activity: 'Nocturnal',
    lifecycle: '在大型哺乳动物中繁殖力惊人。母猪一年可产2胎，每胎最多10头小猪。种群数量在榴莲结果期激增。它们深度挖掘会破坏地表吸收根，并引来真菌腐烂。', symbiosis: '挖掘伤害使根部暴露于疫霉菌感染。', control: '坚固的、埋入地下的铁丝网围栏或重型猪网。周边挖掘防护壕沟。',
    severity: 4, stages: ['All Stages'], ipm: ['Physical']
  },
  {
    id: 'elephant', category: 'Vertebrates', common: '亚洲象', scientific: 'Elephas maximus', genus: 'Elephas', family: 'Elephantidae', target: '整树，幼树，基础设施', part: 'General', type: '毁灭性', hiding: '深层森林保护区', symptoms: '灾难性的结构破坏。树干被折断，幼树被连根拔起，灌溉管道被压碎。', activity: 'Nocturnal',
    lifecycle: '繁殖极慢，但成群结队旅行。其威胁基于历史迁徙走廊。如果您的榴莲果园挡住了传统的丛林路径，路过的象群会在几分钟内对树木和基础设施造成灾难性的、永久性的结构破坏。', symbiosis: 'N/A', control: '重型大象电围栏(高压)。深的外围壕沟。请求野生动物部门介入协助。',
    severity: 5, stages: ['All Stages'], ipm: ['Physical']
  },
  {
    id: 'field-rat', category: 'Vertebrates', common: '田鼠', scientific: 'Rattus tiomanicus', genus: 'Rattus', family: 'Muridae', target: '掉落的果实，种子', part: 'Fruit/Flower', type: '啃咬', hiding: '杂草丛，灌木丛', symptoms: '地面上有被咬过的果壳，污染采收收集区。', activity: 'Nocturnal',
    lifecycle: '爆炸性的繁殖者。一只雌鼠一年可产4-6胎，每胎多达10只幼崽。种群数量在果实开始掉落时迅速激增。如果没有放置诱饵或缺乏天敌(猫头鹰/蛇)，老鼠将消耗或污染很大比例的落果。', symbiosis: '会吸引蛇类进入果园。', control: '保持果园地面清洁。在PVC管内布置杀鼠剂诱饵站。',
    severity: 3, stages: ['Fruiting'], ipm: ['Cultural', 'Chemical']
  },
  {
    id: 'sun-bear', category: 'Vertebrates', common: '马来熊', scientific: 'Helarctos malayanus', genus: 'Helarctos', family: 'Ursidae', target: '成熟果实，树干', part: 'Trunk/Branches', type: '撕裂', hiding: '深层原始/次生林', symptoms: '树干上刻有巨大的爪痕。果壳被暴力撕裂开。', activity: 'Nocturnal',
    lifecycle: '繁殖非常缓慢(每隔几年才产一只幼崽)且高度独居。极其罕见，但极易被成熟榴莲的气味吸引。它们巨大的爪子在爬树去扯下果实的过程中，会对成熟树干造成深深的、永久性的创伤。', symbiosis: 'N/A', control: '电围栏。受当地野生动物保护局完全保护的物种(禁止诱捕/射杀)。',
    severity: 4, stages: ['Fruiting'], ipm: ['Physical']
  },

  // MOLLUSCS
  {
    id: 'giant-african-snail', category: 'Molluscs', common: '非洲大蜗牛', scientific: 'Lissachatina fulica', genus: 'Lissachatina', family: 'Achatinidae', target: '幼苗，娇嫩的树皮，下部叶片', part: 'Leaves', type: '锉吸式', hiding: '潮湿的落叶层下', symptoms: '下部叶片被咬出不规则的大孔。幼苗的树皮被锉掉。留有独特的黏液痕迹。', activity: 'Nocturnal',
    lifecycle: '雌雄同体且极其多产。单只蜗牛每年产下多达1200粒卵。在干旱天气中，它们在土壤深处夏眠，在季风暴雨后成群爆发，能够在一夜之间将幼苗剥得精光。', symbiosis: '植物病原体的携带者。', control: '夜间手工捕抓。清除杂草丛。施用四聚乙醛(Metaldehyde)或磷酸铁蜗牛颗粒诱饵。',
    severity: 3, stages: ['Seedling'], ipm: ['Cultural', 'Chemical']
  },
  {
    id: 'slugs', category: 'Molluscs', common: '果园蛞蝓 (鼻涕虫)', scientific: 'Deroceras spp.', genus: 'Deroceras', family: 'Agriolimacidae', target: '幼苗，低处树叶', part: 'Leaves', type: '锉吸式', hiding: '覆盖物下方，潮湿土壤', symptoms: '类似于蜗牛但没有壳。幼苗叶片上出现不规则孔洞，闪亮的黏液痕迹。', activity: 'Nocturnal',
    lifecycle: '在持续潮湿的环境中快速繁殖。一次在潮湿的土壤缝隙中产下30-50粒卵。它们只在夜间或严重阴雨天出现。紧贴树干放置的厚重有机覆盖物会保证其种群数量大规模爆发。', symbiosis: 'N/A', control: '减少紧贴树干的重型覆盖物。施用四聚乙醛或磷酸铁诱饵。',
    severity: 2, stages: ['Seedling'], ipm: ['Cultural', 'Chemical']
  },

  // WEEDS & EPIPHYTES
  {
    id: 'dragons-scale-fern', category: 'Weeds/Epiphytes', common: "龙鳞蕨 (抱树莲)", scientific: 'Pyrrosia piloselloides', genus: 'Pyrrosia', family: 'Polypodiaceae', target: '主干和大型分枝', part: 'Trunk/Branches', type: '附生植物', hiding: '紧贴着树皮攀爬', symptoms: '厚实的硬币状肉质叶片沿着树枝蔓延。将水分困在树皮中，为疫霉病和粉红病创造了完美的滋生地。隐蔽了蛀虫孔。', activity: 'Continuous',
    lifecycle: '通过风吹孢子和攀爬的根茎传播。它是一种附生植物(利用树木作支撑，而不是吸取树液)，但严重的寄生会使树皮窒息，并在大雨期间增加巨大的水重，有可能压断结构性树枝。', symbiosis: '积聚水分，直接促进疫霉病、粉红病的发生，并隐藏蛀虫的危害。', control: '使用钢丝刷或高压水枪人工清除。**不要**在树皮上使用内吸性除草剂。刮除后，用高浓度铜制杀菌剂清洗/涂抹树皮，以杀死残留的根茎并对树皮进行消毒。',
    severity: 2, stages: ['Vegetative', 'Post-Harvest'], ipm: ['Physical', 'Chemical']
  },
  {
    id: 'green-trunk-algae', category: 'Weeds/Epiphytes', common: '树干绿藻', scientific: 'Pleurococcus spp.', genus: 'Pleurococcus', family: 'Pleurococcaceae', target: '主干，荫蔽的树皮', part: 'Trunk/Branches', type: '附生 / 藻类', hiding: '潮湿、阴影严重的树干两侧', symptoms: '覆盖在树皮上的厚粉状或硬壳状鲜绿色层。雨后立即变成充满活力的亮绿色。', activity: 'Continuous',
    lifecycle: '在树冠气流不畅和树荫密集的杂草丛生的果园中茁壮成长。虽然它是非寄生的，但它的作用就像贴在树干上的永久性湿海绵。被困住的水分会软化树皮，为致命的疫霉溃疡病创造终极滋生地。', symbiosis: '通过使木材保持永久潮湿，直接促进疫霉病和树皮腐烂真菌的发生。', control: '修剪树冠引入阳光。轻轻刷除厚层。用氧氯化铜涂抹/喷洒树干，或者施用生物微生物（贝莱斯芽孢杆菌/解淀粉芽孢杆菌），以有机方式分解和排斥藻类。',
    severity: 2, stages: ['All Stages'], ipm: ['Cultural', 'Physical', 'Chemical', 'Biological']
  }
];

// --- MOA DATA ENRICHMENT (IRAC & FRAC CODES) ---
const PEST_MOA_MAPPING = {
  'thrips-nymph': 'IRAC 5 (多杀霉素类) 🔄 IRAC 6 (阿维菌素) 🔄 IRAC 4A+3A (复配混剂) 🔄 Bio (玫烟色棒束孢)',
  'thrips-adult': 'IRAC 5 (多杀霉素类) 🔄 IRAC 6 (阿维菌素) 🔄 IRAC 4A+3A (复配混剂) 🔄 Bio (玫烟色棒束孢)',
  'aphid-nymph': 'IRAC 4A+3A (复配混剂) 🔄 IRAC 29 (氟啶虫酰胺) 🔄 Bio (蜡蚧轮枝菌) 🔄 IRAC UN (印楝油)',
  'aphid-adult': 'IRAC 4A+3A (复配混剂) 🔄 IRAC 29 (氟啶虫酰胺) 🔄 Bio (蜡蚧轮枝菌) 🔄 IRAC 4C (氟啶虫胺腈)',
  'whitefly-nymph': 'IRAC 7C (吡丙醚) 🔄 IRAC 16 (噻嗪酮) 🔄 Bio (玫烟色棒束孢) 🔄 IRAC 23 (螺虫乙酯)',
  'whitefly-adult': 'IRAC 7C (吡丙醚) 🔄 Bio (玫烟色棒束孢) 🔄 IRAC 23 (螺甲螨酯) 🔄 IRAC UN (矿物白油)',
  'durian-pit-scale-crawler': 'IRAC 16 (噻嗪酮) 🔄 IRAC 23 (螺虫乙酯) 🔄 Bio (球孢白僵菌) 🔄 IRAC UN (矿物白油)',
  'durian-pit-scale-adult': 'IRAC 23 (螺虫乙酯) 🔄 IRAC 16 (噻嗪酮) 🔄 Bio (球孢白僵菌) 🔄 IRAC UN (矿物白油)',
  'soft-scale': 'IRAC 16 (噻嗪酮) 🔄 IRAC 23 (螺虫乙酯) 🔄 Bio (球孢白僵菌) 🔄 IRAC UN (印楝油)',
  'psyllid-nymph': 'IRAC 4A (噻虫嗪) 🔄 Bio (蜡蚧轮枝菌) 🔄 IRAC 23 (螺虫乙酯) 🔄 IRAC UN (矿物白油)',
  'psyllid-adult': 'IRAC 4A (噻虫嗪) 🔄 IRAC 3A (拟除虫菊酯类) 🔄 Bio (蜡蚧轮枝菌) 🔄 IRAC 9B (吡蚜酮)',
  'green-leafhopper-nymph': 'IRAC 4A+3A (复配混剂) 🔄 IRAC 9B (吡蚜酮) 🔄 Bio (蜡蚧轮枝菌) 🔄 IRAC UN (杀虫皂液)',
  'green-leafhopper-adult': 'IRAC 4A+3A (复配混剂) 🔄 IRAC 9B (吡蚜酮) 🔄 IRAC 3A (拟除虫菊酯类) 🔄 Bio (蜡蚧轮枝菌)',
  'durian-mealybug-crawler': 'IRAC 16 (噻嗪酮) 🔄 IRAC 23 (螺虫乙酯) 🔄 Bio (球孢白僵菌) 🔄 IRAC UN (矿物白油)',
  'durian-mealybug-adult': 'IRAC 23 (螺虫乙酯) 🔄 Bio (球孢白僵菌) 🔄 IRAC 4A (吡虫啉) 🔄 IRAC UN (矿物白油)',
  'coffee-mealybug': 'IRAC 16 (噻嗪酮) 🔄 Bio (球孢白僵菌) 🔄 IRAC 4A (啶虫脒) 🔄 IRAC UN (印楝油)',
  'leaf-footed-bug': 'IRAC 3A + FRAC 11 (现混) 🔄 IRAC 4A+3A (复配混剂) 🔄 IRAC 4C (氟啶虫胺腈) 🔄 IRAC 28 (双酰胺类)',
  'stink-bug': 'IRAC 3A (拟除虫菊酯类) 🔄 IRAC 4A+3A (复配混剂) 🔄 IRAC 4C (氟啶虫胺腈) 🔄 IRAC 28 (双酰胺类)',
  'weaver-ant': 'IRAC 3A (氯氰菊酯) 🔄 IRAC 2B (氟虫腈) 🔄 IRAC 20B (氟蚁腙) 🔄 IRAC 4A (吡虫啉)',
  'crazy-ant': 'IRAC 2B (氟虫腈) 🔄 IRAC 20B (氟蚁腙) 🔄 IRAC 3A (氯氰菊酯) 🔄 IRAC 4A (吡虫啉)',
  'paper-wasp': 'Physical (大型黄色粘虫板) 🔄 IRAC 3A (胺菊酯/氯氰菊酯喷雾) 🔄 Physical (夜间套袋摘除) 🔄 Physical (防蜂服PPE)',
  'hornet': 'Physical (大型黄色粘虫板) 🔄 IRAC 3A (高压气雾剂注入) 🔄 Physical (火攻/夜间封堵) 🔄 Physical (重型防蜂服PPE)',
  'nocturnal-wasp': 'Cultural (夜间改用红光/间接光源) 🔄 Physical (高层太阳能杀虫灯诱杀) 🔄 IRAC 3A (白天处理蜂巢)',
  'coconut-rhino-beetle-grub': 'Bio (绿僵菌) 🔄 IRAC 3A (氯氰菊酯) 🔄 IRAC 4A (吡虫啉) 🔄 IRAC 28 (双酰胺类)',
  'coconut-rhino-beetle-adult': 'Bio (绿僵菌) 🔄 IRAC 3A (氯氰菊酯) 🔄 IRAC 4A (吡虫啉) 🔄 IRAC 28 (双酰胺类)',
  'malaysian-rhino-beetle-adult': 'Bio (绿僵菌) 🔄 IRAC 3A (氯氰菊酯) 🔄 IRAC 4A (吡虫啉) 🔄 IRAC 28 (双酰胺类)',
  'durian-fruit-borer-caterpillar': 'IRAC 5 (乙基多杀菌素) 🔄 IRAC 28 (双酰胺类) 🔄 IRAC 28+4A (复配混剂) 🔄 Bio (莱氏绿僵菌)',
  'durian-fruit-borer-moth': 'IRAC 5 (乙基多杀菌素) 🔄 IRAC 3A (氯氰菊酯) 🔄 IRAC 28 (双酰胺类) 🔄 Bio (球孢白僵菌)',
  'durian-seed-borer-caterpillar': 'IRAC 5 (乙基多杀菌素) 🔄 IRAC 28 (双酰胺类) 🔄 IRAC 28+4A (复配混剂) 🔄 Bio (莱氏绿僵菌)',
  'fruit-fly-maggot': 'IRAC 28 (溴氰虫酰胺) 🔄 IRAC 5 (多杀霉素) 🔄 IRAC 3A (拟除虫菊酯类) 🔄 IRAC UN (印楝提取物)',
  'fruit-fly-adult': 'IRAC 28 (溴氰虫酰胺) 🔄 IRAC 5 (多杀霉素诱饵) 🔄 IRAC 3A (拟除虫菊酯类) 🔄 Bio (球孢白僵菌)',
  'sap-beetle': 'IRAC 3A (拟除虫菊酯类) 🔄 Bio (球孢白僵菌) 🔄 IRAC 5 (乙基多杀菌素) 🔄 IRAC 22A (茚虫威)',
  'rind-borer': 'IRAC 5 (乙基多杀菌素) 🔄 IRAC 22A (茚虫威) 🔄 IRAC 28 (双酰胺类) 🔄 Bio (莱氏绿僵菌)',
  'peach-moth': 'IRAC 28 (双酰胺类) 🔄 IRAC 22A (茚虫威) 🔄 IRAC 5 (乙基多杀菌素) 🔄 Bio (莱氏绿僵菌)',
  'mango-stem-borer-larva': 'IRAC 28+4A (复配混剂) 🔄 IRAC 28 (氯虫苯甲酰胺) 🔄 IRAC 4A (吡虫啉) 🔄 IRAC 3A (氯氰菊酯)',
  'mango-stem-borer-adult': 'IRAC 28+4A (复配混剂) 🔄 Bio (球孢白僵菌) 🔄 IRAC 28 (氯虫苯甲酰胺) 🔄 IRAC 3A (氯氰菊酯)',
  'pinhole-borer': 'FRAC 3 + IRAC 3A (现混) 🔄 Bio (球孢白僵菌) 🔄 IRAC 4A+3A (复配混剂) 🔄 IRAC 28 (溴氰虫酰胺)',
  'ambrosia-beetle': 'FRAC 3 + IRAC 28 (现混) 🔄 Bio (球孢白僵菌) 🔄 IRAC 3A (拟除虫菊酯类) 🔄 IRAC 4A+3A (复配混剂)',
  'red-branch-borer': 'IRAC 3A (氯氰菊酯) 🔄 IRAC 28 (氯虫苯甲酰胺) 🔄 IRAC 5 (乙基多杀菌素) 🔄 Bio (球孢白僵菌)',
  'clearwing-moth': 'IRAC 3A + FRAC P07 (现混) 🔄 Bio (球孢白僵菌) 🔄 IRAC 28 (双酰胺类) 🔄 FRAC M01 (铜制剂涂膏)',
  'bark-eating-caterpillar': 'IRAC 3A (溴氰菊酯) 🔄 IRAC 5 (多杀霉素) 🔄 Bio (莱氏绿僵菌) 🔄 Bio (球孢白僵菌)',
  'subterranean-termite': 'IRAC 2B (氟虫腈) 🔄 IRAC 4A (吡虫啉) 🔄 IRAC 3A (联苯菊酯) 🔄 Bio (绿僵菌)',
  'bagworm': 'Bio (莱氏绿僵菌) 🔄 IRAC 5 (乙基多杀菌素) 🔄 IRAC 28 (双酰胺类) 🔄 IRAC 4A+3A (复配混剂)',
  'chafer-beetle-grub': 'IRAC 4A (吡虫啉) 🔄 IRAC 2B (氟虫腈) 🔄 IRAC 3A (联苯菊酯) 🔄 Bio (绿僵菌)',
  'chafer-beetle-adult': 'IRAC 4A+3A (复配混剂) 🔄 IRAC 4A (新烟碱类) 🔄 Bio (球孢白僵菌) 🔄 IRAC 22A (茚虫威)',
  'rose-chafer': 'IRAC 4A+3A (复配混剂) 🔄 Bio (球孢白僵菌) 🔄 IRAC 5 (乙基多杀菌素) 🔄 IRAC 22A (茚虫威)',
  'gold-dust-weevil-grub': 'IRAC 4A (吡虫啉) 🔄 IRAC 2B (氟虫腈) 🔄 Bio (绿僵菌) 🔄 IRAC 3A (联苯菊酯)',
  'gold-dust-weevil-adult': 'IRAC 4A+3A (复配混剂) 🔄 Bio (球孢白僵菌) 🔄 IRAC 4A (新烟碱类) 🔄 IRAC 22A (茚虫威)',
  'valanga-grasshopper-nymph': 'IRAC UN (印楝素) 🔄 IRAC 3A (拟除虫菊酯类) 🔄 IRAC 5 (多杀霉素) 🔄 Bio (苏云金杆菌Bt)',
  'valanga-grasshopper-adult': 'IRAC 4A+3A (复配混剂) 🔄 IRAC 22A (茚虫威) 🔄 IRAC 5 (多杀霉素) 🔄 Bio (球孢白僵菌)',
  'durian-leafroller': 'Bio (莱氏绿僵菌) 🔄 IRAC 5 (乙基多杀菌素) 🔄 IRAC 28 (双酰胺类) 🔄 IRAC 28+4A (复配混剂)',
  'tussock-moth': 'IRAC 22A (茚虫威) 🔄 Bio (莱氏绿僵菌) 🔄 IRAC 5 (乙基多杀菌素) 🔄 Bio (球孢白僵菌)',
  'durian-hawk-moth': 'IRAC 22A (茚虫威) 🔄 Bio (苏云金杆菌Bt) 🔄 IRAC 5 (乙基多杀菌素) 🔄 IRAC 28+4A (复配混剂)',
  'african-red-mite': 'IRAC 21A (唑螨酯) 🔄 IRAC 23 (螺甲螨酯) 🔄 Bio (汤普森被毛孢) 🔄 IRAC 6 (阿维菌素)',
  'oriental-red-mite': 'IRAC 21A (唑螨酯) 🔄 IRAC 23 (螺甲螨酯) 🔄 Bio (汤普森被毛孢) 🔄 IRAC 6 (阿维菌素)',
  'broad-mite': 'IRAC 6 (阿维菌素) 🔄 Bio (汤普森被毛孢) 🔄 IRAC 21A (唑螨酯) 🔄 IRAC 12A (炔螨特)',
  'eriophyid-mite': 'IRAC UN (可湿性硫磺) 🔄 IRAC 6 (阿维菌素) 🔄 Bio (汤普森被毛孢) 🔄 IRAC 21A (唑螨酯)',
  'root-knot-nematode': 'IRAC 30 (氟吡菌酰胺) 🔄 Bio (淡紫拟青霉) 🔄 IRAC 6 (阿维菌素) 🔄 Bio (木霉菌)',
  'lesion-nematode': 'IRAC 30 (氟吡菌酰胺) 🔄 Bio (淡紫拟青霉) 🔄 IRAC 6 (阿维菌素) 🔄 Bio (木霉菌)',
  'phytophthora': 'FRAC P07 (亚磷酸盐) 🔄 Bio (荧光假单胞菌) 🔄 FRAC 21 (氰霜唑) 🔄 FRAC 4+M03 (精甲霜灵+代森锰锌)',
  'black-mildew': 'FRAC 11+3 (嘧菌酯+苯醚甲环唑) 🔄 Bio (枯草芽孢杆菌) 🔄 FRAC M01 (铜制剂) 🔄 FRAC M03 (代森锰锌)',
  'fusicoccum-canker': 'FRAC 3 (戊唑醇) 🔄 Bio (链霉菌) 🔄 FRAC M01 (铜制剂) 🔄 FRAC M03 (代森锰锌)',
  'twig-blight': 'FRAC M03 (代森锰锌) 🔄 Bio (枯草芽孢杆菌) 🔄 FRAC 11 (嘧菌酯) 🔄 FRAC M01 (铜制剂)',
  'pythium-rot': 'FRAC P07 (亚磷酸盐) 🔄 Bio (荧光假单胞菌) 🔄 FRAC 14 (依得利) 🔄 FRAC 28 (霜霉威)',
  'lasiodiplodia': 'FRAC 3 (咪鲜胺) 🔄 Bio (链霉菌) 🔄 FRAC 11+3 (复配混剂) 🔄 FRAC M01 (铜制剂)',
  'ceratocystis': 'FRAC 3 (丙环唑) 🔄 Bio (链霉菌) 🔄 FRAC 11+3 (复配混剂) 🔄 FRAC M03 (代森锰锌)',
  'white-root-disease': 'FRAC 3 (己唑醇) 🔄 Bio (链霉菌) 🔄 FRAC 11+3 (复配混剂) 🔄 FRAC M01 (铜制剂)',
  'pink-disease': 'FRAC M01 (氢氧化铜) 🔄 Bio (枯草芽孢杆菌) 🔄 FRAC 11+3 (复配混剂) 🔄 FRAC M03 (代森锰锌)',
  'anthracnose': 'FRAC 11+3 (嘧菌酯+苯醚甲环唑) 🔄 Bio (枯草芽孢杆菌) 🔄 FRAC M01 (铜制剂) 🔄 FRAC M03 (代森锰锌)',
  'leaf-blight': 'FRAC 20 (戊菌隆) 🔄 FRAC 7 (噻呋酰胺) 🔄 Bio (贝莱斯芽孢杆菌) 🔄 Bio (解淀粉芽孢杆菌)',
  'bacterial-leaf-spot': 'FRAC M01 (铜制剂) 🔄 Antibiotic (春雷霉素) 🔄 Bio (荧光假单胞菌) 🔄 Bio (枯草芽孢杆菌)',
  'algal-leaf-spot': 'FRAC M01 (铜制剂) 🔄 Bio (枯草芽孢杆菌) 🔄 FRAC 11+3 (复配混剂) 🔄 FRAC 11 (嘧菌酯)',
  'sooty-mold': 'FRAC M01 (铜制剂) 🔄 Bio (蜡蚧轮枝菌) 🔄 IRAC 16 (噻嗪酮) 🔄 IRAC UN (矿物白油)',
  'field-rat': 'RRAC (溴敌隆) 🔄 RRAC (溴鼠灵) 🔄 RRAC (胆钙化醇) 🔄 RRAC (磷化锌)',
  'giant-african-snail': 'Molluscicide (四聚乙醛) 🔄 Iron Phosphate (磷酸铁) 🔄 Niclosamide (氯硝柳胺) 🔄 Physical (铜箔胶带)',
  'slugs': 'Molluscicide (四聚乙醛) 🔄 Iron Phosphate (磷酸铁) 🔄 Niclosamide (氯硝柳胺) 🔄 Physical (铜箔胶带)',
  'dragons-scale-fern': 'Physical (钢丝刷) 🔄 High-Pressure Water (高压水枪) 🔄 FRAC M01 (铜制剂清洗)',
  'green-trunk-algae': 'Cultural (增加日照) 🔄 Bio (贝莱斯芽孢杆菌) 🔄 FRAC M01 (铜制剂清洗) 🔄 Bio (解淀粉芽孢杆菌)'
};

// --- SPRAY TARGET ENRICHMENT ---
const PEST_APPLICATION_MAPPING = {
  'thrips-nymph': '叶面喷施 (树冠及花蕾)',
  'thrips-adult': '叶面喷施 (树冠及花簇)',
  'aphid-nymph': '叶面喷施 (新梢及末端)',
  'aphid-adult': '叶面喷施 (新抽嫩梢)',
  'whitefly-nymph': '叶面喷施 (严格对准叶背)',
  'whitefly-adult': '叶面喷施 (树冠及叶背)',
  'durian-pit-scale-crawler': '叶面喷施 (细枝及叶脉)',
  'durian-pit-scale-adult': '树干/树枝重喷 + 渗透剂',
  'soft-scale': '叶面喷施 (叶片背面)',
  'psyllid-nymph': '叶面喷施 (重点针对展开的嫩叶)',
  'psyllid-adult': '叶面喷施 (树冠外围)',
  'green-leafhopper-nymph': '叶面喷施 (嫩叶边缘)',
  'green-leafhopper-adult': '叶面喷施 (整个树冠)',
  'durian-mealybug-crawler': '叶片/树枝喷施 (重点针对缝隙)',
  'durian-mealybug-adult': '针对性果壳及枝桠喷雾',
  'coffee-mealybug': '土壤灌根及下层树冠喷雾',
  'leaf-footed-bug': '针对发育中的幼果喷雾',
  'stink-bug': '叶面及果实簇喷雾',
  'weaver-ant': '针对蚁巢喷施及树干基部',
  'crazy-ant': '树干基部喷施及地面诱饵站',
  'paper-wasp': '夜间远距离直接对准蜂巢喷射',
  'hornet': '深夜封堵入口或对准巢穴注射',
  'nocturnal-wasp': '改变夜间光源策略 / 白天处理蜂巢',
  'coconut-rhino-beetle-grub': '堆肥/覆盖物土壤灌根',
  'coconut-rhino-beetle-adult': '树冠/嫩梢喷雾',
  'malaysian-rhino-beetle-adult': '树冠/嫩梢喷雾',
  'durian-fruit-borer-caterpillar': '针对性果实喷雾 (仅限早期阶段)',
  'durian-fruit-borer-moth': '高层树冠喷雾',
  'durian-seed-borer-caterpillar': '针对性果实喷雾 (早期阶段)',
  'fruit-fly-maggot': '地面卫生清理 / 不喷药',
  'fruit-fly-adult': '蛋白诱饵喷雾 (果园周边树干)',
  'sap-beetle': '针对性喷洒裂口/破损果实',
  'rind-borer': '针对性喷洒果壳',
  'peach-moth': '针对性果实簇喷雾',
  'mango-stem-borer-larva': '直接注入蛀孔 + 树皮涂抹',
  'mango-stem-borer-adult': '树干及树枝树皮喷雾',
  'pinhole-borer': '内吸性树干/树皮喷雾',
  'ambrosia-beetle': '内吸性树干/树皮喷雾',
  'red-branch-borer': '直接注入蛀孔',
  'clearwing-moth': '刮除树皮并喷雾/涂抹',
  'bark-eating-caterpillar': '在虫粪通道上局部喷雾',
  'subterranean-termite': '树干基部大量土壤灌根',
  'bagworm': '叶面喷施 (整个树冠)',
  'chafer-beetle-grub': '根部区域土壤灌根',
  'chafer-beetle-adult': '叶面喷施 (傍晚施用)',
  'rose-chafer': '叶面喷施 (傍晚施用)',
  'gold-dust-weevil-grub': '根部区域土壤灌根',
  'gold-dust-weevil-adult': '叶面喷施 (树冠)',
  'valanga-grasshopper-nymph': '下层树冠叶面喷雾',
  'valanga-grasshopper-adult': '叶面喷施 (清晨施用)',
  'durian-leafroller': '叶面喷施 (集中在卷曲的叶子上)',
  'tussock-moth': '叶面喷施 (整个树冠)',
  'durian-hawk-moth': '叶面喷施 (整个树冠)',
  'african-red-mite': '叶面喷施 (叶片上表面)',
  'oriental-red-mite': '叶面喷施 (叶片上表面)',
  'broad-mite': '叶面喷施 (顶端分生组织/嫩梢尖端)',
  'eriophyid-mite': '叶面喷施 (新梢/虫瘿)',
  'root-knot-nematode': '根部区域土壤灌根',
  'lesion-nematode': '根部区域土壤灌根',
  'phytophthora': '内吸性树干喷洒及土壤灌根',
  'black-mildew': '叶面喷施 (树冠及成熟叶片)',
  'fusicoccum-canker': '修剪伤口涂抹及树枝喷雾',
  'twig-blight': '叶面及细枝喷雾',
  'pythium-rot': '苗圃种植袋 / 根部区域灌根',
  'lasiodiplodia': '树干伤口涂抹及采后浸泡',
  'ceratocystis': '高压树干树皮喷雾 (勿钻孔)',
  'white-root-disease': '挖隔离沟及深层土壤灌根',
  'pink-disease': '树枝分叉处喷雾/涂抹',
  'anthracnose': '叶面喷施 (整个树冠)',
  'leaf-blight': '下层树冠 / 幼苗叶面喷雾',
  'bacterial-leaf-spot': '叶面喷施 (树冠)',
  'algal-leaf-spot': '叶面喷施 (老树冠叶片)',
  'sooty-mold': '叶面喷施 (针对底层的吸汁昆虫)',
  'field-rat': '诱饵站 (果园地面)',
  'giant-african-snail': '土壤撒播 (基部周围撒颗粒)',
  'slugs': '土壤撒播 (基部周围撒颗粒)',
  'dragons-scale-fern': '刮除树干树皮并冲洗',
  'green-trunk-algae': '树干树皮冲洗 / 涂抹'
};

// Inject MOA and Application into existing database safely
ALL_PESTS.forEach(pest => {
  pest.moa = PEST_MOA_MAPPING[pest.id] || 'N/A';
  pest.application = PEST_APPLICATION_MAPPING[pest.id] || '针对性施用';
});

// --- DT50 CHEMICAL LIFESPAN DATABASE ---
const DT50_DATABASE = [
  // Insecticides & Acaricides
  { name: 'Abamectin (阿维菌素)', moa: 'IRAC 6', foliar: '< 1 Day', soil: '14 - 28 Days', notes: '对紫外线高度敏感。必须在傍晚喷洒或配合紫外线保护助剂使用。', type: 'Insecticide' },
  { name: 'Acetamiprid (啶虫脒)', moa: 'IRAC 4A', foliar: '2 - 3 Days', soil: '1 - 8 Days', notes: '降解最快的新烟碱类。在土壤积累方面比吡虫啉安全得多。', type: 'Insecticide' },
  { name: 'Bifenthrin (联苯菊酯)', moa: 'IRAC 3A', foliar: '5 - 7 Days', soil: '70 - 120 Days', notes: '在土壤中持续时间最长的拟除虫菊酯。非常适合用于白蚁/蛴螬的土壤灌根。', type: 'Insecticide' },
  { name: 'Buprofezin (噻嗪酮)', moa: 'IRAC 16', foliar: '4 - 7 Days', soil: '20 - 50 Days', notes: '具有稳定的气相杀虫作用。蒸汽作用有助于杀死隐藏的若虫。', type: 'Insecticide' },
  { name: 'Cartap hydrochloride (杀螟丹)', moa: 'IRAC 4', foliar: '3 - 5 Days', soil: '3 - 10 Days', notes: '高度内吸。环境残留短，但对水生生物具有高毒性。', type: 'Insecticide' },
  { name: 'Chlorantraniliprole (氯虫苯甲酰胺)', moa: 'IRAC 28', foliar: '10 - 15 Days', soil: '100 - 300+ Days', notes: '高度持久。不要将其作为土壤灌根剂连续使用，以免造成永久性累积。', type: 'Insecticide' },
  { name: 'Cyantraniliprole (溴氰虫酰胺)', moa: 'IRAC 28', foliar: '3 - 5 Days', soil: '14 - 60 Days', notes: '比氯虫苯甲酰胺起效更快，降解也更快。更适合叶面喷施。', type: 'Insecticide' },
  { name: 'Cypermethrin (氯氰菊酯)', moa: 'IRAC 3A', foliar: '3 - 5 Days', soil: '14 - 30 Days', notes: '快速击倒，但在阳光下会迅速降解。', type: 'Insecticide' },
  { name: 'Deltamethrin (溴氰菊酯)', moa: 'IRAC 3A', foliar: '1 - 3 Days', soil: '10 - 40 Days', notes: '极快击倒。在紫外线下迅速降解。对蜜蜂有高毒性。', type: 'Insecticide' },
  { name: 'Diafenthiuron (丁醚脲)', moa: 'IRAC 12A', foliar: '1 - 3 Days', soil: '1 - 2 Days', notes: '具有蒸汽作用。它是一种前体杀虫剂，在阳光下才会转化为毒性形态。', type: 'Insecticide' },
  { name: 'Fipronil (氟虫腈)', moa: 'IRAC 2B', foliar: '1 - 2 Days', soil: '30 - 120 Days', notes: '在阳光下迅速分解，但紧密结合土壤有机质，可用于长效控制白蚁。', type: 'Insecticide' },
  { name: 'Flonicamid (氟啶虫酰胺)', moa: 'IRAC 29', foliar: '1 - 3 Days', soil: '1 - 3 Days', notes: '快速降解。非常适合在采收前用于快速控制蚜虫。', type: 'Insecticide' },
  { name: 'Flupyradifurone (氟吡呋喃酮)', moa: 'IRAC 4D', foliar: '3 - 7 Days', soil: '60 - 120 Days', notes: '快速起效的内吸剂。与老式新烟碱类相比，对觅食蜜蜂相对更安全。', type: 'Insecticide' },
  { name: 'Imidacloprid (吡虫啉)', moa: 'IRAC 4A', foliar: '3 - 5 Days', soil: '40 - 200+ Days', notes: '高度持久。内吸传导极佳，但过度用作灌根剂久而久之会使土壤生物绝育。', type: 'Insecticide' },
  { name: 'Indoxacarb (茚虫威)', moa: 'IRAC 22A', foliar: '3 - 6 Days', soil: '14 - 30 Days', notes: '紧密结合叶片蜡质。一旦干燥便具有高度耐雨水冲刷性。', type: 'Insecticide' },
  { name: 'Lambda-cyhalothrin (高效氯氟氰菊酯)', moa: 'IRAC 3A', foliar: '2 - 4 Days', soil: '20 - 60 Days', notes: '广谱接触杀虫剂。对外来害虫具有强烈的驱避作用。', type: 'Insecticide' },
  { name: 'Lufenuron (虱螨脲)', moa: 'IRAC 15', foliar: '14 - 21 Days', soil: '10 - 30 Days', notes: '几丁质抑制剂。耐雨水冲刷且在叶面上高度持久，可长期控制毛虫。', type: 'Insecticide' },
  { name: 'Propargite (炔螨特)', moa: 'IRAC 12A', foliar: '3 - 5 Days', soil: '40 - 70 Days', notes: '在高温下会蒸发(蒸汽作用)，从而杀死隐藏在叶片背面的螨虫。', type: 'Insecticide' },
  { name: 'Pymetrozine (吡蚜酮)', moa: 'IRAC 9B', foliar: '2 - 4 Days', soil: '2 - 10 Days', notes: '在植物和土壤中都能迅速降解。', type: 'Insecticide' },
  { name: 'Pyriproxyfen (吡丙醚)', moa: 'IRAC 7C', foliar: '7 - 14 Days', soil: '10 - 30 Days', notes: '高度稳定的昆虫生长调节剂(IGR)。对卵和蛹具有长效的残留作用。', type: 'Insecticide' },
  { name: 'Spinetoram (乙基多杀菌素)', moa: 'IRAC 5', foliar: '1 - 5 Days', soil: '20 - 30 Days', notes: '比多杀霉素对紫外线更稳定，能在树冠中更长时间地控制毛虫。', type: 'Insecticide' },
  { name: 'Spinosad (多杀霉素)', moa: 'IRAC 5', foliar: '0.5 - 2 Days', soil: '9 - 17 Days', notes: '在阳光下降解极快。仅限在黄昏时喷洒。', type: 'Insecticide' },
  { name: 'Spiromesifen (螺甲螨酯)', moa: 'IRAC 23', foliar: '3 - 5 Days', soil: '5 - 10 Days', notes: '在降解前具有极佳的跨层(Translaminar)运动能力。', type: 'Insecticide' },
  { name: 'Spirotetramat (螺虫乙酯)', moa: 'IRAC 23', foliar: '< 1 Day', soil: '14 - 21 Days', notes: '进入叶片后瞬间降解为活性烯醇形式，随后系统性地传导数周。', type: 'Insecticide' },
  { name: 'Sulfoxaflor (氟啶虫胺腈)', moa: 'IRAC 4C', foliar: '1 - 3 Days', soil: '1 - 4 Days', notes: '分解极快。被设计作为老式新烟碱类的更安全替代品。', type: 'Insecticide' },
  { name: 'Thiamethoxam (噻虫嗪)', moa: 'IRAC 4A', foliar: '3 - 5 Days', soil: '25 - 100 Days', notes: '在植物汁液中比吡虫啉更具流动性，但在土壤中仍相对持久。', type: 'Insecticide' },
  
  // Fungicides & Bactericides
  { name: 'Azoxystrobin (嘧菌酯)', moa: 'FRAC 11', foliar: '11 - 17 Days', soil: '50 - 100 Days', notes: '内吸传导。对炭疽病有良好的残效控制。', type: 'Fungicide' },
  { name: 'Benomyl (苯菌灵)', moa: 'FRAC 1', foliar: '1 - 2 Days', soil: '< 1 Day', notes: '迅速降解为多菌灵。高抗药性风险。广谱内吸作用。', type: 'Fungicide' },
  { name: 'Bordeaux mixture (波尔多液)', moa: 'FRAC M01', foliar: 'Infinite', soil: 'Infinite', notes: '传统的硫酸铜和石灰混合物。强碱性。无机物，会在土壤中永久累积。', type: 'Fungicide' },
  { name: 'Carbendazim (多菌灵)', moa: 'FRAC 1', foliar: '3 - 7 Days', soil: '30 - 90 Days', notes: '常见的内吸性杀菌剂。如果不轮换使用，产生抗药性的风险极高。', type: 'Fungicide' },
  { name: 'Copper (氧氯化铜/氢氧化铜)', moa: 'FRAC M01', foliar: 'Infinite', soil: 'Infinite', notes: '无机重金属。不可降解。会被冲洗掉并永久累积。会导致根部铜中毒。', type: 'Fungicide' },
  { name: 'Cyazofamid (氰霜唑)', moa: 'FRAC 21', foliar: '5 - 10 Days', soil: '3 - 6 Days', notes: '在土壤中降解很快。安全用于针对疫霉病/腐霉病的土壤灌根。', type: 'Fungicide' },
  { name: 'Difenoconazole (苯醚甲环唑)', moa: 'FRAC 3', foliar: '7 - 14 Days', soil: '50 - 150 Days', notes: '强内吸性。在木质组织中持久性好，能有效阻止溃疡病蔓延。', type: 'Fungicide' },
  { name: 'Etridiazole (依得利)', moa: 'FRAC 14', foliar: 'N/A', soil: '10 - 20 Days', notes: '严格作为土壤灌根剂用于控制腐霉病。如果留在土壤表面会迅速挥发。', type: 'Fungicide' },
  { name: 'Fosetyl-Aluminium (三乙膦酸铝)', moa: 'FRAC P07', foliar: 'Variable', soil: '< 1 Day', notes: '真正的双向内吸传导。在土壤中迅速降解为亚磷酸盐，触发植物免疫。', type: 'Fungicide' },
  { name: 'Hexaconazole (己唑醇)', moa: 'FRAC 3', foliar: '10 - 20 Days', soil: '50 - 150 Days', notes: '在木质组织中高度持久。治疗白根病的绝佳选择。', type: 'Fungicide' },
  { name: 'Mancozeb (代森锰锌)', moa: 'FRAC M03', foliar: '1 - 3 Days', soil: '< 1 Day', notes: '仅具触杀作用。极快地降解为ETU。大雨后必须重新施用。', type: 'Fungicide' },
  { name: 'Metalaxyl-M (精甲霜灵)', moa: 'FRAC 4', foliar: '3 - 5 Days', soil: '15 - 40 Days', notes: '向上的高度内吸传导。专效针对卵菌纲(疫霉病/腐霉病)。', type: 'Fungicide' },
  { name: 'Pencycuron (戊菌隆)', moa: 'FRAC 20', foliar: '3 - 7 Days', soil: '50 - 100 Days', notes: '严格的接触性杀菌剂，对丝核菌具有特效。在土壤中持久性长。', type: 'Fungicide' },
  { name: 'Phosphonates (亚磷酸)', moa: 'FRAC P07', foliar: 'Variable', soil: 'Variable', notes: '具有独特的在树木体内上下双向传导的能力。最终会被微生物氧化成天然磷肥。', type: 'Fungicide' },
  { name: 'Prochloraz (咪鲜胺)', moa: 'FRAC 3', foliar: '5 - 10 Days', soil: '10 - 40 Days', notes: '起效极快。经常用作采后果实的浸泡剂，因为它降解相对较快。', type: 'Fungicide' },
  { name: 'Propiconazole (丙环唑)', moa: 'FRAC 3', foliar: '7 - 14 Days', soil: '40 - 70 Days', notes: '内吸吸收快，可防止雨水冲刷。', type: 'Fungicide' },
  { name: 'Propineb (丙森锌)', moa: 'FRAC M03', foliar: '1 - 3 Days', soil: '15 - 30 Days', notes: '含锌的接触性杀菌剂。非常适合广谱预防。', type: 'Fungicide' },
  { name: 'Tebuconazole (戊唑醇)', moa: 'FRAC 3', foliar: '10 - 15 Days', soil: '50 - 100 Days', notes: '广谱内吸剂，对枝条溃疡病(壳梭孢菌)非常有效。', type: 'Fungicide' },

  // Botanicals, Biologicals & Molluscicides
  { name: 'Azadirachtin (印楝素/印楝油)', moa: 'Botanical', foliar: '1 - 2.5 Days', soil: '1 - 2 Days', notes: '对紫外线和碱性水高度敏感。将在48小时内完全降解。', type: 'Bio/Other' },
  { name: 'Bacillus spp. (芽孢杆菌物种)', moa: 'Biological', foliar: 'Weeks/Months', soil: 'Indefinite', notes: '活体生物。能够在植物/土壤中定殖并繁殖，如果条件合适，可无限期延长其保护寿命。', type: 'Bio/Other' },
  { name: 'Metarhizium / Trichoderma (绿僵菌/木霉菌)', moa: 'Biological', foliar: 'Weeks/Months', soil: 'Indefinite', notes: '孢子发芽需要避光保护(紫外线敏感)。一旦建立群落，它们会自然繁殖并持久存在。', type: 'Bio/Other' },
  { name: 'Metaldehyde (四聚乙醛 - 蜗牛诱饵)', moa: 'Molluscicide', foliar: 'N/A', soil: '3 - 10 Days', notes: '在潮湿土壤中迅速分解为乙酸(醋)。对热和水分高度敏感。', type: 'Bio/Other' },
  { name: 'Iron Phosphate (磷酸铁)', moa: 'Molluscicide', foliar: 'N/A', soil: 'Weeks', notes: '分解成天然铁和磷酸盐肥料。对环境极其安全。', type: 'Bio/Other' }
];

// --- ACTIVITY ICON HELPER ---
const getActivityIcon = (act) => {
  if (!act || act === 'N/A' || act === '无') return 'dash';
  if (act.includes('Diurnal') || act.includes('昼行')) return 'sun';
  if (act.includes('Nocturnal') || act.includes('夜行')) return 'moon';
  if (act.includes('Crepuscular') || act.includes('晨昏')) return 'sunset';
  if (act.includes('Continuous') || act.includes('全天候')) return 'clock';
  return 'info';
};

// --- MOBILITY TAG HELPER ---
const getMobilityTag = (code) => {
  if (code.includes('+') || code.includes('Mix') || code.includes('Premix')) return { label: '复配 (多重机制)', color: 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200' };
  if (code.match(/(23|P07)/i)) return { label: '双向内吸', color: 'bg-cyan-100 text-cyan-800 border-cyan-200' };
  if (code.match(/(4A|4C|28|29|9B|30|FRAC 3|FRAC 1\b|FRAC 7\b|Antibiotic)/i)) return { label: '内吸性 (向上)', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
  if (code.match(/(IRAC 5|IRAC 6|FRAC 11|7C)/i)) return { label: '跨层传导', color: 'bg-indigo-100 text-indigo-800 border-indigo-200' };
  if (code.match(/(RRAC|Bait|Iron Phosphate|Tape)/i)) return { label: '诱饵 / 屏障', color: 'bg-orange-100 text-orange-800 border-orange-200' };
  if (code.match(/Physical/i)) return { label: '物理防治', color: 'bg-blue-100 text-blue-800 border-blue-200' };
  if (code.match(/Cultural/i)) return { label: '农业防治', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' };
  // Add UN and Chinese keywords (油, 皂, 印楝, 硫磺) to correctly tag as Contact/Surface
  if (code.match(/(3A|1B|2B|20B|22A|21A|12A|16|M01|M03|FRAC 20|FRAC 14|Oil|Soap|Neem|Bt|Sulfur|Biological|Molluscicide|Niclosamide|Bio|UN|油|皂|印楝|硫磺)/i)) return { label: '触杀 / 表面', color: 'bg-rose-100 text-rose-800 border-rose-200' };
  return { label: '其它方法', color: 'bg-slate-100 text-slate-700 border-slate-200' };
};

// --- 3-PHASE IPM PARSER ---
const getPhaseInfo = (phase, category) => {
  if (category === 'Fungi/Pathogens') {
      if (phase === 1) return { step: '阶段一', title: '快速灭除 (Eradicant)', desc: '爆发期。瞬间烧毁活跃的真菌病斑，阻止孢子扩散。', color: 'red' };
      if (phase === 2) return { step: '阶段二', title: '内吸防护 (Systemic)', desc: '巩固期。吸收到维管组织中，保护新梢免受内部感染蔓延。', color: 'amber' };
      if (phase === 3) return { step: '阶段三', title: '保护剂 (Protectant)', desc: '维护期。用接触性屏障或竞争性生物制剂覆盖叶面。', color: 'emerald' };
  }
  // Default Insects/Mites/Others
  if (phase === 1) return { step: '阶段一', title: '快速击倒', desc: '红色警报。快速消灭活跃成虫/虫群 (短 LT₅₀)。', color: 'red' };
  if (phase === 2) return { step: '阶段二', title: '阻断繁殖', desc: '橙色警报。打破生命周期，通过内吸剂或昆虫生长调节剂(IGR)锁定隐蔽的若虫/虫卵。', color: 'amber' };
  if (phase === 3) return { step: '阶段三', title: '预防屏障', desc: '绿色警报。低种群密度。保护益虫并建立生物屏障。', color: 'emerald' };
};

const categorizeMoa = (moaString, category) => {
  if (!moaString || moaString === 'N/A') return null;
  const items = moaString.split(' 🔄 ');
  const phases = { 1: [], 2: [], 3: [] };
  
  items.forEach(item => {
      // Add UN and Chinese keywords here to ensure they sort into Phase 3 (Preventative/Protectant)
      if (item.match(/(Bio|Oil|Soap|Neem|Bt|Sulfur|Physical|Cultural|Molluscicide|M01|M03|Bait|Wash|Sunlight|Brush|UN|油|皂|印楝|硫磺)/i)) {
          phases[3].push(item);
      } else if (category === 'Fungi/Pathogens') {
          if (item.match(/(FRAC 11|FRAC 3|Premix|P07|FRAC 21|FRAC 14|FRAC 20|FRAC 7)/i)) phases[1].push(item);
          else phases[2].push(item);
      } else {
          if (item.match(/(3A|1B|2B|5|6|22A|Premix|RRAC|Iron Phosphate)/i)) phases[1].push(item);
          else if (item.match(/(4A|4C|23|28|29|16|7C|9B|12A|21A|30|20B|Antibiotic)/i)) phases[2].push(item);
          else phases[1].push(item);
      }
  });

  // Fallbacks for better UI distribution if a phase is empty but we have multiple items
  if (phases[1].length === 0 && phases[2].length > 0) { phases[1].push(phases[2].shift()); }
  if (phases[2].length === 0 && phases[1].length > 1) { phases[2].push(phases[1].pop()); }
  if (phases[3].length === 0 && phases[2].length > 1) { phases[3].push(phases[2].pop()); }
  if (phases[3].length === 0 && phases[1].length > 1) { phases[3].push(phases[1].pop()); }
  
  return phases;
};

// --- SEVERITY DOTS COMPONENT ---
const SeverityDots = ({ rating }) => {
  return (
    <div className="flex items-center gap-1.5" title={`严重程度评分: ${rating} / 5`}>
      {[1, 2, 3, 4, 5].map((dot) => (
        <Icon 
          key={dot} 
          name="dot" 
          className={`w-4 h-4 transition-colors ${dot <= rating ? (rating >= 4 ? 'text-red-500 fill-red-500' : 'text-amber-500 fill-amber-500') : 'text-slate-200 fill-slate-200'}`} 
        />
      ))}
    </div>
  );
};

// --- VISUAL TRAPPING GUIDE COMPONENT ---
const TrappingGuide = () => (
  <div className="bg-white border-2 border-emerald-100 rounded-2xl p-6 mt-4 mb-4 shadow-md animate-in fade-in slide-in-from-top-4">
    <p className="text-lg text-slate-600 font-medium mb-6">
      视觉粘虫板利用了昼行性昆虫觅食或交配时自然被特定颜色频率吸引的原理。
    </p>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-12 bg-yellow-400 rounded-md border-2 border-yellow-600 shadow-sm flex-shrink-0"></div>
          <h4 className="font-bold text-xl text-slate-800">黄色粘虫板<br/><span className="text-sm text-slate-500 font-medium">(全能型)</span></h4>
        </div>
        <p className="text-lg font-medium text-slate-600 mb-4 leading-relaxed flex-1">
          模拟高氮嫩梢的反射光。最适合对付<strong>木虱、蚜虫、粉虱和果实蝇</strong>，大型黄板也能有效诱捕<strong>马蜂和虎头蜂</strong>等危险蜂类。
        </p>
        <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200 mt-auto">
          <strong className="text-yellow-800 block mb-2 uppercase tracking-wider text-xs">悬挂位置:</strong>
          <p className="text-yellow-900 font-bold text-base">与新梢高度齐平 (树冠外围)。捕蜂则挂于空旷通道。</p>
        </div>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-12 bg-blue-400 rounded-md border-2 border-blue-600 shadow-sm flex-shrink-0"></div>
          <h4 className="font-bold text-xl text-slate-800">蓝色粘虫板<br/><span className="text-sm text-slate-500 font-medium">(蓟马专杀)</span></h4>
        </div>
        <p className="text-lg font-medium text-slate-600 mb-4 leading-relaxed flex-1">
          蓟马对特定的蓝色波长高度敏感。最适合对付<strong>茶黄蓟马成虫</strong>。在开花期使用可防止果实留疤。
        </p>
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 mt-auto">
          <strong className="text-blue-800 block mb-2 uppercase tracking-wider text-xs">悬挂位置:</strong>
          <p className="text-blue-900 font-bold text-base">悬挂在树冠内部靠近花簇的位置。</p>
        </div>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-12 bg-slate-100 rounded-md border-2 border-slate-300 shadow-sm flex-shrink-0"></div>
          <h4 className="font-bold text-xl text-slate-800">白色粘虫板<br/><span className="text-sm text-slate-500 font-medium">(甲虫/蝽象)</span></h4>
        </div>
        <p className="text-lg font-medium text-slate-600 mb-4 leading-relaxed flex-1">
          吸引特定类型的植食性蝽象和小型甲虫。在榴莲园中较少使用，但对一般果园生物多样性监测很有用。
        </p>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mt-auto">
          <strong className="text-slate-800 block mb-2 uppercase tracking-wider text-xs">悬挂位置:</strong>
          <p className="text-slate-900 font-bold text-base">树干高度或树冠中部的树杈处。</p>
        </div>
      </div>
    </div>
    
    <div className="mt-6 p-4 bg-emerald-900 text-emerald-50 rounded-xl flex items-center gap-4 border border-emerald-950 shadow-inner">
      <Icon name="info" className="w-6 h-6 text-emerald-400 flex-shrink-0" />
      <span className="text-lg font-medium"><strong>专家提示：</strong>大规模诱捕（每棵树 5-10 张）可以在不使用化学药剂的情况下使害虫种群减少高达 40%。当板面覆盖率达到 50% 时请及时更换。</span>
    </div>
  </div>
);

// --- NOCTURNAL LIGHT TRAPPING GUIDE COMPONENT ---
const LightTrappingGuide = () => (
  <div className="bg-white border-2 border-amber-100 rounded-2xl p-6 mt-4 mb-4 shadow-md animate-in fade-in slide-in-from-top-4">
    <p className="text-lg text-slate-600 font-medium mb-6">
      根据最新的农艺学研究，<strong>太阳能杀虫灯</strong>利用特定的紫外线和多波长LED灯，利用夜行性破坏性害虫的正趋光性，在它们交配或产卵之前将其大量拦截。
    </p>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-amber-100 p-2 rounded-lg text-amber-600 shadow-sm flex-shrink-0"><Icon name="arrow-up" className="w-6 h-6"/></div>
          <h4 className="font-bold text-xl text-slate-800">高层树冠诱捕<br/><span className="text-sm text-slate-500 font-medium">(针对蛾类/蛀果蛾)</span></h4>
        </div>
        <p className="text-lg font-medium text-slate-600 mb-4 leading-relaxed flex-1">
          榴莲果蛀虫和皮蛀蛾通常在夜间飞行，并将卵直接产在幼果上。将杀虫灯悬挂在高处能够有效拦截这些在树冠间穿梭的成蛾。
        </p>
        <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 mt-auto">
          <strong className="text-amber-800 block mb-2 uppercase tracking-wider text-xs">部署策略:</strong>
          <p className="text-amber-900 font-bold text-base">离地 4-6 米高，挂在树冠外部空旷处。主要在结果期（开花后至果实膨大期）密集开启。</p>
        </div>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600 shadow-sm flex-shrink-0"><Icon name="arrow-down" className="w-6 h-6"/></div>
          <h4 className="font-bold text-xl text-slate-800">低层地面诱捕<br/><span className="text-sm text-slate-500 font-medium">(针对鳃金龟/甲虫)</span></h4>
        </div>
        <p className="text-lg font-medium text-slate-600 mb-4 leading-relaxed flex-1">
          鳃金龟等甲虫白天隐藏在土壤中，夜晚羽化飞出并疯狂啃食幼苗和下层叶片。低处光源能在它们向新梢飞升前将其诱杀。
        </p>
        <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 mt-auto">
          <strong className="text-indigo-800 block mb-2 uppercase tracking-wider text-xs">部署策略:</strong>
          <p className="text-indigo-900 font-bold text-base">离地 1-1.5 米高。特别是在长旱季结束后的第一场暴雨后（金龟子羽化高峰期）连续开启。</p>
        </div>
      </div>
    </div>
    
    <div className="mt-6 p-4 bg-amber-900 text-amber-50 rounded-xl flex items-center gap-4 border border-amber-950 shadow-inner">
      <Icon name="clock" className="w-6 h-6 text-amber-400 flex-shrink-0" />
      <span className="text-lg font-medium"><strong>时间控制提示：</strong>大多数破坏性夜行害虫在黄昏后 3-4 小时内最活跃。建议将杀虫灯定时设置为 <strong>晚上 7:30 至 午夜 12:00</strong>，这既能节省电池，又能避免误杀在下半夜/凌晨活动的夜行性授粉者（如长舌果蝠）。</span>
    </div>
  </div>
);

// --- TANK MIXING & SYNERGY GUIDE COMPONENT ---
const TankMixGuide = () => (
  <div className="bg-white border-2 border-violet-100 rounded-2xl p-6 mt-4 mb-4 shadow-md animate-in fade-in slide-in-from-top-4">
    <p className="text-lg text-slate-600 font-medium mb-8 leading-relaxed">
      不正确的农药混配会破坏有效成分、堵塞设备并烧伤树冠。请遵循专业的 <strong>WALES</strong> 投放顺序和农艺规则，以确保最大的药效和安全性。
    </p>

    <div className="space-y-8">
      {/* 1. PROFESSIONAL MIXING SEQUENCE (WALES) */}
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
        <h4 className="font-extrabold text-2xl text-slate-800 flex items-center gap-3 mb-6">
          <Icon name="list" className="w-8 h-8 text-violet-600" />
          专业 WALES 混配顺序
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-8">
          <div className="bg-white p-5 rounded-xl border-2 border-violet-100 flex flex-col items-center text-center shadow-sm relative group">
            <span className="text-4xl font-black text-violet-600 mb-2">W</span>
            <strong className="text-xs uppercase tracking-wider text-slate-800 mb-1 leading-tight">可湿性粉剂</strong>
            <p className="text-[10px] text-slate-500 font-bold uppercase">WP, WG, DF, SG</p>
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 hidden md:block text-slate-300">
              <Icon name="chevron-right" className="w-5 h-5" />
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border-2 border-violet-100 flex flex-col items-center text-center shadow-sm relative">
            <span className="text-4xl font-black text-violet-600 mb-2">A</span>
            <strong className="text-xs uppercase tracking-wider text-slate-800 mb-1 leading-tight">助剂 / 缓冲剂</strong>
            <p className="text-[10px] text-slate-500 font-bold uppercase">pH 水质调节剂</p>
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 hidden md:block text-slate-300">
              <Icon name="chevron-right" className="w-5 h-5" />
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border-2 border-violet-100 flex flex-col items-center text-center shadow-sm relative">
            <span className="text-4xl font-black text-violet-600 mb-2">L</span>
            <strong className="text-xs uppercase tracking-wider text-slate-800 mb-1 leading-tight">可溶剂 & 悬浮剂</strong>
            <p className="text-[10px] text-slate-500 font-bold uppercase">SL, SC, SE, CS</p>
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 hidden md:block text-slate-300">
              <Icon name="chevron-right" className="w-5 h-5" />
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border-2 border-violet-100 flex flex-col items-center text-center shadow-sm relative">
            <span className="text-4xl font-black text-violet-600 mb-2">E</span>
            <strong className="text-xs uppercase tracking-wider text-slate-800 mb-1 leading-tight">乳油</strong>
            <p className="text-[10px] text-slate-500 font-bold uppercase">EC, EW, ME, OD</p>
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 hidden md:block text-slate-300">
              <Icon name="chevron-right" className="w-5 h-5" />
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border-2 border-violet-100 flex flex-col items-center text-center shadow-sm relative">
            <span className="text-4xl font-black text-violet-600 mb-2">S</span>
            <strong className="text-xs uppercase tracking-wider text-slate-800 mb-1 leading-tight">表面活性剂</strong>
            <p className="text-[10px] text-slate-500 font-bold uppercase">展着剂，有机硅</p>
          </div>
        </div>

        {/* CRITICAL WARNING: TANK OVERLOAD */}
        <div className="bg-rose-900 text-white p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6 border-4 border-rose-950 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-10">
             <Icon name="alert" className="w-32 h-32" />
          </div>
          <div className="bg-rose-800 p-4 rounded-full flex-shrink-0 border-2 border-rose-700 shadow-lg z-10">
            <Icon name="alert" className="w-12 h-12 text-amber-400" />
          </div>
          <div className="text-center md:text-left z-10">
            <strong className="text-2xl font-black uppercase tracking-tight block mb-2 text-amber-300">⚠️ 严重警告：药桶超载原则</strong>
            <p className="text-lg font-bold leading-relaxed text-rose-50">
              绝对不要在同一个喷药桶中混合超过 <strong>3 种有效成分</strong>。
            </p>
            <p className="text-lg font-medium mt-3 opacity-95 leading-relaxed">
              混合过多种类的化学物质会造成"鸡尾酒灾难"。您将面临<strong>药害 (Phytotoxicity)</strong>(烧毁整个树冠)或<strong>化学中和</strong>的风险。如果化学物质相互抵消，您等于<strong>白白浪费了 40-60% 的成本</strong>，同时可能用未溶解的污泥堵塞喷嘴。
            </p>
          </div>
        </div>
      </div>

      {/* pH Section */}
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
        <h4 className="font-bold text-xl text-slate-800 flex items-center gap-3 mb-4">
          <Icon name="droplets" className="w-6 h-6 text-blue-500" />
          黄金 pH 法则 (碱性水解)
        </h4>
        <p className="text-slate-600 mb-4 leading-relaxed">
          如果您的农场水源呈强碱性 (pH 7.5+)，它会在20分钟内将喷雾桶内的现代农药(如拟除虫菊酯)彻底分解失效。请始终先测试并缓冲您的水质！
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
             <strong className="text-blue-800 block mb-1">标准化学药剂：</strong>
             <span className="text-blue-900 font-bold text-lg">目标 pH值 5.5 - 6.5</span>
             <p className="text-lg font-medium text-blue-700 mt-2">在加入农药*之前*，先在水中使用缓冲剂/调节剂。</p>
           </div>
           <div className="bg-rose-50 p-4 rounded-xl border border-rose-200">
             <strong className="text-rose-800 block mb-1">⚠️ 铜制剂例外规则：</strong>
             <span className="text-rose-900 font-bold text-lg">目标 pH值 7.0+ (中性至微碱)</span>
             <p className="text-lg font-medium text-rose-700 mt-2">绝对不要将铜制剂放入酸性水中。它会迅速溶解出铜离子并严重烧毁您的树冠！</p>
           </div>
        </div>
      </div>

      {/* Synergy Section */}
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
        <h4 className="font-bold text-xl text-slate-800 flex items-center gap-3 mb-4">
          <Icon name="beaker" className="w-6 h-6 text-violet-500" />
          经证实的协同增效配方 (1 + 1 = 3)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-violet-50 p-4 rounded-xl border border-violet-200">
             <strong className="text-violet-900 block mb-1 text-sm uppercase tracking-wider">抗性酶阻断剂</strong>
             <p className="font-bold text-violet-950 mb-2">PBO (增效醚) + 拟除虫菊酯 (IRAC 3A)</p>
             <p className="text-lg font-medium text-violet-800 leading-relaxed">昆虫利用体内酶来分解毒素存活。PBO能关闭这种酶，使拟除虫菊酯对付高抗性蛀虫的致死率提高近10倍。</p>
          </div>
          <div className="bg-fuchsia-50 p-4 rounded-xl border border-fuchsia-200">
             <strong className="text-fuchsia-900 block mb-1 text-sm uppercase tracking-wider">能量与护盾粉碎机</strong>
             <p className="font-bold text-fuchsia-950 mb-2">FRAC 11 + FRAC 3</p>
             <p className="text-lg font-medium text-fuchsia-800 leading-relaxed">嘧菌酯(阻断真菌呼吸) 混合 苯醚甲环唑(阻止细胞壁构建)。对抗炭疽病的终极组合。</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200">
             <strong className="text-indigo-900 block mb-1 text-sm uppercase tracking-wider">"驱赶与击杀" 战术</strong>
             <p className="font-bold text-indigo-950 mb-2">IRAC 3A + IRAC 4A</p>
             <p className="text-lg font-medium text-indigo-800 leading-relaxed">拟除虫菊酯具有刺激性，能将隐藏在叶缝里的害虫驱赶出来，迫使它们接触到早已喷洒的新烟碱内吸层。爆发期的完美对策。</p>
          </div>
          <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
             <strong className="text-amber-900 block mb-1 text-sm uppercase tracking-wider">物理装甲突破</strong>
             <p className="font-bold text-amber-950 mb-2">矿物油/白油 + IRAC 23</p>
             <p className="text-lg font-medium text-amber-800 leading-relaxed">油剂充当物理溶剂，融化盾介壳虫的蜡质盔甲，并将螺虫乙酯系统性地直接吸入昆虫体内。</p>
          </div>
        </div>
      </div>

      {/* Chemical Antagonism & Timing Section */}
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
        <h4 className="font-bold text-xl text-slate-800 flex items-center gap-3 mb-4">
          <Icon name="x" className="w-6 h-6 text-red-500" />
          危险的混合与时机忌讳 (铜制剂法则)
        </h4>
        <div className="space-y-4">
          <div className="bg-red-50 p-5 rounded-xl border-2 border-red-200 flex flex-col md:flex-row gap-4 items-start shadow-inner">
            <div className="bg-red-100 p-2.5 rounded-full flex-shrink-0 mt-1">
              <Icon name="alert" className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <strong className="text-red-900 block mb-1 text-lg uppercase tracking-wider">铜制剂 "独行侠" 法则</strong>
              <p className="font-bold text-red-950 mb-2">铜制剂 (FRAC M01) + 合成有机物 (例如：戊菌隆)</p>
              <p className="text-lg text-red-800 leading-relaxed font-medium">
                绝不要将重金属杀菌剂(氧氯化铜 / 氢氧化铜)与合成有机化学品混合。高反应活性的铜离子会与有机分子结合，导致它们分离并作为白垩状污泥沉到桶底(絮凝现象)。这会破坏化学物质的药效并严重烧伤树木。<strong>铜制剂必须始终单独喷洒！</strong>
              </p>
            </div>
          </div>

          <div className="bg-amber-50 p-5 rounded-xl border-2 border-amber-200 flex flex-col md:flex-row gap-4 items-start shadow-inner">
            <div className="bg-amber-100 p-2.5 rounded-full flex-shrink-0 mt-1">
              <Icon name="alert" className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <strong className="text-amber-900 block mb-1 text-lg uppercase tracking-wider">"零铜制剂" 窗口期 (花期)</strong>
              <p className="font-bold text-amber-950 mb-2">在火柴头期或盛花期施用铜制剂</p>
              <p className="text-lg text-amber-800 leading-relaxed font-medium">
                <strong>绝对不要在开花期间喷洒铜制剂！</strong>高活性的铜离子会立即烧伤娇嫩的柱头并使花粉干瘪，导致大规模的花朵败育/落花。此外，金属残留物会驱离重要的夜间授粉者（如洞穴果蝠），并且对授粉昆虫的肠道生物群具有高度毒性。在此阶段请完全改用软性生物制剂（如 <em>枯草芽孢杆菌</em>）。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* LT50 Section */}
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
        <h4 className="font-bold text-xl text-slate-800 flex items-center gap-3 mb-4">
          <Icon name="target" className="w-6 h-6 text-rose-500" />
          理解 LT₅₀ (致死时间) 与击倒速度
        </h4>
        <p className="text-slate-600 mb-4 leading-relaxed">
          虽然 DT₅₀ 衡量的是环境寿命，但 <strong>LT₅₀</strong> 衡量的是昆虫实际死亡的速度。农艺师将快和慢 LT₅₀ 的化学品混合以创造终极防御：
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
             <strong className="text-rose-800 block mb-1 text-sm uppercase tracking-wider">短 LT₅₀ (快速击倒)</strong>
             <p className="font-bold text-rose-950 mb-1">触杀剂 (例如：拟除虫菊酯)</p>
             <p className="text-lg font-medium text-slate-600 leading-relaxed">几分钟内致死。害虫在物理接触后会立刻从树冠上掉落。</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
             <strong className="text-indigo-800 block mb-1 text-sm uppercase tracking-wider">长 LT₅₀ (内吸/调节)</strong>
             <p className="font-bold text-indigo-950 mb-1">IGR & 内吸剂 (如：螺虫乙酯)</p>
             <p className="text-lg font-medium text-slate-600 leading-relaxed">需要 3-7 天。害虫会立刻停止取食，但会像无害的"行尸走肉"一样停留在叶片上。</p>
          </div>
          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 shadow-sm">
             <strong className="text-emerald-800 block mb-1 text-sm uppercase tracking-wider">完美的混配</strong>
             <p className="font-bold text-emerald-950 mb-1">快 + 慢 (驱赶与击杀)</p>
             <p className="text-lg font-medium text-emerald-900 leading-relaxed">快速的化学成分击倒当前的成虫群，而缓慢的内吸成分则保护几天后孵化出的新若虫。</p>
          </div>
        </div>
      </div>

      {/* Chemical Mobility Section */}
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
        <h4 className="font-bold text-xl text-slate-800 flex items-center gap-3 mb-4">
          <Icon name="activity" className="w-6 h-6 text-fuchsia-500" />
          化学传导性：毒素是如何移动的
        </h4>
        <p className="text-slate-600 mb-4 leading-relaxed">
          作用机制(MoA)决定了生物死亡的方式，但 <strong>传导性</strong> 决定了您必须*如何*喷洒树木才能触及害虫：
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
             <strong className="text-fuchsia-800 block mb-1 text-sm uppercase tracking-wider flex items-center gap-1.5"><Icon name="shield" className="w-4 h-4"/> 触杀/表面保护</strong>
             <p className="font-bold text-fuchsia-950 mb-1">例如：IRAC 3A, FRAC M01</p>
             <p className="text-lg font-medium text-slate-600 leading-relaxed">落在哪里就停留在哪里。会被雨水冲刷掉。您必须物理上击中昆虫或完全覆盖叶片表面。</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
             <strong className="text-indigo-800 block mb-1 text-sm uppercase tracking-wider flex items-center gap-1.5"><Icon name="leaf" className="w-4 h-4"/> 跨层传导</strong>
             <p className="font-bold text-indigo-950 mb-1">例如：IRAC 6, FRAC 11</p>
             <p className="text-lg font-medium text-slate-600 leading-relaxed">被叶片吸收，但不会在树液中流动。喷洒树冠顶部，它能杀死隐藏在叶背的害虫(如螨虫/粉虱)。</p>
          </div>
          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 shadow-sm">
             <strong className="text-emerald-800 block mb-1 text-sm uppercase tracking-wider flex items-center gap-1.5"><Icon name="arrow-up" className="w-4 h-4"/> 向上内吸 (木质部)</strong>
             <p className="font-bold text-emerald-950 mb-1">例如：IRAC 4A, FRAC 3</p>
             <p className="text-lg font-medium text-emerald-900 leading-relaxed"><strong>只能向上传导。</strong>顺着植物的导水管向上流。非常适合顶部树冠的嫩梢，但如果喷在叶片上对根部害虫毫无用处。</p>
          </div>
          <div className="bg-cyan-50 p-4 rounded-xl border border-cyan-200 shadow-sm">
             <strong className="text-cyan-800 block mb-1 text-sm uppercase tracking-wider flex items-center gap-1.5"><Icon name="droplets" className="w-4 h-4"/> 双向内吸 (韧皮部)</strong>
             <p className="font-bold text-cyan-950 mb-1">例如：IRAC 23, FRAC P07</p>
             <p className="text-lg font-medium text-cyan-900 leading-relaxed"><strong>双向流动。</strong>高度工程化的药物。可以顺着食物导管向下移动到根部和隐藏的树皮裂缝中。对于深藏的害虫必不可少。</p>
          </div>
        </div>
      </div>

      {/* DT50 & MRL Section */}
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
        <h4 className="font-bold text-xl text-slate-800 flex items-center gap-3 mb-4">
          <Icon name="clock" className="w-6 h-6 text-teal-500" />
          延长半衰期 (DT₅₀) 与 农药助剂
        </h4>
        <p className="text-slate-600 mb-4 leading-relaxed">
          热带的阳光和雨水会使化学物质迅速降解。您可以通过与特定的农药助剂桶混来延长喷洒液的活性寿命：
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
             <strong className="text-teal-800 block mb-1 text-sm uppercase tracking-wider">紫外线屏障</strong>
             <p className="font-bold text-teal-950 mb-1">抗紫外线助剂</p>
             <p className="text-lg font-medium text-slate-600 leading-relaxed">防止阳光破坏对紫外线敏感的化学物质，如阿维菌素和Bt菌。</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
             <strong className="text-cyan-800 block mb-1 text-sm uppercase tracking-wider">防雨锁</strong>
             <p className="font-bold text-cyan-950 mb-1">合成展着剂</p>
             <p className="text-lg font-medium text-slate-600 leading-relaxed">在叶片上形成一层防水的聚合物薄膜，防止季风暴雨的冲刷。</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
             <strong className="text-emerald-800 block mb-1 text-sm uppercase tracking-wider">防蒸发护盾</strong>
             <p className="font-bold text-emerald-950 mb-1">矿物油/园艺油</p>
             <p className="text-lg font-medium text-slate-600 leading-relaxed">包裹化学液滴以减缓蒸发速度，给内吸性液体更多的时间被叶片吸收。</p>
          </div>
        </div>
        
        {/* MRL WARNING CAUTION BOX */}
        <div className="bg-rose-50 p-5 rounded-xl border-2 border-rose-200 flex flex-col md:flex-row gap-4 items-start shadow-inner">
          <div className="bg-rose-100 p-2.5 rounded-full flex-shrink-0">
            <Icon name="alert" className="w-8 h-8 text-rose-600" />
          </div>
          <div>
            <strong className="text-rose-900 block mb-2 text-lg uppercase tracking-wider">⚠️ 严重警告：农残超标 (MRL) 陷阱</strong>
            <p className="text-lg text-rose-800 leading-relaxed font-medium">
              在<strong>果实成熟期</strong>，<strong>绝对不要</strong>使用能延长 DT₅₀ 的助剂(展着剂/抗紫剂)！在接近采收时人为延长化学品的寿命，注定会导致您的果实在海关出口的 <strong>MRL (最大农药残留限量)</strong> 检测中失败。请在采收前至少 30-45 天停止使用这些助剂，让农药自然降解。
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- BIOLOGICAL WARFARE GUIDE COMPONENT ---
const BioControlGuide = () => (
  <div className="bg-white border-2 border-lime-100 rounded-2xl p-6 mt-4 mb-4 shadow-md animate-in fade-in slide-in-from-top-4">
    <p className="text-lg text-slate-600 font-medium mb-6">
      使用如 <strong>贝莱斯芽孢杆菌 (B. velezensis)</strong> 和 <strong>解淀粉芽孢杆菌 (B. amyloliquefaciens)</strong> 等有益细菌是抵御侵略性真菌枯萎病 (如<em>丝核菌</em>) 最有效的反制手段之一。以下是它们赢得微观战争的原理：
    </p>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-rose-100 p-2 rounded-lg text-rose-600 shadow-sm flex-shrink-0"><Icon name="shield" className="w-6 h-6"/></div>
          <h4 className="font-bold text-xl text-slate-800">脂肽类生物战</h4>
        </div>
        <p className="text-lg font-medium text-slate-600 mb-4 leading-relaxed flex-1">
          这些细菌能合成强大的天然抗真菌化合物(伊枯草菌素、表面活性素、丰原素)，这些物质能直接撕裂真菌脂质细胞膜上的孔洞，导致真菌细胞瞬间泄漏死亡。
        </p>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-sky-100 p-2 rounded-lg text-sky-600 shadow-sm flex-shrink-0"><Icon name="target" className="w-6 h-6"/></div>
          <h4 className="font-bold text-xl text-slate-800">竞争性排斥</h4>
        </div>
        <p className="text-lg font-medium text-slate-600 mb-4 leading-relaxed flex-1">
          枯萎病不通过孢子传播，而是通过物理网状生长来蔓延。<em>芽孢杆菌</em>类微生物是超级活跃的定殖者，它们在物理上覆盖了叶片表面，剥夺了病原真菌的生存空间和营养。
        </p>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-lime-100 p-2 rounded-lg text-lime-600 shadow-sm flex-shrink-0"><Icon name="activity" className="w-6 h-6"/></div>
          <h4 className="font-bold text-xl text-slate-800">诱导系统抗性 (ISR)</h4>
        </div>
        <p className="text-lg font-medium text-slate-600 mb-4 leading-relaxed flex-1">
          就像为树木注射疫苗一样。当细菌在植物上定殖时，它们会向植物组织发送化学信号，触发植物自身的免疫系统，从而自然地硬化植物细胞壁以抵御未来的攻击。
        </p>
      </div>
    </div>
    
    <div className="mt-6 p-4 bg-lime-50 text-lime-900 rounded-xl flex items-center gap-4 border border-lime-200 shadow-inner">
      <Icon name="info" className="w-8 h-8 text-lime-600 flex-shrink-0" />
      <span className="text-lg font-medium"><strong>爆发期专业提示：</strong>由于叶枯病在潮湿条件下的传播速度极快，生物制剂在<strong>预防</strong>方面效果最好。对于活跃的爆发期，先使用合成药物(如戊菌隆或噻呋酰胺)快速击倒病菌，一周后再喷施芽孢杆菌以保护新生枝叶并防止复发。</span>
    </div>
  </div>
);

// --- THE BIG 15 MICROBES GUIDE COMPONENT ---
const MicrobeGuide = () => (
  <div className="bg-white border-2 border-teal-100 rounded-2xl p-6 mt-4 mb-4 shadow-md animate-in fade-in slide-in-from-top-4">
    <p className="text-lg text-slate-600 font-medium mb-6">
      <strong>益生菌农艺学</strong>使用活的微生物作为生物武器和土壤合成器。通过将这 15 种精英微生物引入您的轮作计划，您可以在果园中建立一个自我维持的有机防御网：
    </p>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col hover:border-teal-300 transition-colors shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-teal-100 p-2.5 rounded-lg text-teal-600 shadow-sm"><Icon name="bug" className="w-6 h-6"/></div>
          <h4 className="font-bold text-xl text-slate-800 leading-tight">球孢白僵菌</h4>
        </div>
        <p className="text-sm font-extrabold text-teal-800 mb-3 uppercase tracking-wider">白色木乃伊刺客</p>
        <p className="text-slate-700 text-lg leading-relaxed font-medium">一种接触杀虫真菌，能够穿透昆虫外骨骼并吸干其养分，将它们变成毛茸茸的白色木乃伊。最好与轻质园艺油混合使用。<br/><br/><strong className="text-slate-900">目标靶点：</strong>粉蚧，蚧壳虫，露尾甲，蛀虫。</p>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col hover:border-emerald-300 transition-colors shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-emerald-100 p-2.5 rounded-lg text-emerald-600 shadow-sm"><Icon name="target" className="w-6 h-6"/></div>
          <h4 className="font-bold text-xl text-slate-800 leading-tight">绿僵菌</h4>
        </div>
        <p className="text-sm font-extrabold text-emerald-800 mb-3 uppercase tracking-wider">绿色地下刺客</p>
        <p className="text-slate-700 text-lg leading-relaxed font-medium">一种栖息在土壤中的杀手真菌，专门感染并消耗硬壳甲虫和地下蛴螬，在死去的宿主身上留下坚硬的绿色硬壳。<br/><br/><strong className="text-slate-900">目标靶点：</strong>犀角金龟，鳃金龟蛴螬，白蚁。</p>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col hover:border-violet-300 transition-colors shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-violet-100 p-2.5 rounded-lg text-violet-600 shadow-sm"><Icon name="activity" className="w-6 h-6"/></div>
          <h4 className="font-bold text-xl text-slate-800 leading-tight">莱氏绿僵菌 (莱氏野村菌)</h4>
        </div>
        <p className="text-sm font-extrabold text-violet-800 mb-3 uppercase tracking-wider">毛虫潜行者</p>
        <p className="text-slate-700 text-lg leading-relaxed font-medium">一接触就会将毛虫变成僵硬的木乃伊雕像，表面覆盖着淡绿色的孢子。对付高度活跃的食叶和蛀果毛虫效果极佳。<br/><br/><strong className="text-slate-900">目标靶点：</strong>蛀果蛾，蓑蛾，卷叶蛾。</p>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col hover:border-sky-300 transition-colors shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-sky-100 p-2.5 rounded-lg text-sky-600 shadow-sm"><Icon name="leaf" className="w-6 h-6"/></div>
          <h4 className="font-bold text-xl text-slate-800 leading-tight">蜡蚧轮枝菌</h4>
        </div>
        <p className="text-sm font-extrabold text-sky-800 mb-3 uppercase tracking-wider">吸汁害虫溶解剂</p>
        <p className="text-slate-700 text-lg leading-relaxed font-medium">在高湿度的树冠中茁壮成长，能直接溶解软体吸汁昆虫的角质层。独特之处在于，它能主动消化蜜露，瞬间治愈煤烟病。<br/><br/><strong className="text-slate-900">目标靶点：</strong>蚜虫，粉虱，木虱。</p>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col hover:border-yellow-400 transition-colors shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-yellow-100 p-2.5 rounded-lg text-yellow-600 shadow-sm"><Icon name="sun" className="w-6 h-6"/></div>
          <h4 className="font-bold text-xl text-slate-800 leading-tight">玫烟色棒束孢 (球孢白僵菌亚种)</h4>
        </div>
        <p className="text-sm font-extrabold text-yellow-800 mb-3 uppercase tracking-wider">树冠清道夫</p>
        <p className="text-slate-700 text-lg leading-relaxed font-medium">与其他真菌相比，对温度波动和阳光照射的适应力极强。非常适合对付高层树冠的害虫，用粉灰色的绒毛覆盖它们。<br/><br/><strong className="text-slate-900">目标靶点：</strong>茶黄蓟马，粉虱，蚜虫。</p>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col hover:border-pink-300 transition-colors shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-pink-100 p-2.5 rounded-lg text-pink-600 shadow-sm"><Icon name="target" className="w-6 h-6"/></div>
          <h4 className="font-bold text-xl text-slate-800 leading-tight">汤普森被毛孢</h4>
        </div>
        <p className="text-sm font-extrabold text-pink-800 mb-3 uppercase tracking-wider">红蜘蛛毁灭者</p>
        <p className="text-slate-700 text-lg leading-relaxed font-medium">高度专业化的蜘蛛螨类猎手。穿透螨虫角质层并产生致瘫毒素。能够在地势较低的螨虫群落中引发大规模的“真菌瘟疫”。<br/><br/><strong className="text-slate-900">目标靶点：</strong>红蜘蛛，茶黄螨，瘿螨。</p>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col hover:border-amber-300 transition-colors shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-amber-100 p-2.5 rounded-lg text-amber-600 shadow-sm"><Icon name="shield" className="w-6 h-6"/></div>
          <h4 className="font-bold text-xl text-slate-800 leading-tight">枯草芽孢杆菌</h4>
        </div>
        <p className="text-sm font-extrabold text-amber-800 mb-3 uppercase tracking-wider">韧性防护盾</p>
        <p className="text-slate-700 text-lg leading-relaxed font-medium">一种坚韧、能形成芽孢的细菌，对紫外线高度耐受。产生强大的天然抗生素(伊枯草菌素)来抑制广谱的叶片病害。也能作为强大的生物过滤器，利用EPS中和土壤中有毒的重金属。<br/><br/><strong className="text-slate-900">目标靶点：</strong>炭疽病，霉病，叶斑病，铜中毒。</p>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col hover:border-indigo-300 transition-colors shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-indigo-100 p-2.5 rounded-lg text-indigo-600 shadow-sm"><Icon name="droplets" className="w-6 h-6"/></div>
          <h4 className="font-bold text-xl text-slate-800 leading-tight">荧光假单胞菌</h4>
        </div>
        <p className="text-sm font-extrabold text-indigo-800 mb-3 uppercase tracking-wider">铁元素掠夺者</p>
        <p className="text-slate-700 text-lg leading-relaxed font-medium">一种具有强侵略性的根系/土壤细菌。它利用铁载体在土壤中与致病真菌激烈争夺铁元素，将病原菌"饿死"，同时增强树木的免疫力。<br/><br/><strong className="text-slate-900">目标靶点：</strong>疫霉病，腐霉根腐病。</p>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col hover:border-rose-300 transition-colors shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-rose-100 p-2.5 rounded-lg text-rose-600 shadow-sm"><Icon name="activity" className="w-6 h-6"/></div>
          <h4 className="font-bold text-xl text-slate-800 leading-tight">链霉菌属</h4>
        </div>
        <p className="text-sm font-extrabold text-rose-800 mb-3 uppercase tracking-wider">天然生物抗生素</p>
        <p className="text-slate-700 text-lg leading-relaxed font-medium">以生产天然抗生素而闻名的土壤细菌。它们分泌挥发性有机化合物，能够直接溶解极具侵略性的木材腐烂菌的细胞壁。<br/><br/><strong className="text-slate-900">目标靶点：</strong>枝枯病，长喙壳菌(猝萎病)，白根病。</p>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col hover:border-fuchsia-300 transition-colors shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-fuchsia-100 p-2.5 rounded-lg text-fuchsia-600 shadow-sm"><Icon name="x" className="w-6 h-6"/></div>
          <h4 className="font-bold text-xl text-slate-800 leading-tight">淡紫拟青霉</h4>
        </div>
        <p className="text-sm font-extrabold text-fuchsia-800 mb-3 uppercase tracking-wider">线虫猎手</p>
        <p className="text-slate-700 text-lg leading-relaxed font-medium">一种高度专业化、主动猎杀线虫的真菌。它的孢子会寄生线虫的卵和雌性成虫，将其溶解并彻底打破线虫的世代繁殖周期。<br/><br/><strong className="text-slate-900">目标靶点：</strong>根结线虫，根腐线虫。</p>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col hover:border-orange-300 transition-colors shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-orange-100 p-2.5 rounded-lg text-orange-600 shadow-sm"><Icon name="calculator" className="w-6 h-6"/></div>
          <h4 className="font-bold text-xl text-slate-800 leading-tight">拜氏青霉菌</h4>
        </div>
        <p className="text-sm font-extrabold text-orange-800 mb-3 uppercase tracking-wider">解磷钥匙</p>
        <p className="text-slate-700 text-lg leading-relaxed font-medium">一种有益的根部真菌，分泌有机酸来溶解土壤中被锁定的磷元素。能大规模促进根系质量增长，直接预防因营养胁迫诱发的根腐病。<br/><br/><strong className="text-slate-900">目标靶点：</strong>根系受压，营养锁定现象。</p>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col hover:border-lime-300 transition-colors shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-lime-100 p-2.5 rounded-lg text-lime-600 shadow-sm"><Icon name="activity" className="w-6 h-6"/></div>
          <h4 className="font-bold text-xl text-slate-800 leading-tight">哈茨木霉</h4>
        </div>
        <p className="text-sm font-extrabold text-lime-800 mb-3 uppercase tracking-wider">真菌寄生客</p>
        <p className="text-slate-700 text-lg leading-relaxed font-medium">一种极具攻击性的有益真菌，实行重寄生行为(寄生于真菌)。它真的会追踪致病真菌，盘绕在它们身上，并分泌酶来溶解和吃掉敌方的细胞壁。<br/><br/><strong className="text-slate-900">目标靶点：</strong>疫霉病，腐霉病，丝核菌。</p>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col hover:border-cyan-300 transition-colors shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-cyan-100 p-2.5 rounded-lg text-cyan-600 shadow-sm"><Icon name="shield" className="w-6 h-6"/></div>
          <h4 className="font-bold text-xl text-slate-800 leading-tight">贝莱斯芽孢杆菌</h4>
        </div>
        <p className="text-sm font-extrabold text-cyan-800 mb-3 uppercase tracking-wider">脂肽类战士</p>
        <p className="text-slate-700 text-lg leading-relaxed font-medium">能合成强大的天然抗真菌化合物（伊枯草菌素、表面活性素），能瞬间在致病真菌的脂质膜上撕开孔洞，导致侵略性枯萎病菌迅速细胞死亡。<br/><br/><strong className="text-slate-900">目标靶点：</strong>丝核菌叶枯病，各种病原真菌。</p>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col hover:border-fuchsia-300 transition-colors shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-fuchsia-100 p-2.5 rounded-lg text-fuchsia-600 shadow-sm"><Icon name="target" className="w-6 h-6"/></div>
          <h4 className="font-bold text-xl text-slate-800 leading-tight">解淀粉芽孢杆菌</h4>
        </div>
        <p className="text-sm font-extrabold text-fuchsia-800 mb-3 uppercase tracking-wider">空间竞争霸主</p>
        <p className="text-slate-700 text-lg leading-relaxed font-medium">与贝莱斯芽孢杆菌发挥完美的协同作用。它是一个超级活跃的定殖者，迅速覆盖叶片表面，剥夺入侵叶枯病菌丝的生长空间和营养。<br/><br/><strong className="text-slate-900">目标靶点：</strong>丝核菌，细菌性叶斑病。</p>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col hover:border-blue-300 transition-colors shadow-sm lg:col-span-1">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-blue-100 p-2.5 rounded-lg text-blue-600 shadow-sm"><Icon name="rain" className="w-6 h-6"/></div>
          <h4 className="font-bold text-xl text-slate-800 leading-tight">EM菌 (有效微生物群)</h4>
        </div>
        <p className="text-sm font-extrabold text-blue-800 mb-3 uppercase tracking-wider">土壤生态合成器</p>
        <p className="text-slate-700 text-lg leading-relaxed font-medium">由乳酸菌、酵母菌和光合细菌组成的联合体。能极快地将死去的覆盖物发酵转化为营养，并强势排挤会造成腐烂的厌氧环境。<br/><br/><strong className="text-slate-900">目标靶点：</strong>土壤毒性(重金属累积)，病虫害繁殖地。</p>
      </div>
    </div>

    {/* HEAVY METAL DETOXIFICATION INFO BOX */}
    <div className="mt-8 p-6 bg-emerald-950 text-emerald-50 rounded-2xl flex flex-col md:flex-row items-start md:items-center gap-5 border-2 border-emerald-800 shadow-lg">
      <div className="bg-emerald-900 p-4 rounded-full flex-shrink-0 border border-emerald-700 shadow-inner">
        <Icon name="shield" className="w-8 h-8 text-emerald-400" />
      </div>
      <div>
        <strong className="text-emerald-300 block mb-2 text-lg uppercase tracking-widest font-black">隐藏优势：重金属解毒 (生物修复)</strong>
        <p className="text-lg font-medium leading-relaxed text-emerald-100/90">
          几十年长期使用化肥和<strong className="text-white">铜制剂杀菌剂</strong> (FRAC M01) 会导致土壤中积累有毒重金属，最终毒害树木的吸收根（铜中毒）。诸如 <strong>枯草芽孢杆菌</strong>、<strong>假单胞菌</strong>、<strong>木霉菌</strong>和<strong>EM菌</strong>等微生物充当着天然的生物过滤器。它们分泌生物表面活性剂、EPS（粘性聚合物）和酶类，这些物质在土壤中主动绑定、中和并锁定多余的重金属，从而将根系从化学烧伤中拯救出来。
        </p>
      </div>
    </div>
  </div>
);

// --- DT50 LIFESPAN REFERENCE GUIDE COMPONENT ---
const DT50Guide = () => {
  const getFoliarColor = (val) => {
    if (val.includes('Infinite') || val.includes('永久')) return 'bg-red-100 text-red-800 border-red-200';
    if (val.includes('Weeks') || val.includes('Variable') || val.includes('数周') || val.includes('多变')) return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    if (val === 'N/A' || val === '无') return 'bg-slate-100 text-slate-500 border-slate-200';
    const num = parseFloat(val.match(/\d+(\.\d+)?/)?.[0] || 0);
    if (val.includes('<') && num <= 1) return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    if (num <= 3) return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    if (num <= 7) return 'bg-amber-100 text-amber-800 border-amber-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  const getSoilColor = (val) => {
    if (val.includes('Infinite') || val.includes('100 -') || val.includes('永久')) return 'bg-red-100 text-red-800 border-red-200';
    if (val.includes('Indefinite') || val.includes('Variable') || val.includes('Weeks') || val.includes('无限期') || val.includes('数周') || val.includes('多变')) return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    const num = parseFloat(val.match(/\d+(\.\d+)?/)?.[0] || 0);
    if (val.includes('<') && num <= 1) return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    if (num <= 30) return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    if (num <= 70) return 'bg-amber-100 text-amber-800 border-amber-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  const translateLifespan = (text) => {
    return text.replace('Days', '天').replace('Day', '天')
               .replace('Infinite', '永久').replace('Weeks/Months', '数周/数月')
               .replace('Weeks', '数周').replace('Variable', '多变')
               .replace('Indefinite', '无限期').replace('N/A', '无');
  };

  return (
    <div className="bg-white border-2 border-slate-200 rounded-2xl p-0 mt-4 mb-4 shadow-md animate-in fade-in slide-in-from-top-4 overflow-hidden">
      
      {/* Intro Header */}
      <div className="bg-sky-50 p-6 border-b border-sky-100">
        <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3 mb-3">
          <Icon name="clock" className="w-7 h-7 text-sky-600" />
          农药环境半衰期 (DT₅₀) 数据库
        </h3>
        <p className="text-lg text-slate-700 font-medium leading-relaxed">
          <strong>DT₅₀ (降解50%所需时间)</strong> 是指活性成分分解一半所需要的时间。
          <br/><strong className="text-sky-700">叶面 DT₅₀ (光解):</strong> 在紫外线阳光照射下留在叶片上的寿命。决定了采收安全性和 MRL (最大残留限量)。
          <br/><strong className="text-amber-700">土壤 DT₅₀:</strong> 在地下的寿命。高度持久的化学物质 (大于100天) 会造成累积并破坏土壤生态。
        </p>
      </div>

      {/* MRL Warning Box */}
      <div className="bg-rose-50 p-5 border-b-2 border-rose-200 flex flex-col md:flex-row gap-4 items-start shadow-inner">
        <div className="bg-rose-100 p-2.5 rounded-full flex-shrink-0 mt-1">
          <Icon name="alert" className="w-6 h-6 text-rose-600" />
        </div>
        <div>
          <strong className="text-rose-900 block mb-1 text-lg uppercase tracking-wider">农艺师专业提示：农残 (MRL) 与出口限制</strong>
          <p className="text-lg text-rose-800 leading-relaxed font-medium">
            如果您要出口榴莲，任何<strong>叶面 DT₅₀ 大于 7 天</strong>的化学药剂（例如氯虫苯甲酰胺、嘧菌酯），必须在<strong>采收前至少 30 到 45 天</strong>完全从您的喷洒计划中剔除。在最后的果实成熟阶段，请坚持使用快速降解的化学品（叶面 DT₅₀ 小于 3 天）或纯生物制剂，以确保顺利通过海关的农药残留检测。
          </p>
        </div>
      </div>

      {/* Data Table Container */}
      <div className="p-0 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[650px]">
          <thead>
            <tr className="bg-slate-100 border-b-2 border-slate-200 text-slate-600 text-[11px] uppercase tracking-wider">
              <th className="px-3 py-2.5 font-bold w-1/5">有效成分 (活性物质)</th>
              <th className="px-2 py-2.5 font-bold text-center w-24">作用机制(MoA)</th>
              <th className="px-2 py-2.5 font-bold text-center w-28">叶面 DT₅₀ (紫外线)</th>
              <th className="px-2 py-2.5 font-bold text-center w-28">土壤 DT₅₀</th>
              <th className="px-3 py-2.5 font-bold">农艺备注</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {['Insecticide', 'Fungicide', 'Bio/Other'].map(type => (
              <React.Fragment key={type}>
                <tr className="bg-slate-50 border-y border-slate-200">
                  <td colSpan="5" className="px-3 py-2 font-black text-slate-800 text-xs uppercase tracking-wider">
                    {type === 'Insecticide' ? '杀虫剂与杀螨剂' : type === 'Fungicide' ? '杀菌剂' : '植物源、生物制剂与杀软体动物剂'}
                  </td>
                </tr>
                {DT50_DATABASE.filter(item => item.type === type).map((chem, idx) => (
                  <tr key={idx} className="hover:bg-sky-50/50 transition-colors">
                    <td className="px-3 py-2.5">
                      <span className="font-extrabold text-slate-800 block text-sm leading-tight">{chem.name}</span>
                    </td>
                    <td className="px-2 py-2.5 text-center">
                      <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-md border border-slate-200 whitespace-nowrap">
                        {chem.moa}
                      </span>
                    </td>
                    <td className="px-2 py-2.5 text-center">
                      <span className={`px-2 py-1 rounded-lg text-[10px] font-bold border whitespace-nowrap shadow-sm ${getFoliarColor(translateLifespan(chem.foliar))}`}>
                        {translateLifespan(chem.foliar)}
                      </span>
                    </td>
                    <td className="px-2 py-2.5 text-center">
                      <span className={`px-2 py-1 rounded-lg text-[10px] font-bold border whitespace-nowrap shadow-sm ${getSoilColor(translateLifespan(chem.soil))}`}>
                        {translateLifespan(chem.soil)}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-[15px] text-slate-600 font-medium leading-snug">
                      {chem.notes}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};


// --- 叶片卷曲诊断图（内嵌 SVG，无需联网） ---
// 手绘植物学诊断图，直接展示每种卷曲模式的成因机理。
// 通过 id 区分两种诊断图：'downward_curl' 和 'upward_curl'。
const AIIllustration = ({ id, alt }) => {
  if (id === 'downward_curl') {
    return (
      <div className="relative mb-4 w-full h-48 rounded-xl border-2 border-slate-200 shadow-sm bg-gradient-to-b from-slate-50 to-white overflow-hidden">
        <svg viewBox="0 0 680 240" className="w-full h-full" role="img" aria-label={alt} xmlns="http://www.w3.org/2000/svg">
          <title>向下卷曲诊断图</title>
          {/* 叶片上表面（凸面，健康绿色） */}
          <path d="M 100 90 Q 340 20, 580 90 Q 575 105, 570 112 Q 340 48, 110 112 Q 105 105, 100 90 Z"
                fill="#639922" stroke="#3B6D11" strokeWidth="1"/>
          {/* 叶片背面（凹面，害虫聚集处） */}
          <path d="M 110 112 Q 340 48, 570 112 L 540 180 Q 340 110, 140 180 L 110 112 Z"
                fill="#97C459" stroke="#3B6D11" strokeWidth="0.5" opacity="0.95"/>
          {/* 卷曲的叶缘 */}
          <path d="M 100 90 Q 95 160, 140 180" fill="none" stroke="#3B6D11" strokeWidth="1.2"/>
          <path d="M 580 90 Q 585 160, 540 180" fill="none" stroke="#3B6D11" strokeWidth="1.2"/>
          {/* 主脉 */}
          <path d="M 110 112 Q 340 48, 570 112" fill="none" stroke="#27500A" strokeWidth="1.5" opacity="0.6"/>
          {/* 侧脉 */}
          <path d="M 200 105 Q 240 135, 260 175" fill="none" stroke="#27500A" strokeWidth="0.5" opacity="0.4"/>
          <path d="M 280 90 Q 300 125, 310 170" fill="none" stroke="#27500A" strokeWidth="0.5" opacity="0.4"/>
          <path d="M 400 90 Q 380 125, 370 170" fill="none" stroke="#27500A" strokeWidth="0.5" opacity="0.4"/>
          <path d="M 480 105 Q 440 135, 420 175" fill="none" stroke="#27500A" strokeWidth="0.5" opacity="0.4"/>
          {/* 害虫聚集点（叶背） */}
          <g fill="#4A1B0C" opacity="0.85">
            <circle cx="220" cy="155" r="3"/><circle cx="235" cy="160" r="2.5"/>
            <circle cx="250" cy="165" r="3"/><circle cx="265" cy="160" r="2"/>
            <circle cx="290" cy="155" r="3"/><circle cx="310" cy="160" r="2.5"/>
            <circle cx="340" cy="155" r="3.5"/><circle cx="370" cy="160" r="2.5"/>
            <circle cx="395" cy="155" r="3"/><circle cx="420" cy="160" r="2"/>
            <circle cx="440" cy="165" r="3"/><circle cx="460" cy="160" r="2.5"/>
          </g>
          {/* 向下卷曲箭头 */}
          <path d="M 100 50 Q 105 35, 130 45" fill="none" stroke="#D85A30" strokeWidth="2" strokeLinecap="round"/>
          <polygon points="125,40 138,46 130,53" fill="#D85A30"/>
          <path d="M 580 50 Q 575 35, 550 45" fill="none" stroke="#D85A30" strokeWidth="2" strokeLinecap="round"/>
          <polygon points="555,40 542,46 550,53" fill="#D85A30"/>
          {/* 标注 */}
          <text x="60" y="65" fontFamily="sans-serif" fontSize="11" fill="#27500A" fontWeight="600">叶面</text>
          <text x="60" y="78" fontFamily="sans-serif" fontSize="9" fill="#3B6D11" opacity="0.8">（外凸）</text>
          <text x="540" y="205" fontFamily="sans-serif" fontSize="11" fill="#4A1B0C" fontWeight="600">害虫</text>
          <text x="540" y="218" fontFamily="sans-serif" fontSize="9" fill="#993C1D">藏于叶背</text>
        </svg>
        <div className="absolute bottom-1.5 right-2 bg-white/90 text-slate-700 px-2 py-0.5 rounded text-[9px] font-bold tracking-wider backdrop-blur-sm shadow-sm pointer-events-none">
          诊断图
        </div>
      </div>
    );
  }

  if (id === 'upward_curl') {
    return (
      <div className="relative mb-4 w-full h-48 rounded-xl border-2 border-slate-200 shadow-sm bg-gradient-to-b from-slate-50 to-white overflow-hidden">
        <svg viewBox="0 0 680 240" className="w-full h-full" role="img" aria-label={alt} xmlns="http://www.w3.org/2000/svg">
          <title>向上翻卷诊断图</title>
          {/* 健康的绿色中部（凹面，向上翻起） */}
          <path d="M 140 110 Q 340 160, 540 110 L 545 140 Q 340 190, 135 140 L 140 110 Z"
                fill="#639922" stroke="#3B6D11" strokeWidth="1"/>
          {/* 左侧焦枯叶缘向上翻 */}
          <path d="M 60 50 Q 100 30, 140 60 L 140 110 Q 100 105, 60 90 L 60 50 Z"
                fill="#854F0B" stroke="#633806" strokeWidth="0.5"/>
          <path d="M 70 55 Q 90 52, 110 60" fill="none" stroke="#412402" strokeWidth="0.6" opacity="0.7"/>
          <path d="M 65 70 Q 95 68, 125 78" fill="none" stroke="#412402" strokeWidth="0.6" opacity="0.7"/>
          <path d="M 68 85 Q 100 84, 130 98" fill="none" stroke="#412402" strokeWidth="0.6" opacity="0.5"/>
          <path d="M 60 50 L 55 45 L 62 42 L 58 36 L 66 38 L 64 30" fill="none" stroke="#633806" strokeWidth="0.8"/>
          {/* 右侧焦枯叶缘向上翻 */}
          <path d="M 620 50 Q 580 30, 540 60 L 540 110 Q 580 105, 620 90 L 620 50 Z"
                fill="#854F0B" stroke="#633806" strokeWidth="0.5"/>
          <path d="M 610 55 Q 590 52, 570 60" fill="none" stroke="#412402" strokeWidth="0.6" opacity="0.7"/>
          <path d="M 615 70 Q 585 68, 555 78" fill="none" stroke="#412402" strokeWidth="0.6" opacity="0.7"/>
          <path d="M 612 85 Q 580 84, 550 98" fill="none" stroke="#412402" strokeWidth="0.6" opacity="0.5"/>
          <path d="M 620 50 L 625 45 L 618 42 L 622 36 L 614 38 L 616 30" fill="none" stroke="#633806" strokeWidth="0.8"/>
          {/* 过渡带（黄褐色） */}
          <path d="M 140 60 L 140 110 L 135 140 Q 142 125, 142 90 L 140 60 Z" fill="#BA7517" opacity="0.5"/>
          <path d="M 540 60 L 540 110 L 545 140 Q 538 125, 538 90 L 540 60 Z" fill="#BA7517" opacity="0.5"/>
          {/* 鲜绿色主脉 */}
          <path d="M 140 135 Q 340 175, 540 135" fill="none" stroke="#173404" strokeWidth="2.5"/>
          <path d="M 140 135 Q 340 175, 540 135" fill="none" stroke="#639922" strokeWidth="1.5"/>
          {/* 侧脉 */}
          <path d="M 220 125 Q 240 145, 250 160" fill="none" stroke="#27500A" strokeWidth="0.5" opacity="0.5"/>
          <path d="M 290 130 Q 305 150, 310 165" fill="none" stroke="#27500A" strokeWidth="0.5" opacity="0.5"/>
          <path d="M 390 130 Q 375 150, 370 165" fill="none" stroke="#27500A" strokeWidth="0.5" opacity="0.5"/>
          <path d="M 460 125 Q 440 145, 430 160" fill="none" stroke="#27500A" strokeWidth="0.5" opacity="0.5"/>
          {/* 向上翻卷箭头 */}
          <path d="M 90 18 Q 95 5, 110 12" fill="none" stroke="#D85A30" strokeWidth="2" strokeLinecap="round"/>
          <polygon points="105,8 117,14 110,21" fill="#D85A30"/>
          <path d="M 590 18 Q 585 5, 570 12" fill="none" stroke="#D85A30" strokeWidth="2" strokeLinecap="round"/>
          <polygon points="575,8 563,14 570,21" fill="#D85A30"/>
          {/* 标注 */}
          <text x="60" y="155" fontFamily="sans-serif" fontSize="11" fill="#633806" fontWeight="600">焦枯</text>
          <text x="60" y="168" fontFamily="sans-serif" fontSize="9" fill="#854F0B">褐色叶缘</text>
          <text x="555" y="155" fontFamily="sans-serif" fontSize="11" fill="#633806" fontWeight="600">焦枯</text>
          <text x="555" y="168" fontFamily="sans-serif" fontSize="9" fill="#854F0B">褐色叶缘</text>
          <text x="340" y="215" textAnchor="middle" fontFamily="sans-serif" fontSize="10" fill="#3B6D11" fontWeight="600">中央主脉保持鲜绿</text>
        </svg>
        <div className="absolute bottom-1.5 right-2 bg-white/90 text-slate-700 px-2 py-0.5 rounded text-[9px] font-bold tracking-wider backdrop-blur-sm shadow-sm pointer-events-none">
          诊断图
        </div>
      </div>
    );
  }

  return null;
};

export default function App() {
  const [activeTab, setActiveTab] = useState('database'); 
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('All');
  const [filterPart, setFilterPart] = useState('All');
  const [filterSeverity, setFilterSeverity] = useState('All'); 
  const [filterStage, setFilterStage] = useState('All Stages'); 
  const [viewMode, setViewMode] = useState('list'); 
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [showTrappingGuide, setShowTrappingGuide] = useState(false);
  const [showLightGuide, setShowLightGuide] = useState(false);
  const [showDiagGuide, setShowDiagGuide] = useState(false);
  const [showMixGuide, setShowMixGuide] = useState(false);
  const [showBioGuide, setShowBioGuide] = useState(false);
  const [showMicrobeGuide, setShowMicrobeGuide] = useState(false);
  const [showDT50Guide, setShowDT50Guide] = useState(false);
  const [customImages, setCustomImages] = useState({});
  const [uploadModal, setUploadModal] = useState({ isOpen: false, pestId: null });
  const [tempFileUrl, setTempFileUrl] = useState(null);
  const [tempCredit, setTempCredit] = useState('');

  // --- N-CALCULATOR STATE ---
  const [showNCalc, setShowNCalc] = useState(false);
  const [calcNPercent, setCalcNPercent] = useState(15);
  const [calcBagWeight, setCalcBagWeight] = useState(25);
  const [calcTreesPerBag, setCalcTreesPerBag] = useState(25);

  const calculatedNPerTree = useMemo(() => {
    if (!calcBagWeight || !calcTreesPerBag || !calcNPercent) return 0;
    return ((calcNPercent / 100) * calcBagWeight) / calcTreesPerBag;
  }, [calcNPercent, calcBagWeight, calcTreesPerBag]);

  // --- SIMULATOR STATE ---
  const [stage, setStage] = useState('vegetative'); 
  const [nitrogen, setNitrogen] = useState(0.4); 
  const [rain, setRain] = useState('low');
  const [humidity, setHumidity] = useState(70);
  const [dryDays, setDryDays] = useState(3);
  const [nearForest, setNearForest] = useState(false);
  const [risks, setRisks] = useState({ sapSuckers: 0, borers: 0, fungal: 0, wildlife: 0 });

  // Add logic to determine if the current stage is critical for formulations
  const isCriticalStage = useMemo(() => {
    const criticalStages = ['pre-flowering', 'flower-bud', 'matchstick', 'full-bloom', 'early-fruit', 'wave-1-culling', 'wave-2-flush', 'rapid-expansion', 'maturation'];
    return criticalStages.includes(stage);
  }, [stage]);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const sapStages = ['seedling', 'vegetative', 'wave-2-flush', 'post-harvest'];
    const borerStages = ['early-fruit', 'wave-1-culling', 'wave-2-flush', 'rapid-expansion', 'maturation'];
    const wildlifeStages = ['rapid-expansion', 'maturation'];

    let sap = (sapStages.includes(stage) ? 40 : 10) + (nitrogen * 30) + (dryDays > 4 ? 20 : 0);
    let bor = (borerStages.includes(stage) ? 60 : 10) + (rain === 'moderate' ? 10 : 0);
    let fun = (rain === 'high' ? 50 : (rain === 'moderate' ? 20 : 0)) + (humidity > 80 ? 30 : 0);
    let wild = (nearForest ? 50 : 0) + (wildlifeStages.includes(stage) ? 40 : 0);

    setRisks({
      sapSuckers: Math.min(100, Math.round(sap)),
      borers: Math.min(100, Math.round(bor)),
      fungal: Math.min(100, Math.round(fun)),
      wildlife: Math.min(100, Math.round(wild))
    });
  }, [stage, nitrogen, rain, humidity, dryDays, nearForest]);

  const filteredPests = useMemo(() => {
    return ALL_PESTS.filter(pest => {
      const matchCat = filterCat === 'All' || pest.category === filterCat;
      const matchPart = filterPart === 'All' || pest.part === filterPart || pest.part === 'General';
      const matchSearch = pest.common.toLowerCase().includes(search.toLowerCase()) || 
                          pest.scientific.toLowerCase().includes(search.toLowerCase());
      
      let matchSeverity = true;
      if (filterSeverity === 'Critical') matchSeverity = pest.severity >= 4;
      if (filterSeverity === 'Moderate') matchSeverity = pest.severity <= 3;

      let matchLifeStage = true;
      if (filterCat === 'All' || filterCat === 'Insects') {
         if (filterStage === 'Juveniles') {
             matchLifeStage = /(若虫|蛴螬|幼蚧|毛虫|蛆|幼虫)/i.test(pest.common);
         } else if (filterStage === 'Adults') {
             if (pest.category === 'Insects') {
                 matchLifeStage = !/(若虫|蛴螬|幼蚧|毛虫|蛆|幼虫)/i.test(pest.common);
             }
         }
      }

      return matchCat && matchPart && matchSearch && matchSeverity && matchLifeStage;
    });
  }, [search, filterCat, filterPart, filterSeverity, filterStage]);

  const openUploadModal = (pestId) => {
    const existing = customImages[pestId];
    setTempFileUrl(existing ? existing.url : null);
    setTempCredit(existing ? existing.credit : '');
    setUploadModal({ isOpen: true, pestId });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          // Cap maximum dimensions to maintain visual quality but drastically reduce file size
          const MAX_WIDTH = 1200; 
          const MAX_HEIGHT = 1200;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Compress to JPEG format at 80% quality (saves massive space in localStorage)
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8);
          setTempFileUrl(compressedDataUrl);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveImage = () => {
    if (uploadModal.pestId) {
      setCustomImages(prev => ({
        ...prev,
        [uploadModal.pestId]: { url: tempFileUrl, credit: tempCredit }
      }));
    }
    setUploadModal({ isOpen: false, pestId: null });
  };

  const activePestTitle = useMemo(() => {
    if (!uploadModal.pestId) return '';
    return ALL_PESTS.find(p => p.id === uploadModal.pestId)?.common || '害虫';
  }, [uploadModal.pestId]);

  const handleShare = (pest) => {
    let moaText = '';
    const categorizedMoa = categorizeMoa(pest.moa, pest.category);
    
    if (categorizedMoa && pest.moa !== 'N/A' && !['Vertebrates'].includes(pest.category)) {
      moaText = '\n\n[3阶段执行策略]';
      [1, 2, 3].forEach(phaseNum => {
        const items = categorizedMoa[phaseNum];
        if (items && items.length > 0) {
          const phaseInfo = getPhaseInfo(phaseNum, pest.category);
          moaText += `\n\n[${phaseInfo.step}]: ${phaseInfo.title}\n`;
          moaText += items.join('  (4-7天后) 轮换至 -> ');
        }
      });
    }

    const sprayTarget = pest.application && !['Vertebrates'].includes(pest.category) ? `\n\n[喷洒靶点]: ${pest.application}` : `\n\n[管理靶点]: ${pest.target}`;

    const text = `AgriPro 病虫害管理警报\n\n` +
                 `目标: ${pest.common}\n` +
                 `学名: ${pest.scientific}\n` +
                 `严重等级: ${pest.severity} / 5\n` +
                 `活动时间: ${translateActivity(pest.activity)}\n\n` +
                 `[症状与识别]:\n${pest.symptoms}\n\n` +
                 `[防治总结]:\n${pest.control}` + 
                 sprayTarget + 
                 moaText;
    
    // 使用官方推荐的 wa.me 链接，移动端兼容性更好
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    
    // 动态创建 <a> 标签模拟物理点击，有效绕过移动端和 iframe 的弹窗拦截 (Popup Blocker)
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getRiskColor = (score) => score >= 70 ? 'bg-red-500' : score >= 40 ? 'bg-orange-500' : 'bg-emerald-500';
  const getRiskText = (score) => score >= 70 ? 'text-red-700' : score >= 40 ? 'text-orange-700' : 'text-emerald-700';

  // Map English internal category state to Chinese for display
  const categoryDisplayMap = {
    'All': '全部',
    'Insects': '昆虫',
    'Fungi/Pathogens': '真菌/病原体',
    'Mites/Nematodes': '螨虫/线虫',
    'Vertebrates': '野生动物',
    'Molluscs': '软体动物',
    'Weeds/Epiphytes': '杂草/附生植物'
  };

  const partDisplayMap = {
    'Fruit/Flower': '果实/花朵',
    'Leaves': '叶片与新梢',
    'Roots': '根部与土壤',
    'Trunk/Branches': '树干与枝条',
    'General': '全树通用'
  };

  const translateStage = (stageCode) => {
    const map = {
      'Vegetative': '营养生长期', 'Flowering': '开花期', 'Fruiting': '结果期', 
      'Seedling': '幼苗期', 'Post-Harvest': '采后恢复期', 'All Stages': '所有阶段'
    };
    return map[stageCode] || stageCode;
  };

  const translateIpm = (ipmCode) => {
    const map = {
      'Chemical': '化学防治', 'Biological': '生物防治', 'Cultural': '农业防治', 'Physical': '物理防治'
    };
    return map[ipmCode] || ipmCode;
  };

  const translateActivity = (act) => {
    if (act === 'Diurnal') return '昼行性 (白天)';
    if (act === 'Nocturnal') return '夜行性 (夜晚)';
    if (act === 'Crepuscular') return '晨昏性';
    if (act === 'Continuous') return '全天候活跃';
    if (act === 'N/A') return '无';
    return act;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24 relative">
      
      {showTopBtn && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[90] bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-2xl transition-all hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-8"
          title="返回顶部"
        >
          <Icon name="arrow-up" className="w-8 h-8" />
        </button>
      )}

      {uploadModal.isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 p-4 md:p-6 animate-in fade-in"
          onClick={(e) => { if (e.target === e.currentTarget) setUploadModal({ isOpen: false, pestId: null }); }}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[95vh]">
            <div className="flex justify-between items-center p-5 md:p-6 border-b border-slate-200 bg-slate-50 flex-shrink-0">
              <h3 className="font-bold text-xl md:text-2xl text-slate-900 truncate pr-4">上传照片: {activePestTitle}</h3>
              <button onClick={() => setUploadModal({ isOpen: false, pestId: null })} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-600 flex-shrink-0">
                <Icon name="x" className="w-6 h-6 md:w-8 md:h-8" />
              </button>
            </div>
            
            <div className="p-5 md:p-8 space-y-6 md:space-y-8 overflow-y-auto">
              <div className="w-full h-56 md:h-72 bg-slate-100 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center relative overflow-hidden group">
                {tempFileUrl ? (
                  <img src={tempFileUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center text-slate-500">
                    <Icon name="image" className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 opacity-50" />
                    <span className="text-lg md:text-xl font-medium">未选择图片</span>
                  </div>
                )}
                
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 transition-colors">
                  <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50" onChange={handleFileChange} />
                  {tempFileUrl && (
                    <div className="bg-slate-900/80 text-white px-4 py-2 md:px-5 md:py-3 rounded-full text-base md:text-lg font-bold flex items-center gap-2 md:gap-3 opacity-90 md:opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <Icon name="upload" className="w-4 h-4 md:w-5 md:h-5" /> 点击替换
                    </div>
                  )}
                </div>
              </div>

              {!tempFileUrl && (
                <div className="relative block w-full py-3 md:py-4 bg-emerald-100 text-emerald-800 text-center font-bold text-lg md:text-xl rounded-xl cursor-pointer hover:bg-emerald-200 transition-colors overflow-hidden">
                  <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50" onChange={handleFileChange} />
                  从设备选择文件
                </div>
              )}

              <div className="space-y-2 md:space-y-3">
                <label className="text-lg md:text-xl font-bold text-slate-800 block">版权 / 图片来源</label>
                <input 
                  type="text" 
                  placeholder="© 维基百科 / 拍摄者" 
                  value={tempCredit}
                  onChange={(e) => setTempCredit(e.target.value)}
                  className="w-full p-3 md:p-4 text-lg md:text-xl bg-white border-2 border-slate-300 rounded-xl outline-none focus:ring-4 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                />
              </div>
            </div>

            <div className="p-5 md:p-6 border-t border-slate-200 bg-slate-50 flex justify-end gap-3 md:gap-4 flex-shrink-0">
              <button onClick={() => setUploadModal({ isOpen: false, pestId: null })} className="px-5 py-2.5 md:px-6 md:py-3 font-bold text-lg md:text-xl text-slate-700 hover:bg-slate-200 rounded-xl transition-colors">取消</button>
              <button onClick={handleSaveImage} className="px-6 py-2.5 md:px-8 md:py-3 font-bold text-lg md:text-xl bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors shadow-md">保存照片</button>
            </div>
          </div>
        </div>
      )}


      <header className="bg-emerald-900 text-white shadow-md sticky top-0 z-40">
        <div className="max-w-[90rem] mx-auto px-4 py-4 flex flex-row justify-between items-center gap-4">
          
          <div className="flex items-center gap-2 md:gap-3">
            <div className="bg-emerald-800 p-1.5 md:p-2 rounded-lg border border-emerald-700 flex items-center justify-center">
              <Icon name="leaf" className="w-5 h-5 md:w-6 md:h-6 text-emerald-400" />
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-xl md:text-2xl font-bold tracking-tight leading-none text-white text-left">AGRIPRO 榴莲病虫害管理</h1>
            </div>
          </div>
          
          <div className="flex bg-emerald-950 p-1 rounded-lg border border-emerald-800">
            <button 
              onClick={() => setActiveTab('simulator')}
              className={`px-3 py-1.5 md:px-5 md:py-2 rounded-md text-[11px] md:text-sm font-bold flex items-center gap-1.5 md:gap-2 transition-all ${activeTab === 'simulator' ? 'bg-emerald-600 text-white shadow-md' : 'text-emerald-400 hover:text-white'}`}
            >
              <Icon name="activity" className="w-3.5 h-3.5 md:w-4 md:h-4" /> <span className="hidden sm:inline">风险评估</span><span className="sm:hidden">风险</span>
            </button>
            <button 
              onClick={() => setActiveTab('database')}
              className={`px-3 py-1.5 md:px-5 md:py-2 rounded-md text-[11px] md:text-sm font-bold flex items-center gap-1.5 md:gap-2 transition-all ${activeTab === 'database' ? 'bg-emerald-600 text-white shadow-md' : 'text-emerald-400 hover:text-white'}`}
            >
              <Icon name="search" className="w-3.5 h-3.5 md:w-4 md:h-4" /> <span className="hidden sm:inline">数据库</span><span className="sm:hidden">数据</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[90rem] mx-auto mt-8 px-6">
        
        {/* --- TAB 1: RISK ENGINE --- */}
        {activeTab === 'simulator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-300">
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
                <div className="bg-slate-100 p-6 border-b border-slate-200 flex items-center gap-3">
                  <Icon name="settings" className="w-8 h-8 text-slate-700" />
                  <h2 className="font-bold text-2xl text-slate-900">果园环境条件</h2>
                </div>
                
                <div className="p-8 space-y-8">
                  <div className="space-y-4">
                    <label className="text-xl font-bold text-slate-800 flex items-center gap-3">
                      <Icon name="leaf" className="w-6 h-6 text-emerald-600"/> 生长阶段
                    </label>
                    <select value={stage} onChange={(e) => setStage(e.target.value)} className="w-full p-4 text-xl bg-slate-50 border-2 border-slate-300 rounded-xl outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all">
                      <option value="seedling">1. 幼苗 / 移栽期</option>
                      <option value="vegetative">2. 营养生长期 (抽梢)</option>
                      <option value="pre-flowering">3. 花芽分化期</option>
                      <option value="flower-bud">4. 蟹眼期 (花蕾初期)</option>
                      <option value="matchstick">5. 火柴头期 (花序伸长)</option>
                      <option value="full-bloom">6. 盛花期</option>
                      <option value="early-fruit">7. 幼果期 (0-10天)</option>
                      <option value="wave-1-culling">8. 第一次生理落果期 (10-25天)</option>
                      <option value="wave-2-flush">9. 第二次生理落果期 (35-50天)</option>
                      <option value="rapid-expansion">10. 果实膨大期</option>
                      <option value="maturation">11. 成熟与裂果期</option>
                      <option value="post-harvest">12. 采后恢复期</option>
                    </select>
                  </div>

                  <div className="space-y-4 border-t border-slate-200 pt-6">
                    <div className="flex justify-between items-center">
                      <label className="text-xl font-bold text-slate-800 flex items-center gap-3"><Icon name="activity" className="w-6 h-6 text-blue-600"/> 施氮量 (公斤/树)</label>
                      <div className="flex items-center gap-4">
                        <button onClick={() => setShowNCalc(!showNCalc)} className="text-sm font-bold text-blue-600 hover:text-blue-800 underline flex items-center gap-1">
                          <Icon name="calculator" className="w-4 h-4" /> 计算器
                        </button>
                        <span className="text-blue-700 font-extrabold bg-blue-100 px-3 py-1 rounded-lg text-xl">{nitrogen.toFixed(2)}</span>
                      </div>
                    </div>
                    <input type="range" min="0" max="1.5" step="0.05" value={nitrogen} onChange={(e) => setNitrogen(Number(e.target.value))} className="w-full h-3 accent-blue-600 rounded-lg"/>
                    
                    {showNCalc && (
                      <div className="bg-blue-50/50 p-6 rounded-2xl border-2 border-blue-200 mt-4 animate-in fade-in zoom-in-95">
                         <h4 className="font-extrabold text-blue-900 flex items-center gap-2 mb-4 text-lg"><Icon name="calculator" className="w-6 h-6"/> 氮元素含量计算器</h4>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                              <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">氮含量 (%)</label>
                              <input type="number" value={calcNPercent} onChange={e=>setCalcNPercent(e.target.value === '' ? '' : Number(e.target.value))} onFocus={(e) => e.target.select()} className="w-full p-4 rounded-xl border-2 border-slate-300 mt-2 text-xl font-bold text-slate-800 focus:border-blue-500 outline-none" />
                            </div>
                            <div>
                              <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">包装重量 (公斤)</label>
                              <input type="number" value={calcBagWeight} onChange={e=>setCalcBagWeight(e.target.value === '' ? '' : Number(e.target.value))} onFocus={(e) => e.target.select()} className="w-full p-4 rounded-xl border-2 border-slate-300 mt-2 text-xl font-bold text-slate-800 focus:border-blue-500 outline-none" />
                            </div>
                            <div>
                              <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">每包施用树数</label>
                              <input type="number" value={calcTreesPerBag} onChange={e=>setCalcTreesPerBag(e.target.value === '' ? '' : Number(e.target.value))} onFocus={(e) => e.target.select()} className="w-full p-4 rounded-xl border-2 border-slate-300 mt-2 text-xl font-bold text-slate-800 focus:border-blue-500 outline-none" />
                            </div>
                         </div>
                         <div className="flex flex-col md:flex-row justify-between items-center bg-blue-100 p-5 rounded-xl mt-6 border border-blue-200 gap-4">
                           <div>
                             <span className="block text-sm text-blue-800 font-bold uppercase tracking-wider">单包总氮量: {(Number(calcNPercent||0)/100 * Number(calcBagWeight||0)).toFixed(2)} 公斤</span>
                             <span className="block text-2xl font-black text-blue-950 mt-1">单株纯氮量: {calculatedNPerTree.toFixed(2)} 公斤</span>
                           </div>
                           <button onClick={() => { setNitrogen(parseFloat(calculatedNPerTree.toFixed(2))); setShowNCalc(false); }} className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-lg rounded-xl transition-colors shadow-md">应用至滑块</button>
                         </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4 border-t border-slate-200 pt-6">
                    <label className="text-xl font-bold text-slate-800 flex items-center gap-3"><Icon name="rain" className="w-6 h-6 text-cyan-600"/> 天气模式</label>
                    <div className="grid grid-cols-2 gap-4">
                      <select value={rain} onChange={(e) => setRain(e.target.value)} className="p-4 border-2 border-slate-300 rounded-xl text-xl bg-slate-50">
                        <option value="low">旱季</option>
                        <option value="moderate">阵雨/间歇性</option>
                        <option value="high">季风 / 雨季</option>
                      </select>
                      <input type="number" placeholder="连续晴天数" value={dryDays} onChange={(e) => setDryDays(e.target.value === '' ? '' : Number(e.target.value))} onFocus={(e) => e.target.select()} className="p-4 border-2 border-slate-300 rounded-xl text-xl bg-slate-50" title="连续晴天数" />
                    </div>
                    <div className="pt-4">
                       <label className="text-lg font-semibold text-slate-600 flex justify-between mb-3">环境湿度 <span>{humidity}%</span></label>
                       <input type="range" min="40" max="100" value={humidity} onChange={(e) => setHumidity(Number(e.target.value))} className="w-full h-3 accent-cyan-600 rounded-lg"/>
                    </div>
                  </div>

                  <div className="space-y-4 border-t border-slate-200 pt-6">
                    <label className="flex items-center gap-4 p-5 bg-amber-50 border-2 border-amber-200 rounded-xl cursor-pointer hover:bg-amber-100 transition-colors">
                      <input type="checkbox" checked={nearForest} onChange={(e) => setNearForest(e.target.checked)} className="w-6 h-6 accent-amber-600"/>
                      <span className="text-xl font-bold text-amber-900 flex items-center gap-3"><Icon name="leaf" className="w-6 h-6"/> 果园靠近原始森林或丛林</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div><h3 className="font-extrabold text-slate-900 text-2xl">吸汁害虫</h3><p className="text-lg text-slate-600 mt-1">青蚊, 蚧壳虫, 木虱</p></div>
                    <Icon name="bug" className={`w-10 h-10 ${getRiskText(risks.sapSuckers)}`} />
                  </div>
                  <div className="flex items-end gap-4 mt-6">
                    <span className={`text-6xl font-black ${getRiskText(risks.sapSuckers)}`}>{risks.sapSuckers}%</span>
                    <div className="flex-1 pb-2"><div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden"><div className={`h-full ${getRiskColor(risks.sapSuckers)} transition-all duration-500`} style={{width: `${risks.sapSuckers}%`}}/></div></div>
                  </div>
                </div>
                <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div><h3 className="font-extrabold text-slate-900 text-2xl">蛀干/蛀果害虫</h3><p className="text-lg text-slate-600 mt-1">果蛀虫, 白蚁, 材小蠹</p></div>
                    <Icon name="bug" className={`w-10 h-10 ${getRiskText(risks.borers)}`} />
                  </div>
                  <div className="flex items-end gap-4 mt-6">
                    <span className={`text-6xl font-black ${getRiskText(risks.borers)}`}>{risks.borers}%</span>
                    <div className="flex-1 pb-2"><div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden"><div className={`h-full ${getRiskColor(risks.borers)} transition-all duration-500`} style={{width: `${risks.borers}%`}}/></div></div>
                  </div>
                </div>
                <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div><h3 className="font-extrabold text-slate-900 text-2xl">真菌与病原体</h3><p className="text-lg text-slate-600 mt-1">疫霉病, 白根病, 藻斑病</p></div>
                    <Icon name="droplets" className={`w-10 h-10 ${getRiskText(risks.fungal)}`} />
                  </div>
                  <div className="flex items-end gap-4 mt-6">
                    <span className={`text-6xl font-black ${getRiskText(risks.fungal)}`}>{risks.fungal}%</span>
                    <div className="flex-1 pb-2"><div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden"><div className={`h-full ${getRiskColor(risks.fungal)} transition-all duration-500`} style={{width: `${risks.fungal}%`}}/></div></div>
                  </div>
                </div>
                <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div><h3 className="font-extrabold text-slate-900 text-2xl">野生动物入侵</h3><p className="text-lg text-slate-600 mt-1">猕猴, 松鼠, 野猪</p></div>
                    <Icon name="alert" className={`w-10 h-10 ${getRiskText(risks.wildlife)}`} />
                  </div>
                  <div className="flex items-end gap-4 mt-6">
                    <span className={`text-6xl font-black ${getRiskText(risks.wildlife)}`}>{risks.wildlife}%</span>
                    <div className="flex-1 pb-2"><div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden"><div className={`h-full ${getRiskColor(risks.wildlife)} transition-all duration-500`} style={{width: `${risks.wildlife}%`}}/></div></div>
                  </div>
                </div>
              </div>

              {/* TIERED ACTION PLAN - LIGHT THEME */}
              <div className="bg-white text-slate-900 rounded-2xl shadow-md overflow-hidden mt-8 border-2 border-slate-200">
                <div className="p-6 bg-slate-100 border-b border-slate-200 flex items-center gap-3">
                  <Icon name="alert" className="w-8 h-8 text-amber-500" />
                  <h3 className="font-extrabold text-2xl text-slate-900">分级防御行动计划</h3>
                </div>
                <div className="p-8 space-y-6">
                  <div className={`flex gap-5 text-xl p-5 rounded-xl border-2 transition-colors ${risks.sapSuckers >= 70 ? 'bg-red-50 border-red-200 text-red-900' : risks.sapSuckers >= 40 ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                    <span className={`font-black w-40 flex-shrink-0 uppercase tracking-tighter ${risks.sapSuckers >= 70 ? 'text-red-700' : risks.sapSuckers >= 40 ? 'text-amber-700' : 'text-emerald-700'}`}>吸汁害虫:</span>
                    <span className="leading-relaxed font-semibold">
                      {risks.sapSuckers >= 70 ? "爆发警报。在傍晚施用吡虫啉/啶虫脒。检查细枝是否有榴莲盾介壳虫造成的坑洞。" :
                       risks.sapSuckers >= 40 ? "种群数量增长中。施用印楝油(1%)或杀虫皂液。避免施用高氮肥以减少嫩梢的吸引力。" :
                       "预防期：悬挂黄色粘虫板进行监测。维护有益昆虫（如瓢虫/草蛉）的栖息地。"}
                    </span>
                  </div>

                  <div className={`flex gap-5 text-xl p-5 rounded-xl border-2 transition-colors ${risks.borers >= 70 ? 'bg-red-50 border-red-200 text-red-900' : risks.borers >= 40 ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                    <span className={`font-black w-40 flex-shrink-0 uppercase tracking-tighter ${risks.borers >= 70 ? 'text-red-700' : risks.borers >= 40 ? 'text-amber-700' : 'text-emerald-700'}`}>蛀干/蛀枝害虫:</span>
                    <span className="leading-relaxed font-semibold">
                      {risks.borers >= 70 ? "高危警报。立即部署高层树冠太阳能杀虫灯，拦截夜间飞行的蛀虫成蛾。检查树干是否有白蚁泥管或材小蠹虫粪。" :
                       risks.borers >= 40 ? "果实发育期开始。黄昏至午夜开启太阳能杀虫灯（高层），阻止飞蛾产卵。确保低层诱捕灯开启以对付鳃金龟。" :
                       "预防期：清除果园地面的落枝和腐烂果实。定期检查活树树干是否有白蚁活动迹象。"}
                    </span>
                  </div>

                  <div className={`flex gap-5 text-xl p-5 rounded-xl border-2 transition-colors ${risks.fungal >= 70 ? 'bg-red-50 border-red-200 text-red-900' : risks.fungal >= 40 ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                    <span className={`font-black w-40 flex-shrink-0 uppercase tracking-tighter ${risks.fungal >= 70 ? 'text-red-700' : risks.fungal >= 40 ? 'text-amber-700' : 'text-emerald-700'}`}>真菌病害:</span>
                    <span className="leading-relaxed font-semibold">
                      {risks.fungal >= 70 ? (
                        ['flower-bud', 'matchstick', 'full-bloom', 'early-fruit'].includes(stage) ? 
                          <span>高湿警报！<strong className="text-red-700 uppercase">⚠️ 零铜制剂窗口期激活！</strong>切勿使用铜制剂，否则会导致瞬间落花。立即进行亚磷酸土壤灌根，并在树冠喷施<em>枯草芽孢杆菌</em>。</span> :
                          "高湿警报。确保排水沟渠畅通，防止疫霉根颈腐烂。立即进行亚磷酸土壤灌根。"
                      ) : risks.fungal >= 40 ? (
                        ['flower-bud', 'matchstick', 'full-bloom', 'early-fruit'].includes(stage) ? 
                          <span>环境有利于孢子繁殖。<strong className="text-amber-800 uppercase">⚠️ 零铜制剂窗口期激活！</strong>切勿预防性喷洒铜制剂。改用<em>枯草芽孢杆菌</em>等软性生物制剂来保护娇嫩的花朵。</span> :
                          "环境有利于孢子繁殖。在树基部周围施用木霉菌。预防性喷洒铜制剂杀菌剂。"
                      ) : 
                       `预防期：${stage === 'post-harvest' ? '进行大型树冠结构修剪的理想时机，以为下个季节最大化气流和阳光。' : '仅进行轻微的卫生修剪（去除枯死/带病细枝）；将大型结构修剪留到采收后，以避免引起落花落果。'}`}
                    </span>
                  </div>

                  <div className={`flex gap-5 text-xl p-5 rounded-xl border-2 transition-colors ${risks.wildlife >= 70 ? 'bg-red-50 border-red-200 text-red-900' : risks.wildlife >= 40 ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                    <span className={`font-black w-40 flex-shrink-0 uppercase tracking-tighter ${risks.wildlife >= 70 ? 'text-red-700' : risks.wildlife >= 40 ? 'text-amber-700' : 'text-emerald-700'}`}>野生动物:</span>
                    <span className="leading-relaxed font-semibold">
                      {risks.wildlife >= 70 ? "高入侵风险。开启周边电围栏。使用锌片包裹树干以阻止果子狸。如果发现蛞蝓，施用防蜗牛颗粒诱饵。" :
                       risks.wildlife >= 40 ? "吸引力增加。清理果园边缘的森林灌木丛。安排护卫犬进行活跃巡逻。" :
                       "预防期：每月检查周边围栏并修复任何缺口。固定好垃圾桶。"}
                    </span>
                  </div>

                  <div className="flex gap-5 text-xl p-5 rounded-xl border-2 transition-colors bg-indigo-50 border-indigo-200 text-indigo-900 mt-2">
                    <span className="font-black w-40 flex-shrink-0 uppercase tracking-tighter text-indigo-700 flex flex-col gap-1">
                      <span className="flex items-center gap-2"><Icon name="dollar-sign" className="w-5 h-5"/> 剂型选择:</span>
                      <span className="text-sm font-bold text-indigo-500">成本控制</span>
                    </span>
                    <span className="leading-relaxed font-semibold">
                      {!isCriticalStage ? 
                        <span><strong className="text-emerald-700">节省成本模式已激活：</strong>您正处于非关键的营养生长或恢复期。为了降低运营成本，优先使用通用的<strong>粉状剂型 (如：可湿性粉剂WP、可溶粉剂SP、水分散粒剂WG)</strong>。它们具有极高的成本效益，足以满足广谱的树冠维护需求。</span> :
                        <span><strong className="text-amber-700">高级防护模式已激活：</strong>您正处于高度敏感的开花/结果期。请改用<strong>液态剂型 (如：乳油EC、悬浮剂SC、可溶剂SL、油分散浮剂OD)</strong>。虽然价格较高，但它们吸收更快、耐雨水冲刷能力更强，并且显著降低了烧伤娇嫩花朵或在优质果壳上留下白垩状残留物的风险。</span>
                      }
                    </span>
                  </div>

                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 2: FULL PEST DATABASE WITH CUSTOM UPLOADS --- */}
        {activeTab === 'database' && (
          <div className="animate-in fade-in duration-300">
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8 flex flex-col gap-5">
              
              <div className="flex flex-col xl:flex-row gap-4 w-full">
                <div className="relative flex-1">
                  <Icon name="search" className="w-6 h-6 absolute left-4 top-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="搜索病虫名称..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-14 pr-6 py-3.5 text-lg font-medium bg-slate-50 border-2 border-slate-300 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-4 w-full xl:w-auto">
                  <div className="relative w-full md:w-64 flex-shrink-0">
                    <Icon name="filter" className="w-5 h-5 absolute left-4 top-4.5 text-slate-400" />
                    <select 
                      value={filterPart}
                      onChange={(e) => setFilterPart(e.target.value)}
                      className="w-full pl-12 pr-6 py-3.5 text-lg font-bold bg-slate-50 border-2 border-slate-300 rounded-xl outline-none focus:border-emerald-500 transition-all text-slate-700"
                    >
                      <option value="All">目标部位: 全部</option>
                      <option value="Leaves">叶片与嫩梢</option>
                      <option value="Trunk/Branches">树干与枝条</option>
                      <option value="Roots">根部与土壤</option>
                      <option value="Fruit/Flower">果实与花朵</option>
                    </select>
                  </div>

                  <div className="relative w-full md:w-56 flex-shrink-0">
                    <Icon name="shield" className="w-5 h-5 absolute left-4 top-4.5 text-slate-400" />
                    <select 
                      value={filterSeverity}
                      onChange={(e) => setFilterSeverity(e.target.value)}
                      className="w-full pl-12 pr-6 py-3.5 text-lg font-bold bg-slate-50 border-2 border-slate-300 rounded-xl outline-none focus:border-emerald-500 transition-all text-slate-700"
                    >
                      <option value="All">严重等级: 全部</option>
                      <option value="Critical">极高危 (4-5 ●)</option>
                      <option value="Moderate">中低度 (1-3 ●)</option>
                    </select>
                  </div>

                  <div className="flex bg-slate-100 p-1 rounded-xl border-2 border-slate-200 w-full md:w-48 flex-shrink-0 h-[56px]">
                    <button 
                      onClick={() => setViewMode('list')}
                      className={`flex-1 flex items-center justify-center gap-2 rounded-lg font-bold transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-emerald-700 border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      <Icon name="list" className="w-5 h-5" /> <span className="hidden md:block">列表</span>
                    </button>
                    <button 
                      onClick={() => setViewMode('grid')}
                      className={`flex-1 flex items-center justify-center gap-2 rounded-lg font-bold transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-emerald-700 border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      <Icon name="grid" className="w-5 h-5" /> <span className="hidden md:block">网格</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 overflow-x-auto w-full pb-2 md:pb-0 hide-scrollbar pt-2 border-t border-slate-100">
                {['All', 'Insects', 'Fungi/Pathogens', 'Mites/Nematodes', 'Vertebrates', 'Molluscs', 'Weeds/Epiphytes'].map(cat => (
                  <button 
                    key={cat}
                    onClick={() => { setFilterCat(cat); setFilterStage('All Stages'); }} 
                    className={`px-5 py-2.5 rounded-full text-base font-bold whitespace-nowrap transition-colors ${filterCat === cat ? 'bg-slate-800 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                  >
                    {categoryDisplayMap[cat]}
                  </button>
                ))}
              </div>

              {(filterCat === 'All' || filterCat === 'Insects') && (
                <div className="flex items-center gap-3 overflow-x-auto w-full pb-2 md:pb-0 hide-scrollbar pt-3 border-t border-slate-100 animate-in fade-in">
                  <Icon name="clock" className="w-5 h-5 text-slate-400 flex-shrink-0 hidden md:block" />
                  <span className="text-sm font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap hidden md:block">害虫发育阶段:</span>
                  {[
                    { id: 'All Stages', label: '所有发育阶段' },
                    { id: 'Juveniles', label: '🐛 幼虫/若虫/蛴螬' },
                    { id: 'Adults', label: '🦋 成虫/羽化成蛾' }
                  ].map(stage => (
                    <button 
                      key={stage.id}
                      onClick={() => setFilterStage(stage.id)}
                      className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all border-2 ${filterStage === stage.id ? 'bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'}`}
                    >
                      {stage.label}
                    </button>
                  ))}
                </div>
              )}

            </div>

            {(filterCat === 'All' || filterCat === 'Insects' || filterCat === 'Mites/Nematodes') && (filterPart === 'All' || filterPart === 'Leaves') && (
              <div className="max-w-4xl mx-auto mb-8 flex flex-col gap-4">
                
                <div>
                  <button 
                    onClick={() => setShowDiagGuide(!showDiagGuide)}
                    className="w-full bg-indigo-50 border-2 border-indigo-100 hover:border-indigo-300 text-indigo-900 p-4 rounded-2xl flex justify-between items-center transition-all shadow-sm group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-indigo-100 p-2.5 rounded-xl text-indigo-600 group-hover:bg-indigo-200 transition-colors">
                        <Icon name="book-open" className="w-7 h-7" />
                      </div>
                      <div className="text-left">
                        <span className="block font-extrabold text-xl leading-tight">田间诊断：解读叶片卷曲症状</span>
                        <span className="block text-sm text-indigo-700 font-medium mt-0.5">通过观察叶片形状的变形特征来快速识别害虫类型</span>
                      </div>
                    </div>
                    <Icon name={showDiagGuide ? "chevron-up" : "chevron-down"} className="w-8 h-8 text-indigo-400 group-hover:text-indigo-600 transition-colors flex-shrink-0" />
                  </button>

                  {showDiagGuide && (
                    <div className="bg-white border-2 border-indigo-100 rounded-2xl p-6 mt-4 shadow-md animate-in fade-in slide-in-from-top-4">
                      <p className="text-lg text-slate-600 font-medium mb-6">
                        您知道吗？叶片卷曲的方向可以帮助您在看到害虫之前就识别出它。
                        以下是基于叶片形状的快速田间侦察指南：
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col h-full">
                          <div className="flex items-center gap-3 mb-4">
                            <Icon name="chevron-down" className="w-8 h-8 text-amber-600" />
                            <h4 className="font-bold text-xl text-slate-800">向下 / 向内卷曲<br/><span className="text-sm text-slate-500 font-medium">(像杯子一样倒扣)</span></h4>
                          </div>
                          
                          <AIIllustration 
                            id="downward_curl"
                            alt="向下卷曲的榴莲叶片" 
                          />

                          <p className="text-slate-600 mb-4 leading-relaxed flex-1">
                            这表明害虫正在叶片的<strong>背面</strong>猛烈取食。它们的有毒唾液阻碍了叶背细胞的生长扩张，而叶面顶部的细胞继续生长，迫使叶片像帐篷一样向下弯曲。
                          </p>
                          <div className="bg-white p-4 rounded-xl border border-slate-200">
                            <strong className="text-slate-800 block mb-2 uppercase tracking-wider text-xs">常见元凶:</strong>
                            <ul className="list-disc pl-5 text-amber-700 font-bold text-sm space-y-1.5">
                              <li>榴莲木虱</li>
                              <li>桔二叉蚜</li>
                              <li>侧多食跗线螨 (茶黄螨)</li>
                            </ul>
                          </div>
                          <p className="mt-4 text-sm font-bold text-indigo-600 flex items-center gap-2">
                            <Icon name="info" className="w-5 h-5 flex-shrink-0" /> 专业提示：遇到这种叶片，请务必翻过来看叶背，寻找虫群。
                          </p>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col h-full">
                          <div className="flex items-center gap-3 mb-4">
                            <Icon name="chevron-up" className="w-8 h-8 text-emerald-600" />
                            <h4 className="font-bold text-xl text-slate-800">向上 / 向外翻卷<br/><span className="text-sm text-slate-500 font-medium">(呈船形)</span></h4>
                          </div>

                          <AIIllustration 
                            id="upward_curl"
                            alt="向上翻卷的榴莲叶片" 
                          />

                          <p className="text-slate-600 mb-4 leading-relaxed flex-1">
                            表明叶缘维管系统严重受损或害虫在叶面上表面取食。坏死的叶缘收缩干枯，将健康的绿色叶片中心向上拉起。
                          </p>
                          <div className="bg-white p-4 rounded-xl border border-slate-200">
                            <strong className="text-slate-800 block mb-2 uppercase tracking-wider text-xs">常见元凶:</strong>
                            <ul className="list-disc pl-5 text-emerald-700 font-bold text-sm space-y-1.5">
                              <li>茶黄蓟马</li>
                              <li>青蚊 (叶蝉烧)</li>
                              <li>瘿螨 (卷叶螨)</li>
                            </ul>
                          </div>
                          <p className="mt-4 text-sm font-bold text-indigo-600 flex items-center gap-2">
                            <Icon name="info" className="w-5 h-5 flex-shrink-0" /> 专业提示：通常预示着具有高度移动/飞行能力的害虫入侵。
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <button 
                    onClick={() => setShowTrappingGuide(!showTrappingGuide)}
                    className="w-full bg-emerald-50 border-2 border-emerald-100 hover:border-emerald-300 text-emerald-900 p-4 rounded-2xl flex justify-between items-center transition-all shadow-sm group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-emerald-100 p-2.5 rounded-xl text-emerald-600 group-hover:bg-emerald-200 transition-colors">
                        <Icon name="eye" className="w-7 h-7" />
                      </div>
                      <div className="text-left">
                        <span className="block font-extrabold text-xl leading-tight">昼行性害虫视觉诱捕监测</span>
                        <span className="block text-sm text-emerald-700 font-medium mt-0.5">利用颜色偏好来管理和监测昆虫爆发</span>
                      </div>
                    </div>
                    <Icon name={showTrappingGuide ? "chevron-up" : "chevron-down"} className="w-8 h-8 text-emerald-400 group-hover:text-emerald-600 transition-colors flex-shrink-0" />
                  </button>

                  {showTrappingGuide && <TrappingGuide />}
                </div>

                <div>
                  <button 
                    onClick={() => setShowLightGuide(!showLightGuide)}
                    className="w-full bg-amber-50 border-2 border-amber-100 hover:border-amber-300 text-amber-900 p-4 rounded-2xl flex justify-between items-center transition-all shadow-sm group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-amber-100 p-2.5 rounded-xl text-amber-600 group-hover:bg-amber-200 transition-colors">
                        <Icon name="lightbulb" className="w-7 h-7" />
                      </div>
                      <div className="text-left">
                        <span className="block font-extrabold text-xl leading-tight">夜间灯光诱捕 (太阳能杀虫灯)</span>
                        <span className="block text-sm text-amber-700 font-medium mt-0.5">在夜间针对蛀果蛾和鳃金龟等夜行性害虫</span>
                      </div>
                    </div>
                    <Icon name={showLightGuide ? "chevron-up" : "chevron-down"} className="w-8 h-8 text-amber-400 group-hover:text-amber-600 transition-colors flex-shrink-0" />
                  </button>

                  {showLightGuide && <LightTrappingGuide />}
                </div>

                <div>
                  <button 
                    onClick={() => setShowMixGuide(!showMixGuide)}
                    className="w-full bg-violet-50 border-2 border-violet-100 hover:border-violet-300 text-violet-900 p-4 rounded-2xl flex justify-between items-center transition-all shadow-sm group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-violet-100 p-2.5 rounded-xl text-violet-600 group-hover:bg-violet-200 transition-colors">
                        <Icon name="beaker" className="w-7 h-7" />
                      </div>
                      <div className="text-left">
                        <span className="block font-extrabold text-xl leading-tight">高级农艺学：农药混配与增效</span>
                        <span className="block text-sm text-violet-700 font-medium mt-0.5">黄金 pH 规则以及如何创造 1+1=3 的化学协同配方</span>
                      </div>
                    </div>
                    <Icon name={showMixGuide ? "chevron-up" : "chevron-down"} className="w-8 h-8 text-violet-400 group-hover:text-violet-600 transition-colors flex-shrink-0" />
                  </button>

                  {showMixGuide && <TankMixGuide />}
                </div>

                <div>
                  <button 
                    onClick={() => setShowBioGuide(!showBioGuide)}
                    className="w-full bg-lime-50 border-2 border-lime-100 hover:border-lime-300 text-lime-900 p-4 rounded-2xl flex justify-between items-center transition-all shadow-sm group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-lime-100 p-2.5 rounded-xl text-lime-600 group-hover:bg-lime-200 transition-colors">
                        <Icon name="leaf" className="w-7 h-7" />
                      </div>
                      <div className="text-left">
                        <span className="block font-extrabold text-xl leading-tight">生物战：芽孢杆菌 VS 真菌</span>
                        <span className="block text-sm text-lime-700 font-medium mt-0.5">有益细菌如何消灭丝核菌等致命病原体</span>
                      </div>
                    </div>
                    <Icon name={showBioGuide ? "chevron-up" : "chevron-down"} className="w-8 h-8 text-lime-400 group-hover:text-lime-600 transition-colors flex-shrink-0" />
                  </button>

                  {showBioGuide && <BioControlGuide />}
                </div>

                <div>
                  <button 
                    onClick={() => setShowMicrobeGuide(!showMicrobeGuide)}
                    className="w-full bg-teal-50 border-2 border-teal-100 hover:border-teal-300 text-teal-900 p-4 rounded-2xl flex justify-between items-center transition-all shadow-sm group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-teal-100 p-2.5 rounded-xl text-teal-600 group-hover:bg-teal-200 transition-colors">
                        <Icon name="shield" className="w-7 h-7" />
                      </div>
                      <div className="text-left">
                        <span className="block font-extrabold text-xl leading-tight">益生菌农艺学：15 大核心有益微生物</span>
                        <span className="block text-sm text-teal-700 font-medium mt-0.5">使用高级生物制剂构建果园自我维持的防御网络</span>
                      </div>
                    </div>
                    <Icon name={showMicrobeGuide ? "chevron-up" : "chevron-down"} className="w-8 h-8 text-teal-400 group-hover:text-teal-600 transition-colors flex-shrink-0" />
                  </button>

                  {showMicrobeGuide && <MicrobeGuide />}
                </div>

                <div>
                  <button 
                    onClick={() => setShowDT50Guide(!showDT50Guide)}
                    className="w-full bg-sky-50 border-2 border-sky-100 hover:border-sky-300 text-sky-900 p-4 rounded-2xl flex justify-between items-center transition-all shadow-sm group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-sky-100 p-2.5 rounded-xl text-sky-600 group-hover:bg-sky-200 transition-colors">
                        <Icon name="clock" className="w-7 h-7" />
                      </div>
                      <div className="text-left">
                        <span className="block font-extrabold text-xl leading-tight">农药环境半衰期 (DT₅₀) 与 农药残留期</span>
                        <span className="block text-sm text-sky-700 font-medium mt-0.5">参考环境降解时间与出口农残限制安全数据库</span>
                      </div>
                    </div>
                    <Icon name={showDT50Guide ? "chevron-up" : "chevron-down"} className="w-8 h-8 text-sky-400 group-hover:text-sky-600 transition-colors flex-shrink-0" />
                  </button>

                  {showDT50Guide && <DT50Guide />}
                </div>

              </div>
            )}

            <div className={viewMode === 'list' ? "flex flex-col gap-8 max-w-4xl mx-auto" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"}>
              {filteredPests.map(pest => {
                const imgData = customImages[pest.id];
                const primaryName = pest.scientific.split('/')[0].split(',')[0].trim();
                
                let searchSuffix = "";
                const lowerCommon = pest.common.toLowerCase();
                if (lowerCommon.includes('crawler') || lowerCommon.includes('爬行若虫')) searchSuffix = " crawler";
                else if (lowerCommon.includes('nymph') || lowerCommon.includes('hopper') || lowerCommon.includes('若虫')) searchSuffix = " nymph";
                else if (lowerCommon.includes('grub') || lowerCommon.includes('larva') || lowerCommon.includes('蛴螬') || lowerCommon.includes('幼虫')) searchSuffix = " larva";
                else if (lowerCommon.includes('caterpillar') || lowerCommon.includes('maggot') || lowerCommon.includes('毛虫') || lowerCommon.includes('蛆')) searchSuffix = " larva";
                else if (lowerCommon.includes('adult') || lowerCommon.includes('moth') || lowerCommon.includes('beetle') || lowerCommon.includes('成虫') || lowerCommon.includes('蛾')) searchSuffix = " adult";
                const searchQuery = `${primaryName}${searchSuffix}`;
                
                const isGrid = viewMode === 'grid';
                const categorizedMoa = categorizeMoa(pest.moa, pest.category);

                return (
                <div key={pest.id} className={`bg-white shadow-md border-2 border-slate-200 overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 relative group ${isGrid ? 'rounded-2xl h-[520px]' : 'rounded-3xl'}`}>
                  
                  <div className={`relative w-full border-b-2 border-slate-200 flex-shrink-0 ${isGrid ? 'h-48' : 'h-80'} ${imgData && imgData.url ? 'bg-slate-900' : 'bg-slate-100'}`}>
                    {imgData && imgData.url ? (
                      <>
                        <img src={imgData.url} alt={pest.common} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/30 to-transparent pointer-events-none"></div>
                        {imgData.credit && !isGrid && (
                          <div className="absolute bottom-4 right-4 bg-black/70 text-white/95 text-sm font-medium px-3 py-1.5 rounded-md backdrop-blur-md pointer-events-none z-10">
                            {imgData.credit}
                          </div>
                        )}
                        <button onClick={() => openUploadModal(pest.id)} className="absolute top-4 right-4 bg-black/60 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/90 shadow-xl backdrop-blur-md z-20" title="修改照片">
                          <Icon name="camera" className="w-5 h-5" />
                        </button>
                      </>
                    ) : (
                      <div className="w-full h-full bg-slate-100 flex items-center justify-center overflow-hidden relative">
                        <Icon name="image" className={`text-slate-200 absolute opacity-50 pointer-events-none ${isGrid ? 'w-24 h-24' : 'w-48 h-48'}`} />
                        <button onClick={() => openUploadModal(pest.id)} className={`absolute flex items-center gap-2 bg-white shadow-sm hover:shadow-md rounded-xl transition-all cursor-pointer border-2 border-slate-200 hover:border-emerald-400 text-slate-700 hover:text-emerald-700 z-20 ${isGrid ? 'top-3 right-3 p-2' : 'top-6 right-6 px-5 py-3'}`}>
                          <Icon name="camera" className={isGrid ? "w-5 h-5" : "w-6 h-6"} />
                          {!isGrid && <span className="text-lg font-extrabold">添加照片</span>}
                        </button>
                      </div>
                    )}
                    
                    <div className={`absolute bottom-0 left-0 w-full pointer-events-none z-10 ${isGrid ? 'px-4 pb-3' : 'px-6 pb-4'}`}>
                      {!isGrid && (
                        <span className={`inline-block px-3 py-1 rounded-md text-xs uppercase font-bold tracking-wider mb-2 text-white shadow-sm ${
                          pest.category === 'Insects' ? 'bg-amber-600' : pest.category === 'Fungi/Pathogens' ? 'bg-blue-600' :
                          pest.category === 'Vertebrates' ? 'bg-orange-600' : pest.category === 'Molluscs' ? 'bg-pink-600' : 
                          pest.category === 'Weeds/Epiphytes' ? 'bg-teal-600' : 'bg-purple-600'
                        }`}>
                          {categoryDisplayMap[pest.category] || pest.category}
                        </span>
                      )}
                      <h3 className={`font-extrabold leading-tight ${isGrid ? 'text-2xl' : 'text-4xl'} ${imgData && imgData.url ? 'text-white drop-shadow-lg' : 'text-slate-900'}`}>
                        {pest.common}
                      </h3>
                      {!isGrid && (
                        <p className={`text-xl italic mt-2 font-medium ${imgData && imgData.url ? 'text-emerald-300 drop-shadow-md' : 'text-emerald-700'}`}>
                          {pest.scientific}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className={`flex-1 bg-white flex flex-col ${isGrid ? 'p-5 space-y-4' : 'p-8 space-y-6 text-xl text-slate-900'}`}>
                    
                    <div className="flex flex-col gap-3">
                       <div className="flex items-center justify-between gap-3">
                         <div className="flex items-center gap-3">
                           <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">严重等级</span>
                           <SeverityDots rating={pest.severity} />
                         </div>
                         {isGrid && pest.activity !== 'N/A' && (
                           <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500 border border-slate-200 px-2 py-1 rounded-md bg-slate-50">
                             <Icon name={getActivityIcon(pest.activity)} className="w-3.5 h-3.5 text-indigo-500" />
                             {translateActivity(pest.activity)}
                           </span>
                         )}
                       </div>
                       <div className="flex flex-wrap gap-2">
                         {pest.stages.map(s => (
                           <span key={s} className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-bold uppercase rounded-md border border-slate-200">
                             {translateStage(s)}
                           </span>
                         ))}
                       </div>
                    </div>

                    {!isGrid && (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-6 border-b-2 border-slate-100 mt-4">
                         <div>
                           <span className="block text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">科名 (Family)</span>
                           <span className="font-extrabold text-slate-800 text-lg">{pest.family}</span>
                         </div>
                         <div>
                           <span className="block text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">属名 (Genus)</span>
                           <span className="font-extrabold text-slate-800 text-lg italic">{pest.genus}</span>
                         </div>
                         <div>
                           <span className="block text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">危害方式/类型</span>
                           <span className="font-extrabold text-slate-800 text-lg">{pest.type}</span>
                         </div>
                         <div>
                           <span className="block text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">活动规律</span>
                           <span className="font-extrabold text-slate-800 text-lg flex items-center gap-2">
                             <Icon name={getActivityIcon(pest.activity)} className="w-5 h-5 text-indigo-500" />
                             {translateActivity(pest.activity)}
                           </span>
                         </div>
                      </div>
                    )}

                    {!isGrid && (
                      <div>
                        <span className="flex items-center gap-2 text-lg font-bold text-slate-500 uppercase tracking-wider mb-2"><Icon name="leaf" className="w-5 h-5"/> 目标区域</span>
                        <p className="font-medium leading-relaxed">{pest.target} ({partDisplayMap[pest.part] || pest.part})</p>
                      </div>
                    )}

                    <div>
                      {!isGrid && <span className="flex items-center gap-2 text-lg font-bold text-slate-500 uppercase tracking-wider mb-2"><Icon name="info" className="w-5 h-5"/> 症状与藏身处</span>}
                      <p className={isGrid ? "text-sm text-slate-600 line-clamp-4 leading-relaxed font-medium" : "mb-2 leading-relaxed"}>
                        {!isGrid && <strong className="text-slate-900 font-extrabold">症状: </strong>}
                        {pest.symptoms}
                      </p>
                      {!isGrid && <p className="leading-relaxed"><strong className="text-slate-900 font-extrabold">藏身处:</strong> {pest.hiding}</p>}
                    </div>

                    {!isGrid && pest.lifecycle !== 'N/A' && (
                      <div className="bg-slate-50 p-5 rounded-xl border-2 border-slate-200 mt-6">
                        <span className="block text-lg font-bold text-slate-600 uppercase tracking-wider mb-2">生命周期与相互作用</span>
                        <p className="text-lg leading-relaxed font-medium text-slate-800">
                          {pest.lifecycle} 
                          {pest.symbiosis && !['None', 'None.', 'N/A', '无。', '无'].includes(pest.symbiosis) && (
                            <span className="text-slate-600 italic ml-1">{pest.symbiosis}</span>
                          )}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className={`${isGrid ? 'p-5 border-t border-emerald-100 bg-emerald-50 mt-auto' : 'p-8 bg-emerald-50 border-t-2 border-emerald-100'}`}>
                    
                    {!isGrid && (
                      <div className="mb-4 flex flex-col gap-3">
                        <div className="flex flex-wrap gap-2">
                          {pest.ipm.map(tag => {
                            const tagColor = tag === 'Chemical' ? 'bg-rose-100 text-rose-800 border-rose-200' : 
                                             tag === 'Biological' ? 'bg-lime-100 text-lime-800 border-lime-200' : 
                                             tag === 'Physical' ? 'bg-sky-100 text-sky-800 border-sky-200' :
                                             'bg-indigo-100 text-indigo-800 border-indigo-200';
                            return <span key={tag} className={`px-3 py-1.5 rounded-lg text-sm font-bold border ${tagColor}`}>{translateIpm(tag)}</span>
                          })}
                        </div>
                        
                        {pest.application && !['Vertebrates'].includes(pest.category) && (
                          <div className="flex flex-wrap gap-2 items-center w-full bg-indigo-50/80 p-2.5 rounded-xl border border-indigo-200 mt-1 mb-2">
                            <span className="text-xs font-black text-indigo-800 uppercase tracking-wider flex items-center gap-1.5 mr-1">
                              <Icon name="target" className="w-4 h-4 text-indigo-600" /> 喷洒靶点:
                            </span>
                            <span className="px-3 py-1 rounded-md text-xs font-bold bg-white text-indigo-900 border border-indigo-200 shadow-sm">
                              {pest.application}
                            </span>
                          </div>
                        )}

                        {/* NEW 3-PHASE EXECUTION STRATEGY (LIST VIEW ONLY) */}
                        {categorizedMoa && (
                          <div className="mt-4 mb-8">
                            <span className="flex items-center gap-3 font-black text-slate-800 uppercase tracking-wider mb-4 text-2xl">
                              <Icon name="activity" className="w-8 h-8 text-indigo-500"/> 3阶段执行策略
                            </span>
                            
                            <div className="bg-amber-50 border border-amber-200 text-amber-800 p-5 rounded-2xl mb-6 text-lg font-medium flex items-start gap-4 shadow-sm leading-relaxed">
                              <Icon name="alert" className="w-7 h-7 flex-shrink-0 text-amber-600 mt-0.5" />
                              <p><strong className="font-black uppercase tracking-wider text-xl">切勿混配同一阶段药剂:</strong> 如果某个阶段列出了多种化学品，请勿将它们混合喷洒。施用第一种化学品，等待 4 至 7 天后，再轮换使用列表中的下一种化学品，以打破害虫的抗药性。</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                              {[1, 2, 3].map(phase => {
                                const info = getPhaseInfo(phase, pest.category);
                                const items = categorizedMoa[phase];
                                const colorMap = {
                                   red: { bg: 'bg-red-50/80', border: 'border-red-200', text: 'text-red-700', textDesc: 'text-red-900', badge: 'bg-white text-red-700 border-red-200', icon: 'target' },
                                   amber: { bg: 'bg-amber-50/80', border: 'border-amber-200', text: 'text-amber-700', textDesc: 'text-amber-900', badge: 'bg-white text-amber-700 border-amber-200', icon: 'shield' },
                                   emerald: { bg: 'bg-emerald-50/80', border: 'border-emerald-200', text: 'text-emerald-700', textDesc: 'text-emerald-900', badge: 'bg-white text-emerald-700 border-emerald-200', icon: 'leaf' }
                                };
                                const theme = colorMap[info.color];
                                return (
                                  <div key={phase} className={`${theme.bg} p-6 rounded-2xl border-2 ${theme.border} shadow-sm flex flex-col h-full`}>
                                    <div className="mb-4">
                                       <span className={`${theme.text} opacity-80 font-black text-base uppercase tracking-widest block mb-1`}>
                                          {info.step}
                                       </span>
                                       <span className={`${theme.text} font-black text-2xl uppercase tracking-wider flex items-center gap-2`}>
                                          <Icon name={theme.icon} className="w-7 h-7 flex-shrink-0"/> {info.title}
                                       </span>
                                    </div>
                                    <span className={`${theme.textDesc} text-lg font-medium mb-6 flex-1 leading-relaxed`}>{info.desc}</span>
                                    <div className="flex flex-col gap-3 mt-auto">
                                      {items.length > 0 ? items.map((code, index) => {
                                         const tag = getMobilityTag(code);
                                         let mainCode = code;
                                         let chemName = "";
                                         if (code.includes('(') && code.includes(')')) {
                                             const parts = code.split('(');
                                             mainCode = parts[0].trim();
                                             chemName = parts[1].replace(')', '').trim();
                                         }
                                         return (
                                           <React.Fragment key={code}>
                                              {index > 0 && (
                                                <div className="flex justify-center my-1 relative z-10">
                                                   <span className={`text-sm font-black uppercase tracking-wider bg-white px-3 py-1 rounded-full border shadow-sm ${theme.text} ${theme.border}`}>轮换用药 (4-7天后)</span>
                                                </div>
                                              )}
                                              <div className="flex flex-col w-full">
                                                <span className={`${theme.badge} p-3 rounded-t-lg text-lg font-bold shadow-sm text-center leading-tight border-2 border-b-0 flex flex-col gap-1.5`}>
                                                  <span>{mainCode}</span>
                                                  {chemName && <span className="text-base font-semibold opacity-90">{chemName}</span>}
                                                </span>
                                                <span className={`${tag.color} text-sm uppercase tracking-wider px-3 py-1.5 rounded-b-lg border-2 font-black text-center shadow-sm`}>{tag.label}</span>
                                              </div>
                                           </React.Fragment>
                                         )
                                      }) : (
                                         <span className="text-base font-bold opacity-50 italic text-center py-3">进入下一阶段</span>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* COMPACT ROTATION FOR GRID VIEW */}
                    {isGrid && pest.moa !== 'N/A' && !['Vertebrates'].includes(pest.category) && (
                       <div className="flex flex-wrap gap-2 items-stretch w-full bg-slate-100 p-2.5 rounded-xl border border-slate-200 mb-3">
                         <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider flex items-center gap-1 mr-1 py-1">
                           <Icon name="shield" className="w-3 h-3 text-amber-500" /> 轮换:
                         </span>
                         {pest.moa.split(' 🔄 ').slice(0, 2).map((code, idx) => {
                           return (
                             <div key={idx} className="flex flex-col flex-1 min-w-[80px]">
                               <span className="px-1.5 py-1 rounded-md text-[10px] font-bold bg-white text-amber-700 border border-amber-200 shadow-sm flex items-center gap-1 h-full truncate">
                                 <span className="bg-amber-100 text-amber-800 w-3 h-3 flex items-center justify-center rounded-full text-[8px] flex-shrink-0 font-black">{idx + 1}</span> 
                                 <span className="truncate">{code.split(' (')[0]}</span>
                               </span>
                             </div>
                           );
                         })}
                       </div>
                    )}

                    <span className={`flex items-center gap-2 font-black text-emerald-900 uppercase tracking-wider mb-3 ${isGrid ? 'text-sm' : 'text-lg border-t-2 border-emerald-200/50 pt-4'}`}>
                      <Icon name="info" className={isGrid ? "w-4 h-4" : "w-6 h-6"}/> 防治方案总结
                    </span>
                    
                    <p className={`text-emerald-950 font-medium ${isGrid ? 'text-sm line-clamp-3 mb-4' : 'text-xl leading-relaxed mb-6'}`}>
                      {pest.control}
                    </p>
                    
                    <div className={`flex gap-3 ${isGrid ? 'flex-col' : 'flex-col md:flex-row mt-4'}`}>
                      <a 
                        href={`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(searchQuery)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 flex items-center justify-between font-bold text-emerald-600 hover:text-emerald-800 transition-all bg-white border-2 border-emerald-200 hover:border-emerald-400 shadow-sm hover:shadow-md group ${isGrid ? 'px-4 py-2.5 rounded-lg text-sm' : 'flex-col px-6 pt-4 pb-3 rounded-xl text-lg text-left'}`}
                      >
                        <span className={isGrid ? "truncate" : "pr-4 leading-tight w-full"}>{isGrid ? '图片搜索' : `搜索 ${searchQuery} 的图片`}</span>
                        <div className={isGrid ? "" : "w-full flex justify-end mt-2"}>
                          <Icon name="link" className={`${isGrid ? "w-4 h-4" : "w-6 h-6"} opacity-50 group-hover:opacity-100 transition-opacity`} />
                        </div>
                      </a>
                      
                      <button 
                        onClick={() => handleShare(pest)}
                        className={`flex items-center justify-center gap-2 font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all border-2 border-emerald-700 shadow-sm hover:shadow-md ${isGrid ? 'px-4 py-2.5 rounded-lg text-sm w-full' : 'px-6 py-4 rounded-xl text-lg'}`}
                        title="通过 WhatsApp 将警报发送给现场团队"
                      >
                        <Icon name="share" className={isGrid ? "w-4 h-4" : "w-6 h-6"} />
                        {isGrid ? '分享警报' : '发送预警'}
                      </button>
                    </div>
                  </div>
                </div>
              )})}
            </div>

            {filteredPests.length === 0 && (
              <div className="text-center py-32 text-slate-500 bg-white rounded-3xl border-2 border-slate-200 shadow-sm">
                <Icon name="search" className="w-20 h-20 mx-auto text-slate-300 mb-6" />
                <h3 className="text-3xl font-extrabold text-slate-800">未找到病虫害</h3>
                <p className="text-xl mt-2 font-medium">请尝试调整您的目标部位或类别过滤器。</p>
              </div>
            )}

          </div>
        )}

      </main>
    </div>
  );
}