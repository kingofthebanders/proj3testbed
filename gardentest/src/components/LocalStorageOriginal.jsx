import React from "react";
import RGL, { WidthProvider } from "react-grid-layout";

const ReactGridLayout = WidthProvider(RGL);
const originalLayout = getFromLS("layout") || [];
/**
 * This layout demonstrates how to sync to localstorage.
 */
class LocalStorageLayout extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    cols: 12,
    rowHeight: 30,

    onLayoutChange: function() {}
  };

  constructor(props) {
    super(props);

    this.state = {
      layout: JSON.parse(JSON.stringify(originalLayout)),
      totalHeight: 5,
      mouse: false,
      rollbackLayout: []
    };

    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.resetLayout = this.resetLayout.bind(this);
    this.setHeight = this.setHeight.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.rollBackLayout = this.rollBackLayout.bind(this);
  }

  resetLayout() {
    console.log("In Reset Layout Function");
    this.setState({
      layout: originalLayout
    });
  }

  rollBackLayout() {
      const { rollbackLayout } = this.state;
      this.setState({ layout : rollbackLayout });
  }

  setHeight() {
    this.setState({ totalHeight: 20 });
  }

  onLayoutChange(layout) {
    /*eslint no-console: 0*/
    saveToLS("layout", layout);
    this.setState({ layout });
    this.props.onLayoutChange(layout); // updates status display
  }

  //WARNING! To be deprecated in React v17. Use componentDidUpdate instead.
  //   componentWillUpdate(nextProps, nextState) {
  //       console.log("******Component Will Update")
  //   }

  handleMouseDown() {
    this.setState({ 
        mouse: true,
        sideLayout: this.state.layout
     });
  }

  componentDidUpdate(prevProps, prevState) {
    //   console.log("PrevState: ", prevState.layout);
    //   console.log("This State Layout: ", this.state.layout);
    //   console.log("Total Height", this.state.totalHeight);

    const { layout, totalHeight } = this.state;
    let resetFlag = false;

    layout.forEach(e => {
      // console.log("ID: ",e.i)
      // console.log("Height: ", e.h);
      // console.log("Y-Axis", e.y);
      // console.log("Total Height:", e.y+e.h);
      if (e.h + e.y > totalHeight) {
        resetFlag = true;
        console.log("Reset Flag", resetFlag);
      }
    });

    if (arraysEqual(this.state.layout, prevState.layout)) {
      console.log("Arrays Are Equal, Nothing Happens");
    } else {
      console.log("----Not Equal");
      if (resetFlag) {
        console.log("Height Exceeded");
        // this.resetLayout();
        // this.rollBackLayoutChange(prevState);
        this.rollBackLayout();
        console.log("Original Layout: ", originalLayout);
        console.log("Previous State: ", prevState.layout);
      }
    }
  }

  //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
  //   componentWillReceiveProps(nextProps) {
  //       console.log("Height: ",this.state.totalHeight);

  //       if(this.state.totalHeight > 15){
  //           this.resetLayout();
  //       }
  //   }

  render() {
    return (
      <React.Fragment>
        <div>
          <h1>Title</h1>
        </div>
        <div
          onMouseDown={this.handleMouseDown}
        >
          <button onClick={this.resetLayout}>Reset Layout</button>
          <button onClick={this.setHeight}>Set Height</button>
          <ReactGridLayout
            {...this.props}
            layout={this.state.layout}
            onLayoutChange={this.onLayoutChange}
          >
            <div key="1" data-grid={{ w: 2, h: 3, x: 0, y: 0 }}>
              <span className="text">1</span>
            </div>
            <div key="2" data-grid={{ w: 2, h: 3, x: 2, y: 0 }}>
              <span className="text">2</span>
            </div>
            <div key="3" data-grid={{ w: 2, h: 3, x: 4, y: 0 }}>
              <span className="text">3</span>
            </div>
            <div key="4" data-grid={{ w: 2, h: 3, x: 6, y: 0 }}>
              <span className="text">4</span>
            </div>
            <div key="5" data-grid={{ w: 2, h: 3, x: 8, y: 0 }}>
              <span className="text">5</span>
            </div>
          </ReactGridLayout>
        </div>
      </React.Fragment>
    );
  }
}

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("rgl-7")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "rgl-7",
      JSON.stringify({
        [key]: value
      })
    );
  }
}

function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  for (var i = arr1.length; i--; ) {
    if (arr1[i] !== arr2[i]) return false;
  }

  return true;
}

export default LocalStorageLayout;
