import React, { useEffect } from "react";

import "../../styles/survey/WordAnima.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WordAnima = () => {
  useEffect(() => {
    let iteration = 0; // gets iterated when we scroll all the way to the end or start and wraps around - allows us to smoothly continue the playhead scrubbing in the correct direction.

    const spacing = 0.1, // 카드 간격 설정
      snap = gsap.utils.snap(spacing), // seamlessLoop의 플레이 헤드를 스냅핑하기 위해 사용
      cards = gsap.utils.toArray(".cards li"),
      seamlessLoop = buildSeamlessLoop(cards, spacing),
      scrub = gsap.to(seamlessLoop, {
        // seamlessLoop 를 부드럽게 스크럽하는 데 사용하는 트윈.
        totalTime: 0, //스크롤 위치를 0으로 초기화
        duration: 1, // 트윈의 지속 시간
        ease: "power2", // 트윈에 사용되는 이징 함수
        // ease: "linear", // 트윈에 사용되는 이징 함수
        paused: true, // 트윈을 일시 정지 상태로 설정
      }),
      trigger = ScrollTrigger.create({
        // 스크롤 트리거 생성
        start: 0, // 시작 지점을 0으로 설정
        onUpdate(self) {
          // 스크롤 트리거의 콜백함수
          if (self.progress === 1 && self.direction > 0 && !self.wrapping) {
            // 스크롤 트리거가 요소의 끝에 도달한 경우, wrapForWard() 함수 호출
            // wrapForward(self);
          } else if (
            self.progress < 1e-5 && //이걸로 해야 뒤로갈때도 제대로 동작함.
            // self.progress < 1 &&
            self.direction < 0 &&
            !self.wrapping
          ) {
            // wrapBackward(self);
          } else {
            // ScrollTrigger의 onUpdate 콜백 함수가 호출될 때마다, seamlessLoop의 playhead를 적절한 위치로 이동.
            scrub.vars.totalTime = snap(
              (iteration + self.progress) * seamlessLoop.duration()
            );
            scrub.invalidate().restart(); // to improve performance, we just invalidate and restart the same tween. No need for overwrites or creating a new tween on each update.
            self.wrapping = false;
          }
        },
        // end: "+=5750", // ScrollTrigger가 감시하는 요소의 끝을 설정 // 요놈이 스크롤 하나당 넘어가는거 결정함.
        // end: () => (wordList.length - 1) * spacing * 1000,
        end: () => wordList.length * spacing * 1200,
        pin: ".gallery", //ScrollTrigger가 고정시킬 요소 선택자
      });

    // function wrapForward(trigger) {
    //   // 스크롤 트리거가 끝에 도달하면 처음으로 다시 돌리는 기능
    //   iteration++;
    //   trigger.wrapping = true;
    //   trigger.scroll(trigger.start + 1);
    // }

    // function wrapBackward(trigger) {
    //   // when the ScrollTrigger reaches the start again (in reverse), loop back to the end seamlessly
    //   iteration--;
    //   if (iteration < 0) {
    //     // to keep the playhead from stopping at the beginning, we jump ahead 10 iterations
    //     iteration = 9;
    //     seamlessLoop.totalTime(
    //       seamlessLoop.totalTime() + seamlessLoop.duration() * 10
    //     );
    //     scrub.pause(); // otherwise it may update the totalTime right before the trigger updates, making the starting value different than what we just set above.
    //   }
    //   trigger.wrapping = true;
    //   trigger.scroll(trigger.end - 1);
    // }

    // function scrubTo(totalTime) {
    //   // moves the scroll position to the place that corresponds to the totalTime value of the seamlessLoop, and wraps if necessary.
    //   let progress =
    //     (totalTime - seamlessLoop.duration() * iteration) /
    //     seamlessLoop.duration();
    //   if (progress > 1) {
    //     // wrapForward(trigger);
    //   } else if (progress < 0) {
    //     // wrapBackward(trigger);
    //   } else {
    //     // 스크롤 위치 구하는 공식이라는데 지금 무슨기능 하는지 모르겠음. 주석처리한다음에 새로고침해도 스크롤 위치는 기억하고 있음
    //     // trigger.scroll(
    //     //   trigger.start + progress * (trigger.end - trigger.start)
    //     // );
    //   }
    // }

    // 무한 스크롤 기능.
    function buildSeamlessLoop(items, spacing) {
      let overlap = Math.ceil(1 / spacing), // 무한스크롤을 위한 EXTRA 애니메이션 개수를 계산.
        startTime = items.length * spacing + 0.5, // seamless loop를 시작할 rawSequence 상의 시작 시간을 계산.
        loopTime = (items.length + overlap) * spacing + 0.59, // seamless loop 가 끝나면 시작 지점으로 돌아갈 시간을 계산합니다.
        rawSequence = gsap.timeline({ paused: true }), // 실제 애니메이션을 담을 타임라인.
        seamlessLoop = gsap.timeline({
          // rawSequence의 playhead를 조정하여 seamless loop처럼 보이게 할 타임라인.
          paused: true,
          repeat: -1, // to accommodate infinite scrolling/looping
          onRepeat() {
            // works around a super rare edge case bug that's fixed GSAP 3.6.1, GSAP 3.6.1에서 고쳐진 희귀한 버그를 해결하기 위한 코드입니다.
            this._time === this._dur && (this._tTime += this._dur - 0.01);
          },
        }),
        // items 배열의 길이와 overlap 값에 따라 계산되는 변수
        // l = items.length + overlap * 1 + 2,
        l = items.length * 2,
        time = 0,
        i,
        index,
        item;

      console.log(items.length);
      console.log(overlap);
      // set initial state of items
      gsap.set(items, { xPercent: 400, opacity: 0, scale: 0 });

      // now loop through and create all the animations in a staggered fashion. Remember, we must create EXTRA animations at the end to accommodate the seamless looping.
      for (i = 0; i < l; i++) {
        index = i % items.length;
        item = items[index];
        time = i * spacing;
        rawSequence
          .fromTo(
            item,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              zIndex: 100,
              duration: 0.5,
              yoyo: true,
              repeat: 1,
              ease: "power1.in",
              immediateRender: false,
            },
            time
          )
          .fromTo(
            item,
            { xPercent: 400 },
            {
              xPercent: -400,
              duration: 1,
              ease: "none",
              immediateRender: false,
            },
            time
          );
        i <= items.length && seamlessLoop.add("label" + i, time); // we don't really need these, but if you wanted to jump to key spots using labels, here ya go.
      }

      // here's where we set up the scrubbing of the playhead to make it appear seamless.
      rawSequence.time(startTime);
      seamlessLoop
        .to(rawSequence, {
          time: loopTime,
          duration: loopTime - startTime,
          ease: "none",
        })
        .fromTo(
          rawSequence,
          { time: overlap * spacing + 1 },
          {
            time: startTime,
            duration: startTime - (overlap * spacing + 1),
            immediateRender: false,
            ease: "none",
          }
        );
      return seamlessLoop;
    }
  }, []);

  const wordList = [
    "apple",
    "banana",
    "cherry",
    "date",
    "fig",
    "grape",
    "kiwi",
    // "lemon",
    // "mango",
    // "nectarine",
    // "orange",
    // "papaya",
    // "quince",
    // "raspberry",
    // "strawberry",
    // "tangerine",
    // "watermelon",
    // "blueberry",
    // "coconut",
    // "durian",
    // "elderberry",
    // "guava",
    // "honeydew",
    // "jackfruit",
    // "kumquat",
    // "lime",
    // "mulberry",
    // "olive",
    // "pear",
    // "plum",
    // "currant",
    // "blackberry",
    // "peach",
    // "pineapple",
    // "apricot",
    // "avocado",
    // "cantaloupe",
    // "grapefruit",
    // "lychee",
    // "passionfruit",
    // "persimmon",
    // "pomegranate",
    // "salmonberry",
    // "soursop",
    // "tomato",
    // "ugli fruit",
    // "vanilla",
    // "walnut",
    // "xigua",
    // "yew",
    "zucchini",
    "acai",
    "boysenberry",
    "cucumber",
    "dragon fruit",
  ];

  return (
    <div>
      <div className="gallery">
        <ul className="cards">
          {wordList.map((word, index) => (
            <li key={index}>{word}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WordAnima;
