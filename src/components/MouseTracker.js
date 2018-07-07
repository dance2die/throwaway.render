import React from "react";
import styled, { keyframes } from "styled-components";

const rotate360 = keyframes`
    from {
        transform: rotate (0deg);
    }

    to {
        transform: rotate(360deg);
    }
`;

const CatImage = () => <img src="/cat.jpg" alt="cat!" width="150px" />;

// ⚠ !!! WARNING!!!
// Add the props using `attrs` or else it'd generate 200+ classes!!!

// `.attrs` - https://www.styled-components.com/docs/api#attrs
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
      <div style={{ height: "100%" }} onMouseMove={this.handleMouseMove}>
        {/* https://reactjs.org/docs/render-props.html */}
        {this.props.render(this.state)}
      </div>
    );
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div id="tracker" style={{ height: "500px" }}>
        <h1>Move the mouse around!</h1>
        <Mouse render={mouse => <Cat mouse={mouse} />} />
      </div>
    );
  }
}

export default MouseTracker;
