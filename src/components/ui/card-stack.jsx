import { useEffect, useState } from "react";
import { motion } from "framer-motion";

let interval;

export const CardStack = ({
  items,
  offset,
  scaleFactor
}) => {
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState(items);

  useEffect(() => {
    startFlipping();

    return () => clearInterval(interval);
  }, []);
  const startFlipping = () => {
    interval = setInterval(() => {
      setCards((prevCards) => {
        const newArray = [...prevCards]; // create a copy of the array
        newArray.unshift(newArray.pop()); // move the last element to the front
        return newArray;
      });
    }, 5000);
  };

  return (
    (<div className="relative  h-60 w-60 md:h-60 md:w-96">
      {cards.map((card, index) => {
        return (
          (<motion.div
            key={card.id}
            className="absolute dark:bg-black bg-white h-60 w-60 md:h-60 md:w-96 rounded-3xl p-4 shadow-xl border border-neutral-200 dark:border-white/[0.1]  shadow-black/[0.1] dark:shadow-white/[0.05] flex flex-col justify-between"
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR, // decrease scale for cards that are behind
              zIndex: cards.length - index, //  decrease z-index for the cards that are behind
            }}>
            <div className="font-normal text-neutral-700 dark:text-neutral-200">
              {card.content}
            </div>
            <div>
              <p className="text-neutral-500 font-medium dark:text-white">
                {card.name}
              </p>
              <p className="text-neutral-400 font-normal dark:text-neutral-200">
                {card.designation}
              </p>
            </div>
          </motion.div>)
        );
      })}
    </div>)
  );
};




// import { CardStack } from "../ui/card-stack";
// import { cn } from "../../lib/utils";
// export function CardStackDemo() {
//   return (
//     (<div className="h-[40rem] flex items-center justify-center w-full">
//       <CardStack items={CARDS} />
//     </div>)
//   );
// }

// // Small utility to highlight the content of specific section of a testimonial content
// export const Highlight = ({
//   children,
//   className
// }) => {
//   return (
//     (<span
//       className={cn(
//         "font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5",
//         className
//       )}>
//       {children}
//     </span>)
//   );
// };

// const CARDS = [
//   {
//     id: 0,
//     name: "Manu Arora",
//     designation: "Senior Software Engineer",
//     content: (
//       <p>
//         These cards are amazing, <Highlight>I want to use them</Highlight> in my
//         project. Framer motion is a godsend ngl tbh fam 🙏
//       </p>
//     ),
//   },
//   {
//     id: 1,
//     name: "Elon Musk",
//     designation: "Senior Shitposter",
//     content: (
//       <p>
//         I dont like this Twitter thing,{" "}
//         <Highlight>deleting it right away</Highlight> because yolo. Instead, I
//         would like to call it <Highlight>X.com</Highlight> so that it can easily
//         be confused with adult sites.
//       </p>
//     ),
//   },
//   {
//     id: 2,
//     name: "Tyler Durden",
//     designation: "Manager Project Mayhem",
//     content: (
//       <p>
//         The first rule of
//         <Highlight>Fight Club</Highlight> is that you do not talk about fight
//         club. The second rule of
//         <Highlight>Fight club</Highlight> is that you DO NOT TALK about fight
//         club.
//       </p>
//     ),
//   },
// ];
