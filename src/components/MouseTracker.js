import React from "react";
// import debounce from "lodash.debounce";
import throttle from "lodash.throttle";
import styled, { keyframes } from "styled-components";

const rotate360 = keyframes`
    from {
        transform: rotate (0deg);
    }

    to {
        transform: rotate(360deg);
    }
`;

// const StyledCatImage = styled.img.attrs({
//   src: "/cat.jpg",
//   alt: "cat!"
// })`
//   display: inline-block;
//   /* position: absolute; */
//   animation: 1s ${rotate360} sine infinite;
//   padding: 2rem 1rem;
//   size: 1.5rem;
// `;

const CatImage = () => <img src="/cat.jpg" alt="cat!" width="150px" />;
const CatImageContainer = styled.div.attrs({
  style: props => ({
    top: props.top,
    left: props.left,
    animation: `${rotate360} 2s linear infinite`,
    position: `absolute`,
    size: `1.5rem`
  })
})``;

class Cat extends React.Component {
  render() {
    const { x, y } = this.props.mouse;
    // console.log(`{${x}, ${y}}`);

    return (
      <CatImageContainer top={y} left={x}>
        <CatImage />
      </CatImageContainer>
    );
  }
}

class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div
        style={{ height: "100%" }}
        onMouseMove={this.handleMouseMove}
        // onMouseMove={e => throttle(this.handleMouseMove(e), 500)}
      >
        {this.props.render(this.state)}
      </div>
    );
  }
}
// Here we create a component that will rotate everything we pass in over two seconds
// const Rotate = styled.div`
//   display: inline-block;
//   animation: ${rotate360} 1s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
//   padding: 2rem 1rem;
//   font-size: 1.2rem;
// `;

class MouseTracker extends React.Component {
  render() {
    return (
      <div id="tracker" style={{ height: "500px" }}>
        <h1>Move the mouse around!</h1>
        {/* <Rotate>&lt; 💅 &gt;</Rotate> */}
        <Mouse render={mouse => <Cat mouse={mouse} />} />
      </div>
    );
  }
}

export default MouseTracker;
