export const Grid = (props) => {
  return <div style={{
    width: props.width ? props.width : "",
    border: props.border ? props.border : "",
    display: props.container ? "flex": "",
    flexFlow: props.direction ? props.direction : '',
    justifyContent: props.justify ? props.justify : '',
    alignItems: props.align ? props.align : '',
    padding: props.padding ? props.padding : "",
    margin: props.margin ? props.margin : "",
  }}>{props.children}</div>
}