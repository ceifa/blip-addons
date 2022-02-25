import { Retriever } from "./Retriever";

console.log("hi");

function injectScript(scriptPath: string) {
  const script = document.createElement("script");

  script.setAttribute("src", chrome.extension.getURL(scriptPath));

  document.body.appendChild(script);
}

window.addEventListener("message", (message: Message<BlipResponse>) => {
  if (message.data.isBlipsResponse) {
    const { identifier, result } = message.data;

    Retriever.resolve(identifier, result);
  }
});

(() => {
  setInterval(async () => {
    await Retriever.run("GET_VARIABLE", ["flow"]);
  }, 1000);
})();

injectScript("/js/listener.js");
