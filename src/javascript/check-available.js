export function CheckAvailable(selector, data) {
    if (data) {
        selector.textContent = data;
        selector.parentNode.classList.remove("opacity-30");
        if (selector.tagName === "A") {
            selector.href = data;
            selector.title = data;
            selector.classList.remove("pointer-events-none");
        }
    } else {
        selector.textContent = "Not Available";
        selector.parentNode.classList.add("opacity-30");
        if (selector.tagName === "A") {
            selector.classList.add("pointer-events-none");
        }
    }
}