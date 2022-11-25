import React from "react";

namespace ScrollSpace {
  export type Props = {
    children?: React.ReactNode;
    height?: string; //高度
    load?: (data?: Event) => void; //执行函数
    interval?: number; //离底部的间隔内加载执行,默认20
    delay?: number; //延迟时间,默认1000毫秒
  };

  export type Event = React.UIEvent<HTMLDivElement, UIEvent>;
}

/* 滑动加载组件 */
export const Scroll = (props: ScrollSpace.Props) => {
  props = Object.assign({ interval: 20, load: () => {} }, props);
  return (
    <div
      style={{ height: props.height, overflow: "auto" }}
      onScroll={debounce<ScrollSpace.Event>((data) => {
        let divEl = data.target as HTMLDivElement;
        if (divEl.scrollTop + divEl.clientHeight + props.interval! > divEl.scrollHeight) {
          props.load!(data);
        }
      }, props.delay)}
    >
      {props.children}
    </div>
  );
};

/* 防抖默认1秒 */
function debounce<T>(fn: (data: T) => void, delay: number = 1000) {
  let timeout: NodeJS.Timeout | null = null;
  return function (data: T) {
    if (timeout !== null) clearTimeout(timeout);
    timeout = setTimeout(fn.bind({}, data), delay);
  };
}
