import React from "react";
import { motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimationFrame } from "framer-motion";

interface PinData {
  id: number;
  img_blob: string;
  favorited: boolean;
  date: string;
}

function checkSize(event: React.SyntheticEvent<HTMLImageElement>) {
  const image = event.currentTarget;
  image.classList.add("pin_max_width");
  const imageRect = image.getBoundingClientRect();
  const parentRect = image.parentElement?.getBoundingClientRect();

  if (parentRect && (imageRect.width < parentRect.width || imageRect.height < parentRect.height)) {
    image.classList.remove("pin_max_width");
    image.classList.add("pin_max_height");
  }

  image.style.opacity = "1";
}

const Pin: React.FC<{ pin: PinData }> = ({ pin }) => (
  <div className="card card_medium">
    <div className="pin_image">
      <img onLoad={checkSize} src={pin.img_blob} alt="pin_image" />
    </div>
  </div>
);

// 🌀 Parallax Text Header
const ParallaxText: React.FC<{ children: string; baseVelocity: number }> = ({ children, baseVelocity }) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  const directionFactor = React.useRef(1);

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="parallax">
      <motion.div className="scroller" style={{ x }}>
        {[...Array(4)].map((_, i) => (
          <span key={i}>{children} </span>
        ))}
      </motion.div>
    </div>
  );
};

// 🧩 Helper: date in last 7 days
function isFromLastWeek(dateStr: string): boolean {
  const today = new Date();
  const input = new Date(dateStr);
  const dayOfWeek = today.getDay(); // 0 = Sunday
  const lastSunday = new Date(today);
  lastSunday.setDate(today.getDate() - dayOfWeek);
  return input > lastSunday;
}

// 🎨 Main Board Component
const UserOutfitBoard: React.FC = () => {
  // Example data — replace with your actual source
  const pins: PinData[] = [
    {
      id: 1,
      img_blob: "/assets/outfit1.jpg",
      favorited: true,
      date: "2025-05-28",
    },
    {
      id: 2,
      img_blob: "/assets/outfit2.jpg",
      favorited: false,
      date: "2025-05-26",
    },
    {
      id: 3,
      img_blob: "/assets/outfit3.jpg",
      favorited: false,
      date: "2025-05-01",
    },
  ];

  const favorites = pins.filter((p) => p.favorited);
  const lastWeek = pins.filter((p) => !p.favorited && isFromLastWeek(p.date));
  const older = pins.filter((p) => !p.favorited && !isFromLastWeek(p.date));

  return (
    <div style={{ paddingTop: "80px" }}>
      {favorites.length > 0 && (
        <>
          <ParallaxText baseVelocity={-5}>Favorite Outfits</ParallaxText>
          <div className="pin_container">{favorites.map((pin) => <Pin key={pin.id} pin={pin} />)}</div>
        </>
      )}

      {lastWeek.length > 0 && (
        <>
          <ParallaxText baseVelocity={5}>Last Week’s Outfits</ParallaxText>
          <div className="pin_container">{lastWeek.map((pin) => <Pin key={pin.id} pin={pin} />)}</div>
        </>
      )}

      {older.length > 0 && (
        <>
          <ParallaxText baseVelocity={-4}>Older Looks</ParallaxText>
          <div className="pin_container">{older.map((pin) => <Pin key={pin.id} pin={pin} />)}</div>
        </>
      )}
    </div>
  );
};

export default UserOutfitBoard;





function wrap(min: number, max: number, value: number): number {
    const range = max - min;
    return ((((value - min) % range) + range) % range) + min;
}