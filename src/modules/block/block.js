
class Block {
    DOM = undefined;
    tag = "";
    props = "";
    ChildNodes = [];
    content = "";
    rendered = false;

    constructor(tag, props = {}, content = '', childNodes = {}) {

        this.tag = tag;
        this.props = props;
        this.content = content;

        this.DOM = document.createElement(this.tag);

        for (let key in this.props) {
            this.DOM.setAttribute(key, this.props[key]);
        }

        for (let key in childNodes) {
            let child = new childNodes[key].type(...childNodes[key].argv);
            this.ChildNodes.push(child);
        }
    }

    addChild(elem) {
        this.ChildNodes.push(elem);

        this.rendered = false;

        this.render();

        return this;
    }

    removeChild(index) {
        this.ChildNodes.splice(index);

        this.rendered = false;

        this.render();

        return this;
    }

    setProp(propName, value) {
        this.DOM.setAttribute(propName,  value);

        return this;
    }

    addEventListener(event, func) {

        this.render().addEventListener(event, func);

        return this;
    }

    removeEventListener(event, func) {
        this.render().removeEventListener(event, func);

        return this;
    }

    render() {
        if (this.rendered) {
            return this.DOM;
        }

        this.DOM.innerHTML = "";

        if (this.ChildNodes.length) {
            for (let key in this.ChildNodes) {
                this.DOM.append(this.ChildNodes[key].render());
            }
        } else {
            this.DOM.textContent = this.content;
        }

        this.rendered = true;

        return this.DOM;
    }

    show() {
        this.DOM.style.display = "";
    }

    hide() {
        this.DOM.style.display = "none";
    }
}

export default Block;
