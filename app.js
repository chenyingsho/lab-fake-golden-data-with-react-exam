const App = React.createClass({
    getInitialState: function () {
        return {
            isEditor: true,
            elements: []
        }
    },
    toggle: function () {
        this.setState({
            isEditor: !this.state.isEditor
        });
    },
    addElement: function (element) {
        const elements = this.state.elements;
        elements.push(element);
        this.setState({elements});
    },
    deleteElements:function (index) {
        const elements= this.state.elements;
        elements.splice(index,1);
        this.setState({elements});
    },
    render: function () {
        return <div>
            <button onClick={this.toggle}>{this.state.isEditor ? "Editor" : "Preview"}</button>
            <div className={this.state.isEditor ? "" : "hidden"}>
                <Editor elements={this.state.elements} onadd={this.addElement} onDelete={this.deleteElements}/>
            </div>
            <div className={this.state.isEditor ? "hidden" : ""}>
                <Preview elements={this.state.elements} />
            </div>
        </div>;
    }
});

const Editor = React.createClass({

    render: function () {
        return <div>
            <Left elements={this.props.elements} onDelete={this.props.onDelete}/>
            <Right onadd={this.props.onadd}/>
        </div>;
    }
});

const Left = React.createClass({
    remove:function (index) {
        this.props.onDelete(index);
    },
    render: function () {
        const elements = this.props.elements.map((ele, index)=> {
            return <div key={index}>
                <input type={ele}/>
                <button onClick={this.remove.bind(this,index)}>X</button>
            </div>;
        });
        return <div>
            {elements}
        </div>
    }
});

const Right = React.createClass({
    add: function () {
        const element = $("input[name=element]:checked").val();
        this.props.onadd(element);
    },
    render: function () {
        return <div>
            <input type="radio" name="element" value="text"/>Text
            <input type="radio" name="element" value="date"/>Date
            <button onClick={this.add}>+</button>
        </div>;
    }
});
const Preview = React.createClass({
    render: function () {
        const elements = this.props.elements.map((ele, index)=> {
            return <div key={index}>
                <input type={ele}/>
            </div>;
        });
        return <div>
            {elements}
            <button>summit</button>
        </div>
    }
});


ReactDOM.render(<App />, document.getElementById('content'));