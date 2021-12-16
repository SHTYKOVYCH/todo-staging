import Block from "../../modules/block";

export default class Link extends Block {
    constructor(props = {}, content = "", childNodes = {}) {
        super('a', props, content, childNodes);
    }
}