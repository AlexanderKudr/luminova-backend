const input = document.querySelector("#input");
input.style.color = "red";

const useObserver = () => {
  const observers = [];

  const addObserver = (observer) => observers.push(observer);

  const removeObserver = (observer) => observers.splice(observers.indexOf(observer), 1);

  const notifyObservers = (data) => observers.forEach(() => console.log(data));

  return { addObserver, removeObserver, notifyObservers };
};

const { addObserver, removeObserver, notifyObservers } = useObserver();

addObserver({
  update: (data) => console.log("update", data),
});

input.addEventListener("input", () => console.log(input.value));
