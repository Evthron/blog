type LevelColorMap = string[];

const levelColors: LevelColorMap = [
    "#D8D8D8", // Lv1 Grey
    "#EEDDAA", // Lv2 Pink
    "#FFBABA", // Lv3 Pink
    "#EE8800", // Lv4 Pink
    "#FF8C8C", // Lv5 Pink
    "#33CC75", // Lv6 Pink
    "#FF5E5E", // Lv7 Red
    "#2FB7B9", // Lv8 Green
    "#FF3030", // Lv9 Red
    "#FF19FF"  // Lv10 Purple
];

const levelBadges: NodeListOf<HTMLElement> = document.querySelectorAll('.level-badge');

levelBadges.forEach((badge: HTMLElement) => {
    const levelMatch: RegExpMatchArray | null = badge.textContent.match(/\d+/); // Get the level number
    if (!levelMatch) return;

    const level: number = parseInt(levelMatch[0]);
    
    const colorIndex: number = Math.min(level - 1, levelColors.length - 1);
    const bgColor: string = levelColors[colorIndex];
    
    badge.style.background = `linear-gradient(135deg, ${bgColor} 0%`;
    
});