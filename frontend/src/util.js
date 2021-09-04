export const parseRequestUrl = () => {
  const url = document.location.hash.toLowerCase();
  const request = url.split("/");
  return {
    resource: request[1],
    id: request[2],
    verb: request[3],
  };
};

export const rerender = async (component) => {
  console.log("re-render");
  document.getElementById("main").innerHTML = await component.render();
  await component.after_render();
};
