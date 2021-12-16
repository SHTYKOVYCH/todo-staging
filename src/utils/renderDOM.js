export function render(query, block) {
    const root = document.querySelector(query);
    root.append(block.render());
    return root;
}
