import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Typography } from "@mui/material";

const getRandomColor = () => {
  return Math.floor(Math.random() * 16777215).toString(16);
};

const Wheel = ({ variants, rotating, stopWheel }) => {
  const [rotAngle, setRotAngle] = useState(0);
  const controls = useAnimation();
  const [winValue, setWinValue] = useState("");

  const getValueFromAngle = (angle) => {
    if (variants.length === 2) {
      return angle > 90 && angle < 270 ? variants[1] : variants[0];
    }

    if (variants.length === 3) {
      console.log(variants);
      console.log(angle);
      if (angle >= 60 && angle < 180) {
        return variants[1];
      } else if (angle >= 180 && angle < 300) {
        return variants[2];
      } else {
        return variants[0];
      }
    }

    if (variants.length > 3) {
      const segments = variants.length;
      const finAngle = 360 / segments;

      const finSegment = (angle - finAngle / 2) / finAngle;
      const ind = Math.floor(finSegment) + 1;

      return ind < variants.length ? variants[ind] : variants[0];
    }
  };

  useEffect(() => {
    if (rotating) {
      const angle =
        180 +
        Math.round(Math.random() * 4) * 360 +
        Math.floor(Math.random() * 360);
      setRotAngle(angle);
      controls.start({
        transform: `rotate(-${angle}deg)`,
        transition: {
          duration: 5,
          ease: "easeInOut",
          type: "spring",
          onComplete: () => {
            const finishAngle = angle % 360;
            const finalValue = getValueFromAngle(finishAngle);
            setWinValue(finalValue.value);
            console.log(finalValue.value);
            stopWheel();
          },
        },
      });
    }

    return controls.stop;
  }, [rotating]);

  useEffect(() => {
    setWinValue("");
  }, [variants]);

  useEffect(() => {
    if (rotating) {
      setWinValue("");
    }
  }, [rotating]);

  let content =
    variants.length > 0 ? (
      <div
        className="wheel__segment"
        style={{
          position: "absolute",
          left: "0",
          top: "0",
          width: "100%",
          height: "100%",
          background: `#${getRandomColor()}`,
        }}
      >
        <span className="wheel__value">{variants[0].value}</span>
      </div>
    ) : null;

  if (variants.length === 2) {
    content = (
      <>
        <div
          className="wheel__segment"
          style={{
            position: "absolute",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
            background: `#${getRandomColor()}`,
            clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
          }}
        >
          <span className="wheel__value">{variants[0].value}</span>
        </div>
        <div
          className="wheel__segment"
          style={{
            position: "absolute",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
            background: `#${getRandomColor()}`,
            clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
            transform: "rotate(180deg)",
          }}
        >
          <span className="wheel__value">{variants[1].value}</span>
        </div>
      </>
    );
  }

  if (variants.length === 3) {
    content = (
      <>
        <div
          className="wheel__segment"
          style={{
            position: "absolute",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
            background: `#${getRandomColor()}`,
            clipPath: "polygon(50% 50%, 100% 22.5%, 100% 0, 0 0, 0 22.5%)",
            transform: "rotate(0deg)",
          }}
        >
          <span className="wheel__value">{variants[0].value}</span>
        </div>
        <div
          className="wheel__segment"
          style={{
            position: "absolute",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
            background: `#${getRandomColor()}`,
            clipPath: "polygon(50% 50%, 100% 22.5%, 100% 0, 0 0, 0 22.5%)",
            transform: "rotate(120deg)",
          }}
        >
          <span className="wheel__value">{variants[1].value}</span>
        </div>
        <div
          className="wheel__segment"
          style={{
            position: "absolute",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
            background: `#${getRandomColor()}`,
            clipPath: "polygon(50% 50%, 100% 22.5%, 100% 0, 0 0, 0 22.5%)",
            transform: "rotate(240deg)",
          }}
        >
          <span className="wheel__value">{variants[2].value}</span>
        </div>
      </>
    );
  }

  if (variants.length > 3) {
    const segments = variants.length;
    const angle = 360 / segments;
    const percents = 100 - (90 - angle) / 1.8;

    content = (
      <>
        {variants.map((variant, index) => {
          return (
            <div
              key={index}
              className="wheel__segment"
              style={{
                position: "absolute",
                left: "0",
                top: "0",
                width: "100%",
                height: "100%",
                background: `#${getRandomColor()}`,
                clipPath: `polygon(50% 50%, ${percents}% 0%, ${
                  100 - percents
                }% 0%)`,
                zIndex: `${index}`,
                transform: `rotate(${angle * index}deg)`,
              }}
            >
              <span className="wheel__value">{variant.value}</span>
            </div>
          );
        })}
      </>
    );
  }

  return (
    <div className="wheel__container">
      <motion.div
        className="wheel"
        style={{
          background: variants.length > 0 ? "#fff" : `#${getRandomColor()}`,
        }}
        animate={controls}
      >
        <div className="wheel__circle">{content}</div>
        <div className="wheel__dot"></div>
      </motion.div>
      <div className="wheel__target">
        {winValue && (
          <Typography
            variant="body1"
            component="span"
            sx={{ p: "5px 30px 0px", color: "#fff", display: "inline-block" }}
          >
            {winValue}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default Wheel;
