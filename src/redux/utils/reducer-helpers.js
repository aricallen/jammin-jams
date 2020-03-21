export const replaceOne = (newResource, state) => {
  return state.map((oldResource) =>
    newResource.id === oldResource.id ? newResource : oldResource
  );
};

export const replaceMany = (newResources, state) => {
  return state.map((oldResource) => {
    const toReplace = newResources.find((resource) => resource.id === oldResource.id);
    return toReplace || oldResource;
  });
};

export const removeOne = (deleted, state) => state.filter((resource) => resource.id !== deleted.id);

export const removeMany = (deleted, state) =>
  state.filter(
    (resource) => !deleted.some((deletedResource) => deletedResource.id === resource.id)
  );
