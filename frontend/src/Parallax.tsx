"use client"

import React from 'react';
import {
    motion,
    MotionValue,
    useScroll,
    useSpring,
    useTransform,
} from "motion/react"
import { useRef } from "react"

type ImageProps = {
    id: number;
}

function Image({id}: ImageProps): JSX.Element {
    const ref = useRef<HTMLDivElement | null>(null);
    const {scrollYProgress} = useScroll({target : ref});
    const y = useParallax(scrollYProgress, 300)

    if (id === 0) {
        return (
          <section className="img-container invisible">
            <div ref={ref}>
              <img src={`/photos/first/${id}.jpg`} alt="" />
            </div>
          </section>
        );
      }
    return (
        <section className="img-container">
            <div ref={ref}>
                <img
                src={`/photos/first/${id}.jpg`}
                alt="A London skyscraper"
                />
            </div>
            <motion.h2
                // Hide until scroll progress is measured
                initial={{ visibility: "hidden" }}
                animate={{ visibility: "visible" }}
                style={{ y }}
            >{`#00${id}info info info`}</motion.h2>
        </section>
    );
}

export default function Parallax(): JSX.Element {
    return (
      <div id="example">
        {[0, 1, 2, 3].map((image) => (
          <Image key={image} id={image} />
        ))}
        <div className="progress" />
        <StyleSheet />
      </div>
    );
  }

function useParallax(value: MotionValue<number>, distance: number) {
    return useTransform(value, [0,1], [-distance, distance])
}

function StyleSheet() {
return (
    <style>{`
    html {
        scroll-snap-type: y mandatory;
        
    }

    .invisible {
        opacity: 0;
    }

    .img-container {
        height: 100vh;
        scroll-snap-align: start;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }

    .img-container > div {
        width: 300px;
        height: 400px;
        margin: 20px;
        background: #f5f5f5;
        overflow: hidden;
    }

    .img-container img {
        width: 300px;
        height: 400px;
    }

    @media (max-width: 500px) {
        .img-container > div {
            width: 150px;
            height: 200px;
        }

        .img-container img {
            width: 150px;
            height: 200px;
        }
    }

    .img-container h2 {
        color:rgb(10, 12, 11);
        margin: 0;
        font-family: "Liter"
        font-size: 50px;
        font-weight: 700;
        letter-spacing: -3px;
        line-height: 1.2;
        position: absolute;
        display: inline-block;
        top: calc(50% - 25px);
        left: calc(50% + 120px);
    }

    .progress {
        position: fixed;
        left: 0;
        right: 0;
        height: 5px;
        background: #8df0cc;
        bottom: 50px;
        transform: scaleX(0);
    }
`}</style>
)
}