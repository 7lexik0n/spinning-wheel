import React from "react";

const getRandomColor = () => {
  return Math.floor(Math.random() * 16777215).toString(16);
};

const Wheel = ({ variants }) => {
  let content = (
    <div
      className="wheel__segment"
      style={{
        position: "absolute",
        left: "0",
        top: "0",
        width: "100%",
        height: "100%",
        background: "steelBlue",
      }}
    >
      <span className="wheel__value">{variants[0]}</span>
    </div>
  );

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
          <span className="wheel__value">{variants[0]}</span>
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
          <span className="wheel__value">{variants[1]}</span>
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
          <span className="wheel__value">{variants[0]}</span>
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
          <span className="wheel__value">{variants[1]}</span>
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
          <span className="wheel__value">{variants[2]}</span>
        </div>
      </>
    );
  }

  if (variants.length > 3) {
    const segments = variants.length;
    const angle = 360 / segments;
    // const percents = 100 - (90 - angle) / 1.8;
    const percents = 100 - 11.5 * (segments - 4);

    const randomAngle = Math.floor(Math.random() * 360);
    const randSegment = (randomAngle - angle / 2) / angle;
    const ind = Math.floor(randSegment) + 1;
    console.log(randomAngle);
    console.log(angle);
    console.log(randSegment);
    console.log(ind);
    console.log(ind < variants.length ? variants[ind] : variants[0]);

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
                transform: `rotate(${angle * index}deg)`,
              }}
            >
              <span className="wheel__value">{`${variant} | ${
                angle * index - angle / 2
              }-${angle * index + angle / 2}`}</span>
            </div>
          );
        })}
        <div
          className="wheel__cursor"
          style={{
            transform: `translate(-50%, -100%) rotate(${randomAngle}deg)`,
          }}
        ></div>
      </>
    );
  }

  return (
    <div className="wheel__container">
      <div className="wheel__circle">{content}</div>
    </div>
  );
};

export default Wheel;
